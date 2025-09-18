import { Link, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();

    const message = searchParams.get("message");
    return (
        <div className="flex items-center justify-center my-24 px-4">
            <div className=" bg-gray-100 shadow-lg rounded-2xl p-8 max-w-md text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {message} ✅
                </h2>
                <p className="text-gray-600 mb-6">
                    Your email has been successfully verified. You can now log in to your
                    account.
                </p>
                <Link
                    to="/login"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-xl transition duration-300"
                >
                    Jump Right Back to Login
                </Link>
            </div>
        </div>
    );
};

export default VerifyEmail;
