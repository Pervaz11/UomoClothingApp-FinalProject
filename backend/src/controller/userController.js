import bcrypt from "bcryptjs";
import {
    register,
    getAll,
    getOne,
    login as loginService,
    resetPass,
    verifyEmail as verifyEmailService,
    forgotPassword as forgotPasswordService
} from "../service/userService.js";
import { CLIENT_URL } from "../config/config.js";
import formatMongoData from "../utils/formatMongoData.js";
import UserModel from "../models/userModel.js";
import { sendVerificationEmail } from "../utils/mailService.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../utils/jwt.js";
import jwt from "jsonwebtoken";

// GET ALL USERS
export async function getAllUsers(_, res, next) {
    try {
        const users = await getAll();
        res.status(200).json({
            message: "Users retrieved successfully!",
            data: formatMongoData(users),
        });
    } catch (error) {
        next(error);
    }
}

// REGISTER USER
export async function registerUser(req, res, next) {
    try {
        if (req.file && req.file.path) {
            req.body.profileImage = req.file.path;
            req.body.public_id = req.file.filename;
        }

        const response = await register(req.body);
        if (!response.success) throw new Error(response.message);

        const token = jwt.sign(
            { id: response.data._id, email: req.body.email, fullName: req.body.fullName },
            process.env.JWT_ACCESS_SECRET_KEY,
            { expiresIn: "6h" }
        );

        const verificationLink = `${process.env.SERVER_URL}/auth/verify-email?token=${token}`;
        await sendVerificationEmail(req.body.email, req.body.fullName, verificationLink);

        res.status(201).json({
            message: "User registered successfully. Please verify your email.",
            data: response.data,
        });
    } catch (error) {
        next(error);
    }
}

// VERIFY EMAIL
export const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;
        const response = await verifyEmailService(token);
        res.redirect(`${CLIENT_URL}/email-verified?message=${response.message}`);
    } catch (error) {
        next(error);
    }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        await forgotPasswordService(email);
        res.status(200).json({ message: "Reset password email was sent!" });
    } catch (error) {
        res.status(400).json({ message: error.message || "Internal server error" });
    }
};

// RESET PASSWORD
export const resetPassword = async (req, res, next) => {
    try {
        const { newPassword, token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
        const email = decoded.email;
        await resetPass(newPassword, email);
        res.status(200).json({ message: "Password reset successfully!" });
    } catch (error) {
        next(error);
    }
};

// LOGIN
export const login = async (req, res, next) => {
    try {
        const credentials = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        };

        const response = await loginService(credentials);
        const user = await UserModel.findOne({ email: req.body.email });

        if (user?.isBanned) {
            return res.status(403).json({
                message: "Your account has been banned by admin. You cannot log in.",
            });
        }

        const accessToken = generateAccessToken({
            id: user._id,
            email: user.email,
            role: user.role,
            fullName: user.fullName,
            username: user.username,
            profileImage: user.profileImage,
            phoneNumber: user.phoneNumber
        });

        const refreshToken = generateRefreshToken({
            id: user._id,
            email: user.email,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/auth/refresh",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: response.message,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                fullName: user.fullName,
                username: user.username,
                profileImage: user.profileImage,
            },
            token: accessToken,
        });
    } catch (error) {
        res.status(401).json({ message: error.message || "Internal server error" });
    }
};

// REFRESH TOKEN
export const refresh = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.sendStatus(401);

        const decoded = verifyRefreshToken(token);
        if (!decoded) return res.sendStatus(403);

        const user = await getOne(decoded.id);
        if (!user) return res.sendStatus(403);

        const newAccessToken = generateAccessToken({
            id: user._id,
            email: user.email,
            role: user.role,
            fullName: user.fullName,
        });

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(500).json({ message: "Token refresh failed" });
    }
};

// GET LOGGED-IN USER
export const getMe = async (req, res) => {
    try {
        if (!req.user || !req.user.id)
            return res.status(401).json({ message: "Unauthorized" });

        const user = await UserModel.findById(req.user.id).select("-password");

        if (!user)
            return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "User retrieved successfully",
            data: user
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE PROFILE
export const updateProfile = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        const userId = req.user.id;
        const updates = { ...req.body };

        if (req.file && req.file.path) {
            updates.profileImage = req.file.path;
            updates.public_id = req.file.filename;
        }

        const user = await UserModel.findByIdAndUpdate(userId, updates, { new: true }).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "Profile updated successfully!",
            data: user,
        });
    } catch (error) {
        console.log("Profile update error:", error);
        next(error);
    }
};

// UPDATE ROLE
export const updateUserRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!id || !role) {
            return res.status(400).json({ message: "User ID and role are required" });
        }

        const user = await UserModel.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "User role updated successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// CHANGE PASSWORD

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        return res.status(200).json({ message: "Password updated successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};


// DELETE / BAN / UNBAN / LOGOUT
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const banUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndUpdate(id, { isBanned: true }, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: `${user.fullName} has been banned`, data: user });
    } catch (error) {
        next(error);
    }
};

export const unbanUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndUpdate(id, { isBanned: false }, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: `${user.fullName} has been unbanned`, data: user });
    } catch (error) {
        next(error);
    }
};

export const logout = (_, res) => {
    res.clearCookie("refreshToken", { path: "/auth/refresh" });
    res.sendStatus(204);
};
