import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// clock in (login) → POST
export const markClockIn = createAsyncThunk(
  "attendance/clockIn",
  async ({ attendanceUrlLogin, accessToken, userId }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${attendanceUrlLogin}/${userId}`,
        { status: "in" },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || // backend-sent message
        error.message || // network or other error
        "Clock in failed"; // fallback

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// clock out (logout) → PATCH
export const markClockOut = createAsyncThunk(
  "attendance/clockOut",
  async (
    { attendanceUrlLogout, accessToken, userId, attendanceId },
    thunkAPI
  ) => {
    try {
      const response = await axios.patch(
        `${attendanceUrlLogout}/${userId}`,
        { status: "out", attendanceId },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || // backend-sent message
        error.message || // network or other error
        "Clock out failed"; // fallback

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const gettAttendanceByUser = createAsyncThunk(
  "attendance/getAttendanceByUser",
  async ({ gettAttendanceByUserUrl, accessToken, userId }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${gettAttendanceByUserUrl}/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || // backend-sent message
        error.message || // network or other error
        "Failed to fetched successfully"; // fallback

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    attendanceRecord: null,
    loading: false,
    error: null,
    attendanceByUser: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // clock in
      .addCase(markClockIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markClockIn.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecord = action.payload;
      })
      .addCase(markClockIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // clock out
      .addCase(markClockOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markClockOut.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecord = action.payload;
      })
      .addCase(markClockOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // get Attendance
    builder
      .addCase(gettAttendanceByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(gettAttendanceByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceByUser = action.payload;
      })
      .addCase(gettAttendanceByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default attendanceSlice.reducer;
