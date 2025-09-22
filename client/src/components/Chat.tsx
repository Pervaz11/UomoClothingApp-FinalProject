import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send } from "lucide-react";

interface Message {
    from: "user" | "bot";
    text: string;
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [faq, setFaq] = useState<{ question: string; answer: string }[]>([]);

    useEffect(() => {
        const loadFaqs = async () => {
            try {
                const res = await fetch("http://localhost:3000/chat");
                const data = await res.json();
                setFaq(data);
            } catch (error) {
                console.error("FAQ yüklənmədi:", error);
            }
        };
        loadFaqs();
    }, []);

    const handleClickFAQ = async (q: { question: string; answer: string }) => {
        setMessages((prev) => [...prev, { from: "user", text: q.question }]);
        setMessages((prev) => [...prev, { from: "bot", text: q.answer }]);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessage: Message = { from: "user", text: input };
        setMessages((prev) => [...prev, newMessage]);

        try {
            const res = await fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await res.json();
            setMessages((prev) => [...prev, { from: "bot", text: data.answer }]);
            setInput("");
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { from: "bot", text: "⚠️ Serverə qoşula bilmədim." },
            ]);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300"
            >
                <MessageCircle size={28} />
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 60, scale: 0.9 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute bottom-24 right-0 w-80 md:w-96 h-[28rem] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="bg-gray-800 text-white flex justify-between items-center px-4 py-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
                                    U
                                </div>
                                <div>
                                    <h2 className="text-sm font-black tracking-wider">
                                        UOM<span className="text-red-700">O</span>
                                    </h2>
                                    <p className="text-xs text-green-200">🟢 Online</p>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setOpen(false)}
                            >
                                <X size={20} />
                            </motion.button>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {faq.map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleClickFAQ(q)}
                                        className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full hover:bg-gray-300"
                                    >
                                        {q.question}
                                    </button>
                                ))}
                            </div>

                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: msg.from === "user" ? 20 : -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={`p-3 rounded-lg max-w-[80%] text-sm shadow-sm ${msg.from === "user"
                                        ? "bg-blue-500 text-white ml-auto"
                                        : "bg-white text-gray-800"
                                        }`}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                        </div>

                        <div className="border-t border-gray-400 p-3 flex items-center gap-2 bg-white">
                            <input
                                type="text"
                                placeholder="Mesajınızı yazın..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                className="flex-1 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            />
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={sendMessage}
                                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-full shadow-md hover:shadow-lg"
                            >
                                <Send size={18} />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
