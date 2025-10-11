# 👥 User Slice (Redux Toolkit)

This slice manages **user authentication, organization-level users, user details, timelines, and user creation** in the school management system. It integrates with backend APIs via `axios` and `createAsyncThunk`.

---

## 📂 State Structure

```js
{
  loggedInUser: null,      // Stores logged-in user data after login
  error: null,             // Stores error messages from API requests
  loading: false,          // Loading flag for async actions
  currentUser: {},         // (Reserved) Current active user object
  usersByOrganization: [], // List of users fetched by organization
  userDetails: {},         // Detailed info of a selected user
  newTimeline: {},         // Newly added timeline entry response
  createdUser: {}          // Response of newly created user
}
```

---

## ⚡ Async Thunks

### 1. `loginHandler`

Logs in a user with credentials.

- **Params:** `{ loginApi, loginCredentials }`
- **Method:** `POST`
- **Returns:** Logged-in user data

---

### 2. `getOrganizationUsers`

Fetches all users for a given organization and role.

- **Params:** `{ getOrganizationUserApi, organization, userRole, token }`
- **Method:** `GET` (with `organization` and `userRole` as query params)
- **Headers:** `Authorization: Bearer <token>`
- **Returns:** Array of users

---

### 3. `getUser`

Fetches details of a specific user by ID.

- **Params:** `{ getUserApi, id, token }`
- **Method:** `GET` → `${getUserApi}/${id}`
- **Returns:** User detail object

---

### 4. `createUser`

Creates a new user in the system.

- **Params:** `{ createUserApi, userData, accessToken }`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Returns:** Created user response

---

### 5. `addTimeline`

Adds a new timeline entry for a user.

- **Params:** `{ id, addTimelineApi, timeline, token }`
- **Method:** `PATCH` → `${addTimelineApi}/${id}`
- **Returns:** Updated timeline response

---

## 🔄 Reducer Flow

Each async thunk has three action states:

- **`pending`** → Sets `loading = true` and clears errors.
- **`fulfilled`** → Updates the state with API response and resets `loading`.
- **`rejected`** → Sets error message, resets `loading`, and clears affected state.

---

## 🛠️ Tech Stack

- **Redux Toolkit** – `createSlice`, `createAsyncThunk`
- **Axios** – API requests with headers & credentials

---

## 🚀 Usage Example

### Dispatching Login

```js
dispatch(
  loginHandler({
    loginApi: `${process.env.VITE_API_BASE_URL}/auth/login`,
    loginCredentials: { email: "teacher@mail.com", password: "123456" }
  })
);
```

### Fetching Organization Users

```js
dispatch(
  getOrganizationUsers({
    getOrganizationUserApi: `${process.env.VITE_API_BASE_URL}/user/get-organization-users`,
    organization: "school123",
    userRole: "teacher",
    token: accessToken
  })
);
```

### Fetching User Details

```js
dispatch(
  getUser({
    getUserApi: `${process.env.VITE_API_BASE_URL}/user/get-user-by-id`,
    id: "64bcf2d9",
    token: accessToken
  })
);
```

---

## 📌 Notes

- `withCredentials: true` is enabled for cookie-based authentication.
- Some headers (`Authorization`) are commented out; uncomment when backend requires token validation.
- Handles missing API response data gracefully with fallback error messages.

---

# **User Slice – Updated Parts Documentation**

### **Changes Made**

- Removed `updateUser` thunk and related state (`updatedUser`) to simplify slice.
- Removed redundant `message` state.
- Updated `getOrganizationUsers` thunk to include `Authorization` header.
- Updated `getUser` thunk to remove `Authorization` header for simplicity.
- Updated `createUser` thunk to rename `formData` to `userData`.
- Removed `updateUser` handling from `extraReducers`.

---

### **Updated Async Thunks**

#### **getOrganizationUsers**

- **Purpose:** Fetch users for a specific organization.
- **Arguments:** `getOrganizationUserApi`, `organization`, `userRole`, `token`
- **Notes:** Now includes `Authorization` header.

#### **getUser**

- **Purpose:** Fetch details of a specific user by ID.
- **Arguments:** `getUserApi`, `id`, `token`
- **Notes:** `Authorization` header removed; `withCredentials: true` is used.

#### **createUser**

- **Purpose:** Create a new user.
- **Arguments:** `createUserApi`, `userData`, `accessToken`
- **Notes:** Renamed `formData` to `userData` for clarity.

#### **Removed**

- `updateUser` thunk and its state handling removed.

---

### **Updated State**

```javascript
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
```

---

### **ExtraReducers**

- Handles only: `loginHandler`, `getOrganizationUsers`, `getUser`, `createUser`, `addTimeline`.
- `updateUser` handling removed.
