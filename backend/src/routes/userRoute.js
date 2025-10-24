import express from "express";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import {
    registerUser,
    login,
    getAllUsers,
    verifyEmail,
    forgotPassword,
    resetPassword,
    refresh,
    logout,
    updateProfile
} from "../controller/userController.js";

const router = express.Router();

// ✅ Register user
router.post("/register", uploadMiddleware("users").single("profileImage"), registerUser);

// ✅ Login user
router.post("/login", login);

// ✅ Get all users (optional: admin only)
router.get("/users", getAllUsers);

// ✅ Verify email
router.get("/verify-email", verifyEmail);

// ✅ Forgot password
router.post("/forgot-password", forgotPassword);

// ✅ Reset password
router.post("/reset-password", resetPassword);

// ✅ Token refresh
router.get("/refresh", refresh);

router.get("/update-profile", updateProfile);

// ✅ Logout
router.post("/logout", logout);

export default router;
