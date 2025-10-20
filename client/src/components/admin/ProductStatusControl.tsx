import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
    productId: string;
    currentStatus?: string;
    type: "product" | "accessory";
    onUpdated?: () => void;
};

export default function ProductStatusControl({ productId, currentStatus, type, onUpdated }: Props) {
    const [status, setStatus] = useState(currentStatus || "none");
    const [loading, setLoading] = useState(false);

    const statuses = [
        { value: "new", label: "Yeni gələn" },
        { value: "bestseller", label: "Ən çox satılan" },
        { value: "discount", label: "Endirimdə" },
        { value: "toprated", label: "Yüksək reytinqli" },
        { value: "none", label: "Heç biri" },
    ];

    const handleChange = async (newStatus: string) => {
        setStatus(newStatus);
        setLoading(true);
        try {
            const endpoint =
                type === "product"
                    ? `http://localhost:3000/products/${productId}`
                    : `http://localhost:3000/accessory/${productId}`;

            await axios.patch(endpoint, { status: newStatus });
            toast.success("Status uğurla dəyişdirildi ✅");
            onUpdated && onUpdated();
        } catch (err) {
            console.error(err);
            toast.error("Status dəyişdirilə bilmədi ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2 mt-3">
            <label className="text-gray-300 text-sm">Status:</label>
            <select
                disabled={loading}
                value={status}
                onChange={(e) => handleChange(e.target.value)}
                className="bg-gray-800 text-white rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 transition"
            >
                {statuses.map((s) => (
                    <option key={s.value} value={s.value}>
                        {s.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
