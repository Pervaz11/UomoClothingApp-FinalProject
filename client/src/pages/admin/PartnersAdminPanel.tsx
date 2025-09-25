import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-hot-toast";
import EditPartnerModal from "../../components/admin/EditPatnersModal";
import { FaRegEdit } from "react-icons/fa";
import { IoEarth } from "react-icons/io5";
import { CiMail } from "react-icons/ci";


type Partner = {
    _id: string;
    name: string;
    image: string;
    email: string;
    country: string;
    status: "active" | "inactive";
    createdAt: string;
};

export default function Partners() {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

    const fetchPartners = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("http://localhost:3000/partners");
            setPartners(data.partners);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load partners");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const filteredPartners = partners.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.country.toLowerCase().includes(search.toLowerCase())
    );

    const handleUpdate = (updated: Partner) => {
        setPartners((prev) =>
            prev.map((p) => (p._id === updated._id ? updated : p))
        );
    };

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Partners Management</h1>

            {/* Search */}
            <input
                type="text"
                placeholder="Search by name, email or country..."
                className="mb-4 w-full border-none md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:border-0 duration-300 focus:shadow-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Partners Grid */}
            {loading ? (
                <p>Loading partners...</p>
            ) : (
                <div className="flex flex-col gap-4">
                    <AnimatePresence>
                        {filteredPartners.map((partner) => (
                            <motion.div
                                key={partner._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="bg-gray-800 rounded-2xl shadow p-4 flex items-center gap-6 hover:shadow-lg transition"
                            >
                                {/* Img */}
                                <div className="flex-shrink-0 bg-white p-4 rounded-xl w-32 h-32 flex items-center justify-center">
                                    <img
                                        src={partner.image}
                                        alt={partner.name}
                                        className="object-contain w-full h-full"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col justify-between h-full">
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">{partner.name}</h2>
                                        <p className="text-gray-400 flex items-center gap-1"><CiMail />{partner.email}</p>
                                        <p className="text-gray-400 flex items-center gap-1"><IoEarth />{partner.country}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <span
                                            className={`font-semibold text-white py-1 rounded-full text-sm uppercase px-5 ${partner.status === "active" ? "bg-green-500" : "bg-gray-500"}`}
                                        >
                                            {partner.status}
                                        </span>

                                        <button
                                            onClick={() => setSelectedPartner(partner)}
                                            className="px-4 py-2 rounded-lg text-white text-3xl hover:text-green-500 duration-300 transition"
                                        >
                                            <FaRegEdit />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}


            {/* Edit Modal */}
            {selectedPartner && (
                <EditPartnerModal
                    partner={selectedPartner}
                    onClose={() => setSelectedPartner(null)}
                    onUpdated={handleUpdate}
                />
            )}
        </div>
    );
}
