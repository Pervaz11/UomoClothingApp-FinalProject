// src/pages/Success.tsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../features/cartSlice";

const PaymentSuccess = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCart());
        localStorage.removeItem("cart");
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-3">
                ✅ Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
                Your order has been placed successfully.
            </p>
            <a
                href="/"
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
                Return Home
            </a>
        </div>
    );
};

export default PaymentSuccess;
