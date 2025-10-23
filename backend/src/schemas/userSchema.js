import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: { type: String, required: true },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        fullName: { type: String, trim: true, default: "" },
        phoneNumber: { type: String, trim: true, default: "" },
        profileImage: {
            type: String,
            default:
                "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg",
        },
        role: {
            type: String,
            enum: ["customer", "admin", "superadmin", "curier"],
            default: "customer",
        },
        isBanned: { type: Boolean, default: false },
        banUntil: { type: Date, default: null },
        lastLogin: { type: Date, default: null },
    },
    { timestamps: true, versionKey: false }
);

userSchema.virtual("orders", {
    ref: "Order",
    localField: "_id",
    foreignField: "user",
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export default userSchema;
