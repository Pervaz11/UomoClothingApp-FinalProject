import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Access Token yaratmaq
export const generateAccessToken = (payload, expiresIn = "60m") => {
    try {
        return jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn });
    } catch (err) {
        console.error("❌ Access Token yaradılarkən xəta:", err.message);
        return null;
    }
};

// Refresh Token yaratmaq
export const generateRefreshToken = (payload, expiresIn = "7d") => {
    try {
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn });
    } catch (err) {
        console.error("❌ Refresh Token yaradılarkən xəta:", err.message);
        return null;
    }
};

// Access Token yoxlama
export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
    } catch (err) {
        console.error("⚠️ Access Token etibarsızdır:", err.message);
        return null;
    }
};

// Refresh Token yoxlama
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
    } catch (err) {
        console.error("⚠️ Refresh Token etibarsızdır:", err.message);
        return null;
    }
};
