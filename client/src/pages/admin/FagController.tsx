import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface FAQ {
    _id: string;
    question: string;
    answer: string;
}

export default function AdminFAQ() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState<FAQ | null>(null);
    const [form, setForm] = useState({ question: "", answer: "" });

    const fetchFaqs = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:3000/chat");
            setFaqs(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editing) {
                await axios.put(`http://localhost:3000/chat/${editing._id}`, form);
                setEditing(null);
            } else {
                await axios.post("http://localhost:3000/chat", form);
            }
            setForm({ question: "", answer: "" });
            fetchFaqs();
            Swal.fire("Success", "FAQ saved!", "success");
        } catch (err) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This will delete the FAQ permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });
        if (result.isConfirmed) {
            await axios.delete(`http://localhost:3000/chat/${id}`);
            fetchFaqs();
            Swal.fire("Deleted!", "FAQ has been deleted.", "success");
        }
    };

    const handleEdit = (faq: FAQ) => {
        setEditing(faq);
        setForm({ question: faq.question, answer: faq.answer });
    };

    return (
        <div className="min-h-screen p-8 text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin FAQ Panel</h1>

            {/* Form */}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 flex flex-col md:flex-row gap-4"
            >
                <input
                    type="text"
                    placeholder="Question"
                    className="flex-1 border border-gray-600 bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-100"
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Answer"
                    className="flex-1 border border-gray-600 bg-gray-700 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-100"
                    value={form.answer}
                    onChange={(e) => setForm({ ...form, answer: e.target.value })}
                    required
                />
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-md font-semibold text-white shadow-md transition-all duration-300"
                >
                    <FaPlus />
                    {editing ? "Update" : "Add"}
                </button>
            </motion.form>

            {/* FAQ Table */}
            {loading ? (
                <p className="text-gray-400">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-900 rounded-md shadow-md overflow-hidden">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="p-4 text-left text-gray-300">Question</th>
                                <th className="p-4 text-left text-gray-300">Answer</th>
                                <th className="p-4 text-left text-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {faqs.map((faq) => (
                                    <motion.tr
                                        key={faq._id}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: 50, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-b border-gray-700 hover:bg-gray-800 transition-colors duration-200"
                                    >
                                        <td className="p-4">{faq.question}</td>
                                        <td className="p-4">{faq.answer}</td>
                                        <td className="p-4 flex gap-2">
                                            <button
                                                onClick={() => handleEdit(faq)}
                                                className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-md text-white transition-all duration-300"
                                            >
                                                <FaEdit />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(faq._id)}
                                                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-white transition-all duration-300"
                                            >
                                                <FaTrash />
                                                Delete
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
