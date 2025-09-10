import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loggedInUser: null,
  error: null,
  loading: false,
  currentUser: {},
  usersByOrganization: [],
  userDetails: {},
  newTimeline: {},
  createdUser: {}
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
export const getOrganizationUsers = createAsyncThunk(
  "auth/organizationUsers",
  async (
    { getOrganizationUserApi, organization, userRole, token },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(getOrganizationUserApi, {
        params: { organization, userRole },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
export const getUser = createAsyncThunk(
  "auth/getUser",
  async ({ getUserApi, id, token }, thunkAPI) => {
    try {
      const response = await axios.get(`${getUserApi}/${id}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        withCredentials: true
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to get user!"
      );
    }
  }
);
export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ createUserApi, userData, accessToken }, thunkAPI) => {
    try {
      const response = await axios.post(`${createUserApi}`, userData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to add timeline"
      );
    }
  }
);
export const addTimeline = createAsyncThunk(
  "auth/addTimeline",
  async ({ id, addTimelineApi, timeline, token }, thunkAPI) => {
    try {
      const response = await axios.patch(`${addTimelineApi}/${id}`, timeline, {
        withCredentials: true
        // headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to add timeline"
      );
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
        state.error = null;
        state.loading = false;
      })
      .addCase(loginHandler.rejected, (state, action) => {
        state.error = action.payload || "Internal Server Error";
        state.loading = false;
        state.loggedInUser = null;
      });

    builder
      .addCase(getOrganizationUsers.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrganizationUsers.fulfilled, (state, action) => {
        state.usersByOrganization = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getOrganizationUsers.rejected, (state, action) => {
        state.error = action.payload || "Internal Server Error";
        state.loading = false;
        state.usersByOrganization = null;
      });

    builder
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userDetails = null;
        state.loading = false;
        state.error = action.payload || "Internal Server Error";
      });

    builder
      .addCase(createUser.pending, (state, action) => {
        (state.loading = true), (state.error = false);
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createdUser = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createdUser = null;
        state.error = action.payload;
        state.loading = false;
      });

    builder
      .addCase(addTimeline.pending, (state, action) => {
        (state.loading = true), (state.error = false);
      })
      .addCase(addTimeline.fulfilled, (state, action) => {
        state.newTimeline = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(addTimeline.rejected, (state, action) => {
        state.newTimeline = null;
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const {} = userSlice.actions;
export default userSlice.reducer;
