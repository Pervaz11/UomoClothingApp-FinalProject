import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        image: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true },
        country: { type: String, required: true, trim: true },
        status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    },
    { timestamps: true }
);

export default partnerSchema;
