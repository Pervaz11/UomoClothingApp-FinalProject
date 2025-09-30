import React, { useEffect, useState } from "react";
import axios from "axios";
import AccessoryCard from "./AccesoryCard";

type Accessory = {
    _id: string;
    name: string;
    price: number;
    images?: { url: string; alt: string }[];
    rating?: number;
    createdAt: string;
    stock?: number;
};

type Props = {
    view: "grid" | "list";
};

const AccessoryList: React.FC<Props> = ({ view }) => {
    const [accessories, setAccessories] = useState<Accessory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:3000/accessory")
            .then((res) => setAccessories(res.data.accessories ?? []))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="text-center py-10">Loading accessories...</div>;

    return (
        <div
            className={`grid gap-6 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
                }`}
        >
            {accessories.map((item) => (
                <AccessoryCard key={item._id} accessory={item} view={view} />
            ))}
        </div>
    );
};

export default AccessoryList;
