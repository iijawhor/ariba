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
      console.log("Error in getUserByRoleUrl Slice...", error);

      const message =
        error.response.data?.message ||
        error?.message ||
        `Failed to fetched ${userRole}`;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAttendanceByUserRole = createAsyncThunk(
  "attendance/getAttendanceByUserRole",
  async (
    { gettAttendanceByUserRoleUrl, userRole, fromDate, toDate, accessToken },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(
        `${gettAttendanceByUserRoleUrl}/${userRole}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { fromDate, toDate }
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error in getAttendanceByUserRole Slice...", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        `Failed to fetch attendance for ${userRole}`;
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
      console.log("Error in getPresentUsers Slice...", error);
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch present users";
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
    presentUsers: null
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
        state.users = action.payload;
      })
      .addCase(getUsersByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // get Attendance by userRole
    builder
      .addCase(getAttendanceByUserRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAttendanceByUserRole.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecord = action.payload;
      })
      .addCase(getAttendanceByUserRole.rejected, (state, action) => {
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
  }
});

export default attendanceSlice.reducer;
