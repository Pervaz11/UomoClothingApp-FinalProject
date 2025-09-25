import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { CalendarDays } from "lucide-react";
import EditProductModal from "./EditProductModal";

type Product = {
    id: number;
    name: string;
    price: number;
    rating: number;
    image: string;
    category: string;
    createdAt: string;
    stock?: number;
};

type Props = {
    product: Product;
    view: "grid" | "list";
};

export default function ProductCard({ product, view }: Props) {
    const [isEditing, setIsEditing] = useState(false);

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
                {/* Img */}
                <div className="relative group">
                    <img
                        src={product.image}
                        alt={product.name}
                        className={`rounded-xl object-cover transition-transform duration-500 ${view === "list" ? "w-42 h-42" : "w-full h-80"
                            } group-hover:scale-105`}
                    />
                    <span className="absolute bottom-2 left-2 bg-indigo-600/90 text-white text-xs px-3 py-1 rounded-full shadow-md">
                        {product.category}
                    </span>
                </div>

                {/* Info */}
                <div className={view === "list" ? "flex-1 flex flex-col gap-2" : "mt-3"}>
                    <h3 className="text-lg font-semibold text-gray-200">{product.name}</h3>

                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <CalendarDays className="w-4 h-4 text-indigo-500" />
                        Added: {new Date(product.createdAt).toLocaleDateString()}
                    </p>

                    <p className="text-lg font-bold text-indigo-600">${product.price}</p>

                    <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={`transition-colors duration-300 ${i < Math.round(product.rating)
                                    ? "text-yellow-400"
                                    : "text-gray-300 group-hover:text-yellow-200"
                                    }`}
                            />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">{product.rating}</span>
                    </div>

                    {product.stock !== undefined && (
                        <span
                            className={`inline-block mt-1 text-xs w-full items-center text-center py-1 rounded-full font-medium ${product.stock > 0
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                                }`}
                        >
                            {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
                        </span>
                    )}

                    {/* Edit Button */}
                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-2 w-full items-center text-center  font-semibold py-1 rounded-2xl bg-blue-700 text-white text-sm hover:bg-indigo-700 transition"
                    >
                        Edit
                    </button>
                </div>
            </motion.div>

            {/* Modal */}
            {isEditing && <EditProductModal product={product} onClose={() => setIsEditing(false)} />}
        </>
    );
}
