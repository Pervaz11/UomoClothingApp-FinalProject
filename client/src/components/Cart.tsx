import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    productId: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    [x: string]: any;
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<{
                productId: string;
                title: string;
                price: number;
                image: string;
                quantity: number;
            }>
        ) => {
            const existing = state.items.find(
                (item) => item.productId === action.payload.productId
            );
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.productId !== action.payload
            );
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
