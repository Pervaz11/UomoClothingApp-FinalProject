import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AccessoryList from "../../components/AccesoryList";
import ShopList from "../../components/ShopList";
import Pagination from "../../components/Pagination";

const Shop: React.FC = () => {
    const [tab, setTab] = useState<"accessory" | "product">("accessory");
    const [sortOption, setSortOption] = useState<string>("default");

    const [page, setPage] = useState<number>(1);
    const totalPages = 5;

    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="relative bg-[url('https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fshop%2Fshop_banner_character1.png&w=3840&q=75')] bg-cover bg-center py-16">
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative max-w-7xl mx-auto px-6 text-center p-20 text-white">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Discover Our {tab === "accessory" ? "Accessories" : "Clothes"}
                    </h1>
                    <p className="text-lg text-gray-200">
                        Elevate your style with premium quality and modern design.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 my-10 flex flex-col sm:flex-row items-center justify-between gap-4">

                <div className="inline-flex rounded-full bg-gray-200 p-1">
                    <button
                        onClick={() => setTab("accessory")}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition ${tab === "accessory"
                            ? "bg-black text-white shadow-md"
                            : "text-gray-600 hover:text-black"
                            }`}
                    >
                        Accessories
                    </button>
                    <button
                        onClick={() => setTab("product")}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition ${tab === "product"
                            ? "bg-black text-white shadow-md"
                            : "text-gray-600 hover:text-black"
                            }`}
                    >
                        Clothes
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                        Filter
                    </button>

                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="default">Default Sorting</option>
                        <option value="az">A - Z</option>
                        <option value="za">Z - A</option>
                        <option value="low-high">Price: Low to High</option>
                        <option value="high-low">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab + sortOption + page}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {tab === "accessory" ? (
                            <AccessoryList pagination sortOption={sortOption} page={page} />
                        ) : (
                            <ShopList pagination sortOption={sortOption} page={page} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    );
};

export default Shop;
