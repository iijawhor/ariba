# 📦 `searchSlice.js` – Redux Toolkit Search Functionality

This module manages **search state and API integration** using Redux Toolkit's `createSlice` and `createAsyncThunk`.

It provides an easy-to-integrate search mechanism for applications where users can search for items like students, teachers, or documents through a backend API.

---

## 📁 Location

```
src/store/slices/searchSlice.js
```

---

## 🚀 Features

- 🔍 Asynchronous search requests using `axios`
- 🎯 Stores search results in global state
- ❌ Handles and displays errors
- ⏳ Tracks loading status
- ✅ Ready to plug into any component via `useDispatch` and `useSelector`

---

## 🧱 State Structure

```js
const initialState = {
  searchResults: [], // Array of search results returned by the API
  error: null, // Error message if request fails
  loading: false // Boolean for request status
};
```

---

## ⚙️ Async Thunk: `searchHandler`

```js
export const searchHandler = createAsyncThunk(
  "search/searchQuery",
  async ({ searchApi, searchQuery }, thunkAPI) => {
    try {
      const response = await axios.get(`${searchApi}${searchQuery}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to search"
      );
    }
  }
);
```

### Parameters

| Parameter     | Type     | Description                                |
| ------------- | -------- | ------------------------------------------ |
| `searchApi`   | `string` | Base API endpoint for the search query     |
| `searchQuery` | `string` | The query string to be appended to the URL |
| `token`       | `string` | (Optional) For future auth headers         |

### Example

```js
dispatch(
  searchHandler({
    searchApi: "http://localhost:7000/api/v1/user/search?query=",
    searchQuery: "john.doe"
  })
);
```

---

## 📦 Slice: `searchSlice`

Defines the reducer and handles the async state transitions.

```js
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchHandler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchHandler.fulfilled, (state, action) => {
        state.searchResults.push(action.payload); // Or replace with = if payload is an array
        state.loading = false;
      })
      .addCase(searchHandler.rejected, (state, action) => {
        state.error = action.payload || "Internal Server Error";
        state.loading = false;
        state.searchResults = [];
      });
  }
});
```

---

## 📤 Exports

```js
export default searchSlice.reducer;
```

Use this reducer in your root store configuration:

```js
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer
  }
});
```

---

## 📥 Component Integration Example

```jsx
import { useDispatch, useSelector } from "react-redux";
import { searchHandler } from "../store/slices/searchSlice";

const MyComponent = () => {
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector(
    (state) => state.search
  );

  const handleSearch = () => {
    dispatch(
      searchHandler({
        searchApi: "http://localhost:7000/api/v1/user/search?query=",
        searchQuery: "document123"
      })
    );
  };

  return (
    <>
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Searching...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {searchResults.map((result, i) => (
          <li key={i}>{JSON.stringify(result)}</li>
        ))}
      </ul>
    </>
  );
};
```

---

## 🛠 Future Improvements

- Add support for **auth tokens** in headers
- Add **search result caching**
- Add pagination or limit support
- Add result normalization using `createEntityAdapter` for performance

---

## 📚 Dependencies

- `axios`
- `@reduxjs/toolkit`
- `react-redux`
