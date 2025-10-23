// backend/src/utils/jwt.js
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } from "../config/config.js";

// Generate Access Token
export const generateAccessToken = (payload, expiresIn = "60m") => {
    return jwt.sign(payload, JWT_ACCESS_SECRET_KEY, { expiresIn });
};

// Generate Refresh Token
export const generateRefreshToken = (payload, expiresIn = "7d") => {
    return jwt.sign(payload, JWT_REFRESH_SECRET_KEY, { expiresIn });
};

// Verify Access Token
export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, JWT_ACCESS_SECRET_KEY);
    } catch (err) {
        return null;
    }
};

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET_KEY);
    } catch (err) {
        return null;
    }
};
