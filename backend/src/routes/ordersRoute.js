import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();

// ✅ Courier üçün həm paid, həm delivered gətir
router.get("/courier/all", async (req, res) => {
    try {
        const orders = await Order.find({
            status: { $in: ["paid", "delivered"] },
        }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching courier orders:", error);
        res.status(500).json({ message: "Failed to fetch courier orders" });
    }
});

// ✅ Order-u delivered eləmək
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
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Failed to mark as delivered" });
    }
});

// ✅ Məhsulu sifarişdən silmək (və əgər boşdursa, bütün order-i sil)
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
        console.error("Error deleting order item:", error);
        res.status(500).json({ message: "Failed to delete order item" });
    }
});

// ✅ Boş orderləri silmək
router.delete("/clean-empty", async (req, res) => {
    try {
        const result = await Order.deleteMany({ items: { $size: 0 } });
        res.json({ success: true, deletedCount: result.deletedCount });
    } catch (error) {
        console.error("Error cleaning empty orders:", error);
        res.status(500).json({ message: "Failed to clean empty orders" });
    }
});


export default router;
