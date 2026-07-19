import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: null,
    isLoading: false,
    error: null,
};

const leetcodeSlice = createSlice({
    name: "leetcode",
    initialState,
    reducers: {
        setLeetcodeLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setLeetcodeProfile: (state, action) => {
            state.profile = action.payload;
            state.error = null;
            state.isLoading = false;
        },

        setLeetcodeError: (state, action) => {
            state.error = action.payload;
            state.profile = null;
            state.isLoading = false;
        },

        clearLeetcode: () => initialState,
    },
});

export const {
    setLeetcodeLoading,
    setLeetcodeProfile,
    setLeetcodeError,
    clearLeetcode,
} = leetcodeSlice.actions;

export default leetcodeSlice.reducer;