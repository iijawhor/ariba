# Login Feature Documentation

This documentation covers the login feature implementation including the React components, Redux store setup, and async login logic using Redux Toolkit.

---

## Overview

This project implements a user login flow using:

- **React** for UI components (`LoginPage` and `LoginForm`)
- **Redux Toolkit** for state management
- **Redux Thunk** (`createAsyncThunk`) for async login API calls
- **Axios** for HTTP requests

---

## Folder Structure

```
src/
 ├── components/
 │    └── LoginForm.jsx
 ├── pages/
 │    └── LoginPage.jsx
 ├── store/
 │    ├── slices/
 │    │    └── userSlice.js
 │    └── store.js
```

---

## Components

### LoginPage.jsx

The login page component that provides the layout for the login screen.

- Uses a two-column layout (hidden image section on larger screens)
- Displays the `LoginForm` component centered in the right column
- Applies styling using Tailwind CSS classes

**Code snippet:**

```jsx
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex h-screen gap-1 border text-black">
      <div className="flex-4 max-h-screen hidden md:inline">
        {/* Background image area (commented out) */}
      </div>
      <div className="flex-2 h-full flex bg-[#eef1ffff] flex-col gap-5 m-auto justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
```

---

### LoginForm.jsx

The login form component manages form state and triggers the login action.

- Uses React `useState` for form fields (`email`, `password`) and error message
- Uses `useDispatch` from Redux to dispatch login action (`loginHandler`)
- Uses `useNavigate` from React Router to navigate after login success/failure
- Handles form submission and dispatches async login thunk
- Displays input fields with SVG icons and styles using Tailwind CSS

**Main functions:**

- `handleChange` — Updates form state on input change
- `handleLogin` — Dispatches login async action, handles navigation and errors

---

## Redux Setup

### store.js

Configures Redux store with user slice.

```js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});
```

---

### userSlice.js

Manages user authentication state and async login action.

- `initialState`: Tracks logged-in user, errors, loading, and current user info
- `loginHandler`: Async thunk that calls login API and returns user data or error
- Reducers handle pending, fulfilled, and rejected states of login action

**Key points:**

- On **pending**: sets `loading` true and clears error
- On **fulfilled**: saves user data, resets loading and error
- On **rejected**: saves error, resets loading, clears logged-in user

```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loggedInUser: null,
  error: null,
  loading: false,
  currentUser: {}
};

export const loginHandler = createAsyncThunk(
  "auth/login",
  async ({ loginApi, loginCredentials }, thunkAPI) => {
    try {
      const response = await axios.post(loginApi, loginCredentials, {
        headers: { "Content-Type": "application/json" }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginHandler.pending, (state) => {
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
  }
});

export default userSlice.reducer;
```

---

## How it Works

1. **User visits the login page** (`LoginPage.jsx`).
2. **User enters credentials** into `LoginForm`.
3. On submit, `handleLogin` dispatches the `loginHandler` async thunk.
4. `loginHandler` sends a POST request to the API endpoint with credentials.
5. Depending on response:

   - If successful, user data is stored in Redux state, user is redirected to dashboard (`"/"`).
   - If failed, error message is set and user remains on login page.

6. UI reflects loading states and errors accordingly.

---

## Dependencies

- React (17+)
- React Router DOM (6+)
- Redux Toolkit
- React Redux
- Axios
- Tailwind CSS (for styling)

---

## To Run Locally

1. Clone the repository
2. Run `npm install` or `yarn install`
3. Ensure backend API is running at `http://localhost:7000/api/v1/user/signin`
4. Run frontend with `npm start` or `yarn start`
5. Navigate to `/signin` to access the login page

---

## Future Improvements

- Add input validation and error display in the UI
- Secure storage of tokens (e.g., httpOnly cookies or localStorage with encryption)
- Implement logout functionality and user session management
- Add loading spinner on login button
- Use environment variables for API URLs
