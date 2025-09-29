import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
    color?: string;
    type: "product" | "accessory";
    productId?: string;
};


interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find(
                (item) => item.id === action.payload.id && item.type === action.payload.type
            );

            if (existing) {
                const newQuantity = existing.quantity + action.payload.quantity;
                existing.quantity = Math.min(newQuantity, existing.stock);
            } else {
                state.items.push({ ...action.payload });
            }
        },

        removeFromCart: (state, action: PayloadAction<{ id: string; type: "product" | "accessory" }>) => {
            state.items = state.items.filter(
                (item) => !(item.id === action.payload.id && item.type === action.payload.type)
            );
        },

        clearCart: (state) => {
            state.items = [];
        },

        updateItemColor: (state, action: PayloadAction<{ id: string; type: "product" | "accessory"; color: string }>) => {
            const item = state.items.find(
                (i) => i.id === action.payload.id && i.type === action.payload.type
            );
            if (item) {
                item.color = action.payload.color;
            }
        },

        increaseQuantity: (state, action: PayloadAction<{ id: string; type: "product" | "accessory" }>) => {
            const item = state.items.find(
                (i) => i.id === action.payload.id && i.type === action.payload.type
            );
            if (item && item.quantity < item.stock) {
                item.quantity += 1;
            }
        },

        decreaseQuantity: (state, action: PayloadAction<{ id: string; type: "product" | "accessory" }>) => {
            const item = state.items.find(
                (i) => i.id === action.payload.id && i.type === action.payload.type
            );
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateItemColor, increaseQuantity, decreaseQuantity } =
    cartSlice.actions;

export default cartSlice.reducer;
