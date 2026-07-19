import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: null,
    isLoading: false,
    error: null,
};

const codeforcesSlice = createSlice({
    name: "codeforces",
    initialState,
    reducers: {
        setCodeforcesLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setCodeforcesProfile: (state, action) => {
            state.profile = action.payload;
            state.error = null;
            state.isLoading = false;
        },

        setCodeforcesError: (state, action) => {
            state.error = action.payload;
            state.profile = null;
            state.isLoading = false;
        },

        clearCodeforces: () => initialState,
    },
});

export const {
    setCodeforcesLoading,
    setCodeforcesProfile,
    setCodeforcesError,
    clearCodeforces,
} = codeforcesSlice.actions;

export default codeforcesSlice.reducer;