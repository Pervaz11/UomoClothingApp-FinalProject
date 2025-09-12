import mongoose from "mongoose";

const accessorySchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Accessory name is required"], trim: true },
        description: { type: String, trim: true },
        price: { type: Number, required: [true, "Accessory price is required"], min: 0 },

        measurements: {
            length: { type: Number },
            width: { type: Number },
            height: { type: Number },
            raw: { type: String },
        },

        size: { type: String, default: "One Size" },

        colors: [{ name: { type: String, required: true }, hex: { type: String } }],
        material: { type: String, default: "Mixed" },

        categories: [
            {
                type: String,
                enum: ["Bags", "Bracelets", "Hats", "Belts"],
            },
        ],

        tags: [{ type: String }],
        images: [{ url: { type: String }, alt: { type: String } }],

        stock: { type: Number, default: 0 },
        brand: { type: String, trim: true },
        sku: { type: String, unique: true, sparse: true },
        isFeatured: { type: Boolean, default: false },

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

export default accessorySchema;
