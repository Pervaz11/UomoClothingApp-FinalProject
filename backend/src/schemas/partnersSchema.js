import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        image: { type: String, required: true, trim: true },
    },
    { timestamps: true }
);

export default partnerSchema;
