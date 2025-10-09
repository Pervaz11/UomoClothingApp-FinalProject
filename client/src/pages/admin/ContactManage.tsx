import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, CheckCircle, Search } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import ContactFilter from "../../components/admin/ContactFilter";

interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    status: "read" | "unread";
    createdAt: string;
}

export default function AdminMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [filtered, setFiltered] = useState<Message[]>([]);
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<"all" | "read" | "unread">("all");

    const fetchMessages = async (): Promise<void> => {
        try {
            const { data } = await axios.get<Message[]>("http://localhost:3000/contact");
            setMessages(data);
            setFiltered(data);
        } catch (err) {
            console.error("Failed to fetch messages", err);
        }
    };

    const markAsRead = async (id: string): Promise<void> => {
        try {
            await axios.patch(`http://localhost:3000/contact/${id}`, { status: "read" });
            setMessages((prev) =>
                prev.map((msg) => (msg._id === id ? { ...msg, status: "read" } : msg))
            );
        } catch (err) {
            console.error("Failed to update message", err);
        }
    };

    useEffect(() => {
        let result = [...messages];

        if (filter !== "all") {
            result = result.filter((msg) => msg.status === filter);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (msg) =>
                    msg.name.toLowerCase().includes(q) ||
                    msg.email.toLowerCase().includes(q) ||
                    msg.message.toLowerCase().includes(q)
            );
        }

        setFiltered(result);
    }, [messages, search, filter]);

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="min-h-screen p-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-8 text-gray-800"
            >
                Contact Messages
            </motion.h1>

            {/* Search Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                <div className="flex items-center bg-gray-800 px-4 py-2 rounded-xl w-full sm:w-1/2">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or message..."
                        className="bg-transparent outline-none ml-2 w-full text-gray-200 placeholder-gray-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <ContactFilter filter={filter} setFilter={setFilter} />
            </div>

            {/* Messages */}
            {filtered.length === 0 ? (
                <p className="text-gray-400 text-center mt-20 text-lg">
                    No messages found
                </p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((msg, i) => (
                        <motion.div
                            key={msg._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className={`rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${msg.status === "read"
                                ? "bg-gray-800 border-gray-700"
                                : "bg-gray-700 border-gray-600"
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="font-semibold text-white text-lg flex items-center gap-2">
                                    <FaRegUser />
                                    {msg.name}
                                </h2>
                                {msg.status === "read" ? (
                                    <CheckCircle className="text-green-400 w-5 h-5" />
                                ) : (
                                    <button
                                        onClick={() => markAsRead(msg._id)}
                                        className="text-sm bg-indigo-500 text-white uppercase font-semibold hover:bg-indigo-600 px-3 py-1 rounded-lg transition"
                                    >
                                        Mark as Read
                                    </button>
                                )}
                            </div>
                            <p className="text-gray-300 text-sm mb-2 flex gap-1 items-center">
                                <Mail className="w-4" /> {msg.email}
                            </p>
                            <p className="text-gray-200 line-clamp-3">{msg.message}</p>
                            <p className="text-xs text-gray-500 mt-3">
                                {new Date(msg.createdAt).toLocaleString()}
                            </p>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
