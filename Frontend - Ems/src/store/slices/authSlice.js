import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: localStorage.getItem("email") || null,
    role: localStorage.getItem("role") || null,
    isAuthenticated: !!localStorage.getItem("authToken"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.isAuthenticated = true;
            localStorage.setItem("email", action.payload.email);
            localStorage.setItem("role", action.payload.role);
            if (action.payload.token) {
                localStorage.setItem("authToken", action.payload.token);
            }
        },
        logout: (state) => {
            state.email = null;
            state.role = null;
            state.isAuthenticated = false;
            localStorage.removeItem("email");
            localStorage.removeItem("role");
            localStorage.removeItem("authToken");
        },
        setRole: (state, action) => {
            state.role = action.payload;
            localStorage.setItem("role", action.payload);
        },
    },
});

export const { login, logout, setRole } = authSlice.actions;
export default authSlice.reducer;
