import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { toggleStatusTab } from "../components/Cart";
import { type RootState } from "../store/store";

const CartTab: React.FC = () => {
    const carts = useSelector((store: RootState) => store.cart.items);
    const statusTab = useSelector((store: RootState) => store.cart.statusTab);
    const dispatch = useDispatch();

    return (
        <div
            className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
    transform transition-transform duration-500
    ${statusTab === false ? "translate-x-full" : ""}`}
        >
            <h2 className="p-5 text-white text-2xl">Shopping Cart</h2>
            <div className="p-5">
                {carts.map((item, key) => (
                    <CartItem key={key} data={item} />
                ))}
            </div>
            <div className="grid grid-cols-2">
                <button
                    className="bg-black text-white"
                    onClick={() => dispatch(toggleStatusTab())}
                >
                    CLOSE
                </button>
                <button className="bg-amber-600 text-white">CHECKOUT</button>
            </div>
        </div>
    );
};

export default CartTab;
