import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { CalendarDays } from "lucide-react";
import EditItemModal from "./EditProductModal";

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
    accessory: Accessory;
    view: "grid" | "list";
};

export default function AccessoryCard({ accessory, view }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const avgRating = accessory.rating ?? 0;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`border rounded-2xl shadow-md bg-gray-800 transition-all duration-300 hover:shadow-xl overflow-hidden ${view === "list"
                    ? "flex flex-col sm:flex-row gap-4 p-4"
                    : "flex flex-col p-3"
                    }`}
            >
                {/* Image */}
                <div className={`relative ${view === "list" ? "w-full sm:w-48 flex-shrink-0" : "w-full h-64"}`}>
                    <img
                        src={accessory.images?.[0]?.url || "/placeholder.png"}
                        alt={accessory.images?.[0]?.alt || accessory.name}
                        className="rounded-xl w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute bottom-2 left-2 bg-indigo-600/90 text-white text-xs px-3 py-1 rounded-full shadow-md">
                        Accessory
                    </span>
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                    <div className="mt-2 sm:mt-0">
                        <h3 className="text-lg font-semibold text-gray-100">{accessory.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <CalendarDays className="w-4 h-4 text-indigo-500" />
                            {new Date(accessory.createdAt).toLocaleDateString()}
                        </p>

                        <p className="text-lg font-bold text-indigo-600 mt-2">${accessory.price.toFixed(2)}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`text-sm ${i < Math.round(avgRating) ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                />
                            ))}
                            <span className="ml-2 text-sm text-gray-500">{avgRating}</span>
                        </div>
                    </div>

                    {/* Bottom: Stock + Edit */}
                    <div className="flex flex-wrap gap-2 mt-3 sm:mt-0 items-center">
                        {accessory.stock !== undefined && (
                            <span
                                className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${accessory.stock > 0
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {accessory.stock > 0 ? `In stock (${accessory.stock})` : "Out of stock"}
                            </span>
                        )}

                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-1 rounded-2xl bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </motion.div>

            {isEditing && (
                <EditItemModal
                    item={{
                        id: accessory._id,
                        name: accessory.name,
                        price: accessory.price,
                        stock: accessory.stock,
                        type: "accessory",
                    }}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </>
    );
}
