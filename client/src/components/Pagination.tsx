// Pagination.tsx
import React from "react";
import { motion } from "framer-motion";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    totalPages,
    onPrev,
    onNext,
}) => {
    if (totalPages <= 1) return null;

    return (
        <nav
            className="mt-12 flex flex-col sm:flex-row items-center justify-center px-4 gap-4"
            aria-label="Pagination"
        >
            {/* Previous */}
            <motion.button
                whileHover={{ x: -3 }}
                onClick={onPrev}
                disabled={page === 1}
                className={`px-6 py-2 border rounded-md text-sm font-medium flex items-center justify-center w-full sm:w-auto ${page === 1
                        ? "text-gray-400 border-gray-200 cursor-not-allowed"
                        : "text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
            >
                ← Previous
            </motion.button>

            {/* Next */}
            <motion.button
                whileHover={{ x: 3 }}
                onClick={onNext}
                disabled={page === totalPages}
                className={`px-6 py-2 border rounded-md text-sm font-medium flex items-center justify-center w-full sm:w-auto ${page === totalPages
                        ? "text-gray-400 border-gray-200 cursor-not-allowed"
                        : "text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
            >
                Next →
            </motion.button>
        </nav>
    );
};

export default Pagination;
