import {
    register,
    getAll,
    getOne,
    getByEmail,
    verifyEmail as verifyEmailService,
    login as loginService,
    unlockAcc,
    forgotPassword as forgotPasswordService,
    resetPass,
} from "../service/userService.js";

import {
    CLIENT_URL,
    JWT_REFRESH_SECRET_KEY,
} from "../config/config.js";

import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import formatMongoData from "../utils/formatMongoData.js";
import { sendVerificationEmail } from "../utils/mailService.js";
import { generateAccessToken } from "../utils/jwt.js";

/*UPDATE ME*/
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
            const userDoc = await User.findById(req.user.id);
            if (!userDoc) {
                return res.status(404).json({ message: "User not found", data: null });
            }

            const isMatch = await compare(
                updateFields.currentPassword || "",
                userDoc.password
            );
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: "Current password is incorrect", data: null });
            }

            const saltRounds = 10;
            updateFields.password = await hash(updateFields.password, saltRounds);
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found", data: null });
        }

        const token = generateAccessToken(
            {
                id: user.id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                profileImage: user.profileImage,
                phoneNumber: user.phoneNumber,
            },
            "6h"
        );

        res
            .status(200)
            .json({ message: "User updated successfully!", data: user, token });
    } catch (error) {
        next(error);
    }
}

/*GET ME*/
export async function getMe(req, res, next) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized", data: null });
        }

        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found", data: null });
        }

        res
            .status(200)
            .json({ message: "User info retrieved successfully!", data: user });
    } catch (error) {
        next(error);
    }
}

/*UPDATE USER BY ID*/
export async function updateUserById(req, res, next) {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        if (updateFields.password) {
            const saltRounds = 10;
            updateFields.password = await hash(updateFields.password, saltRounds);
        }

        const user = await User.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found", data: null });
        }

        res
            .status(200)
            .json({ message: "User updated successfully!", data: user });
    } catch (error) {
        next(error);
    }
}

/*GET ALL USERS*/
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

/*GET USER BY ID*/
export async function getUserById(req, res, next) {
    try {
        const { id } = req.params;
        const user = await getOne(id);

        if (!user) {
            res.status(404).json({
                message: "No such user found!",
                data: null,
            });
        } else {
            res.status(200).json({
                message: "User retrieved successfully!",
                data: user,
            });
        }
    } catch (error) {
        next(error);
    }
}

/*GET USER BY EMAIL*/
export async function getUserByEmail(req, res, next) {
    try {
        const { email } = req.params;
        const user = await getByEmail(email);

        if (!user) {
            res.status(404).json({
                message: "No such user with given email",
                data: null,
            });
        } else {
            res.status(200).json({
                message: "User retrieved successfully!",
                data: user,
            });
        }
    } catch (error) {
        next(error);
    }
}

/*REGISTER*/
export async function registerUser(req, res, next) {
    try {
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
            message: "User registered successfully | verify your email",
            data: response.data,
        });
    } catch (error) {
        next(error);
    }
}

/*VERIFY EMAIL*/
export async function verifyEmail(req, res, next) {
    try {
        const { token } = req.query;
        const response = await verifyEmailService(token);
        res.redirect(`${CLIENT_URL}/email-verified?message=${response.message}`);
    } catch (error) {
        next(error);
    }
}

/*FORGOT PASSWORD*/
export async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        await forgotPasswordService(email);
        res.status(200).json({
            message: "Reset password email was sent!",
        });
    } catch (error) {
        res.status(401).json({
            message: error.message || "Internal server error",
        });
    }
}

/* RESET PASSWORD */
export async function resetPassword(req, res, next) {
    try {
        const { newPassword, email } = req.body;
        await resetPass(newPassword, email);
        res.status(200).json({
            message: "Password reset successfully!",
        });
    } catch (error) {
        next(error);
    }
}

/* UNLOCK ACCOUNT*/
export async function unlockAccount(req, res, next) {
    try {
        const { token } = req.query;
        const response = await unlockAcc(token);
        res.redirect(`${CLIENT_URL}/login?message=${response.message}`);
    } catch (error) {
        next(error);
    }
}

/*LOGIN */
export async function login(req, res) {
    try {
        const credentials = {
            email: req.body.email,
            password: req.body.password,
        };

        const response = await loginService(credentials);

        res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/auth/refresh",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: response.message,
            token: response.accessToken,
        });
    } catch (error) {
        res.status(401).json({
            message: error.message || "Internal server error",
        });
    }
}

/* refresh token */
export function refresh(req, res) {
    const token = req.cookies.refreshToken;
    if (!token) {
        return res.status(401).json({ message: "No token provided!" });
    }

    jwt.verify(token, JWT_REFRESH_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token!" });
        }

        const user = await getOne(decoded.id);
        if (!user) {
            return res.status(403).json({ message: "Invalid or expired token!" });
        }

        const accessToken = generateAccessToken({
            email: user.email,
            id: user._id,
            role: user.role,
            fullName: user.fullName,
        });

        res.json({ accessToken });
    });
}

// Logout
export function logout(_, res) {
    res.clearCookie("refreshToken", { path: "/auth/refresh" });
    res.status(200).json({ message: "Logged out successfully!" });
}
