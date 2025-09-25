import React, { useEffect, useState } from "react";
import axios from "axios";
import AccessoryCard from "./AccesoryCard";

type Accessory = {
    _id: string;
    name: string;
    price: number;
    images: { url: string; alt: string }[];
    rating?: number;
    createdAt: string;
    stock?: number;
};

const AccessoryList: React.FC = () => {
    const [accessories, setAccessories] = useState<Accessory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:3000/accessory")
            .then((res) => setAccessories(res.data.accessories ?? []))
            .catch((err) => console.error("Error fetching accessories:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading accessories...</div>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {accessories.map((item) => (
                <AccessoryCard
                    key={item._id}
                    accessory={item}       // 🔹 bütün accessory obyektini ötürürük
                    view="grid"            // 🔹 istəsən "list" də edə bilərsən
                    onEdit={(id) => console.log("Edit", id)}
                    onDelete={(id) => console.log("Delete", id)}
                />
            ))}
        </div>
    );
};

export default AccessoryList;
