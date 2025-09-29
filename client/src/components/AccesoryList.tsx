import { useEffect, useState } from "react";
import axios from "axios";
import AccessoryCard from "./AccessoryCard";

type Accessory = {
    _id: string;
    name: string;
    price: number;
    images: { url: string; alt: string }[];
};

const ITEMS_PER_PAGE = 8;

const AccessoryList: React.FC<{ pagination?: boolean; sortOption: string; page: number }> = ({
    pagination = true,
    sortOption,
    page,
}) => {
    const [accessories, setAccessories] = useState<Accessory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:3000/accessory")
            .then((res) => {
                const data = res.data.accessories ?? [];
                setAccessories(data);
            })
            .catch((err) => console.error("Error fetching accessories:", err))
            .finally(() => setLoading(false));
    }, []);

    const sortedAccessories = [...accessories].sort((a, b) => {
        if (sortOption === "az") return a.name.localeCompare(b.name);
        if (sortOption === "za") return b.name.localeCompare(a.name);
        if (sortOption === "low-high") return a.price - b.price;
        if (sortOption === "high-low") return b.price - a.price;
        return 0;
    });

    const paginatedAccessories = pagination
        ? sortedAccessories.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
        : sortedAccessories;

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {paginatedAccessories.map((item) => (
                    <AccessoryCard
                        key={item._id}
                        id={item._id}
                        title={item.name}
                        price={item.price}
                        images={item.images} stock={0}                    />
                ))}
            </div>
        </div>
    );
};

export default AccessoryList;
