import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  announcements: [],
  error: null,
  loading: false
};

export const getAnnouncement = createAsyncThunk(
  "anouncement/getAnnouncements",
  async ({ getAnnouncementApiUrl, accessToken }, thunkAPI) => {
    try {
      const response = await axios.get(getAnnouncementApiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get announcement!"
      );
    }
  }
);

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnnouncement.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnnouncement.fulfilled, (state, action) => {
        state.announcements = action.payload;
        (state.error = null), (state.loading = false);
      })
      .addCase(getAnnouncement.rejected, (state, action) => {
        state.error = action.payload || "Internal Server Error";
        state.loading = false;
        state.searchResults = [];
      });
  }
});

export const {} = announcementSlice.actions;
export default announcementSlice.reducer;
