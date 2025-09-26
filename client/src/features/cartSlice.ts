import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



type CartItem = {
    [x: string]: string;
    productId: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

interface CartState {
    items: CartItem[];
}

// LocalStorage-dən oxu
const initialState: CartState = {
    items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find(
                (item) => item.productId === action.payload.productId
            );
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.productId !== action.payload
            );
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        updateItemColor: (
            state,
            action: PayloadAction<{ id: string; color: string }>
        ) => {
            const item = state.items.find(i => i.productId === action.payload.id);
            if (item) {
                (item as any).color = action.payload.color;
                localStorage.setItem("cart", JSON.stringify(state.items));
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateItemColor } = cartSlice.actions;
export default cartSlice.reducer;
