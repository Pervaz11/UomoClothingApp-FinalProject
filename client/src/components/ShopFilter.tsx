import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiFilter } from "react-icons/ci";

const FilterSidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="z-99">
            {/* Filter Button */}
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-5 py-1.5 border-b text-gray-700 hover:bg-gray-100 transition"
            >
                <CiFilter size={20} />
                Filter
            </button>

            {/* Sidebar + Overlay */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 250, damping: 30 }}
                            className="fixed w-80 top-0 right-0 h-full bg-white shadow-2xl border-l border-gray-200 p-6 z-50 overflow-y-auto rounded-l-xl"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">FILTER BY</h2>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="text-gray-500 hover:text-black"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Colors */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">COLOR</h3>
                                <div className="flex flex-wrap gap-3">
                                    <button className="px-3 py-1 border rounded-md text-sm transition bg-white text-gray-700 border-gray-300 hover:bg-gray-100">
                                        Red
                                    </button>
                                    <button className="px-3 py-1 border rounded-md text-sm transition bg-white text-gray-700 border-gray-300 hover:bg-gray-100">
                                        Blue
                                    </button>
                                </div>
                            </div>

                            {/* Sizes */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">SIZES</h3>
                                <div className="flex flex-wrap gap-3">
                                    <button className="px-3 py-1 border rounded-md text-sm transition bg-white text-gray-700 border-gray-300 hover:bg-gray-100">
                                        S
                                    </button>
                                    <button className="px-3 py-1 border rounded-md text-sm transition bg-white text-gray-700 border-gray-300 hover:bg-gray-100">
                                        M
                                    </button>
                                </div>
                            </div>

                            {/* Brands */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3">BRANDS</h3>
                                <div className="flex flex-col gap-2 text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer hover:text-black">
                                        <input type="checkbox" /> Nike
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer hover:text-black">
                                        <input type="checkbox" /> Adidas
                                    </label>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mb-8">
                                <h3 className="font-semibold mb-3">PRICE</h3>
                                <div className="flex justify-between text-sm mb-3">
                                    <span>$20</span>
                                    <span>$5000</span>
                                </div>
                                <input
                                    type="range"
                                    min={20}
                                    max={5000}
                                    className="w-full accent-black"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button className="flex-1 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition">
                                    Reset
                                </button>
                                <button className="flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition shadow-md">
                                    Apply
                                </button>
                            </div>
                        </motion.div>

                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 z-40"
                            onClick={() => setOpen(false)}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FilterSidebar;
