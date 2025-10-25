import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { Eye, EyeOff, Upload, User, Mail, Phone, Lock, LogIn } from "lucide-react";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import registerValidationSchema from "../../validations/registerValidation";

type RegisterFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;
    confirmPassword: string;
    file: File | null;
};

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [preview, setPreview] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik<RegisterFormValues>({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            username: "",
            password: "",
            confirmPassword: "",
            file: null,
        },
        validationSchema: registerValidationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setError("");
            setSuccess("");

            try {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    if (key === "file" && value) {
                        formData.append("profileImage", value as Blob);
                    } else {
                        formData.append(key, value as string);
                    }
                });

                await axios.post("http://localhost:3000/auth/register", formData);
                setSuccess("Registration successful!");
                setTimeout(() => navigate("/login"), 1000);
                formik.resetForm();
                setPreview(null);
            } catch (err: any) {
                setError(err.response?.data?.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        formik.setFieldValue("file", file);
        if (file) setPreview(URL.createObjectURL(file));
        else setPreview(null);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
            <motion.form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
            >
                <motion.h2
                    className="text-3xl font-bold text-center mb-8 tracking-tight text-gray-800"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Create an Account
                </motion.h2>

                <div className="space-y-4">
                    {[
                        {
                            name: "firstName",
                            placeholder: "First Name",
                            type: "text",
                            icon: <User size={18} />,
                        },
                        {
                            name: "lastName",
                            placeholder: "Last Name",
                            type: "text",
                            icon: <User size={18} />,
                        },
                        {
                            name: "email",
                            placeholder: "Email Address",
                            type: "email",
                            icon: <Mail size={18} />,
                        },
                        {
                            name: "phoneNumber",
                            placeholder: "Phone Number",
                            type: "text",
                            icon: <Phone size={18} />,
                        },
                        {
                            name: "username",
                            placeholder: "Username",
                            type: "text",
                            icon: <FaUserAlt size={16} />,
                        },
                    ].map((field) => (
                        <div key={field.name} className="relative">
                            <span className="absolute left-3 top-3 text-gray-400">
                                {field.icon}
                            </span>
                            <input
                                type={field.type}
                                placeholder={field.placeholder}
                                {...formik.getFieldProps(field.name as keyof RegisterFormValues)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition bg-white"
                            />
                            {formik.touched[field.name as keyof RegisterFormValues] &&
                                formik.errors[field.name as keyof RegisterFormValues] && (
                                    <span className="text-red-500 text-sm">
                                        {
                                            formik.errors[
                                            field.name as keyof RegisterFormValues
                                            ] as string
                                        }
                                    </span>
                                )}
                        </div>
                    ))}

                    {/* Password */}
                    <div className="relative">
                        <Lock
                            size={18}
                            className="absolute left-3 top-3 text-gray-400 pointer-events-none"
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...formik.getFieldProps("password")}
                            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 bg-white"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-800"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {formik.touched.password && formik.errors.password && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.password}
                            </span>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <Lock
                            size={18}
                            className="absolute left-3 top-3 text-gray-400 pointer-events-none"
                        />
                        <input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm Password"
                            {...formik.getFieldProps("confirmPassword")}
                            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 bg-white"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-800"
                        >
                            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (
                                <span className="text-red-500 text-sm">
                                    {formik.errors.confirmPassword}
                                </span>
                            )}
                    </div>

                    {/* File Upload */}
                    <div className="relative border border-dashed border-gray-400 rounded-lg p-3 text-center hover:border-gray-600 transition">
                        <label className="cursor-pointer flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900">
                            <Upload size={18} />
                            Upload Profile Image
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-3 rounded-lg mx-auto w-20 h-20 object-cover shadow-md"
                            />
                        )}
                        {formik.touched.file && formik.errors.file && (
                            <span className="text-red-500 text-sm">{formik.errors.file}</span>
                        )}
                    </div>
                </div>

                <motion.button
                    type="submit"
                    disabled={loading}
                    whileTap={{ scale: 0.97 }}
                    className="w-full mt-8 py-3 bg-black text-white rounded-lg font-medium tracking-wide hover:bg-gray-800 transition-all"
                >
                    {loading ? "Loading..." : "Register"}
                </motion.button>

                <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-black 
                   font-medium transition-all duration-300 group"
                    >
                        <motion.span
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 
                       group-hover:bg-black transition-all duration-300"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                        >
                            <LogIn
                                size={18}
                                className="text-gray-700 group-hover:text-white transition-all duration-300"
                            />
                        </motion.span>

                        <span className="group-hover:underline group-hover:underline-offset-4">
                            Already have an account? <span className="font-semibold">Login</span>
                        </span>
                    </Link>
                </motion.div>
                {error && (
                    <motion.div
                        className="text-red-500 text-center mt-4 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {error}
                    </motion.div>
                )}
                {success && (
                    <motion.div
                        className="text-green-600 text-center mt-4 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {success}
                    </motion.div>
                )}
            </motion.form>
        </div>
    );
};

export default Register;
