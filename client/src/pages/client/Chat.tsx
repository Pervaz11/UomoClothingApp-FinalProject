import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { MessageCircle, X } from "lucide-react";

interface Message {
    sender: "user" | "bot";
    text: string;
}

interface Faq {
    _id: string;
    question: string;
    answer: string;
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [faqList, setFaqList] = useState<Faq[]>([]);
    const [messages, setMessages] = useState<Message[]>([
        { sender: "bot", text: "👋 Hi there! How can I help today?" },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        axios.get("http://localhost:3000/chat").then((res) => setFaqList(res.data));
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleClick = async (question: string) => {
        setMessages((prev) => [...prev, { sender: "user", text: question }]);
        setIsTyping(true);

        try {
            const res = await axios.post("http://localhost:3000/chat/ask", { question });
            const botMessage: Message = { sender: "bot", text: "" };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);

            let index = 0;
            const interval = setInterval(() => {
                index++;
                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = res.data.reply.slice(0, index);
                    return newMessages;
                });
                if (index >= res.data.reply.length) clearInterval(interval);
            }, 30);
        } catch (err) {
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Sorry, I couldn't find an answer to that." },
            ]);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300"
            >
                {open ? <X size={26} /> : <MessageCircle size={28} />}
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 80, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 80, scale: 0.9 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute bottom-24 right-0 w-[420px]  backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-800  text-white">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-full bg-white text-green-600 font-bold flex items-center justify-center text-lg shadow-md">
                                        U
                                    </div>
                                    {/* Pulsating active dot */}
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border border-white animate-ping" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold tracking-wide text-sm">UOMO</h3>
                                    <p className="text-xs flex items-center gap-1 text-green-100">
                                        Active
                                    </p>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ rotate: 90 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setOpen(false)}
                                className="text-white hover:text-gray-100"
                            >
                                <X size={20} />
                            </motion.button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 max-h-[330px] overflow-y-auto p-4 space-y-2 bg-gray-50">
                            <AnimatePresence>
                                {messages.map((m, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className={`text-sm p-2 rounded-lg shadow-sm max-w-[80%] ${m.sender === "user"
                                            ? "bg-green-100 text-right ml-auto"
                                            : "bg-white text-gray-800"
                                            }`}
                                    >
                                        {m.text}
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <motion.div
                                        key="typing"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="bg-white text-left mr-auto p-2 rounded-lg text-sm flex gap-1 items-center"
                                    >
                                        <span className="text-gray-500">typing</span>
                                        <motion.span
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{ repeat: Infinity, duration: 1 }}
                                            className="text-gray-500"
                                        >
                                            ...
                                        </motion.span>
                                    </motion.div>
                                )}
                                <div ref={messagesEndRef}></div>
                            </AnimatePresence>
                        </div>

                        {/* FAQ Buttons */}
                        <div className="flex bg-gray-50 flex-wrap items-start gap-2 p-3 
                        ">
                            {faqList.map((faq) => (
                                <motion.button
                                    key={faq._id}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleClick(faq.question)}
                                    className="text-sm bg-gray-200 hover:bg-green-100 text-gray-800 rounded-full px-3 py-2 transition-all duration-200 shadow-sm"
                                >
                                    {faq.question}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
