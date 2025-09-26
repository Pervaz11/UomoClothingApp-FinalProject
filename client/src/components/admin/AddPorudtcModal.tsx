import { useState } from "react";
import axios from "axios";
import { FiX, FiPlus, FiTag, FiDollarSign, FiCheck, FiBox } from "react-icons/fi";
import { motion } from "framer-motion";

type Props = {
    onClose: () => void;
    onSuccess: () => void;
};

export default function AddProductModal({ onClose, onSuccess }: Props) {
    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        stock: "",
        sku: "",
        brand: "",
        status: "",
        isFeatured: false,
        colorName: "",
        colorHex: "#000000",
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
            let finalPrice = price;

            const payload: any = {
                name: form.name.trim(),
                price,
                categories: [form.category],
                stock: Number(form.stock),
                brand: form.brand.trim() || undefined,
                status: form.status || null,
                isFeatured: form.isFeatured,
                colors:
                    form.colorName.trim() !== ""
                        ? [{ name: form.colorName.trim(), hex: form.colorHex }]
                        : [],
            };

            if (form.sku.trim() !== "") {
                payload.sku = form.sku.trim();
            }

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
                        <FiBox className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition" />
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Product Name"
                            required
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-10 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                        />
                    </div>

                    {/* Price */}
                    <div className="relative group">
                        <FiDollarSign className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition" />
                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Price"
                            required
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-10 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                        />
                    </div>

                    {/* SKU & Brand */}
                    <div className="flex gap-2">
                        <input
                            name="sku"
                            value={form.sku}
                            onChange={handleChange}
                            placeholder="SKU (optional)"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                        />
                        <input
                            name="brand"
                            value={form.brand}
                            onChange={handleChange}
                            placeholder="Brand (optional)"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                        />
                    </div>

                    {/* Category */}
                    <motion.select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        whileHover={{ scale: 1.02 }}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                    >
                        <option value="">Select Category</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Jackets">Jackets</option>
                        <option value="Casual & Urban Wear">Casual & Urban Wear</option>
                    </motion.select>

                    {/* Stock & Status */}
                    <div className="flex gap-2">
                        <motion.input
                            name="stock"
                            type="number"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="Stock"
                            whileHover={{ scale: 1.02 }}
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                        />
                        <motion.select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            whileHover={{ scale: 1.02 }}
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                        >
                            <option value="">No Status</option>
                            <option value="New Arrival">New Arrival</option>
                            <option value="Best Seller">Best Seller</option>
                            <option value="Top Rated">Top Rated</option>
                        </motion.select>
                    </div>

                    {/* Featured */}
                    <label className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:text-indigo-400">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={form.isFeatured}
                            onChange={handleChange}
                            className="accent-indigo-500"
                        />
                        <FiTag /> Featured Product
                    </label>

                    {/* Color */}
                    <div className="flex gap-2">
                        <input
                            name="colorName"
                            value={form.colorName}
                            onChange={handleChange}
                            placeholder="Color Name (optional)"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                        />
                       
                    </div>

                    {/* Discount */}
                    <label className="flex items-center gap-2 cursor-pointer transition-all duration-200 hover:text-indigo-400">
                        <input
                            type="checkbox"
                            name="hasDiscount"
                            checked={form.hasDiscount}
                            onChange={handleChange}
                            className="accent-indigo-500"
                        />
                        Apply Discount
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
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
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
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                            />

                            <input
                                name="discountExpiresAt"
                                type="date"
                                value={form.discountExpiresAt}
                                onChange={handleChange}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                            />
                        </motion.div>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition flex items-center gap-2"
                        >
                            {loading ? "Saving..." : <><FiCheck /> Save</>}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}
