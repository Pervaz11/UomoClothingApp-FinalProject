import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store/store";
import { removeFromCart, updateItemColor } from "../../features/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

const colors = ["Yellow", "Red", "Blue", "Green"];

const AddToCart: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-8">
            {/* Left: Cart Items */}
            <div className="flex-1 space-y-6">
                <h1 className="text-4xl font-bold mb-6">Your Cart</h1>
                {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-lg">Your cart is empty.</p>
                ) : (
                    <AnimatePresence>
                        {cartItems.map((item) => (
                            <motion.div
                                key={item.productId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                layout
                                className="flex flex-col sm:flex-row items-center justify-between border rounded-lg p-4 hover:shadow-xl transition-shadow bg-white"
                            >
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                    <div className="flex flex-col">
                                        <h2 className="font-semibold text-lg">{item.title}</h2>
                                        <p className="text-gray-600">
                                            ${item.price.toFixed(2)} x {item.quantity}
                                        </p>
                                        <div className="flex gap-2 mt-2">
                                            {colors.map((color) => (
                                                <div
                                                    key={color}
                                                    onClick={() =>
                                                        dispatch(updateItemColor({ id: item.productId, color }))
                                                    }
                                                    className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-200 ${item.color === color ? "border-black scale-110" : "border-gray-300"
                                                        }`}
                                                    style={{ backgroundColor: color.toLowerCase() }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => dispatch(removeFromCart(item.productId))}
                                    className="mt-4 sm:mt-0 text-red-500 hover:underline font-semibold"
                                >
                                    Remove
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Right: Cart Totals */}
            <motion.div
                className="w-full lg:w-80 p-6 border rounded-lg shadow-md sticky top-6 h-max bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <h2 className="text-2xl font-bold mb-6">Cart Totals</h2>
                <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span>VAT (10%)</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${(totalPrice * 1.1).toFixed(2)}</span>
                </div>
                <button
                    className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors font-semibold"
                >
                    Proceed to Checkout
                </button>
            </motion.div>
        </div>
    );
};

export default AddToCart;
