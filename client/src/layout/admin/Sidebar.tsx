import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FiHome,
    FiUsers,
    FiBox,
    FiShoppingCart,
    FiCreditCard,
    FiBarChart2,
    FiMessageSquare,
    FiCalendar,
    FiMenu,
    FiX,
    FiLogOut,
    FiTag,
    FiMail,
} from "react-icons/fi";
import { MdQuestionMark } from "react-icons/md";

const navItems = [
    { section: null, label: "Dashboard", to: "/admin", icon: <FiHome /> },
    { section: "User Management" },
    { label: "Users", to: "/admin/users", icon: <FiUsers /> },
    { section: "Product Management" },
    { label: "Products", to: "/admin/products", icon: <FiBox /> },
    { section: "Ecommerce" },
    { label: "Orders", to: "/admin/orders", icon: <FiShoppingCart /> },
    { label: "Payments", to: "/admin/payments", icon: <FiCreditCard /> },
    { label: "Partners", to: "/admin/partners", icon: <FiUsers /> },
    { section: "Information Management" },
    { label: "Reports", to: "/admin/reports", icon: <FiBarChart2 /> },
    { section: "Apps" },
    { label: "Messages", to: "/admin/messages", icon: <FiMessageSquare />, badge: 16 },
    { label: "Calendar", to: "/admin/calendar", icon: <FiCalendar /> },
    { label: "Fag", to: "/admin/fag", icon: <MdQuestionMark /> },
    { label: "Newsletter", to: "/admin/newsletter", icon: <FiMail /> },
];


const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {!isDesktop && (
                <button
                    className="fixed top-5 z-99 left-5 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            )}

            {!isDesktop && isOpen && (
                <div
                    className="fixed min-h-screen inset-0 bg-opacity-50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{
                    x: isDesktop || isOpen ? 0 : -300,
                    opacity: isDesktop || isOpen ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="fixed md:static w-64 bg-gray-900 text-gray-200 flex flex-col shadow-xl top-0 bottom-0 z-40"
            >

                {/* Logo */}
                <div className="uppercase text-3xl py-5 flex justify-center border-b border-gray-700">
                    <NavLink to="/">
                        <div className="flex hover:scale-105 duration-300 items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-red-600" />
                            <h2 className="text-2xl font-black tracking-wider">UOM<span className="text-red-700">O</span></h2>
                        </div>
                    </NavLink>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <ul className="flex flex-col gap-1">
                        {navItems.map((item, i) =>
                            item.section ? (
                                <li
                                    key={i}
                                    className="px-3 pt-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
                                >
                                    {item.section}
                                </li>
                            ) : (
                                <li key={i}>
                                    <NavLink
                                        to={item.to || "#"}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                                ? "bg-gray-700 text-white"
                                                : "hover:bg-gray-800 hover:text-white"
                                            }`
                                        }
                                        onClick={() => !isDesktop && setIsOpen(false)}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="flex-1">{item.label}</span>
                                        {item.badge && (
                                            <span className="ml-auto text-xs bg-gray-600 text-white px-2 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                            )
                        )}
                    </ul>
                </nav>
                <Link
                    to="/"
                    className="flex items-center gap-2 px-4 py-5 mt-4 mx-4 text-white rounded-lg shadow  hover:scale-105 transition transform duration-300"
                >
                    <FiLogOut size={18} />
                    <span className="uppercase font-semibold">Logout</span>
                </Link>
            </motion.aside>
        </>
    );
};

export default AdminSidebar;