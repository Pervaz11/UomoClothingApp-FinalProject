import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import resetPasswordValidationSchema from "../../validations/resetPasswordValidation";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { post } from "../../../src/services/commonRequest";
import { endpoints } from "../../../src/services/api";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    let error: boolean = false;
    let decoded:
        | {
            email: string;
            id: string;
            iat: Date;
            exp: Date;
        }
        | undefined = undefined;
    if (token) {
        try {
            decoded = jwtDecode(token);
        } catch (err) {
            console.log("err: ", err);
            error = true;
        }
    }

    useEffect(() => {
        if (error) {
            navigate("/login");
        }
    }, [navigate, error]);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
        validationSchema: resetPasswordValidationSchema,
        onSubmit: async (values, actions) => {
            try {
                console.log("values", values);
                console.log("decoded:", decoded);
                const res = await post(`${endpoints.auth}/reset-password`, {
                    newPassword: values.newPassword,
                    email: decoded?.email,
                });
                actions.resetForm();
                const r = res as any;
                if (r && (r.statusCode === 200 || r.success)) {
                    enqueueSnackbar("Password reset successfully!", {
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                        variant: "success",
                        autoHideDuration: 2000,
                        style: { backgroundColor: '#22c55e', color: '#fff' },
                    });
                    setTimeout(() => {
                        console.log("navigating to login");
                        navigate("/login", { replace: true });
                    }, 1200);
                } else {
                    enqueueSnackbar(r?.message || "Password reset failed!", {
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right",
                        },
                        variant: "error",
                        autoHideDuration: 2000,
                    });
                }
            } catch (err: any) {
                enqueueSnackbar(err?.response?.data?.message || err.message || "Password reset error!", {
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                    variant: "error",
                    autoHideDuration: 2000,
                });
            }
        },
    });
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    Reset Password
                </h2>

                <form onSubmit={formik.handleSubmit} className="space-y-5 text-sm">
                    <div>
                        <label
                            htmlFor="newPassword"
                            className="block font-medium text-gray-700 mb-1"
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                required
                                name="newPassword"
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                onClick={() => setShowNewPassword((prev) => !prev)}
                                aria-label={showNewPassword ? "Hide password" : "Show password"}
                            >
                                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {formik.errors.newPassword && formik.touched.newPassword && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.newPassword}
                            </span>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block font-medium text-gray-700 mb-1"
                        >
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                name="confirmNewPassword"
                                value={formik.values.confirmNewPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {formik.errors.confirmNewPassword &&
                            formik.touched.confirmNewPassword && (
                                <span className="text-red-500 text-sm">
                                    {formik.errors.confirmNewPassword}
                                </span>
                            )}
                    </div>

                    <button
                        disabled={
                            formik.isSubmitting ||
                            !formik.dirty ||
                            Object.entries(formik.errors).length > 0
                        }
                        type="submit"
                        className="w-full py-3 disabled:bg-blue-400 disabled:cursor-not-allowed cursor-pointer bg-blue-600 text-white font-semibold rounded-xl transition"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
