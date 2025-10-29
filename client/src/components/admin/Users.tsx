import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";

type User = {
    _id?: string;
    id?: string;
    fullName: string;
    email: string;
    profileImage: string;
    isBanned: boolean;
    role: string;
    createdAt: string;
};

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, setCurrentPage }: PaginationProps) => (
    <div className="flex justify-center mt-6 gap-4 items-center">
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentPage === 1}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className={`p-3 rounded-full ${currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
            <ChevronLeft size={20} />
        </motion.button>

        <span className="px-4 py-2 rounded-lg bg-gray-700 text-white font-medium">
            {currentPage} / {totalPages}
        </span>

        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentPage === totalPages}
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            className={`p-3 rounded-full ${currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
            <ChevronRight size={20} />
        </motion.button>
    </div>
);

const Dashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newRole, setNewRole] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/auth/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data.data || []);
            } catch (err: any) {
                setError(err.response?.data?.message || "Failed to load users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const totalPages = Math.ceil(users.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const currentUsers = users.slice(indexOfLastUser - usersPerPage, indexOfLastUser);

    const handleSave = async () => {
        if (!selectedUser) return;
        try {
            const token = localStorage.getItem("token");
            const userId = selectedUser._id || selectedUser.id;
            await axios.put(
                `http://localhost:3000/auth/users/${userId}`,
                { role: newRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            Swal.fire("Updated!", "User role updated successfully", "success");
            setUsers((prev) =>
                prev.map((u) => (u._id || u.id) === userId ? { ...u, role: newRole } : u)
            );
            setSelectedUser(null);
        } catch (err: any) {
            Swal.fire("Error", err.response?.data?.message || "Update failed", "error");
        }
    };

    const handleBan = async (userId: string) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This user will be banned and cannot log in.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e11d48",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, ban user",
        });
        if (!confirm.isConfirmed) return;

        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:3000/auth/users/${userId}/ban`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            Swal.fire("Banned!", "User has been banned successfully", "success");
            setUsers((prev) =>
                prev.map((u) => (u._id || u.id) === userId ? { ...u, isBanned: true } : u)
            );
        } catch (err: any) {
            Swal.fire("Error", err.response?.data?.message || "Failed to ban user", "error");
        }
    };

    const handleUnban = async (userId: string) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:3000/auth/users/${userId}/unban`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            Swal.fire("Unbanned!", "User has been unbanned successfully", "success");
            setUsers((prev) =>
                prev.map((u) => (u._id || u.id) === userId ? { ...u, isBanned: false } : u)
            );
        } catch (err: any) {
            Swal.fire("Error", err.response?.data?.message || "Failed to unban user", "error");
        }
    };

    if (loading) return <p className="text-gray-300 text-center mt-10">Loading users...</p>;
    if (error) return <p className="text-red-400 text-center mt-10">{error}</p>;

    return (
        <div className="min-h-screen p-6 sm:p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">User Management</h2>

            <div className="overflow-x-auto rounded-2xl shadow-lg bg-gray-800 border border-gray-700">
                <table className="w-full text-left text-gray-200">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="py-3 px-4">User</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Role</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, index) => (
                            <motion.tr
                                key={user._id || user.id || index}
                                className="bg-gray-800/60 hover:bg-gray-700 transition"
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <td className="py-3 px-4 flex items-center gap-3">
                                    <img
                                        src={user.profileImage}
                                        alt={user.fullName}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    {user.fullName}
                                </td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4 capitalize">{user.role}</td>
                                <td className="py-3 px-4">
                                    {user.isBanned ? (
                                        <span className="text-red-400 font-semibold">Banned</span>
                                    ) : (
                                        <span className="text-green-400 font-semibold">Active</span>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-right flex justify-end gap-2">
                                    <button
                                        onClick={() => { setSelectedUser(user); setNewRole(user.role); }}
                                        className="p-2 hover:bg-gray-600 rounded-xl transition"
                                    >
                                        <Settings className="w-5 h-5 text-gray-300" />
                                    </button>

                                    {user.isBanned ? (
                                        <button
                                            onClick={() => handleUnban(user._id || user.id!)}
                                            className="p-2 hover:bg-green-600 rounded-xl transition"
                                        >
                                            <span className="text-green-400 font-medium">Unban</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleBan(user._id || user.id!)}
                                            className="p-2 hover:bg-red-600 rounded-xl transition"
                                        >
                                            <span className="text-red-400 font-medium">Ban</span>
                                        </button>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

            {/* Modal */}
            <AnimatePresence>
                {selectedUser && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: -50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: -50 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="bg-gray-900 rounded-3xl shadow-2xl p-6 sm:p-8 w-11/12 max-w-md border border-gray-700"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Edit — {selectedUser.fullName}
                            </h3>

                            {/* Role Select */}
                            <div className="relative mb-6">
                                <motion.select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    whileFocus={{ scale: 1.02 }}
                                    className="w-full p-3 text-white bg-gray-800 border border-gray-700 rounded-xl appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="customer">Customer</option>
                                    <option value="curier">Courier</option>
                                    <option value="admin">Admin</option>
                                    <option value="superadmin">Super Admin</option>
                                </motion.select>

                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="px-5 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                                >
                                    Save
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
