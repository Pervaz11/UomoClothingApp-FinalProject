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
} from "../controller/userController.js";

const router = express.Router();

// ✅ Register user
router.post("/register", uploadMiddleware("users").single("profileImage"), registerUser);

// ✅ Login user
router.post("/login", login);

// ✅ Get all users (admin only perhaps)
router.get("/users", getAllUsers);


// ✅ Verify email
router.get("/verify-email", verifyEmail);

// ✅ Forgot/reset password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// ✅ Token refresh & logout
router.get("/refresh", refresh);
router.post("/logout", logout);

export default router;
