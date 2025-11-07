import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// clock in (login) → POST
export const markClockIn = createAsyncThunk(
  "attendance/clockIn",
  async ({ attendanceUrlLogin, accessToken, userId }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${attendanceUrlLogin}`,
        { status: "in" },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
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
  async ({ attendanceUrlLogout, accessToken, attendanceId }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${attendanceUrlLogout}`,
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
  async ({ gettAttendanceByUserUrl, accessToken }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${gettAttendanceByUserUrl}`,

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
        "Failed to fetched attendance"; // fallback

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// my space ends here ---
// attendance page starts here  --
export const getUsersByRole = createAsyncThunk(
  "attendance/getUserByRoleUrl",
  async ({ getUserByRoleUrl, userRole, accessToken }, thunkAPI) => {
    try {
      const response = await axios.get(`${getUserByRoleUrl}/${userRole}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      const message =
        error.response.data?.message ||
        error?.message ||
        `Failed to fetched ${userRole}`;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAttendance = createAsyncThunk(
  "attendance/gettAttendanceUrl",
  async (
    { getAttendanceUrl, userRole, fromDate, toDate, accessToken },

    thunkAPI
  ) => {
    try {
      const response = await axios.get(`${getAttendanceUrl}/${userRole}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { fromDate, toDate }
      });
      return response.data;
    } catch (error) {
      console.log(error);

      const message =
        error.response?.data?.message ||
        error.message ||
        `Failed to fetch attendance for ${userRole} ${fromDate} ${toDate}`;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPresentUsersByRole = createAsyncThunk(
  "attendance/getPresentUsersByRole",
  async (
    { getPresentUsersByRoleUrl, fromDate, toDate, userRole, accessToken },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(
        `${getPresentUsersByRoleUrl}/${userRole}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { fromDate, toDate }
        }
      );
      return response.data;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch present users";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const getPresentDayAttendance = createAsyncThunk(
  "attedance/getPresentDayAttendance",
  async ({ getPresentDayAttendanceUrl, today, accessToken }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${getPresentDayAttendanceUrl}/${today}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      return response?.data?.response;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch present day attendance!";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    attendanceRecord: null,
    loading: false,
    error: null,
    attendanceByUser: null,
    users: null,
    presentUsers: null,
    message: null,
    presnetDayAttendance: null
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
    // get users by Role
    builder
      .addCase(getUsersByRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersByRole.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.message = action.payload.message;
      })
      .addCase(getUsersByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // get Attendance by filter
    builder
      .addCase(getAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecord = action.payload;
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // get present users by userRole
    builder
      .addCase(getPresentUsersByRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPresentUsersByRole.fulfilled, (state, action) => {
        state.loading = false;
        state.presentUsers = action.payload;
      })
      .addCase(getPresentUsersByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // get present day attendance
    builder
      .addCase(getPresentDayAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPresentDayAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.presnetDayAttendance = action.payload;
      })
      .addCase(getPresentDayAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default attendanceSlice.reducer;
