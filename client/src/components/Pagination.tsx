import React from "react";
import { motion } from "framer-motion";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    onPageClick: (num: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    totalPages,
    onPrev,
    onNext,
    onPageClick,
}) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="mt-12 flex items-center justify-center px-4" aria-label="Pagination">
            <div className="flex items-center gap-2">
                {/* Previous */}
                <motion.button
                    whileHover={{ x: -3 }}
                    onClick={onPrev}
                    disabled={page === 1}
                    className={`px-4 py-2 border rounded-md text-sm font-medium flex items-center gap-1 ${page === 1
                        ? "text-gray-400 border-gray-200 cursor-not-allowed"
                        : "text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                >
                    ← Previous
                </motion.button>

                {/* Page numbers */}
                {pages.map((num) => (
                    <button
                        key={num}
                        onClick={() => onPageClick(num)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition ${num === page
                            ? "bg-black text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {num}
                    </button>
                ))}

                {/* Next */}
                <motion.button
                    whileHover={{ x: 3 }}
                    onClick={onNext}
                    disabled={page === totalPages}
                    className={`px-4 py-2 border rounded-md text-sm font-medium flex items-center gap-1 ${page === totalPages
                        ? "text-gray-400 border-gray-200 cursor-not-allowed"
                        : "text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                >
                    Next →
                </motion.button>
            </div>
        </nav>
    );
};

export default Pagination;
