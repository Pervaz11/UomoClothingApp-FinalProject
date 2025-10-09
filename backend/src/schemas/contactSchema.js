import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        message: { type: String, required: true },
        status: { type: String, enum: ["unread", "read"], default: "unread" },
    },
    { timestamps: true }
);

export default contactSchema;
