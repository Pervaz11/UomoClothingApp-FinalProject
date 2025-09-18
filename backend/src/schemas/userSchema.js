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
        password: { type: String, required: function () { return this.provider === 'local'; } },
        fullName: { type: String, required: true },
        phoneNumber: { type: String, trim: true, default: "" },
        profileImage: {
            type: String,
            default:
                "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg",
        },
        public_id: {
            type: String,
            default: "",
        },
        role: {
            type: String,
            enum: ["client", "admin", "courier", "superAdmin"],
            default: "client",
        },
        isBanned: { type: Boolean, default: false },
        banUntil: { type: Date, default: null },
        lastLogin: { type: Date, default: null },
        loginAttempts: { type: Number, default: 0 },
        lockUntil: { type: Date, default: null },


        provider: {
            type: String,
            enum: ["local", "google", "github"],
            default: "local",
        },
        googleId: { type: String, default: null },
        hasVendorRequest: { type: Boolean, default: false },
        emailVerified: { type: Boolean, default: false },
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
