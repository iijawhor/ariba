import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice.js";
import userReducer from "./slices/userSlice.js";
import attendanceReducer from "./slices/atttendanceSlice.js";
import academicReducer from "./slices/academicSlice.js";
export const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
    attendance: attendanceReducer,
    academic: academicReducer
  }
});
