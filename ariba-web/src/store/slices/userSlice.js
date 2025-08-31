import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loggedInUser: null,
  error: null,
  loading: false,
  currentUser: {}
};
export const loginHandler = createAsyncThunk(
  "auth/login",
  async ({ loginApi, loginCredentials }, thunkAPI) => {
    try {
      const response = await axios.post(loginApi, loginCredentials, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      return response.data; // will be available in fulfilled action
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginHandler.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginHandler.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        (state.error = null), (state.loading = null);
      })
      .addCase(loginHandler.rejected, (state, action) => {
        state.error = action.payload || "Internal Server Error";
        state.loading = false;
        state.loggedInUser = null;
      });
  }
});

export const {} = userSlice.actions;
export default userSlice.reducer;
