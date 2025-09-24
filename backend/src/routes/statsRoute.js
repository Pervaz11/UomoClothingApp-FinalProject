import express from "express";
import Product from "../models/productModel.js";
import Accessory from "../models/accessoryModel.js";
import Partner from "../models/partnersModel.js";
import Location from "../models/LocationModel.js";

const router = express.Router();

router.get("/", async (_req, res) => {
    try {
        const [locationCount, partnerCount, productStock, accessoryStock] =
            await Promise.all([
                Location.countDocuments(),
                Partner.countDocuments(),
                Product.aggregate([{ $group: { _id: null, total: { $sum: "$stock" } } }]),
                Accessory.aggregate([{ $group: { _id: null, total: { $sum: "$stock" } } }]),
            ]);

        res.json({
            locations: locationCount,
            partners: partnerCount,
            productsStock: productStock[0]?.total || 0,
            accessoriesStock: accessoryStock[0]?.total || 0,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
