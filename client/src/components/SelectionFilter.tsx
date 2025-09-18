import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CustomSelectProps = {
    sortOption: string;
    setSortOption: React.Dispatch<React.SetStateAction<string>>;
};

const CustomSelect: React.FC<CustomSelectProps> = ({ sortOption, setSortOption }) => {
    const [open, setOpen] = useState(false);

    const options = [
        { value: "default", label: "Default Sorting" },
        { value: "az", label: "A - Z" },
        { value: "za", label: "Z - A" },
        { value: "low-high", label: "Price: Low to High" },
        { value: "high-low", label: "Price: High to Low" },
    ];

    return (
        <div className="relative w-60 z-50">
            <button
                onClick={() => setOpen(!open)}
                className="w-full border-b px-4 py-2 text-sm text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-300"
            >
                {options.find((o) => o.value === sortOption)?.label}
                <span className={`transform transition-transform ${open ? "rotate-180" : ""}`}>
                    ▼
                </span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg overflow-hidden"
                    >
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => {
                                    setSortOption(option.value);
                                    setOpen(false);
                                }}
                                className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer transition-colors"
                            >
                                {option.label}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomSelect;
