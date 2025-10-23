import { useState } from "react";
import { FaRegHandPointRight } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";

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
        <>
            <form
                onSubmit={handleSubmit}
                className="lg:w-[45%] w-[95%] mx-auto my-16 flex flex-col items-center gap-12"
            >
                <span className="text-black lg:text-7xl text-5xl capitalize font-bold">
                    login
                </span>
                <div className="w-full flex flex-col items-start gap-6">
                    <div className="bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
                        <input
                            type="email"
                            placeholder="Email"
                            className="bg-transparent border-none outline-none w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between gap-3 bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="bg-transparent border-none outline-none w-full"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {showPassword ? (
                            <IoEye
                                className="text-2xl cursor-pointer"
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <IoEyeOff
                                className="text-2xl cursor-pointer"
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <Link to="/auth/forgot-password" className="text-xl text-black relative group">
                        Forgot password?
                        <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black transition-all duration-400 group-hover:w-0"></span>
                    </Link>
                    <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6">
                        <button
                            type="submit"
                            className="border bg-black text-white py-5 rounded-4xl cursor-pointer"
                        >
                            Sign in
                        </button>
                        <Link
                            to="/register"
                            className="w-full border bg-black text-white py-5 rounded-4xl cursor-pointer flex items-center justify-center"
                        >
                            Create account
                        </Link>
                    </div>
                </div>
                <Link to="/" className="flex items-center justify-center gap-3">
                    <FaRegHandPointRight className="text-xl mt-1" />
                    <span className="text-2xl">Return to Store</span>
                </Link>
            </form>
        </>
    );
};

export default Login;
