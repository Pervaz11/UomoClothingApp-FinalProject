import { useState, useEffect, useRef } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Props 
interface ContactFilterProps {
    filter: "all" | "read" | "unread";
    setFilter: (value: "all" | "read" | "unread") => void;
}

export default function ContactFilter({ filter, setFilter }: ContactFilterProps) {
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const handleSelect = (value: "all" | "read" | "unread"): void => {
        setFilter(value);
        setOpen(false);
    };

    // Click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent): void => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            {/* Filter Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-xl transition-all duration-300 shadow-md"
            >
                <Filter className="w-5 h-5 text-indigo-400" />
                <span className="hidden sm:inline font-semibold tracking-wide">
                    {filter.toUpperCase()}
                </span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-20 overflow-hidden"
                    >
                        {(["all", "unread", "read"] as const).map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSelect(option)}
                                className={`block w-full text-left px-4 py-2 text-sm capitalize transition-all ${filter === option
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-300 hover:bg-gray-700"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
