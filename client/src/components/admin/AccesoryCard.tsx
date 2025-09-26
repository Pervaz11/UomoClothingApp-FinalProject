import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { CalendarDays } from "lucide-react";
import EditItemModal from "./EditProductModal";
import { AiOutlineEdit } from "react-icons/ai";

type Accessory = {
    _id: string;
    name: string;
    price: number;
    images: { url: string; alt: string }[];
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
                className={`border rounded-2xl bg-gray-800 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${view === "list" ? "flex items-center p-2 gap-6" : "p-3"
                    }`}
            >
                <div className="relative group">
                    <img
                        src={accessory.images?.[0]?.url || "/placeholder.png"}
                        alt={accessory.images?.[0]?.alt || accessory.name}
                        className={`rounded-xl object-cover transition-transform duration-500 ${view === "list" ? "w-42 h-42" : "w-full h-80"
                            } group-hover:scale-105`}
                    />
                    <span className="absolute bottom-2 left-2 bg-indigo-600/90 text-white text-xs px-3 py-1 rounded-full shadow-md">
                        Accessory
                    </span>
                </div>

                <div className={view === "list" ? " flex gap-2" : "mt-3"}>
                    <h3 className="text-lg font-semibold text-gray-200">{accessory.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <CalendarDays className="w-4 h-4 text-indigo-500" />
                        Added: {new Date(accessory.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-lg font-bold text-indigo-600">${accessory.price}</p>

                    {accessory.rating !== undefined && (
                        <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={`transition-colors duration-300 ${i < Math.round(avgRating) ? "text-yellow-400" : "text-gray-300 group-hover:text-yellow-200"
                                        }`}
                                />
                            ))}
                            <span className="ml-2 text-sm text-gray-500">{avgRating}</span>
                        </div>
                    )}

                    {accessory.stock !== undefined && (
                        <span
                            className={`inline-block mt-1 text-xs w-ful py-1 px-3 rounded-full font-medium ${accessory.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}
                        >
                            {accessory.stock > 0 ? `In stock (${accessory.stock})` : "Out of stock"}
                        </span>
                    )}


                    {/* Edit Button */}
                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-2 flex w-full items-center justify-center gap-2 px-3 py-1 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all text-sm"
                    >
                        <AiOutlineEdit className="text-base" /> Edit
                    </button>
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
