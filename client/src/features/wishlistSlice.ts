import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async (_, { }) => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.items;
});

export const addWishlistItem = createAsyncThunk("wishlist/add", async (productId: string) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
        "/wishlist",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.data.items;
});

export const removeWishlistItem = createAsyncThunk(
    "wishlist/remove",
    async (productId: string) => {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`/wishlist/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data.items;
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: { items: [] as any[], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addWishlistItem.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(removeWishlistItem.fulfilled, (state, action) => {
                state.items = action.payload;
            });
    },
});

export default wishlistSlice.reducer;
