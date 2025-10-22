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

export const createSubject = createAsyncThunk(
  "academic/createsubject",
  async ({ createSubjectUrl, formData, accessToken }) => {
    try {
      const response = await axios.post(createSubjectUrl, formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create subject!";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const createRoutine = createAsyncThunk(
  "academic/createRoutine",
  async ({ createRoutineUrl, formData, accessToken }) => {
    try {
      const response = await axios.post(createRoutineUrl, formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create subject!";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    grade: null,
    loading: null,
    error: null,
    subject: null,
    routine: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

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
    builder

      .addCase(createSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subject = action.payload;
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder

      .addCase(createRoutine.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoutine.fulfilled, (state, action) => {
        state.loading = false;
        state.routine = action.payload;
      })
      .addCase(createRoutine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default attendanceSlice.reducer;
