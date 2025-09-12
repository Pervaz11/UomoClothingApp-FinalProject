import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["percentage", "fixed"],
        default: "percentage",
    },
    value: {
        type: Number,
        default: 0,
        min: 0,
    },
    expiresAt: {
        type: Date,
    },
});

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Product name is required"], trim: true },
        description: { type: String, trim: true },
        price: { type: Number, required: [true, "Product price is required"], min: 0 },
        costPrice: { type: Number, default: 0 },
        weight: { type: String },
        dimensions: {
            height: { type: Number },
            width: { type: Number },
            length: { type: Number },
            raw: { type: String },
        },
        sizes: [{ type: String, enum: ["XS", "S", "M", "L", "XL"] }],
        colors: [{ name: { type: String, required: true }, hex: { type: String } }],
        material: { type: String, default: "Polyester" },
        storage: { type: String },
        categories: [
            {
                type: String,
                enum: ["Casual & Urban Wear", "Jackets", "Men", "Women", "Shoes", "Accessories"],
            },
        ],
        tags: [{ type: String }],
        images: [{ url: { type: String }, alt: { type: String } }],
        stock: { type: Number, default: 0 },
        brand: { type: String, trim: true },
        sku: { type: String, unique: true, sparse: true },
        isFeatured: { type: Boolean, default: false },
        status: {
            type: String,
            enum: ["New Arrival", "Best Seller", "Top Rated", null],
            default: null,
        },
        discount: { type: discountSchema, default: () => ({}) },
        reviews: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                rating: { type: Number, min: 1, max: 5 },
                comment: { type: String },
                createdAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

export default productSchema;
