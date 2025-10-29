import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();

// ✅ User sifarişləri
router.get("/user/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch user orders" });
    }
});

// ✅ Courier sifarişləri (paid və inTransit və delivered)
router.get("/courier/all", async (req, res) => {
    try {
        const orders = await Order.find({
            status: { $in: ["paid", "inTransit", "delivered"] },
        }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch courier orders" });
    }
});

// ✅ Order-u inTransit etmək
router.put("/:id/in-transit", async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: "inTransit" },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to mark as in transit" });
    }
});

// ✅ Order-u delivered etmək
router.put("/:id/delivered", async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: "delivered" },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to mark as delivered" });
    }
});

// ✅ Məhsulu silmək (boşdursa order də silinir)
router.delete("/:orderId/item/:itemId", async (req, res) => {
    try {
        const { orderId, itemId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.items = order.items.filter((item) => item._id.toString() !== itemId);

        if (order.items.length === 0) {
            await Order.findByIdAndDelete(orderId);
            return res.json({ deleted: true, orderId });
        }

        await order.save();
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete order item" });
    }
});

// ✅ Cancel order item (yalnız pending və paid statuslarda)
router.delete("/:orderId/cancel", async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        // Əgər order inTransit və ya delivered-dirsə cancel mümkün deyil
        if (["inTransit", "delivered"].includes(order.status)) {
            return res.status(400).json({ message: "Cannot cancel order that is in transit or delivered" });
        }

        await Order.findByIdAndDelete(orderId);
        res.json({ success: true, message: "Order cancelled successfully", orderId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to cancel order" });
    }
});


// ✅ Boş orderləri silmək
router.delete("/clean-empty", async (req, res) => {
    try {
        const result = await Order.deleteMany({ items: { $size: 0 } });
        res.json({ success: true, deletedCount: result.deletedCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to clean empty orders" });
    }
});

export default router;
