import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface UserState {
    id: string | null;
    email: string | null;
    role: string | null;
    fullName: string | null;
    username: string | null;
    profileImage: string | null;
    phoneNumber: string | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    id: null,
    email: null,
    role: null,
    fullName: null,
    username: null,
    profileImage: null,
    phoneNumber: null,
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
};

function loadInitialUserData(initialUser: UserState) {
    try {
        const token = localStorage.getItem("token");
        if (token && token.split(".").length === 3) {
            const decoded: {
                role: string;
                email: string;
                fullName: string;
                username: string;
                profileImage: string;
                id: string;
                iat: Date;
                exp: Date;
                phoneNumber: string;
            } = jwtDecode(token);
            initialUser.id = decoded.id;
            initialUser.email = decoded.email;
            initialUser.role = decoded.role;
            initialUser.fullName = decoded.fullName;
            initialUser.username = decoded.username;
            initialUser.profileImage = decoded.profileImage;
            initialUser.phoneNumber = decoded.phoneNumber;
            initialUser.isAuthenticated = true;
            initialUser.token = token;

            // ✅ YENİ: userId localStorage-da saxlanır
            localStorage.setItem("userId", decoded.id);
        }
    } catch (error) {
        console.log("error: ", error);
    }
}

loadInitialUserData(initialState);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{
                id: string;
                email: string;
                role: string;
                fullName: string;
                username: string;
                profileImage: string;
                phoneNumber: string;
                token: string;
            }>
        ) => {
            const { id, email, role, fullName, username, profileImage, phoneNumber, token } =
                action.payload;
            state.id = id;
            state.email = email;
            state.role = role;
            state.fullName = fullName;
            state.username = username;
            state.profileImage = profileImage;
            state.phoneNumber = phoneNumber;
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem("token", token);

            // ✅ YENİ: userId saxla
            localStorage.setItem("userId", id);
        },
        logoutUser: (state) => {
            state.id = null;
            state.email = null;
            state.role = null;
            state.fullName = null;
            state.profileImage = null;
            state.phoneNumber = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");

            // ✅ YENİ: userId sil
            localStorage.removeItem("userId");
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
