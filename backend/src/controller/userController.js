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
import jwt from "jsonwebtoken";

// GET all users
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

// REGISTER user
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
        sendVerificationEmail(req.body.email, req.body.fullName, verificationLink);

        res.status(201).json({
            message: "user registered successfully | verify your email",
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
        res.status(200).json({ message: "password reset successfully!" });
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

        const accessToken = jwt.sign(
            {
                id: response.user.id,
                email: response.user.email,
                role: response.user.role,
                fullName: response.user.fullName,
                username: response.user.username,
                profileImage: response.user.profileImage || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg",
            },
            process.env.JWT_ACCESS_SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/auth/refresh",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: response.message,
            user: response.user,
            token: accessToken,
        });
    } catch (error) {
        res.status(401).json({ message: error.message || "internal server error" });
    }
};

// REFRESH TOKEN
export const refresh = (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY, async (err, decoded) => {
        if (err) return res.sendStatus(403);
        const user = await getOne(decoded.id);
        if (!user) return res.sendStatus(403);

        const accessToken = jwt.sign(
            { email: user.email, id: user._id, role: user.role, fullName: user.fullName },
            process.env.JWT_ACCESS_SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.json({ accessToken });
    });
};

// UPDATE PROFILE
export const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user?.id || req.params.id; // JWT-dən və ya paramdan
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
        next(error);
    }
};

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



// LOGOUT
export const logout = (_, res) => {
    res.clearCookie("refreshToken", { path: "/auth/refresh" });
    res.sendStatus(204);
};