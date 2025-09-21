import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import ModalImg from "../assets/newsletter-popup.jpg"

const NewsletterModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitted email:", email);

        window.dispatchEvent(new CustomEvent('new-notification', {
            detail: "Thanks for subscribe!"
        }));

        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center 
                               bg-black/30 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: -50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: -50 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-white max-w-3xl w-full mx-4 md:flex rounded-lg 
                                   overflow-hidden shadow-2xl relative"
                    >
                        {/* Image */}
                        <div className="md:w-1/2">
                            <img
                                src={ModalImg}
                                alt="Newsletter"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="md:w-1/2 p-6 flex flex-col justify-center relative">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                <IoMdClose />
                            </button>

                            <h2 className="text-2xl font-semibold mb-4">
                                Sign Up to Our Newsletter
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Be the first to get the latest news about trends, promotions, and
                                much more!
                            </p>

                            <form onSubmit={handleSubmit} className=" gap-2">
                                <input
                                    type="email"
                                    required
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 border w-full border-gray-300 rounded-md px-4 py-2 
                                               focus:outline-none focus:ring-2 focus:ring-slate-400"
                                />
                                <button
                                    type="submit"
                                    className="bg-gray-900 my-2 w-full text-white px-4 py-2 rounded-md 
                                               hover:bg-gray-700 transition"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NewsletterModal;
