import { useState } from "react";
import { motion } from "framer-motion";
import { Users, CheckCircle, Settings } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type User = {
    id: number;
    name: string;
    email: string;
    verified: boolean;
    avatar: string;
    registered: string;
};

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
};

const USERS: User[] = [
    { id: 1, name: "Mark Smith", email: "mark@example.com", verified: true, avatar: "https://i.pravatar.cc/150?img=1", registered: "2024-08-12" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", verified: false, avatar: "https://i.pravatar.cc/150?img=2", registered: "2024-09-01" },
    { id: 3, name: "James Williams", email: "james@example.com", verified: true, avatar: "https://i.pravatar.cc/150?img=3", registered: "2024-09-05" },
    { id: 4, name: "Lisa Brown", email: "lisa@example.com", verified: true, avatar: "https://i.pravatar.cc/150?img=4", registered: "2024-09-10" },
    { id: 5, name: "Tom Hardy", email: "tom@example.com", verified: false, avatar: "https://i.pravatar.cc/150?img=5", registered: "2024-09-15" },
    { id: 6, name: "Emma Watson", email: "emma@example.com", verified: true, avatar: "https://i.pravatar.cc/150?img=6", registered: "2024-09-20" },
    { id: 7, name: "Chris Evans", email: "chris@example.com", verified: false, avatar: "https://i.pravatar.cc/150?img=7", registered: "2024-09-22" },
    { id: 8, name: "Robert Downey", email: "robert@example.com", verified: true, avatar: "https://i.pravatar.cc/150?img=8", registered: "2024-09-23" },
];

function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
    return (
        <div className="flex justify-center mt-6 space-x-4">
            {/* Previous Button */}
            <motion.button
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === 1}
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                className={`p-3 rounded-full transition ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-800 text-white hover:bg-blue-900"}`}
            >
                <ChevronLeft size={24} />
            </motion.button>

            {/* Next Button */}
            <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentPage === totalPages}
                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                className={`p-3 rounded-full transition ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-800 text-white hover:bg-blue-900"}`}
            >
                <ChevronRight size={24} />
            </motion.button>
        </div>
    );
}

export default function Dashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = USERS.slice(indexOfFirstUser, indexOfLastUser);

    const totalUsers = USERS.length;
    const verifiedUsers = USERS.filter((u) => u.verified).length;
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    return (
        <div className="min-h-screen text-white p-8">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <motion.div
                    className="relative p-6 hover:scale-99 duration-200 rounded-2xl shadow-lg bg-gradient-to-r from-blue-900 to-gray-800 overflow-hidden"
                >
                    <div className="absolute top-3 right-3 opacity-20">
                        <Users className="w-12 h-12" />
                    </div>
                    <h2 className="text-lg font-medium opacity-80">Total Users</h2>
                    <p className="text-4xl font-bold mt-2">{totalUsers}</p>
                </motion.div>

                <motion.div
                    className="relative p-6  hover:scale-99 duration-200 rounded-2xl shadow-lg bg-gradient-to-r from-green-700 to-green-900 overflow-hidden"
                >
                    <div className="absolute top-3 right-3 opacity-20">
                        <CheckCircle className="w-12 h-12" />
                    </div>
                    <h2 className="text-lg font-medium opacity-80">Verified Users</h2>
                    <p className="text-4xl font-bold mt-2">{verifiedUsers}</p>
                </motion.div>
            </div>

            {/* Recent Users */}
            <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Recent Users</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-gray-400 text-sm">
                                <th className="py-2 px-3">User</th>
                                <th className="py-2 px-3">Email</th>
                                <th className="py-2 px-3">Registered</th>
                                <th className="py-2 px-3">Status</th>
                                <th className="py-2 px-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <motion.tr
                                    key={user.id}
                                    className="bg-gray-700/60 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
                                >
                                    <td className="py-3 px-3 flex items-center gap-3 rounded-l-xl">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        {user.name}
                                    </td>
                                    <td className="py-3 px-3">{user.email}</td>
                                    <td className="py-3 px-3">{user.registered}</td>
                                    <td className="py-3 px-3">
                                        {user.verified ? (
                                            <span className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
                                                Not Verified
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 px-3 text-right rounded-r-xl">
                                        <button className="p-2 rounded-full hover:bg-gray-600 transition">
                                            <Settings className="w-5 h-5 text-gray-300" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}
