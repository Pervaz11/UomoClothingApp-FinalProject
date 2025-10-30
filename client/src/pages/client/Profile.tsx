import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { FiCamera, FiEdit } from "react-icons/fi";

export default function ModernProfile() {
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    phoneNumber: "",
    profileImage: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const me = res.data.data[0];
      setUser(me);
      setForm({
        fullName: me.fullName,
        email: me.email,
        username: me.username,
        phoneNumber: me.phoneNumber || "",
        profileImage: me.profileImage,
      });
    } catch (err) {
      toast.error("Failed to fetch user data");
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append("profileImage", image);

    try {
      const res = await axios.put("http://localhost:3000/auth/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      fetchUser();
    } catch (err) {
      toast.error("Profile update failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-white">
        <p className="text-gray-400 text-xl animate-pulse">Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen p-10">
      <Toaster position="top-right" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto rounded-3xl grid grid-cols-12 gap-8"
      >
        {/* LEFT PANEL */}
        <div className="col-span-12 md:col-span-4 flex flex-col items-center pr-6">
          <div className="relative">
            <img
              src={preview || form.profileImage}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover shadow-lg ring-2 ring-purple-300"
            />
            <label className="absolute bottom-2 right-2 bg-purple-500 text-white p-2 rounded-full cursor-pointer hover:bg-purple-600 transition-all shadow-md">
              <FiCamera size={20} />
              <input type="file" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{form.fullName}</h2>
          <p className="text-gray-500">{form.username}</p>
          <div className="mt-6 w-full space-y-2">
            <h3 className="text-gray-700 font-semibold">Contact Info</h3>
            <div className="bg-white p-4 rounded-2xl flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-gray-400">Email:</span>
                <p className="text-gray-800 font-medium break-all">{form.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400">Phone:</span>
                <p className="text-gray-800 font-medium">{form.phoneNumber || "N/A"}</p>
              </div>
            </div>
          </div>


        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-12 md:col-span-8">
          <h3 className="text-gray-700 font-semibold mb-4">Profile Settings</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-200 placeholder-gray-400 shadow-sm transition"
              />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-200 placeholder-gray-400 shadow-sm transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                value={form.email}
                disabled
                className="p-3 rounded-xl bg-gray-200 cursor-not-allowed placeholder-gray-500 shadow-sm"
              />
              <input
                type="text"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="p-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-200 placeholder-gray-400 shadow-sm transition"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.50 }}
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full duration-700 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-shadow shadow-md"
            >
              {loading ? "Saving..." : "Save Changes"}
              <FiEdit />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
