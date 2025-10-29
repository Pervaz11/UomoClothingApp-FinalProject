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
    updateProfile,
    updateUserRole,
    deleteUser,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", uploadMiddleware("users").single("profileImage"), registerUser);
router.post("/login", login);
router.get("/users", getAllUsers);
router.put("/users/:id", updateUserRole);
router.delete("/users/:id", deleteUser);

router.get("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/refresh", refresh);
router.get("/update-profile", updateProfile);
router.post("/logout", logout);

export default router;
