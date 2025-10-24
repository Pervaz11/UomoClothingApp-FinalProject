// backend/src/service/userService.js
import UserModel from "../models/userModel.js";
import { hash, compare } from "bcrypt";
import { sendForgotPasswordEmail, sendVerificationEmail } from "../utils/mailService.js";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/jwt.js";

// ✅ Register User
export const register = async (payload) => {
    try {
        const { email, username, password, fullName } = payload;

        // Əgər firstName və lastName boşdursa, fullName-i böl
        if ((!payload.firstName || !payload.lastName) && fullName) {
            const parts = fullName.split(" ");
            payload.firstName = parts[0] || "";
            payload.lastName = parts.slice(1).join(" ") || "";
        }

        // Əgər fullName yoxdursa, firstName və lastName-dən düzəlt
        if (!payload.fullName && (payload.firstName || payload.lastName)) {
            payload.fullName = `${payload.firstName || ""} ${payload.lastName || ""}`.trim();
        }

        const existedUser = await UserModel.findOne({
            $or: [{ email }, { username }],
        });

        if (existedUser) {
            return { success: false, message: "username or email already taken!" };
        }

        // Şifrəni hash-lə
        const saltRounds = 10;
        const hashedPassword = await hash(password, saltRounds);
        payload.password = hashedPassword;

        const newUser = await UserModel.create(payload);

        return { success: true, data: newUser };
    } catch (error) {
        return { success: false, message: error.message || "internal server error!" };
    }
};

// ✅ Login User
export const login = async (credentials) => {
    const { email, password } = credentials;
    if (!email || !password) throw new Error("Email and password are required!");

    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Invalid email or password!");

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Invalid email or password!");

    let firstName = user.firstName || "";
    let lastName = user.lastName || "";
    if ((!firstName || !lastName) && user.fullName) {
        const parts = user.fullName.split(" ");
        firstName = parts[0] || "";
        lastName = parts.slice(1).join(" ") || "";
    }

    return {
        message: "Login successful",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            firstName,
            lastName,
            fullName: user.fullName || `${firstName} ${lastName}`.trim(),
            phoneNumber: user.phoneNumber || "",
            role: user.role,
            profileImage: user.profileImage,
        },
    };
};

// ✅ Forgot Password
export const forgotPassword = async (email) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("email does not exist!");

    const token = generateAccessToken({ id: user._id, email: user.email }, "30m");
    const resetPasswordLink = `${process.env.CLIENT_URL}/auth/reset-password/${token}`;

    await sendForgotPasswordEmail(email, resetPasswordLink);
};

// ✅ Reset Password
export const resetPass = async (newPassword, email) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("user not found!");

    const saltRounds = 10;
    const hashedPassword = await hash(newPassword, saltRounds);
    user.password = hashedPassword;
    await user.save();
    return user;
};

// ✅ Get All Users
export const getAll = async () => await UserModel.find().select("-password");

// ✅ Get One User by ID
export const getOne = async (id) => await UserModel.findById(id).select("-password");

// ✅ Get Users by Email
export const getByEmail = async (email) => await UserModel.find({ email }).select("-password");

// ✅ Unlock Account (dummy placeholder)
export const unlockAcc = async (token) => {
    return { message: "Account unlocked successfully" };
};

// ✅ Verify Email
export const verifyEmail = async (token) => {
    const decoded = verifyAccessToken(token);
    if (!decoded) throw new Error("Invalid or expired token");

    const user = await UserModel.findById(decoded.id);
    if (!user) throw new Error("User not found!");

    user.isVerified = true;
    await user.save();
    return { message: "Email verified successfully" };
};