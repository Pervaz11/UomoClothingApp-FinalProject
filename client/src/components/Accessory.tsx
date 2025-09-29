import React, { useState, useEffect } from "react";
import axios from "axios";
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
    };

    const prevSlide = () => {
        setAccessories((prev) => {
            if (prev.length === 0) return prev;
            const rotated = [...prev];
            const last = rotated.pop();
            if (last) rotated.unshift(last);
            return rotated;
        });
    };

    useEffect(() => {
        if (accessories.length > 1) {
            const interval = setInterval(() => {
                nextSlide();
            }, 4000);
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
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-5 relative">
            <h2 className="text-2xl font-bold mb-4">Limited Edition</h2>

            <div className="flex justify-between gap-4">
                {accessories.slice(0, 4).map((item) => (
                    <div key={item._id} className="w-[23%]">
                        <AccessoryCard
                            title={item.name}
                            price={item.price}
                            images={item.images} 
                            id={""} 
                            stock={0}                        />
                    </div>
                ))}
            </div>

            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 -translate-y-1/2 
          bg-white/70 hover:bg-white shadow-md rounded-full p-2 
          flex items-center justify-center transition-all duration-300 
          opacity-70 hover:opacity-100"
            >
                &#8249;
            </button>

            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 -translate-y-1/2 
          bg-white/70 hover:bg-white shadow-md rounded-full p-2 
          flex items-center justify-center transition-all duration-300 
          opacity-70 hover:opacity-100"
            >
                &#8250;
            </button>
        </div>
    );
};

export default Accessories;