import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

type OrderItem = {
    id: string;
    type: "product" | "accessory";
    quantity: number;
    name: string;
    image: string;
    price: number;
};

type Order = {
    _id: string;
    items: OrderItem[];
    total: number;
    createdAt: string;
};

const OrdersPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.id) return;

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/orders/${user.id}`
                );
                setOrders(res.data);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) return <div>Loading orders...</div>;
    if (!orders.length) return <div>You have no orders yet.</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

            {orders.map((order) => (
                <div key={order._id} className="mb-8 border p-4 rounded-lg shadow">
                    <h2 className="font-semibold mb-2">Order #{order._id}</h2>
                    <p className="text-gray-500 text-sm mb-4">
                        Placed on {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p>
                                        ${item.price.toFixed(2)} x {item.quantity}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="font-bold mt-4">Total: ${order.total.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
};

export default OrdersPage;
