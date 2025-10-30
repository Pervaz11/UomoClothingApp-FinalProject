// backend/src/utils/jwt.js
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } from "../config/config.js";

/**
 * ✅ Generate Access Token
 * @param {object} payload - User data (id, email, role, etc.)
 * @param {string} expiresIn - Expiration time (default: 1 hour)
 * @returns {string} JWT Access Token
 */
export const generateAccessToken = (payload, expiresIn = "1h") => {
    try {
        return jwt.sign(payload, JWT_ACCESS_SECRET_KEY, { expiresIn });
    } catch (err) {
        console.error("❌ Error generating access token:", err.message);
        return null;
    }
};

/**
 * ✅ Generate Refresh Token
 * @param {object} payload - Minimal user data (id, email)
 * @param {string} expiresIn - Expiration time (default: 7 days)
 * @returns {string} JWT Refresh Token
 */
export const generateRefreshToken = (payload, expiresIn = "7d") => {
    try {
        return jwt.sign(payload, JWT_REFRESH_SECRET_KEY, { expiresIn });
    } catch (err) {
        console.error("❌ Error generating refresh token:", err.message);
        return null;
    }
};

/**
 * ✅ Verify Access Token
 * @param {string} token - JWT access token from client
 * @returns {object|null} Decoded payload or null if invalid/expired
 */
export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, JWT_ACCESS_SECRET_KEY);
    } catch (err) {
        console.warn("⚠️ Invalid or expired access token:", err.message);
        return null;
    }
};

/**
 * ✅ Verify Refresh Token
 * @param {string} token - JWT refresh token from cookie
 * @returns {object|null} Decoded payload or null if invalid/expired
 */
export const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET_KEY);
    } catch (err) {
        console.warn("⚠️ Invalid or expired refresh token:", err.message);
        return null;
    }
};

/**
 * ✅ Decode Token (does NOT verify signature)
 * @param {string} token
 * @returns {object|null} Decoded payload or null
 */
export const decodeToken = (token) => {
    try {
        return jwt.decode(token);
    } catch {
        return null;
    }
};
