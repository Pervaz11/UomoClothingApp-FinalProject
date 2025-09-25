import { motion } from "framer-motion";
import {
    SlidersHorizontal,
    Layers,
    Ruler,
    Palette,
    DollarSign,
    Star,
    RefreshCw,
} from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
    "Casual & Urban Wear",
    "Jackets",
    "Men",
    "Women",
    "Shoes",
    "Accessories",
];
const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = [
    { name: "Blue", hex: "#3B82F6" },
    { name: "Red", hex: "#EF4444" },
    { name: "Green", hex: "#22C55E" },
    { name: "Black", hex: "#111827" },
    { name: "Gray", hex: "#6B7280" },
];

export default function Filters() {
    const [price, setPrice] = useState(200);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

    const toggleCategory = (cat: string) =>
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );

    const toggleSize = (s: string) =>
        setSelectedSizes((prev) =>
            prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
        );

    const toggleColor = (c: string) =>
        setSelectedColors((prev) =>
            prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
        );

    const toggleRating = (r: number) =>
        setSelectedRatings((prev) =>
            prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
        );

    const resetFilters = () => {
        setPrice(200);
        setSelectedCategories([]);
        setSelectedSizes([]);
        setSelectedColors([]);
        setSelectedRatings([]);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 rounded-xl text-gray-100"
        >
            {/* Header */}
            <div className="flex justify-between items-center bg-gray-900 p-5 rounded-xl shadow-lg">
                <h2 className="font-bold text-xl flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5" /> Filters
                </h2>
                <button
                    onClick={resetFilters}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 hover:shadow-md active:scale-95 transition"
                >
                    <RefreshCw className="w-4 h-4" /> Reset
                </button>
            </div>

            {/* Categories */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-900 p-5 rounded-xl shadow-md"
            >
                <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" /> Categories
                </h3>
                <ul className="space-y-2">
                    {CATEGORIES.map((cat) => (
                        <li
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`cursor-pointer px-3 py-2 rounded-md transition ${selectedCategories.includes(cat)
                                    ? "bg-indigo-600 text-white shadow"
                                    : "hover:bg-indigo-600/70 hover:text-white"
                                }`}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Sizes */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900 p-5 rounded-xl shadow-md"
            >
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-indigo-400" /> Size
                </h3>
                <div className="flex gap-3 flex-wrap">
                    {SIZES.map((s) => (
                        <span
                            key={s}
                            onClick={() => toggleSize(s)}
                            className={`px-4 py-2 rounded-lg cursor-pointer border shadow-sm transition active:scale-95 ${selectedSizes.includes(s)
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-gray-800 border-gray-700 hover:bg-indigo-600 hover:text-white"
                                }`}
                        >
                            {s}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Colors */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-900 p-5 rounded-xl shadow-md"
            >
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide flex items-center gap-2">
                    <Palette className="w-4 h-4 text-indigo-400" /> Colors
                </h3>
                <div className="flex gap-4 flex-wrap">
                    {COLORS.map((c) => (
                        <div
                            key={c.name}
                            onClick={() => toggleColor(c.name)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition ${selectedColors.includes(c.name)
                                    ? "border-indigo-500 bg-indigo-600/20"
                                    : "border-gray-700 hover:border-indigo-400"
                                }`}
                        >
                            <span
                                className="w-5 h-5 rounded-full border border-gray-600"
                                style={{ backgroundColor: c.hex }}
                            />
                            <span className="text-sm">{c.name}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Price (single slider) */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900 p-5 rounded-xl shadow-lg"
            >
                <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide flex items-center gap-2 text-indigo-300">
                    <DollarSign className="w-4 h-4 text-indigo-400" /> Price Range
                </h3>
                <div className="mb-4">
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full rounded-lg bg-gray-800 text-gray-100 px-3 py-2 text-sm border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="relative">
                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                    />
                </div>
                <div className="flex justify-between text-xs text-indigo-300 mt-3">
                    <span>$0</span>
                    <span>${price}</span>
                    <span>$500</span>
                </div>
            </motion.div>

            {/* Rating */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-900 p-5 rounded-xl shadow-md"
            >
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide flex items-center gap-2">
                    <Star className="w-4 h-4 text-indigo-400" /> Rating
                </h3>
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((r) => (
                        <label
                            key={r}
                            onClick={() => toggleRating(r)}
                            className={`flex items-center gap-3 cursor-pointer transition ${selectedRatings.includes(r)
                                    ? "text-yellow-400"
                                    : "hover:text-yellow-400"
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={selectedRatings.includes(r)}
                                readOnly
                                className="accent-yellow-400 scale-110"
                            />
                            <span className="flex text-yellow-400 text-lg">
                                {"★".repeat(r)}
                                <span className="text-gray-600">{"★".repeat(5 - r)}</span>
                            </span>
                        </label>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}
