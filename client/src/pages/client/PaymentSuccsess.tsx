import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../features/cartSlice";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        dispatch(clearCart());
        localStorage.removeItem("cart");

        const timer = setTimeout(() => setShowConfetti(false), 6000);
        return () => clearTimeout(timer);
    }, [dispatch]);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 overflow-hidden text-center">
            {showConfetti && <Confetti recycle={false} numberOfPieces={400} />}

            <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 backdrop-blur-md"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
                    className="flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mx-auto mb-6"
                >
                    <span className="text-4xl">✅</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl font-bold text-gray-900 mb-3"
                >
                    Payment Successful!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-gray-600 mb-8"
                >
                    Your order has been placed successfully 🎉
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/")}
                    className="px-8 py-3 bg-black text-white rounded-lg font-medium shadow-md hover:bg-gray-800 transition-all"
                >
                    Return Home
                </motion.button>
            </motion.div>

            <motion.div
                className="absolute top-10 left-10 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-40"
                animate={{ y: [0, 20, 0], opacity: [0.4, 0.6, 0.4] }}
                transition={{ repeat: Infinity, duration: 6 }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-40"
                animate={{ y: [0, -20, 0], opacity: [0.4, 0.6, 0.4] }}
                transition={{ repeat: Infinity, duration: 6 }}
            />
        </div>
    );
};

export default PaymentSuccess;
