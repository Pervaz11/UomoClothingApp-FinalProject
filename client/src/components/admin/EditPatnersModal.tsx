import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

type Partner = {
    [x: string]: any;
    id: string;
    name: string;
    image: string;
    email: string;
    country: string;
    status: "active" | "inactive";
};

type Props = {
    partner: Partner;
    onClose: () => void;
    onUpdated?: (updatedPartner: Partner) => void;
};

export default function EditPartnerModal({ partner, onClose, onUpdated }: Props) {
    const [name, setName] = useState(partner.name);
    const [image, setImage] = useState(partner.image);
    const [email, setEmail] = useState(partner.email);
    const [country, setCountry] = useState(partner.country);
    const [status, setStatus] = useState<"active" | "inactive">(partner.status);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = `http://localhost:3000/partners/${partner._id}`;
            const payload = { name, image, email, country, status };

            const { data } = await axios.patch(endpoint, payload);
            toast.success("Partner updated successfully");

            if (onUpdated) onUpdated(data);
            onClose();
        } catch (error) {
            console.error(error); // error details backend-dən görünəcək
            toast.error("Failed to update partner");
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
                    className="bg-white p-8 rounded-2xl w-96 shadow-lg relative"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl font-bold mb-6 text-center">Edit Partner</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Name */}
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Partner Name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Image URL */}
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Image URL"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Email */}
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Country */}
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* Status */}
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
