import express from "express";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import Accessory from "../models/accessoryModel.js";

const router = express.Router();

// GET /orders/:userId => user-in bütün paid orders
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId, status: "paid" });
        if (!orders.length) return res.json([]); // boş array qaytar

        const ordersWithDetails = await Promise.all(
            orders.map(async (order) => {
                const detailedItems = await Promise.all(
                    order.items.map(async (item) => {
                        let productData;
                        if (item.type === "product") productData = await Product.findById(item.id);
                        else if (item.type === "accessory") productData = await Accessory.findById(item.id);

                        return {
                            ...item.toObject ? item.toObject() : item,
                            name: productData?.name,
                            image: productData?.images?.[0]?.url || "",
                            price: productData?.price || 0,
                        };
                    })
                );

                return {
                    _id: order._id,
                    items: detailedItems,
                    total: order.total,
                    createdAt: order.createdAt,
                };
            })
        );

        res.json(ordersWithDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
});

export default router;
