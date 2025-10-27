// src/pages/CourierPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";

const CourierPage = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaidOrders = async () => {
            try {
                const res = await axios.get("http://localhost:3000/orders/paid/all");
                setOrders(res.data);
            } catch (err) {
                console.error("Error fetching paid orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPaidOrders();
        const interval = setInterval(fetchPaidOrders, 10000); // hər 10 saniyədə yenilə
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div className="text-center mt-10">Loading orders...</div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Courier Orders</h1>

            {orders.length === 0 ? (
                <p className="text-gray-500">No paid orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                        >
                            <div className="flex justify-between items-center mb-3">
                                <p className="font-semibold text-gray-700">
                                    🆔 Order ID: {order._id}
                                </p>
                                <span
                                    className={`font-bold px-3 py-1 rounded-xl text-sm ${order.status === "paid"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {order.status.toUpperCase()}
                                </span>
                            </div>

                            {/* 🧾 Müştəri məlumatları */}
                            <div className="grid sm:grid-cols-2 gap-2 text-gray-700 mb-4">
                                <p><strong>📍 Address:</strong> {order.address}</p>
                                <p><strong>🏙️ City:</strong> {order.city}</p>
                                <p><strong>📮 Postal Code:</strong> {order.postalCode}</p>
                                <p><strong>📞 Phone:</strong> {order.phone}</p>
                                <p><strong>👤 User ID:</strong> {order.userId}</p>
                                <p><strong>💰 Total:</strong> ${order.total?.toFixed(2)}</p>
                            </div>

                            {/* 🛒 Məhsullar */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {order.items.map((item: any, i: number) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 border p-3 rounded-xl bg-gray-50"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-gray-600 text-sm">
                                                ${item.price} × {item.quantity}
                                            </p>
                                            {item.color && (
                                                <p className="text-xs text-gray-500">
                                                    Color: {item.color}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-sm text-gray-500 mt-3">
                                🕒 Date: {new Date(order.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourierPage;
