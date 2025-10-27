// src/routes/orderRoute.js
import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();

// ✅ Bütün ödənişi tamamlanmış sifarişləri çəkir
router.get("/paid/all", async (req, res) => {
    try {
        const orders = await Order.find({ status: "paid" }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching paid orders:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
});

export default router;
