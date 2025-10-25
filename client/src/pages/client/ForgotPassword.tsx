import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { forgotPassword } from "../../api/userApi";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await forgotPassword(email);
            enqueueSnackbar(res.message, { variant: "success" });
        } catch (error: any) {
            enqueueSnackbar(error?.message || "An error occurred.", { variant: "error" });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl p-8 w-full max-w-md"
            >
                {/* Başlıq */}
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-semibold text-center mb-3"
                >
                    Forgot Password?
                </motion.h2>
                <p className="text-center text-gray-600 mb-8 text-sm">
                    Enter your <span className="text-gray-900 font-medium">registered email</span> to reset your password.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-gray-500" size={18} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition bg-white"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-3 bg-black text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-all"
                    >
                        <Send size={18} />
                        Send Reset Link
                    </motion.button>
                </form>

                {/* Geri keçid */}
                <div className="mt-8 text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center gap-2 text-gray-700 hover:text-black font-medium transition-all group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
