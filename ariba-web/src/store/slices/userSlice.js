import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loggedInUser: null,
  error: null,
  loading: false,
  currentUser: {},
  message: "",
  accessToken: null,
  usersByOrganization: [],
  userDetails: {},
  newTimeline: {},
  createdUser: {},
  updatedUser: {}
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
  "user/organizationUsers",
  async (
    { getOrganizationUserApi, organization, userRole, token },
    thunkAPI
  ) => {
    try {
      const response = await axios.get(getOrganizationUserApi, {
        params: { organizationId: organization, userRole }
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ getUserApi, id, accessToken }, thunkAPI) => {
    try {
      const response = await axios.get(`${getUserApi}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
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
  "user/createUser",
  async ({ createUserApi, formData, accessToken }, thunkAPI) => {
    try {
      const response = await axios.post(`${createUserApi}`, formData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to create new user!"
      );
    }
  }
);
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ updateUserApi, formData, accessToken, userId }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${updateUserApi}/${userId}`,
        formData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );
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
export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async ({ getCurrentUserApi, id, accessToken }, thunkAPI) => {
    try {
      const response = await axios.get(`${getCurrentUserApi}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
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
// Async thunk to generate a new access token using the refresh token
export const generateRefreshAccessToken = createAsyncThunk(
  "user/generateRefreshAccessToken",
  async (generateRefreshAccessTokenApi, thunkAPI) => {
    console.log("api....", generateRefreshAccessTokenApi);

    try {
      const response = await axios.post(
        generateRefreshAccessTokenApi,

        {
          withCredentials: true // 🔑 this sends the cookie
        }
      );

      // Return the new access token
      return response.data; // { accessToken: "..." }
    } catch (error) {
      // Return a meaningful error message
      console.log("err.. in ref....", error);

      const message =
        error.response?.data?.message || "Failed to generate access token!";
      return thunkAPI.rejectWithValue(message);
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
      .addCase(getCurrentUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
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
        state.message = action.payload?.message || "User created successfully!";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createdUser = null;
        state.error = action.payload;
        state.loading = false;
      });
    builder
      .addCase(updateUser.pending, (state, action) => {
        (state.loading = true), (state.error = false);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updatedUser = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updatedUser = null;
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
    builder
      .addCase(generateRefreshAccessToken.pending, (state, action) => {
        (state.loading = true), (state.error = false);
      })
      .addCase(generateRefreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(generateRefreshAccessToken.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const {} = userSlice.actions;
export default userSlice.reducer;
