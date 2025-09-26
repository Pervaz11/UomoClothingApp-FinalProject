import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineTag, AiOutlineDollar, AiOutlineStock, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-hot-toast";

type Item = {
    id: string;
    name: string;
    price: number;
    stock?: number;
    category?: string;
    type: "product" | "accessory";
};

type Props = {
    item: Item;
    onClose: () => void;
};

const MySwal = withReactContent(Swal);

export default function EditItemModal({ item, onClose }: Props) {
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price);
    const [stock, setStock] = useState(item.stock || 0);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint =
                item.type === "product"
                    ? `http://localhost:3000/products/${item.id}`
                    : `http://localhost:3000/accessory/${item.id}`;

            await axios.patch(endpoint, { name, price, stock });
            toast.success(`${item.type === "product" ? "Product" : "Accessory"} updated successfully`);
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update item");
        }
    };

    const handleDelete = async () => {
        const result = await MySwal.fire({
            title: `Are you sure?`,
            text: `You are about to delete this ${item.type}. This action cannot be undone!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e11d48", // red
            cancelButtonColor: "#6b7280", // gray
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                setIsDeleting(true);
                const endpoint =
                    item.type === "product"
                        ? `http://localhost:3000/products/${item.id}`
                        : `http://localhost:3000/accessory/${item.id}`;

                await axios.delete(endpoint);
                toast.success(`${item.type === "product" ? "Product" : "Accessory"} deleted successfully`);
                onClose();
            } catch (error) {
                console.error(error);
                toast.error("Failed to delete item");
            } finally {
                setIsDeleting(false);
            }
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
                    className="bg-gray-900 p-8 rounded-2xl w-96 shadow-2xl relative"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition text-xl"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        Edit {item.type === "product" ? "Product" : "Accessory"}
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Name */}
                        <div className="relative">
                            <AiOutlineTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={`${item.type === "product" ? "Product" : "Accessory"} Name`}
                                className="w-full pl-10 pr-32 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                            />
                        </div>

                        {/* Price */}
                        <div className="relative">
                            <AiOutlineDollar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                placeholder="Price"
                                className="w-full pl-10 pr-20 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                            />
                        </div>

                        {/* Stock */}
                        <div className="relative">
                            <AiOutlineStock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(Number(e.target.value))}
                                placeholder={(item.stock ?? 0).toString()}
                                className="w-full pl-10 pr-20 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-3 mt-6">
                            {/* Delete Button */}
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-500 transition text-lg"
                            >
                                <AiOutlineDelete className="text-xl" /> {isDeleting ? "Deleting..." : "Delete Item"}
                            </button>

                            {/* Save / Cancel Buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-3 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition font-semibold"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
