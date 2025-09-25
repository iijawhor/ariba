import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice.js";
import userReducer from "./slices/userSlice.js";
import attendanceReducer from "./slices/atttendanceSlice.js";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
    attendance: attendanceReducer
  }
});
