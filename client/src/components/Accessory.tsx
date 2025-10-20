import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AccessoryCard from "./AccessoryCard";

type Accessory = {
    _id: string;
    name: string;
    price: number;
    images: { url: string; alt: string }[];
};

const Accessories: React.FC = () => {
    const [accessories, setAccessories] = useState<Accessory[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        axios
            .get("http://localhost:3000/accessory")
            .then((res) => setAccessories(res.data.accessories))
            .catch((err) => console.error("Error fetching accessories:", err))
            .finally(() => setLoading(false));
    }, []);

    const nextSlide = () => {
        setAccessories((prev) => {
            if (prev.length === 0) return prev;
            const rotated = [...prev];
            const first = rotated.shift();
            if (first) rotated.push(first);
            return rotated;
        });
        setActiveIndex((prev) => (prev + 1) % accessories.length);
    };

    const prevSlide = () => {
        setAccessories((prev) => {
            if (prev.length === 0) return prev;
            const rotated = [...prev];
            const last = rotated.pop();
            if (last) rotated.unshift(last);
            return rotated;
        });
        setActiveIndex((prev) =>
            prev === 0 ? accessories.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        if (accessories.length > 1) {
            const interval = setInterval(nextSlide, 5000);
            return () => clearInterval(interval);
        }
    }, [accessories.length]);

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-14">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold tracking-wide">Accessories</h2>

                <div className="flex items-center gap-3">
                    <button
                        onClick={prevSlide}
                        className="bg-gray-200/70 hover:bg-gray-300 rounded-full p-2 shadow transition duration-300"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="bg-gray-200/70 hover:bg-gray-300 rounded-full p-2 shadow transition duration-300"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="flex justify-between gap-4 overflow-hidden relative">
                <AnimatePresence mode="popLayout">
                    {accessories.slice(0, 4).map((item) => (
                        <motion.div
                            key={item._id}
                            className="w-[23%]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                        >
                            <AccessoryCard
                                title={item.name}
                                price={item.price}
                                images={item.images}
                                id={item._id}
                                stock={0}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2">
                {accessories.slice(0, 6).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            for (let i = 0; i < index; i++) nextSlide();
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-500 ${index === activeIndex % 6
                            ? "bg-black scale-110"
                            : "bg-gray-400 hover:bg-gray-500"
                            }`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Accessories;
