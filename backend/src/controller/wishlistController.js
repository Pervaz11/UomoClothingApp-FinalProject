import Wishlist from "../models/wishlistModel.js";
import Product from "../models/productModel.js";

// ✅ Get Wishlist
export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.id }).populate("items.product");
        if (!wishlist) return res.json({ items: [] });
        res.json(wishlist);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Add to Wishlist
export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) return res.status(400).json({ message: "Product ID required" });

        let wishlist = await Wishlist.findOne({ user: req.user.id });
        if (!wishlist) wishlist = new Wishlist({ user: req.user.id, items: [] });

        const exists = wishlist.items.find((i) => i.product.toString() === productId);
        if (exists) return res.status(400).json({ message: "Already in wishlist" });

        wishlist.items.push({ product: productId });
        await wishlist.save();

        res.json({ message: "Added to wishlist", wishlist });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Remove from Wishlist
export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const wishlist = await Wishlist.findOne({ user: req.user.id });
        if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

        wishlist.items = wishlist.items.filter((i) => i.product.toString() !== productId);
        await wishlist.save();

        res.json({ message: "Removed from wishlist", wishlist });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Clear Wishlist
export const clearWishlist = async (req, res) => {
    try {
        await Wishlist.findOneAndUpdate({ user: req.user.id }, { items: [] });
        res.json({ message: "Wishlist cleared" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
