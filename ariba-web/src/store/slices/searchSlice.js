import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  searchResults: [],
  error: null,
  loading: false
};

export const searchHandler = createAsyncThunk(
  "search/searchQuery",
  async ({ searchApi, searchQuery, token }, thunkAPI) => {
    try {
      const response = await axios.get(`${searchApi} ${searchQuery}`);
      //   const response = await axios.get(getUserByRoleApi, {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`
      //     }
      //   });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to search"
      );
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchHandler.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchHandler.fulfilled, (state, action) => {
        state.searchResults.push(action.payload);
        (state.error = null), (state.loading = false);
      })
      .addCase(searchHandler.rejected, (state, action) => {
        state.error = action.payload || "Internal Server Error";
        state.loading = false;
        state.searchResults = [];
      });
  }
});

export const {} = searchSlice.actions;
export default searchSlice.reducer;
