import { register, getAll, getOne, getByEmail, verifyEmail, login, unlockAcc, forgotPassword, resetPass } from "../service/userService.js";
import { CLIENT_URL } from "../config/config.js";
import { hash } from "bcrypt";
import formatMongoData from "../utils/formatMongoData.js";
import { sendVerificationEmail } from "../utils/mailService.js";
import { generateAccessToken } from "../utils/jwt.js";

export async function updateMe(req, res, next) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized", data: null });
        }
        const updateFields = req.body;
        if (req.file && req.file.path) {
            updateFields.profileImage = req.file.path;
            updateFields.public_id = req.file.filename;
        }
        if (updateFields.password) {
            // Köhnə parol yoxlanışı
            const userDoc = await require("../models/userModel").findById(req.user.id);
            if (!userDoc) {
                return res.status(404).json({ message: "User not found", data: null });
            }
            const isMatch = await require("bcrypt").compare(updateFields.currentPassword || "", userDoc.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Current password is incorrect", data: null });
            }
            const saltRounds = 10;
            updateFields.password = await require("bcrypt").hash(updateFields.password, saltRounds);
        }
        const user = await require("../models/userModel").findByIdAndUpdate(
            req.user.id,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found", data: null });
        }
        const { generateAccessToken } = require("../utils/jwt");
        const token = generateAccessToken({
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            profileImage: user.profileImage,
            phoneNumber: user.phoneNumber,
        }, "6h");
        res.status(200).json({ message: "User updated successfully!", data: user, token });
    } catch (error) {
        next(error);
    }
}

export async function getMe(req, res, next) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized", data: null });
        }
        const user = await require("../models/userModel").findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found", data: null });
        }
        res.status(200).json({ message: "User info retrieved successfully!", data: user });
    } catch (error) {
        next(error);
    }
}

export async function updateUserById(req, res, next) {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        if (updateFields.password) {
            const saltRounds = 10;
            updateFields.password = await require("bcrypt").hash(updateFields.password, saltRounds);
        }
        const user = await require("../models/userModel").findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found", data: null });
        }
        res.status(200).json({ message: "User updated successfully!", data: user });
    } catch (error) {
        next(error);
    }
}

export async function getAllUsers(_, res, next) {
    try {
        const users = await getAll();
        res.status(200).json({
            message: "users retrieved successfully!",
            data: formatMongoData(users),
        });
    } catch (error) {
        next(error);
    }
}

export async function getUserById(req, res, next) {
    try {
        const { id } = req.params;
        const user = await getOne(id);
        if (!user) {
            res.status(404).json({
                message: "no such user found!",
                data: null,
            });
        } else {
            res.status(200).json({
                message: "user retrieved successfully!",
                data: user,
            });
        }
    } catch (error) {
        next(error);
    }
}

export async function getUserByEmail(req, res, next) {
    try {
        const { email } = req.params;
        const user = await getByEmail(email);
        if (!user) {
            res.status(404).json({
                message: "no such user with given email",
                data: null,
            });
        } else {
            res.status(200).json({
                message: "user retrieved successfully!",
                data: user,
            });
        }
    } catch (error) {
        next(error);
    }
}

export async function registerUser(req, res, next) {
    console.log('Register request body:', req.body);
    console.log('Register request file:', req.file);
    try {
        //password hash
        const { password } = req.body;
        const saltRounds = 10;
        const hashedPassword = await hash(password, saltRounds);

        if (req.file && req.file.path) {
            req.body.profileImage = req.file.path;
            req.body.public_id = req.file.filename;
        }
        const response = await register({
            ...req.body,
            password: hashedPassword,
        });
        if (!response.success) {
            throw new Error(response.message);
        }

        //send email service ...
        const token = generateAccessToken(
            {
                id: response.data._id,
                email: req.body.email,
                fullName: req.body.fullName,
            },
            "6h"
        );
        const verificationLink = `${process.env.SERVER_URL}/auth/verify-email?token=${token}`;
        sendVerificationEmail(req.body.email, req.body.fullName, verificationLink);

        res.status(201).json({
            message: "user registered successfully | verify your email",
            data: response.data,
        });
    } catch (error) {
        next(error);
    }
}

const _verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;
        //call your service here!
        const response = await verifyEmail(token); //success, message
        res.redirect(`${CLIENT_URL}/email-verified?message=${response.message}`);
    } catch (error) {
        next(error);
    }
};
export { _verifyEmail as verifyEmail };

const _forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        await forgotPassword(email);
        res.status(200).json({
            message: "reset password email was sent!",
        });
    } catch (error) {
        res.json({
            message: error.message || "internal server error",
            statusCode: 401,
        });
    }
};
export { _forgotPassword as forgotPassword };

export async function resetPassword(req, res, next) {
    try {
        const { newPassword, email } = req.body;
        await resetPass(newPassword, email);
        //redirect to login page
        res.status(200).json({
            message: "password reset successfully!",
        });
    } catch (error) {
        next(error);
    }
}

export async function unlockAccount(req, res, next) {
    try {
        const { token } = req.query;
        //call your service here!
        const response = await unlockAcc(token); //success, message
        res.redirect(`${CLIENT_URL}/login?message=${response.message}`);
    } catch (error) {
        next(error);
    }
}

const _login = async (req, res, next) => {
    try {
        const credentials = {
            email: req.body.email,
            password: req.body.password,
        };
        const response = await login(credentials);

        console.log("RESPONSE ON SERVER: ", response);

        res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: true, // in production (possible BUG)
            sameSite: "strict",
            path: "/auth/refresh",
            maxAge: 7 * 24 * 60 * 60 * 1000, //7days
        });

        res.status(200).json({
            message: response.message,
            token: response.accessToken,
        });
    } catch (error) {
        res.json({
            message: error.message || "internal server error",
            statusCode: 401, //unauthorized
        });
    }
};
export { _login as login };

export function refresh(req, res) {
    const token = req.cookies.refreshToken;
    if (!token)
        return res.sendStatus(401).json({ message: "no token provided!" });

    jwt.verify(token, JWT_REFRESH_SECRET_KEY, async (err, decoded) => {
        if (err)
            return res.sendStatus(403).json({ message: "invalid or expired token!" });
        const user = await getOne(decoded.id);
        if (!user)
            return res.sendStatus(403).json({ message: "invalid or expired token!" });

        const accessToken = generateAccessToken({
            email: user.email,
            id: user._id,
            role: user.role,
            fullName: user.fullName,
        });
        res.json({ accessToken });
    });
}

export function logout(_, res) {
    res.clearCookie("refreshToken", { path: "/auth/refresh" });
    res.sendStatus(204).json({ message: "logged out successfully!" });
}
