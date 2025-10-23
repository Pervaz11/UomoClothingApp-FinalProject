import { useState } from "react";
import axios from "axios";
import {
    FiX,
    FiPlus,
    FiTag,
    FiDollarSign,
    FiCheck,
    FiBox,
    FiImage,
    FiHash,
} from "react-icons/fi";
import { motion } from "framer-motion";

type Props = {
    onClose: () => void;
    onSuccess: () => void;
};

export default function AddProductModal({ onClose, onSuccess }: Props) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        costPrice: "",
        category: "",
        stock: "",
        sku: "",
        brand: "",
        status: "",
        isFeatured: false,
        colorName: "",
        colorHex: "#000000",
        imageUrls: [""],
        hasDiscount: false,
        discountType: "percentage",
        discountValue: "",
        discountExpiresAt: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, type, value, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleImageChange = (index: number, value: string) => {
        const newImages = [...form.imageUrls];
        newImages[index] = value;
        setForm({ ...form, imageUrls: newImages });
    };

    const addImageField = () => {
        setForm({ ...form, imageUrls: [...form.imageUrls, ""] });
    };

    const removeImageField = (index: number) => {
        const newImages = form.imageUrls.filter((_, i) => i !== index);
        setForm({ ...form, imageUrls: newImages });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name.trim()) return alert("Product name is required");
        if (!form.price || isNaN(Number(form.price))) return alert("Price must be a number");
        if (!form.category) return alert("Category is required");
        if (form.stock === "" || isNaN(Number(form.stock))) return alert("Stock must be a number");

        if (form.hasDiscount && (!form.discountValue || isNaN(Number(form.discountValue)))) {
            return alert("Discount value must be a number");
        }

        setLoading(true);

        try {
            const price = Number(form.price);
            const costPrice = form.costPrice ? Number(form.costPrice) : 0;
            let finalPrice = price;

            const payload: any = {
                name: form.name.trim(),
                description: form.description.trim() || undefined,
                price,
                costPrice,
                categories: [form.category],
                stock: Number(form.stock),
                brand: form.brand.trim() || undefined,
                sku: form.sku.trim() || undefined,
                isFeatured: form.isFeatured,
                status: form.status || null,
                colors:
                    form.colorName.trim() !== ""
                        ? [{ name: form.colorName.trim(), hex: form.colorHex }]
                        : [],
                images: form.imageUrls
                    .filter((url) => url.trim() !== "")
                    .map((url) => ({ url, alt: form.name })),
            };

            // Handle discount
            if (form.hasDiscount) {
                const discountValue = Number(form.discountValue);
                payload.discount = {
                    type: form.discountType,
                    value: discountValue,
                    expiresAt: form.discountExpiresAt || null,
                };

                if (form.discountType === "percentage") {
                    finalPrice = price - (price * discountValue) / 100;
                } else if (form.discountType === "fixed") {
                    finalPrice = price - discountValue;
                }

                finalPrice = Math.max(0, finalPrice);
            }

            payload.finalPrice = finalPrice;

            await axios.post("http://localhost:3000/products", payload);

            onSuccess();
            onClose();
        } catch (error: any) {
            console.error("❌ Failed to add product:", error.response?.data || error.message);
            alert("Failed to add product: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto text-white"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <FiPlus /> Add New Product
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Product Name */}
                    <div className="relative group">
                        <FiBox className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500" />
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Product Name"
                            required
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-10 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Description */}
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description (optional)"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />

                    {/* Price & Cost */}
                    <div className="flex gap-2">
                        <div className="relative flex-1 group">
                            <FiDollarSign className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                            <input
                                name="price"
                                type="number"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="Price"
                                required
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-10 py-2"
                            />
                        </div>
                        <div className="relative flex-1 group">
                            <FiHash className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                            <input
                                name="costPrice"
                                type="number"
                                value={form.costPrice}
                                onChange={handleChange}
                                placeholder="Cost Price"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-10 py-2"
                            />
                        </div>
                    </div>

                    {/* SKU & Brand */}
                    <div className="flex gap-2">
                        <input
                            name="sku"
                            value={form.sku}
                            onChange={handleChange}
                            placeholder="SKU"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                        <input
                            name="brand"
                            value={form.brand}
                            onChange={handleChange}
                            placeholder="Brand"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                    </div>

                    {/* Category */}
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                    >
                        <option value="">Select Category</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Jackets">Jackets</option>
                        <option value="Casual & Urban Wear">Casual & Urban Wear</option>
                    </select>

                    {/* Stock & Status */}
                    <div className="flex gap-2">
                        <input
                            name="stock"
                            type="number"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="Stock"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        >
                            <option value="">No Status</option>
                            <option value="New Arrival">New Arrival</option>
                            <option value="Best Seller">Best Seller</option>
                            <option value="Top Rated">Top Rated</option>
                        </select>
                    </div>

                    {/* Color */}
                    <div className="flex gap-2">
                        <input
                            name="colorName"
                            value={form.colorName}
                            onChange={handleChange}
                            placeholder="Color Name (optional)"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                        <input
                            name="colorHex"
                            type="color"
                            value={form.colorHex}
                            onChange={handleChange}
                            className="w-16 h-10 rounded-lg border border-gray-600"
                        />
                    </div>

                    {/* Image URLs */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-300">
                            <FiImage /> Image URLs
                        </label>
                        {form.imageUrls.map((url, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                                />
                                {form.imageUrls.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeImageField(index)}
                                        className="text-red-400 hover:text-red-500"
                                    >
                                        <FiX />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addImageField}
                            className="flex items-center gap-1 text-indigo-400 hover:text-indigo-500 text-sm"
                        >
                            <FiPlus /> Add Image
                        </button>
                    </div>

                    {/* Discount */}
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
                        <input
                            type="checkbox"
                            name="hasDiscount"
                            checked={form.hasDiscount}
                            onChange={handleChange}
                            className="accent-indigo-500"
                        />
                        <FiTag /> Apply Discount
                    </label>

                    {form.hasDiscount && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3 border border-gray-600 p-3 rounded-lg bg-gray-700"
                        >
                            <select
                                name="discountType"
                                value={form.discountType}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                            >
                                <option value="percentage">Percentage</option>
                                <option value="fixed">Fixed</option>
                            </select>

                            <input
                                name="discountValue"
                                type="number"
                                value={form.discountValue}
                                onChange={handleChange}
                                placeholder="Discount Value"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                            />

                            <input
                                name="discountExpiresAt"
                                type="date"
                                value={form.discountExpiresAt}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                            />
                        </motion.div>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2"
                        >
                            {loading ? "Saving..." : <><FiCheck /> Save</>}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
