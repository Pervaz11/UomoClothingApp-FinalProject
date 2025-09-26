import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationProps = {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({
    currentPage,
    totalItems,
    pageSize,
    onPageChange,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / pageSize);
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center mt-6 gap-2">
            {/* Prev */}
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-indigo-600 hover:text-white transition disabled:opacity-40 disabled:hover:bg-gray-800"
            >
                <FaChevronLeft size={14} />
            </button>

            {/* Pages */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${page === currentPage
                            ? "bg-indigo-600 text-white shadow-md"
                            : "bg-gray-800 text-gray-300 hover:bg-indigo-500 hover:text-white"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Next */}
            <button
                onClick={() =>
                    currentPage < totalPages && onPageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-indigo-600 hover:text-white transition disabled:opacity-40 disabled:hover:bg-gray-800"
            >
                <FaChevronRight size={14} />
            </button>
        </div>
    );
}
