import { useState } from "react";
import { GiMonkey } from "react-icons/gi";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import registerValidationSchema from "../../../src/validations/registerValidation";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../services/api";
import { Link } from "react-router-dom";

const Register = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (e.currentTarget.files && file) {
            setPreview(URL.createObjectURL(file));
            console.log("FILE: ", file);
            formik.setFieldValue("file", e.currentTarget.files[0]);
        }
    };

    const formik = useFormik<{
        fullName: string;
        username: string;
        email: string;
        phone: string;
        file: File | null;
        password: string;
        confirmPassword: string;
    }>({
        initialValues: {
            fullName: "",
            username: "",
            email: "",
            phone: "",
            file: null,
            password: "",
            confirmPassword: "",
        },
        validationSchema: registerValidationSchema,
        onSubmit: async (values, actions) => {
            const formData = new FormData();
            formData.append("fullName", values.fullName);
            formData.append("username", values.username);
            formData.append("email", values.email);
            formData.append("password", values.password);
            if (values.phone) {
                formData.append("phoneNumber", values.phone);
            }

            if (values.file) {
                formData.append("profileImage", values.file);
            }

            try {
                const response = await axios.post(
                    `${API_BASE_URL}/auth/register`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                console.log("response:", response);
                actions.resetForm();
                setPreview(null); // clear preview
                enqueueSnackbar("registered successfully, verify your email!", {
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                    autoHideDuration: 2000,
                    variant: "success",
                });
                navigate("/login");
            } catch (error) {
                let message = "Registration failed";
                if (
                    typeof error === "object" &&
                    error !== null &&
                    "response" in error &&
                    error.response &&
                    typeof error.response === "object" &&
                    "data" in error.response &&
                    error.response.data &&
                    typeof error.response.data === "object" &&
                    "message" in error.response.data &&
                    typeof error.response.data.message === "string"
                ) {
                    message = error.response.data.message;
                }
                enqueueSnackbar(message, {
                    autoHideDuration: 2000,
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                    variant: "error",
                });
                values.email = "";
                values.username = "";
            }
        },
    });


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
            <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    Create Your Account
                </h2>

                {/* Google Sign Up */}
                <button
                    onClick={() => {
                        window.location.href = `http://localhost:3000/auth/google/callback`;
                    }}
                    className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl hover:bg-blue-50 transition mb-6"
                >
                    <FcGoogle size={22} />
                    <span className="text-sm font-medium text-gray-700">
                        Sign up with Google
                    </span>
                </button>

                {/* Divider */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                            or sign up with email
                        </span>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={formik.handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
                >
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-blue-400 focus:outline-none focus:ring-2"
                            placeholder="Full name"
                        />
                        {formik.errors.fullName && formik.touched.fullName && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.fullName}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-blue-400 focus:outline-none focus:ring-2"
                            placeholder="Username"
                        />
                        {formik.errors.username && formik.touched.username && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.username}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-blue-400 focus:outline-none focus:ring-2"
                            placeholder="Email"
                        />
                        {formik.errors.email && formik.touched.email && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.email}
                            </span>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">
                            Phone <span className="text-gray-400 text-xs">(optional)</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-blue-400 focus:outline-none focus:ring-2"
                            placeholder="(+994)-XX-XXX-XX-XX"
                        />
                        {formik.errors.phone && formik.touched.phone && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.phone}
                            </span>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block font-medium text-gray-700 mb-1">
                            Profile Image{" "}
                            <span className="text-gray-400 text-xs">(optional)</span>
                        </label>
                        <input
                            type="file"
                            name="file"
                            onBlur={formik.handleBlur}
                            onChange={handleImageChange}
                            className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:border file:border-gray-300 file:rounded-lg file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {formik.errors.file && formik.touched.file && (
                            <span className="text-red-500 text-sm">{formik.errors.file}</span>
                        )}
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 h-16 w-16 object-cover rounded-2xl border border-gray-300"
                            />
                        )}
                    </div>

                    <div className="relative">
                        <label className="block font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-blue-400 focus:outline-none focus:ring-2 pr-12"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute right-3 top-9 text-2xl text-yellow-700 hover:text-yellow-900 focus:outline-none"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
                        >
                            {showPassword ? <GiMonkey /> : <FaRegEyeSlash />}
                        </button>
                        {formik.errors.password && formik.touched.password && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.password}
                            </span>
                        )}
                    </div>

                    <div className="relative">
                        <label className="block font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-blue-400 focus:outline-none focus:ring-2 pr-12"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute right-3 top-9 text-2xl text-yellow-700 hover:text-yellow-900 focus:outline-none"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            aria-label={showConfirmPassword ? "Şifrəni gizlət" : "Şifrəni göstər"}
                        >
                            {showConfirmPassword ? <GiMonkey /> : <FaRegEyeSlash />}
                        </button>
                        {formik.errors.confirmPassword &&
                            formik.touched.confirmPassword && (
                                <span className="text-red-500 text-sm">
                                    {formik.errors.confirmPassword}
                                </span>
                            )}
                    </div>

                    <div className="md:col-span-2">
                        <button
                            disabled={
                                formik.isSubmitting ||
                                !formik.dirty ||
                                Object.entries(formik.errors).length > 0
                            }
                            type="submit"
                            className="w-full py-3 disabled:bg-blue-400 disabled:cursor-not-allowed cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition mt-2"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;