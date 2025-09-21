import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send } from "lucide-react";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300"
            >
                <MessageCircle size={28} />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 60, scale: 0.9 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute bottom-24 right-0 w-80 md:w-96 h-[28rem] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gray-800 text-white flex justify-between items-center px-4 py-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="enable-background:new 0 0 32 32"><path d="M16 31C7.729 31 1 24.271 1 16S7.729 1 16 1s15 6.729 15 15-6.729 15-15 15zm0-28C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3z" /><circle cx="16" cy="15.133" r="4.267" /><path d="M16 30c2.401 0 4.66-.606 6.635-1.671-.425-3.229-3.18-5.82-6.635-5.82s-6.21 2.591-6.635 5.82A13.935 13.935 0 0 0 16 30z" /></svg>
                                </div>
                                <div>
                                    <h2 className="text-sm font-black tracking-wider">UOM<span className="text-red-700">O</span></h2>
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

                        {/* Body */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white shadow-sm p-3 rounded-lg max-w-[80%] text-sm"
                            >
                                👋 Salam! Sizə necə kömək edə bilərik?
                            </motion.div>

                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="bg-blue-500 text-white shadow-sm p-3 rounded-lg max-w-[80%] ml-auto text-sm"
                            >
                                Mənə məhsullar haqqında məlumat lazımdır.
                            </motion.div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-400 p-3 flex items-center gap-2 bg-white">
                            <input
                                type="text"
                                placeholder="Mesajınızı yazın..."
                                className="flex-1 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                            />
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
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
