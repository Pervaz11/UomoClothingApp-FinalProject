import React, { useState } from "react";
import { useFormik } from "formik";
import registerValidationSchema from "../../validations/registerValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [preview, setPreview] = useState<string | null>(null);
    const navigate = useNavigate();

    const formik = useFormik({
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
                        formData.append("profileImage", value as unknown as Blob);
                    } else {
                        formData.append(key, value as string);
                    }
                });
                await axios.post("http://localhost:3000/auth/register", formData);
                setSuccess("Qeydiyyat uğurla tamamlandı!");
                setTimeout(() => {
                    navigate("/login");
                }, 100);
                formik.resetForm();
                setPreview(null);
            } catch (err: any) {
                setError(err.response?.data?.message || "Xəta baş verdi");
            } finally {
                setLoading(false);
            }
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        formik.setFieldValue("file", file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Qeydiyyat</h2>
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Ad"
                            {...formik.getFieldProps("firstName")}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.firstName && formik.errors.firstName && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.firstName}
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Soyad"
                            {...formik.getFieldProps("lastName")}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.lastName}
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...formik.getFieldProps("email")}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.email}
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Telefon"
                            {...formik.getFieldProps("phoneNumber")}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.phoneNumber}
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="İstifadəçi adı"
                            {...formik.getFieldProps("username")}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.username && formik.errors.username && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.username}
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Şifrə"
                            {...formik.getFieldProps("password")}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.password}
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Şifrəni təsdiqlə"
                            {...formik.getFieldProps("confirmPassword")}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (
                                <span className="text-red-500 text-sm">
                                    {formik.errors.confirmPassword}
                                </span>
                            )}
                    </div>
                    <div>
                        <input
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-2 rounded"
                                width={80}
                            />
                        )}
                        {formik.touched.file && formik.errors.file && (
                            <span className="text-red-500 text-sm">{formik.errors.file}</span>
                        )}
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    {loading ? "Yüklənir..." : "Qeydiyyat"}
                </button>
                {error && <div className="text-red-500 text-center mt-4">{error}</div>}
                {success && (
                    <div className="text-green-600 text-center mt-4">{success}</div>
                )}
            </form>
        </div>
    );
};

export default Register;
