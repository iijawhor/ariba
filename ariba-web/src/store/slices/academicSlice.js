import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const createGrade = createAsyncThunk(
  "grade/createGrade",
  async ({ createGradeUrl, formData, accessToken }, thunkAPI) => {
    try {
      const response = await axios.post(createGradeUrl, formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create Grade!";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: { grade: null, loading: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // clock in
      .addCase(createGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.grade = action.payload;
      })
      .addCase(createGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default attendanceSlice.reducer;
