import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineTag, AiOutlineDollar, AiOutlineStock } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';

type Product = {
    id: string;
    name: string;
    price: number;
    stock?: number;
    category?: string;
};

type Props = {
    product: Product;
    onClose: () => void;
};

export default function EditProductModal({ product, onClose }: Props) {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock || 0);
    const notify = () => toast('Wow so easy !');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3000/products/${product.id}`, {
                name,
                price,
                stock,
            });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-900 p-8 rounded-2xl w-96 shadow-lg relative"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        Edit Product
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Name */}
                        <div className="relative">
                            <AiOutlineTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Product Name"
                                className="w-full pl-10 pr-32 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        {/* Price */}
                        <div className="relative">
                            <AiOutlineDollar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                placeholder="Price"
                                className="w-full pl-10 pr-20 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        {/* Stock */}
                        <div className="relative">
                            <AiOutlineStock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(Number(e.target.value))}
                                placeholder={(product.stock ?? 0).toString()}
                                className="w-full pl-10 pr-20 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition flex-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={notify}
                                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition flex-1"
                            >
                                Save
                            </button>
                            <ToastContainer />
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
