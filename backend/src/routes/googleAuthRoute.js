const router = require("express").Router();
import { authenticate } from "passport";
import { CLIENT_URL } from "../config/config.js";

// Step 1: Redirect to Google
router.get(
    "/google",
    authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account",
    })
);

// Step 2: Google callback URL
router.get(
    "/google/callback",
    authenticate("google", {
        failureRedirect: `${CLIENT_URL}/auth/login?error=google_failed`,
        session: false,
    }),
    (req, res) => {
        const jwt = require("../utils/jwt");
        const accessToken = jwt.generateAccessToken({
            id: req.user._id,
            role: req.user.role,
            email: req.user.email,
            profileImage: req.user.profileImage,
            fullName: req.user.fullName,
        });
        const refreshToken = jwt.generateRefreshToken({
            email: req.user.email,
            id: req.user._id,
            role: req.user.role,
            fullName: req.user.fullName,
        });

        //set refresh token to cookie

        res.redirect(`${CLIENT_URL}/auth/success/${accessToken}`);
    }
);

export default router;
