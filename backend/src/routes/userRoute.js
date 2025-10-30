import express from "express";
import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

import {
    registerUser,
    login,
    getAllUsers,
    verifyEmail,
    forgotPassword,
    resetPassword,
    refresh,
    logout,
    updateProfile,
    updateUserRole,
    deleteUser,
    banUser,
    unbanUser
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", uploadMiddleware("users").single("profileImage"), registerUser);
router.post("/login", login);
router.get("/users", getAllUsers);
router.put("/users/:id", updateUserRole);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/ban", banUser);
router.put("/users/:id/unban", unbanUser);

router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/refresh", refresh);

router.put(
    "/update-profile",
    authMiddleware, // ✅ burda artıq var
    uploadMiddleware("users").single("profileImage"),
    updateProfile
);

router.post("/logout", logout);

export default router;
