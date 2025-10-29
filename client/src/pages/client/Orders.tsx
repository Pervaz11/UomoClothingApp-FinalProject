import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
    FaBoxOpen,
    FaDollarSign,
    FaClock,
    FaMapMarkerAlt,
    FaPhone,
    FaCheckCircle,
    FaShippingFast,
} from "react-icons/fa";
import Swal from "sweetalert2";

const OrdersPage = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!userId || userId === "null") {
                    setLoading(false);
                    return;
                }
                const res = await axios.get(`http://localhost:3000/orders/user/${userId}`);
                const validOrders = res.data.filter((o: any) => o.items?.length > 0);
                setOrders(validOrders);
            } catch (err) {
                console.error(err);
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        };

        fetchOrders();
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);
    }, [userId]);

    const getProgressWidth = (status: string) => {
        switch (status) {
            case "paid":
                return "w-1/3";
            case "inTransit":
                return "w-2/3";
            case "delivered":
                return "w-full";
            default:
                return "w-0";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "paid":
                return "Paid";
            case "inTransit":
                return "In Transit";
            case "delivered":
                return "Delivered";
            default:
                return "Pending";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid":
                return "bg-blue-100 text-blue-700";
            case "inTransit":
                return "bg-blue-200 text-blue-800";
            case "delivered":
                return "bg-green-100 text-green-700";
            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "paid":
                return <FaDollarSign className="inline mr-1" />;
            case "inTransit":
                return <FaShippingFast className="inline mr-1" />;
            case "delivered":
                return <FaCheckCircle className="inline mr-1" />;
            default:
                return <FaClock className="inline mr-1" />;
        }
    };

    const handleCancelOrder = async (order: any) => {
        if (order.status === "paid") {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Do you want to cancel this order?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, cancel it!",
            });

            if (!result.isConfirmed) return;

            try {
                const res = await axios.delete(`http://localhost:3000/orders/${order._id}/cancel`);
                if (res.data.success) {
                    setOrders((prev) => prev.filter((o) => o._id !== order._id));
                    Swal.fire("Cancelled!", res.data.message, "success");
                }
            } catch (err: any) {
                Swal.fire("Error", err.response?.data?.message || "Failed to cancel order", "error");
            }
        } else {
            Swal.fire(
                "Cannot Cancel",
                "This order cannot be cancelled because it is already " + order.status,
                "info"
            );
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
            <motion.h1
                className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 sm:mb-8 flex items-center gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <FaBoxOpen className="text-gray-800" /> My Orders
            </motion.h1>

            {loading ? (
                <p className="text-gray-500 text-center mt-10">Loading...</p>
            ) : orders.length === 0 ? (
                <motion.p
                    className="text-gray-500 text-center text-lg mt-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    You have not placed any orders yet.
                </motion.p>
            ) : (
                <div className="flex flex-col gap-4 sm:gap-6">
                    {orders.map((order) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
                        >
                            {/* Image */}
                            <div className="flex-shrink-0">
                                <img
                                    src={order.items[0]?.image}
                                    alt={order.items[0]?.name}
                                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shadow-sm"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 w-full flex flex-col gap-2 sm:gap-3">
                                <h2 className="text-gray-800 font-semibold text-base sm:text-lg">
                                    {order.items[0]?.name}
                                </h2>
                                <p className="text-sm sm:text-base text-gray-500 line-clamp-2">
                                    {order.items.length > 1
                                        ? `${order.items.length} items in order`
                                        : "1 item"}
                                </p>
                                <div className="flex flex-wrap gap-2 sm:gap-3 text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                                    <span className="flex items-center gap-1">
                                        <FaDollarSign /> ${order.total?.toFixed(2)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaMapMarkerAlt /> {order.city}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaPhone /> {order.phone}
                                    </span>
                                </div>

                                {/* Progress bar */}
                                <div className="mt-3 sm:mt-4 w-full">
                                    <div className="relative flex justify-between text-xs sm:text-sm text-gray-500 mb-1">
                                        <span>Paid</span>
                                        <span>In Transit</span>
                                        <span>Delivered</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full relative">
                                        <div
                                            className={`absolute h-2 rounded-full transition-all duration-700 ${getProgressWidth(
                                                order.status
                                            )} ${order.status === "delivered" ? "bg-green-500" : "bg-blue-500"}`}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Status & Action */}
                            <div className="flex flex-col items-center gap-2 sm:gap-3 w-full sm:w-auto mt-3 sm:mt-0">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm sm:text-base font-medium ${getStatusColor(
                                        order.status
                                    )}`}
                                >
                                    {getStatusIcon(order.status)} {getStatusText(order.status)}
                                </span>

                                <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-1">
                                    <FaClock /> {new Date(order.createdAt).toLocaleDateString()}
                                </p>

                                <button
                                    onClick={() => handleCancelOrder(order)}
                                    className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2 px-2 text-white font-semibold transition-all shadow-sm
                                    ${order.status === "paid" ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"}`}
                                >
                                    <span className="text-sm sm:text-base">Cancel Order</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
