import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { FaUserPlus, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuShoppingBasket } from "react-icons/lu";
import NotificationDropdown from "../../components/NotificationDropdown";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store/store";
import { logoutUser } from "../../features/userSlice";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState<string[]>([]);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const dispatch = useDispatch();

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const user = useSelector((state: RootState) => state.user);
    const isLoggedIn = Boolean(user?.email);

    useEffect(() => {
        const handler = (e: any) => {
            const message = e?.detail ?? "New notification";
            setNotifications((prev) => [message, ...prev]);
        };
        window.addEventListener("new-notification", handler);
        return () => window.removeEventListener("new-notification", handler);
    }, []);

    const handleLogout = () => {
        dispatch(logoutUser());
        setIsProfileDropdownOpen(false);
    };

    return (
        <nav
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="w-full px-4 py-3 md:px-6 md:py-4 z-10 flex justify-between items-center shadow-sm bg-white"
        >
            {/* Logo */}
            <div className="flex items-center gap-4">
                <Link
                    to={"/"}
                    className="flex items-center gap-2 text-gray-800 text-2xl font-bold"
                >
                    <img
                        className="w-25 hover:scale-105 transition-transform duration-500 ease-in-out"
                        src={logo}
                        alt="navbar logo"
                    />
                </Link>
            </div>

            {/* Desktop Links */}
            <ul className="hidden md:flex gap-4 font-medium uppercase text-sm tracking-wide">
                <li>
                    <Link to="/" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300  dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-7">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/shop" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300  dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-7">
                        Shop
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300  dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-7">
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/contact" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300  dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-7">
                        Contact
                    </Link>
                </li>
            </ul>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
                <NotificationDropdown notifications={notifications} />

                {/* 🔥 Modern User Section */}
                {isLoggedIn ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            className="flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1.5 text-gray-800 font-semibold hover:bg-gray-100 transition duration-300 shadow-sm hover:shadow-md"
                        >
                            <img
                                src={
                                    user.profileImage ||
                                    "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg"
                                }
                                alt={user.fullName || user.username}
                                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                            />
                            <span className="text-sm">{user.fullName || user.username}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className={`w-4 h-4 transition-transform duration-300 ${isProfileDropdownOpen ? "rotate-180" : ""
                                    }`}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        {/* Animated Dropdown */}
                        <AnimatePresence>
                            {isProfileDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 z-50"
                                >
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsProfileDropdownOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        <FaUserCircle className="w-5 h-5 text-gray-500" />
                                        Profile
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        <FaSignOutAlt className="w-5 h-5 text-gray-500" />
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="inline-flex uppercase items-center gap-2 rounded-full border border-gray-300 py-1.5 px-4 text-gray-800 font-semibold hover:bg-gray-100 hover:shadow-md transition duration-300"
                    >
                        <FaUserPlus className="text-lg" />
                        Login
                    </Link>
                )}

                <Link to="/wishlist" className="p-1 rounded-full hover:bg-gray-200 transition">
                    <IoMdHeartEmpty className="text-3xl text-gray-700" />
                </Link>

                <Link to="/addToCart" className="relative rounded-full hover:bg-gray-200 transition p-2">
                    <LuShoppingBasket className="text-3xl text-gray-700" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>

            {/* Mobile Menu Icon */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-3xl p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`w-8 h-8 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

            {/* Mobile Dropdown */}
            <div className={`absolute z-999 top-16 left-0 w-full bg-white shadow-md md:hidden transition-all duration-500 overflow-hidden ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="flex flex-col gap-1 px-4 py-4">
                    <li><Link to="/" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Home</Link></li>
                    <li><Link to="/shop" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Shop</Link></li>
                    <li><Link to="/about" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">About</Link></li>
                    <li><Link to="/contact" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Contact</Link></li>
                </ul>

                {/* Mobile Actions */}
                <div className="flex flex-col gap-2 border-t border-gray-200 px-4 py-3">
                    <NotificationDropdown notifications={notifications} />

                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="w-full flex items-center justify-center gap-2 rounded-full border border-slate-700 py-2 text-slate-700 font-semibold hover:bg-slate-800 hover:text-white transition"
                            >
                                <img
                                    src={user.profileImage || "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.jpg"}
                                    alt={user.fullName || user.username}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span>{user.fullName || user.username}</span>
                            </button>

                            {isProfileDropdownOpen && (
                                <div className="mt-2 w-full bg-white shadow-lg rounded-md overflow-hidden">
                                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        <FaUserCircle className="w-5 h-5 text-gray-500" />
                                        Profile
                                    </Link>
                                    <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        <FaSignOutAlt className="w-5 h-5 text-gray-500" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-slate-700 py-2 text-slate-700 font-semibold hover:bg-slate-800 hover:text-white transition">
                            <FaUserPlus className="text-lg" />
                            Login
                        </Link>
                    )}

                    <div className="flex items-center justify-center gap-4 py-2">
                        <Link to="/wishlist" className="p-2 rounded-full border border-slate-300 hover:bg-gray-100 transition">
                            <IoMdHeartEmpty className="text-2xl text-gray-700" />
                        </Link>
                        <Link to="/cart" className="relative p-2 rounded-full border border-slate-300 hover:bg-gray-100 transition">
                            <LuShoppingBasket className="text-2xl text-gray-700" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
