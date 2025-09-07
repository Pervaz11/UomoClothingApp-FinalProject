import { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";

interface NotificationDropdownProps {
    notifications: string[];
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ notifications }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
                <FaBell className="text-2xl text-gray-700" />
                {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full shadow">
                        {notifications.length}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-700">Notifications</h4>
                    </div>

                    <ul className="max-h-60 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notif, i) => (
                                <li
                                    key={i}
                                    className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                                >
                                    {notif}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-6 text-center text-gray-400 text-sm">
                                No new notifications
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
