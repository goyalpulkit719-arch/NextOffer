import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isLoggedIn: false,

    user: {
        id: "",
        name: "",
        email: "",
        avatar: "",
        leetcodeUsername: "",
        codeforcesUsername: "",
        targetCompany: "",
        hasResume: false,
    },
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {

        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setUser: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },

        logout: (state) => {
            state.isLoggedIn = false;
            state.user = initialState.user;
        },

    }
});

export const { setLoading, setUser, logout } = authSlice.actions;

export default authSlice.reducer;