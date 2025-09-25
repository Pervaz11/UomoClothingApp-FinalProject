import React from "react";

export default function Pagination({ page, setPage }) {
    const totalPages = 5;

    return (
        <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-2">
                <button
                    onClick={() => setPage((p: number) => Math.max(p - 1, 1))}
                    className="px-3 py-1 border rounded hover:bg-gray-200 transition"
                    disabled={page === 1}
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 border rounded transition ${page === i + 1
                            ? "bg-indigo-600 text-white"
                            : "hover:bg-gray-200"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setPage((p: number) => Math.min(p + 1, totalPages))}
                    className="px-3 py-1 border rounded hover:bg-gray-200 transition"
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </nav>
        </div>
    );
}
