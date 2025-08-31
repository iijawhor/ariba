import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice.js";
import userReducer from "./slices/userSlice.js";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer
  }
});
