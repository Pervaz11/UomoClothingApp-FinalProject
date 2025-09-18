import UserModel from "../models/userModel.js";
import {
    verifyAccessToken,
    generateAccessToken,
    generateRefreshToken,
} from "../utils/jwt.js";
import bcrypt from "bcrypt";
import {
    sendUnlockAccountEmail,
    sendForgotPasswordEmail,
} from "../utils/mailService.js";
import { CLIENT_URL } from "../config/config.js";

const MAX_ATTEMPTS = 3;
const LOCK_TIME = 10 * 60 * 1000; //10 minutes

//get all +, get by id +, get by email +, delete -, update profile (ban/un-ban) -
// login +, register +, forgot-password, reset-password,
const getAll = async () => await UserModel.find().select("-password");

const getOne = async (id) => await UserModel.findById(id).select("-password");

const getByEmail = async (email) =>
    await UserModel.find({ email: email }).select("-password");

const register = async (payload) => {
    console.log('Register service payload:', payload);
    try {
        const { email, username } = payload;
        const existedUser = await UserModel.findOne({
            $or: [{ email }, { username }],
        });
        if (existedUser) {
            return {
                success: false,
                message: "username or email already taken!",
            };
        } else {
            return {
                success: true,
                data: await UserModel.create(payload),
            };
        }
    } catch (error) {
        console.error('Register service error:', error);
        return {
            success: false,
            message: error.message || "internal server error!"
        };
    }
};

//verify email service
const verifyEmail = async (token) => {
    const isValidToken = verifyAccessToken(token);
    if (isValidToken) {
        const { id } = isValidToken;
        const user = await UserModel.findById(id);
        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }
        if (user.emailVerified) {
            return {
                success: false,
                message: "email already has been verified",
            };
        } else {
            user.emailVerified = true;
            await user.save();
            return {
                success: true,
                message: "email verified successfully",
            };
        }
    } else {
        throw new Error("invalid or expired token!");
    }
};

const unlockAcc = async (token) => {
    const isValidToken = verifyAccessToken(token);
    if (isValidToken) {
        const { id } = isValidToken;
        const user = await UserModel.findById(id);
        if (user.loginAttempts >= 3) {
            user.loginAttempts = 0;
            user.lockUntil = null;
            await user.save();
            return {
                message: "account has been unlock manually successfully!",
            };
        } else {
            return {
                message: "account already has been unlocked!",
            };
        }
    } else {
        throw new Error("invalid or expired token!");
    }
};

const login = async (credentials) => {
    const { email, password } = credentials;

    const user = await UserModel.findOne({ email });

    if (!user) {
        throw new Error("Invalid credentials!");
    }

    // Check if banned
    if (user.isBanned) {
        if (!user.banUntil || new Date(user.banUntil) > new Date()) {
            throw new Error("You are banned from logging in.");
        } else {
            // Ban has expired, remove it
            user.isBanned = false;
            user.banUntil = null;
            await user.save();
        }
    }

    // Check if locked
    if (user.lockUntil && user.lockUntil > new Date()) {
        const unlockTime = new Date(user.lockUntil).toLocaleString();
        throw new Error(`Account is locked. Try again after ${unlockTime}.`);
    }

    //check user provider (local or email)
    if (user.provider !== "local") {
        throw new Error(
            "this account has been created with Google, try Sign In with Google!"
        );
    }

    // Validate password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        user.loginAttempts = (user.loginAttempts || 0) + 1;

        if (user.loginAttempts >= MAX_ATTEMPTS) {
            user.lockUntil = new Date(Date.now() + LOCK_TIME);
            await user.save();
            //send email to user to unlock their account
            const token = generateAccessToken(
                {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                },
                "6h"
            );
            const unlockAccountLink = `${process.env.SERVER_URL}/auth/unlock-account?token=${token}`;
            sendUnlockAccountEmail(user.email, user.fullName, unlockAccountLink);
            throw new Error(
                "Too many login attempts. Account locked for 10 minutes (check your email)"
            );
        }

        await user.save();
        throw new Error("Invalid credentials!");
    }

    // Success: reset loginAttempts, lockUntil, update lastLogin
    user.loginAttempts = 0;
    user.lockUntil = null;
    user.lastLogin = new Date();

    await user.save();
    //implement refresh token
    const accessToken = generateAccessToken({
        email: user.email,
        id: user._id,
        role: user.role,
        profileImage: user.profileImage,
        fullName: user.fullName,
        username: user.username,
        phoneNumber: user.phoneNumber,
    });
    const refreshToken = generateRefreshToken({
        email: user.email,
        id: user._id,
        role: user.role,
        fullName: user.fullName,
        username: user.username,
        phoneNumber: user.phoneNumber,
    });

    return {
        message: "login successful",
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};

const forgotPassword = async (email) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error("email does not exist!");
    } else {
        //send email
        const token = generateAccessToken(
            {
                id: user._id,
                email: user.email,
            },
            "30m"
        );
        const resetPasswordLink = `${CLIENT_URL}/auth/reset-password/${token}`;
        sendForgotPasswordEmail(email, resetPasswordLink);
    }
};

const resetPass = async (newPassword, email) => {
    const user = await UserModel.findOne({ email: email });
    if (!user) throw new Error("user not found!");

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    console.log("inside service: ", newPassword);
    user.password = hashedPassword;
    await user.save();
    return user;
};

export {
    getAll,
    getOne,
    getByEmail,
    register,
    verifyEmail,
    login,
    unlockAcc,
    forgotPassword,
    resetPass,
};
