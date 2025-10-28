import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
    FaTruck,
    FaClock,
    FaBoxOpen,
    FaPhone,
    FaMoneyBillWave,
    FaUser,
    FaTrash
} from "react-icons/fa6";
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";


const CourierPage = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);
    const [deletingItem, setDeletingItem] = useState<string | null>(null);

    // ✅ Bütün paid və delivered sifarişləri gətir
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("http://localhost:3000/orders/courier/all");
                const validOrders = res.data.filter((o: any) => o.items?.length > 0);
                setOrders(validOrders);
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                // ✅ yükləmə vizual olaraq 5 saniyə sürsün
                setTimeout(() => setLoading(false), 5000);
            }
        };

        fetchOrders();
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, []);

    // ✅ Order-u delivered kimi işarələmək
    const handleDelivered = async (id: string) => {
        setUpdating(id);
        try {
            const res = await axios.put(`http://localhost:3000/orders/${id}/delivered`);
            setOrders((prev) => prev.map((order) => (order._id === id ? res.data : order)));
            Swal.fire("Success", "Order marked as delivered!", "success");
        } catch (error) {
            console.error("Failed to mark as delivered:", error);
            Swal.fire("Error", "Failed to update order status.", "error");
        } finally {
            setUpdating(null);
        }
    };

    // ✅ Məhsulu silmək
    const handleDeleteItem = async (orderId: string, itemId: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This product will be removed from the order.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) return;

        setDeletingItem(itemId);
        try {
            const res = await axios.delete(`http://localhost:3000/orders/${orderId}/item/${itemId}`);
            if (res.data.deleted) {
                setOrders((prev) => prev.filter((o) => o._id !== res.data.orderId));
            } else {
                setOrders((prev) => prev.map((order) => (order._id === orderId ? res.data : order)));
            }
            Swal.fire("Deleted!", "Product successfully removed.", "success");
        } catch (error) {
            console.error("Failed to delete item:", error);
            Swal.fire("Error", "Failed to delete the item.", "error");
        } finally {
            setDeletingItem(null);
        }
    };

    // ✅ Boş order-ləri təmizləmək
    const handleDeleteEmptyOrders = async () => {
        const result = await Swal.fire({
            title: "Clean Empty Orders?",
            text: "All orders without items will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, clean them!",
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete("http://localhost:3000/orders/clean-empty");
            setOrders((prev) => prev.filter((o) => o.items?.length > 0));
            Swal.fire("Cleaned!", "All empty orders were deleted.", "success");
        } catch (error) {
            console.error("Error cleaning empty orders:", error);
            Swal.fire("Error", "Failed to clean empty orders.", "error");
        }
    };

    // ✅ YENİ: daha şık, sakit loading animation
    if (loading)
        return (
            <div className="flex flex-col items-center justify-center h-screen text-gray-700">
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                    className="mb-4"
                >
                    <FaTruck className="text-5xl text-gray-800" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    className="text-lg tracking-wide font-medium"
                >
                    Loading orders...
                </motion.p>
            </div>
        );

    // ✅ Əsas UI
    return (
        <div className="max-w-7xl mx-auto p-6">
            <motion.h1
                className="text-4xl font-extrabold text-gray-800 mb-8 flex items-center gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <FaTruck className="text-gray-800" /> Courier Dashboard
            </motion.h1>

            <div className="flex justify-end mb-6">
                <button
                    onClick={handleDeleteEmptyOrders}
                    className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-5 py-2 rounded-xl shadow-md flex items-center gap-2"
                >
                    <FaTrash /> Delete Empty Orders
                </button>
            </div>

            {orders.length === 0 ? (
                <motion.p
                    className="text-gray-500 text-center text-lg mt-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    No paid or delivered orders yet.
                </motion.p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {orders.map((order) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-transform hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <p className="font-semibold text-gray-700 flex items-center gap-2">
                                    <FaBoxOpen /> Order ID: {order._id}
                                </p>
                                <span
                                    className={`font-bold px-3 py-1 rounded-xl text-sm ${order.status === "paid"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {order.status.toUpperCase()}
                                </span>
                            </div>

                            <div className="text-sm text-gray-600 space-y-1 mb-4">
                                <p className="flex items-center gap-2">
                                    <FaMapMarkerAlt /> {order.address}, {order.city}
                                </p>
                                <p>📮 {order.postalCode}</p>
                                <p className="flex items-center gap-2">
                                    <FaPhone /> {order.phone}
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaUser /> User ID: {order.userId}
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaMoneyBillWave /> ${order.total?.toFixed(2)}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {order.items.map((item: any) => (
                                    <div
                                        key={item._id}
                                        className="flex items-center justify-between border p-3 rounded-xl bg-gray-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-700">{item.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    ${item.price} × {item.quantity}
                                                </p>
                                                {item.color && (
                                                    <p className="text-xs text-gray-400">Color: {item.color}</p>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDeleteItem(order._id, item._id)}
                                            disabled={deletingItem === item._id}
                                            className={`text-gray-700 hover:text-red-600 transition-all duration-200 ${deletingItem === item._id ? "opacity-50 cursor-not-allowed" : ""
                                                }`}
                                            title="Delete product"
                                        >
                                            {deletingItem === item._id ? (
                                                <FaClock className="animate-spin" />
                                            ) : (
                                                <FaTrash />
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                                <FaClock /> {new Date(order.createdAt).toLocaleString()}
                            </div>

                            <div className="mt-4 flex gap-2">
                                {order.status === "delivered" ? (
                                    <motion.div
                                        className="flex-1 flex items-center justify-center gap-2 text-green-600 font-semibold border border-green-200 bg-green-50 rounded-xl py-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <FaCheckCircle /> Delivered
                                    </motion.div>
                                ) : (
                                    <button
                                        onClick={() => handleDelivered(order._id)}
                                        disabled={updating === order._id}
                                        className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 text-white font-semibold transition-all duration-200 shadow-sm ${updating === order._id
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gray-800 hover:bg-gray-900"
                                            }`}
                                    >
                                        {updating === order._id ? (
                                            <>
                                                <FaClock className="animate-spin" /> Updating...
                                            </>
                                        ) : (
                                            <>
                                                <FaTruck /> Mark as Delivered
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourierPage;
