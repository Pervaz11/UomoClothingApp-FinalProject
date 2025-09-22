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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {accessories.slice(0, 4).map((item) => (
                    <AccessoryCard
                        key={item._id}
                        id={item._id}
                        title={item.name}
                        price={item.price}
                        images={item.images}
                    />
                ))}
            </div>
        </div>
    );
};

export default Accessories;
