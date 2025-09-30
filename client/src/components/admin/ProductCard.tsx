import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { CalendarDays } from "lucide-react";
import EditItemModal from "./EditProductModal";

type Product = {
    id: string;
    name: string;
    price: number;
    discount?: { type: "percentage" | "fixed"; value: number };
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

    const discountedPrice = product.discount
        ? product.discount.type === "percentage"
            ? product.price * (1 - product.discount.value / 100)
            : product.price - product.discount.value
        : product.price;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`border rounded-2xl shadow-sm transition-all bg-gray-800 duration-300 hover:shadow-xl overflow-hidden ${view === "list" ? "flex items-center p-2 gap-6" : "p-3 bg-gray-800"
                    }`}
            >
                <div className="relative group">
                    <img
                        src={product.image}
                        alt={product.name}
                        className={`rounded-xl object-cover transition-transform duration-500 ${view === "list" ? "w-42 h-52" : "w-full h-80"
                            } group-hover:scale-105`}
                    />
                    <span className="absolute bottom-2 left-2 bg-indigo-600/90 text-white text-xs px-3 py-1 rounded-full shadow-md">
                        {product.category}
                    </span>
                </div>

                <div className={view === "list" ? "flex-1 flex flex-col gap-2" : "mt-3"}>
                    <h3 className="text-lg font-semibold text-gray-200">{product.name}</h3>

                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <CalendarDays className="w-4 h-4 text-indigo-500" />
                        Added: {new Date(product.createdAt).toLocaleDateString()}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                        {product.discount && (
                            <span className="line-through text-gray-400">${product.price.toFixed(2)}</span>
                        )}
                        <span className="text-indigo-600 font-bold">${discountedPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={`transition-colors duration-300 ${i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"
                                    }`}
                            />
                        ))}
                        <span className="ml-2 text-sm text-gray-500">{product.rating}</span>
                    </div>

                    {product.stock !== undefined && (
                        <span
                            className={`inline-block mt-1 text-xs w-full items-center text-center py-1 rounded-full font-medium ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                }`}
                        >
                            {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
                        </span>
                    )}

                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-2 w-full text-center font-semibold py-1 rounded-2xl bg-blue-700 text-white text-sm hover:bg-indigo-700 transition"
                    >
                        Edit
                    </button>
                </div>
            </motion.div>

            {isEditing && (
                <EditItemModal item={{ ...product, type: "product" }} onClose={() => setIsEditing(false)} />
            )}
        </>
    );
}
