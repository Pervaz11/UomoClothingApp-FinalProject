import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
        color: { type: String, default: "#3b82f6" },
    },
    { timestamps: true }
);

export default eventSchema;
