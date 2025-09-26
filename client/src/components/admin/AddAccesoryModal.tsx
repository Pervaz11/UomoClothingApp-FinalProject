import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiBox, FiTag, FiCheck, FiImage, FiLayers } from "react-icons/fi";

type Props = {
    onClose: () => void;
    onSuccess: () => void;
};

export default function AddAccessoryModal({ onClose, onSuccess }: Props) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        sku: "",
        brand: "",
        isFeatured: false,
        size: "One Size",
        material: "Mixed",
        category: "",
        colorName: "",
        colorHex: "#000000",
        length: "",
        width: "",
        height: "",
        tags: "",
        imageUrl: "",
        imageAlt: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (  
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, type, value, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name.trim()) return alert("Accessory name is required");
        if (!form.price || isNaN(Number(form.price))) return alert("Price must be a number");
        if (!form.category) return alert("Category is required");

        setLoading(true);

        try {
            const payload: any = {
                name: form.name.trim(),
                description: form.description.trim() || undefined,
                price: Number(form.price),
                stock: form.stock ? Number(form.stock) : 0,
                brand: form.brand.trim() || undefined,
                sku: form.sku.trim() || undefined,
                isFeatured: form.isFeatured,
                size: form.size,
                material: form.material,
                categories: [form.category],
                tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
                measurements: {
                    length: form.length ? Number(form.length) : undefined,
                    width: form.width ? Number(form.width) : undefined,
                    height: form.height ? Number(form.height) : undefined,
                    raw:
                        form.length && form.width && form.height
                            ? `${form.length}x${form.width}x${form.height}`
                            : undefined,
                },
                colors:
                    form.colorName.trim() !== ""
                        ? [{ name: form.colorName.trim(), hex: form.colorHex }]
                        : [],
                images:
                    form.imageUrl.trim() !== ""
                        ? [{ url: form.imageUrl.trim(), alt: form.imageAlt.trim() }]
                        : [],
            };

            await axios.post("http://localhost:3000/accessories", payload);

            onSuccess();
            onClose();
        } catch (error: any) {
            console.error("❌ Failed to add accessory:", error.response?.data || error.message);
            alert("Failed to add accessory: " + (error.response?.data?.message || error.message));
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
                        <FiPlus /> Add New Accessory
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="relative group">
                        <FiBox className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Accessory Name"
                            required
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-10 py-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Description */}
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:ring-indigo-500"
                    />

                    {/* Price & Stock */}
                    <div className="flex gap-2">
                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Price"
                            required
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                        <input
                            name="stock"
                            type="number"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="Stock"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                    </div>

                    {/* SKU & Brand */}
                    <div className="flex gap-2">
                        <input
                            name="sku"
                            value={form.sku}
                            onChange={handleChange}
                            placeholder="SKU (optional)"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                        <input
                            name="brand"
                            value={form.brand}
                            onChange={handleChange}
                            placeholder="Brand (optional)"
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
                        <option value="Bags">Bags</option>
                        <option value="Bracelets">Bracelets</option>
                        <option value="Hats">Hats</option>
                        <option value="Belts">Belts</option>
                    </select>

                    {/* Size & Material */}
                    <div className="flex gap-2">
                        <input
                            name="size"
                            value={form.size}
                            onChange={handleChange}
                            placeholder="Size (default: One Size)"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                        <input
                            name="material"
                            value={form.material}
                            onChange={handleChange}
                            placeholder="Material"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                    </div>

                    {/* Measurements */}
                    <div className="grid grid-cols-3 gap-2">
                        <input
                            name="length"
                            type="number"
                            value={form.length}
                            onChange={handleChange}
                            placeholder="Length"
                            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                        <input
                            name="width"
                            type="number"
                            value={form.width}
                            onChange={handleChange}
                            placeholder="Width"
                            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                        <input
                            name="height"
                            type="number"
                            value={form.height}
                            onChange={handleChange}
                            placeholder="Height"
                            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                    </div>

                    {/* Tags */}
                    <input
                        name="tags"
                        value={form.tags}
                        onChange={handleChange}
                        placeholder="Tags (comma separated)"
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                    />

                    {/* Colors */}
                    <div className="flex gap-2">
                        <input
                            name="colorName"
                            value={form.colorName}
                            onChange={handleChange}
                            placeholder="Color Name"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                        <input
                            name="colorHex"
                            type="color"
                            value={form.colorHex}
                            onChange={handleChange}
                            className="w-16 h-10 rounded"
                        />
                    </div>

                    {/* Image */}
                    <div className="flex gap-2">
                        <input
                            name="imageUrl"
                            value={form.imageUrl}
                            onChange={handleChange}
                            placeholder="Image URL"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                        <input
                            name="imageAlt"
                            value={form.imageAlt}
                            onChange={handleChange}
                            placeholder="Alt text"
                            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
                        />
                    </div>

                    {/* Featured */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={form.isFeatured}
                            onChange={handleChange}
                            className="accent-indigo-500"
                        />
                        <FiTag /> Featured Accessory
                    </label>

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
