import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import forgotPasswordValidationSchema from "../../../src/validations/forgotPasswordValidation";
import { Link } from "react-router-dom";
import { post } from "../../../src/services/commonRequest";
import { endpoints } from "../../../src/services/api";

const ForgotPassword = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: forgotPasswordValidationSchema,
        onSubmit: async (values, actions) => {
            console.log("values: ", values);
            const res: {
                message: string;
                statusCode?: number;
            } = await post(`${endpoints.auth}/forgot-password`, {
                email: values.email,
            });
            console.log("resp: ", res);
            if (res.statusCode == 401) {
                enqueueSnackbar(res.message, {
                    autoHideDuration: 2000,
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                    variant: "error",
                });
            } else {
                enqueueSnackbar(res.message || "Reset password email was sent!", {
                    autoHideDuration: 2000,
                    anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right",
                    },
                    variant: "success",
                });
            }

            actions.resetForm();
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
                    Forgot Password
                </h2>

                <p className="text-center text-gray-600 mb-6 text-sm">
                    Enter your email address below and we'll send you a link to reset your
                    password.
                </p>

                <form onSubmit={formik.handleSubmit} className="space-y-5 text-sm">
                    <div>
                        <label
                            htmlFor="email"
                            className="block font-medium text-gray-700 mb-1"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={formik.values.email}
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {formik.errors.email && formik.touched.email && (
                            <span className="text-red-500 text-sm">
                                {formik.errors.email}
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
                        className="w-full py-3 disabled:bg-blue-400 disabled:cursor-not-allowed cursor-pointer  bg-blue-600  text-white font-semibold rounded-xl transition"
                    >
                        Send Reset Link
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Remember your password?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
