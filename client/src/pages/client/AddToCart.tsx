import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store/store";
import { removeFromCart, updateItemColor, increaseQuantity, decreaseQuantity } from "../../features/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react";

const colors = ["Yellow", "Red", "Blue", "Green"];

const AddToCart: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
                <h1 className="text-4xl font-extrabold flex items-center gap-3">
                    <ShoppingCart className="w-8 h-8 text-black" />
                    Your Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl">
                        <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg font-medium">Your cart is empty.</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {cartItems.map((item) => (
                            <motion.div
                                key={`${item.type}-${item.id}`}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                layout
                                className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all"
                            >
                                {/* Left: Image + Info */}
                                <div className="flex items-center gap-5 w-full sm:w-auto">
                                    <motion.img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-28 h-28 object-cover rounded-2xl shadow-md"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <h2 className="font-semibold text-lg">{item.title}
                                            <span className="text-xs text-gray-400"> ({item.type})</span>
                                        </h2>
                                        <p className="text-gray-600 font-medium">${item.price.toFixed(2)} x {item.quantity}</p>

                                        {/* Quantity */}
                                        <div className="flex items-center gap-3 mt-2">
                                            <button
                                                onClick={() => dispatch(decreaseQuantity({ id: item.id, type: item.type }))}
                                                className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                                                disabled={item.quantity <= 1}
                                            >-</button>
                                            <span className="font-medium w-5 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(increaseQuantity({ id: item.id, type: item.type }))}
                                                className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                                                disabled={item.quantity >= item.stock}
                                            >+</button>
                                            <span className="text-sm text-gray-400 ml-2">Stock: {item.stock}</span>
                                        </div>

                                        {/* Color Picker */}
                                        {item.type === "product" && (
                                            <div className="flex gap-2 mt-3">
                                                {colors.map((color) => (
                                                    <motion.button
                                                        key={color}
                                                        onClick={() => dispatch(updateItemColor({ id: item.id, type: item.type, color }))}
                                                        className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-all`}
                                                        style={{ backgroundColor: color.toLowerCase(), borderColor: item.color === color ? 'black' : 'transparent' }}
                                                        whileHover={{ scale: 1.2 }}
                                                        animate={{ scale: item.color === color ? 1.2 : 1 }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right: Remove Button */}
                                <motion.button
                                    onClick={() => dispatch(removeFromCart({ id: item.id, type: item.type }))}
                                    className="mt-4 sm:mt-0 flex items-center gap-1 text-red-500 hover:text-red-600 font-semibold"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Remove
                                </motion.button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {/* Order Summary stays the same */}
            <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-2xl bg-gradient-to-br border-dashed from-gray-50 to-white border shadow-md h-max sticky top-6"
            >
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">VAT (10%)</span>
                        <span className="font-medium">${(totalPrice * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${(totalPrice * 1.1).toFixed(2)}</span>
                    </div>
                </div>

                <button className="mt-6 w-full bg-black text-white py-3 rounded-xl font-semibold shadow hover:bg-gray-900 transition-colors">
                    Proceed to Checkout
                </button>
            </motion.div>
        </div>
    );
};

export default AddToCart;
