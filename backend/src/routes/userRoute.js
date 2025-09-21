import { Router } from "express";
const router = Router();

import {
    registerUser,
    getAllUsers,
    verifyEmail,
    unlockAccount,
    login,
    refresh,
    logout,
    forgotPassword,
    resetPassword,
    getMe,
    updateMe
} from "../controller/userController.js";

import uploadMiddleware from "../middlewares/uploadMiddleware.js";
import authToken from "../middlewares/authToken.js";
const upload = uploadMiddleware("userImages");

import passport from "passport";

// Google OAuth routes
router.get("/auth/google/", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "http://localhost:5173/login", session: true }),
    (_req, res) => {
        res.redirect("http://localhost:5173");
    }
);

// User routes
router.get("/me", authToken, getMe);
router.put("/me", authToken, upload.single("profileImage"), updateMe);

router.post("/register", upload.single("profileImage"), registerUser);
router.get("/verify-email", verifyEmail);
router.get("/unlock-account", unlockAccount);
router.get("/users", getAllUsers);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
