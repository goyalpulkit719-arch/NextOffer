import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import leetcodeReducer from "./leetcodeSlice";
import codeforcesReducer from "./codeforcesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    leetcode: leetcodeReducer,
    codeforces: codeforcesReducer,
  },
});