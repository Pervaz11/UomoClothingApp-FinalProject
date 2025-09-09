import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        gallery: [String],
        price: {
            type: Number,
            required: true,
        },
        shortDescription: String,
        description: String,
        sizes: [
            {
                type: String,
                enum: ['XS', 'S', 'M', 'L', 'XL'],
            },
        ],
        colorOptions: [String],
        sku: {
            type: String,
            default: 'N/A',
        },
        categories: [String],
        tags: [String],
        labels: [String],
        additionalInformation: {
            weight: String,
            dimensions: String,
            storage: String,
        },
        reviewsCount: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                user: String,
                comment: String,
                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
            },
        ],
        wishlisted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Product', productSchema);
