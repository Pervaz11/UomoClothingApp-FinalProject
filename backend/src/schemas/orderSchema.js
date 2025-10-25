import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    type: { type: String, enum: ["product", "accessory"], required: true },
    quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [orderItemSchema],
        total: { type: Number, required: true, min: 0 },
        status: { type: String, enum: ["pending", "paid"], default: "pending" },
        stripeSessionId: { type: String },
    },
    { timestamps: true }
);

export default orderSchema;
