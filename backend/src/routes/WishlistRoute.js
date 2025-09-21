// routes/wishlist.js
import express from "express";
import User from "../models/userModel";

const router = express.Router();

// Wishlist-ə məhsul əlavə et və ya sil
router.post("/toggle/:productId", async (req, res) => {
    const userId = req.user._id; // auth middleware-dən gəlir
    const { productId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.wishlist.includes(productId)) {
            // Əgər artıq varsa → sil
            user.wishlist.pull(productId);
        } else {
            // Əgər yoxdursa → əlavə et
            user.wishlist.push(productId);
        }

        await user.save();
        await user.populate("wishlist"); // product detallarını da gətirmək üçün

        res.json(user.wishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// User-in wishlist-ini gətir
router.get("/", async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).populate("wishlist");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.wishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
