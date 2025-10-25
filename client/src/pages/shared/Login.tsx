import { useState } from "react";
import { motion } from "framer-motion";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import { LogIn, UserPlus, Hand } from "lucide-react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post("http://localhost:3000/auth/login", {
                email,
                password,
            });
            dispatch(
                setUser({
                    id: res.data.user.id,
                    email: res.data.user.email,
                    role: res.data.user.role,
                    fullName: res.data.user.fullName,
                    username: res.data.user.username,
                    profileImage: res.data.user.profileImage,
                    phoneNumber: res.data.user.phoneNumber,
                    token: res.data.token,
                })
            );
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login xətası");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200"
            >
                <motion.h2
                    className="text-3xl font-semibold text-center mb-8 tracking-tight"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Welcome Back!
                </motion.h2>

                <div className="space-y-5">
                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition bg-white"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition bg-white pr-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-800"
                        >
                            {showPassword ? (
                                <IoEyeOff size={20} />
                            ) : (
                                <IoEye size={20} />
                            )}
                        </button>
                    </div>

                    {error && (
                        <motion.div
                            className="text-red-500 text-sm text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Forgot Password */}
                    <motion.div
                        className="text-right"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            to="/auth/forgot-password"
                            className="text-sm text-gray-600 hover:text-black transition group relative"
                        >
                            Forgot password?
                            <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black transition-all duration-300 group-hover:w-0"></span>
                        </Link>
                    </motion.div>
                </div>

                {/* Buttons */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <motion.button
                        type="submit"
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center justify-center gap-2 py-3 bg-black text-white rounded-lg font-medium tracking-wide hover:bg-gray-800 transition-all"
                    >
                        <LogIn size={18} />
                        Sign in
                    </motion.button>

                    <Link
                        to="/register"
                        className="flex items-center justify-center gap-2 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
                    >
                        <UserPlus size={18} />
                        Create account
                    </Link>
                </div>
            </motion.form>
        </div>
    );
};

export default Login;
