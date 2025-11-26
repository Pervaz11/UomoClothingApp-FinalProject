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
    unbanUser,
    changePassword
} from "../controller/userController.js";

import UserModel from "../models/userModel.js";

const router = express.Router();

/* AUTH & LOGIN */
router.post("/register", uploadMiddleware("users").single("profileImage"), registerUser);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

/* EMAIL VERIFY & PASSWORD */
router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

/*  CURRENT USER (PROFILE PAGE)*/
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "Current user retrieved successfully",
            data: user,
        });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving profile" });
    }
});

/*  UPDATE PROFILE */
router.put(
    "/update-profile",
    authMiddleware,
    uploadMiddleware("users").single("profileImage"),
    updateProfile
);

router.put("/change-password", authMiddleware, changePassword);

/*  ADMIN OPERATIONS */

router.get("/users", getAllUsers);
router.put("/users/:id", updateUserRole);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/ban", banUser);
router.put("/users/:id/unban", unbanUser);

export default router;
