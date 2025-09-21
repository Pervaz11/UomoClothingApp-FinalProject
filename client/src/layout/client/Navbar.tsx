import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.webp"
import { FaUserPlus } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { LuShoppingBasket } from 'react-icons/lu';
import NotificationDropdown from '../../components/NotificationDropdown';



const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [notifications, setNotifications] = useState<string[]>([

    ]);

    useEffect(() => {
        const handler = (e: any) => {
            const message = e?.detail ?? "New notification";
            setNotifications(prev => [message, ...prev]);
        };
        window.addEventListener('new-notification', handler);
        return () => window.removeEventListener('new-notification', handler);
    }, []);

    return (
        <nav
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="w-full px-4 py-3 md:px-6 md:py-4 z-10 flex justify-between items-center shadow-sm bg-white"
        >
            {/* Logo */}
            <div className='flex items-center gap-4'>
                <Link to={"/"} className='flex items-center gap-2 text-gray-800 text-2xl font-bold'>
                    <img
                        className='w-25 hover:scale-105 transition-transform duration-500 ease-in-out'
                        src={logo}
                        alt="navbar logo"
                    />
                    <h3></h3>
                </Link>
            </div>

            {/* Desktop Links */}
            <ul className='hidden md:flex gap-4 font-medium uppercase text-sm tracking-wide'>
                <li>
                    <Link to="/" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300  dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-7">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/Shop" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300  dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-10">
                        Shop
                    </Link>
                </li>
                <li>
                    <Link to="/About" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300  dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-7">
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/Contact" className="text-gray-700 hover:text-black transition relative px-4 py-2 duration-300  dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-9">
                        Contact
                    </Link>
                </li>
            </ul>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
                <NotificationDropdown notifications={notifications} />


                <Link
                    to="/login"
                    className="inline-flex uppercase items-center gap-2 rounded-md border border-slate-700 py-1.5 px-4 text-slate-700 font-semibold hover:bg-slate-800 hover:text-white transition"
                >
                    <FaUserPlus className="text-lg" />
                    Login
                </Link>

                <Link
                    to={"/wishlist"}
                    className="p-1 rounded-full hover:bg-gray-200 transition"
                >
                    <IoMdHeartEmpty className="text-3xl text-gray-700" />
                </Link>
                <Link
                    to={"/adToCart"}
                    className="rounded-full hover:bg-gray-200 transition"
                >
                    <LuShoppingBasket className="text-3xl text-gray-700" />
                </Link>
            </div>


            {/* Mobile Menu Icon */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className='md:hidden text-3xl p-1'
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth="1.5" stroke="currentColor"
                    className={`w-8 h-8 transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

            {/* Mobile Dropdown */}
            <div
                className={`absolute z-999 top-16 left-0 w-full bg-white shadow-md md:hidden transition-all duration-500 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <ul className="flex flex-col gap-1 px-4 py-4">
                    <li>
                        <Link to="/" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Home</Link>
                    </li>
                    <li>
                        <Link to="/Apartments" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Shop</Link>
                    </li>
                    <li>
                        <Link to="/About" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">About</Link>
                    </li>
                    <li>
                        <Link to="/Contact" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Contact</Link>
                    </li>
                </ul>
                {/* Mobile Actions */}
                <div className="flex flex-col gap-2 border-t border-gray-200 px-4 py-3">
                    {/* Notifications */}
                    <div className="relative flex items-center justify-center w-full rounded-md border border-slate-300 py-2 text-slate-700 font-semibold hover:bg-slate-100 transition">
                        <NotificationDropdown notifications={notifications} />
                        <h2>Notification</h2>
                    </div>


                    {/* Login */}
                    <Link
                        to="/auth/login"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-slate-700 py-2 text-slate-700 font-semibold hover:bg-slate-800 hover:text-white transition"
                    >
                        <FaUserPlus className="text-lg" />
                        Login
                    </Link>

                    {/* Wishlist & Basket Row */}
                    <div className="flex items-center justify-center gap-4 py-2">
                        <Link
                            to={"/"}
                            className="p-2 rounded-full border border-slate-300 hover:bg-gray-100 transition"
                        >
                            <IoMdHeartEmpty className="text-2xl text-gray-700" />
                        </Link>

                        <Link
                            to={"/"}
                            className="p-2 rounded-full border border-slate-300 hover:bg-gray-100 transition"
                        >
                            <LuShoppingBasket className="text-2xl text-gray-700" />
                        </Link>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;

