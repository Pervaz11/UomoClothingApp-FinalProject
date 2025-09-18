import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

import { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } from "../config/config.js";

// Generate Access Token
const generateAccessToken = (payload, expiresIn = "2d") => {
    return sign(payload, JWT_ACCESS_SECRET_KEY, { expiresIn });
};

// Generate Refresh Token
const generateRefreshToken = (payload, expiresIn = "7d") => {
    return sign(payload, JWT_REFRESH_SECRET_KEY, { expiresIn });
};

// Verify Access Token
const verifyAccessToken = (token) => {
    try {
        return verify(token, JWT_ACCESS_SECRET_KEY);
    } catch (err) {
        return null;
    }
};

// Verify Refresh Token
const verifyRefreshToken = (token) => {
    try {
        return verify(token, JWT_REFRESH_SECRET_KEY);
    } catch (err) {
        return null;
    }
};

export {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};
