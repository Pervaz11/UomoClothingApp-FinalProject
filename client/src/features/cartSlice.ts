import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
    productId: string; 
    title: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
    color?: string;
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
                (item) => item.productId === action.payload.productId
            );

            if (existing) {
                if (existing.quantity < action.payload.stock) {
                    existing.quantity += 1;
                }
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
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
                item.color = action.payload.color;
                localStorage.setItem("cart", JSON.stringify(state.items));
            }
        },

        increaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(i => i.productId === action.payload);
            if (item && item.quantity < item.stock) {
                item.quantity += 1;
                localStorage.setItem("cart", JSON.stringify(state.items));
            }
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(i => i.productId === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                localStorage.setItem("cart", JSON.stringify(state.items));
            }
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    clearCart,
    updateItemColor,
    increaseQuantity,
    decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
