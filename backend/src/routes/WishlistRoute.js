import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
} from "../controller/wishlistController.js";

const router = express.Router();

router.get("/", authMiddleware, getWishlist);
router.post("/", authMiddleware, addToWishlist);
router.delete("/:productId", authMiddleware, removeFromWishlist);
router.delete("/", authMiddleware, clearWishlist);

export default router;
