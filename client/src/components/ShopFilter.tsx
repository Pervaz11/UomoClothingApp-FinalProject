import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiFilter } from "react-icons/ci";

type Product = {
    _id: string;
    name: string;
    price: number;
    brand?: string;
    images?: { url: string; alt?: string }[];
};

const FilterButton = () => {
    const [open, setOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([20, 5000]);

    const colors = ["Black", "White", "Gray", "Beige", "Brown", "Pink", "Blue"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const brands = ["Adidas", "Balmain", "Balenciaga", "Burberry", "Kenzo", "Givenchy", "Zara"];

    const toggleSelection = (value: string, arr: string[], setArr: any) => {
        if (arr.includes(value)) setArr(arr.filter((v) => v !== value));
        else setArr([...arr, value]);
    };

    const resetFilters = () => {
        setSelectedColors([]);
        setSelectedSizes([]);
        setSelectedBrands([]);
        setPriceRange([20, 5000]);
    };

    const applyFilters = async () => {
        const params = new URLSearchParams();

        if (selectedColors.length) params.append("colors", selectedColors.join(","));
        if (selectedSizes.length) params.append("sizes", selectedSizes.join(","));
        if (selectedBrands.length) params.append("brands", selectedBrands.join(","));
        if (priceRange[0] > 20) params.append("minPrice", priceRange[0].toString());
        if (priceRange[1] < 5000) params.append("maxPrice", priceRange[1].toString());

        const res = await fetch(`http://localhost:3000/products?${params.toString()}`);
        const data = await res.json();
        setProducts(data);

        setOpen(false);
    };

    return (
        <div className="relative flex items-center z-990">
            {/* Filter Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-5 py-2 border-b text-gray-700 hover:bg-gray-100 transition"
            >
                <CiFilter size={20} />
                Filter
            </button>

            {/* Side Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 250, damping: 30 }}
                        className="fixed w-100 z-999 top-0 right-0 h-full  bg-white shadow-2xl border-l border-gray-200 p-6 z-50 overflow-y-auto rounded-l-xl"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">FILTER BY</h2>
                            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-black">
                                ✕
                            </button>
                        </div>

                        {/* Colors */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">COLOR</h3>
                            <div className="flex flex-wrap gap-3">
                                {colors.map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => toggleSelection(c, selectedColors, setSelectedColors)}
                                        className={`px-3 py-1 border rounded-md text-sm transition ${selectedColors.includes(c)
                                            ? "bg-black text-white shadow"
                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                            }`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">SIZES</h3>
                            <div className="flex flex-wrap gap-3">
                                {sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => toggleSelection(s, selectedSizes, setSelectedSizes)}
                                        className={`px-3 py-1 border rounded-md text-sm transition ${selectedSizes.includes(s)
                                            ? "bg-black text-white shadow"
                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Brands */}
                        <div className="mb-6">
                            <h3 className="font-semibold mb-3">BRANDS</h3>
                            <div className="flex flex-col gap-2 text-sm">
                                {brands.map((b) => (
                                    <label key={b} className="flex items-center gap-2 cursor-pointer hover:text-black">
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(b)}
                                            onChange={() => toggleSelection(b, selectedBrands, setSelectedBrands)}
                                        />
                                        {b}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-8">
                            <h3 className="font-semibold mb-3">PRICE</h3>
                            <div className="flex justify-between text-sm mb-3">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                            <input
                                type="range"
                                min={20}
                                max={5000}
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                className="w-full accent-black"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={resetFilters}
                                className="flex-1 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
                            >
                                Reset
                            </button>
                            <button
                                onClick={applyFilters}
                                className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition shadow-md"
                            >
                                Apply
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay */}
            {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-40" />}

            {/* Products */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p) => (
                    <div
                        key={p._id}
                        className="border rounded-lg p-3 shadow-sm hover:shadow-md transition flex flex-col"
                    >
                        <img
                            src={p.images?.[0]?.url || "https://via.placeholder.com/150"}
                            alt={p.images?.[0]?.alt || p.name}
                            className="w-full h-40 object-cover rounded-md mb-3"
                        />
                        <h3 className="font-medium text-sm line-clamp-2">{p.name}</h3>
                        <p className="text-gray-600 text-xs">{p.brand}</p>
                        <p className="mt-auto font-semibold">${p.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterButton;
