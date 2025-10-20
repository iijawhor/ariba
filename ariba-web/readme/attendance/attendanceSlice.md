<!-- MY SPACE PAGE -->

# Attendance Slice (`attendanceSlice`)

The `attendanceSlice` is a **Redux Toolkit slice** that manages the attendance-related state for users in a React application. It handles **clock-in, clock-out, and fetching user attendance records** by integrating with backend APIs.

---

## Features

1. **Clock In (Login)**

   - Uses `markClockIn` async thunk to send a `POST` request to the backend.
   - Payload includes `status: "in"` and the `userId`.
   - Updates the Redux state with the newly created attendance record.
   - Handles loading and error states automatically.

2. **Clock Out (Logout)**

   - Uses `markClockOut` async thunk to send a `PATCH` request to the backend.
   - Payload includes `status: "out"` and `attendanceId`.
   - Updates the Redux state with the updated attendance record.
   - Handles loading and error states automatically.

3. **Fetch Attendance by User**

   - Uses `gettAttendanceByUser` async thunk to send a `GET` request.
   - Fetches all attendance records for a given user.
   - Stores the response in `attendanceByUser` in the Redux state.
   - Handles loading and error states automatically.

---

## State Structure

```js
{
  attendanceRecord: null, // Current attendance record (last login/logout)
  attendanceByUser: null, // All attendance records for the logged-in user
  loading: false,         // Indicates API call in progress
  error: null             // Stores error messages if API fails
}
```

- `attendanceRecord` – Stores the latest attendance action (clock-in or clock-out).
- `attendanceByUser` – Stores all fetched attendance records for a user.
- `loading` – Boolean flag for asynchronous request status.
- `error` – Stores any error returned from API calls.

---

## Async Thunks

### 1. `markClockIn`

```js
markClockIn({ attendanceUrlLogin, accessToken, userId });
```

- Makes a `POST` request to `${attendanceUrlLogin}/${userId}`.
- Headers: `Authorization: Bearer ${accessToken}`
- Payload: `{ status: "in" }`
- Updates `attendanceRecord` on success.

### 2. `markClockOut`

```js
markClockOut({ attendanceUrlLogout, accessToken, userId, attendanceId });
```

- Makes a `PATCH` request to `${attendanceUrlLogout}/${userId}`.
- Headers: `Authorization: Bearer ${accessToken}`
- Payload: `{ status: "out", attendanceId }`
- Updates `attendanceRecord` on success.

### 3. `gettAttendanceByUser`

```js
gettAttendanceByUser({ gettAttendanceByUserUrl, accessToken, userId });
```

- Makes a `GET` request to `${gettAttendanceByUserUrl}/${userId}`.
- Headers: `Authorization: Bearer ${accessToken}`
- Updates `attendanceByUser` on success.

---

## Reducers & ExtraReducers

- **Pending**: Sets `loading = true` and clears any previous errors (`error = null`).
- **Fulfilled**: Updates `attendanceRecord` or `attendanceByUser` depending on the action, sets `loading = false`.
- **Rejected**: Sets `error` to the error message and `loading = false`.

---

## Usage

1. **Dispatch Clock In / Clock Out**

```js
dispatch(markClockIn({ attendanceUrlLogin, accessToken, userId }));
dispatch(
  markClockOut({ attendanceUrlLogout, accessToken, userId, attendanceId })
);
```

2. **Fetch Attendance by User**

```js
dispatch(
  gettAttendanceByUser({ gettAttendanceByUserUrl, accessToken, userId })
);
```

3. **Select Data from Store**

```js
const attendanceRecord = useSelector(
  (state) => state.attendance.attendanceRecord
);
const attendanceByUser = useSelector(
  (state) => state.attendance.attendanceByUser
);
const loading = useSelector((state) => state.attendance.loading);
const error = useSelector((state) => state.attendance.error);
```

---

## Benefits

- Centralized management of attendance state.
- Async thunks handle API calls with built-in loading and error handling.
- Easy to extend for additional attendance-related actions.
- Fully integrated with React components via `useDispatch` and `useSelector`.

<!-- ATTENDANCE PAGE -->

# 📘 Attendance & Role-Based User Management (Redux Toolkit)

This module handles **asynchronous data fetching** for:

- ✅ Fetching users by role
- ✅ Fetching attendance records by user role and date range
- ✅ Fetching present users by role and date range

All operations use **Redux Toolkit's `createAsyncThunk`** for async actions and are connected to a reducer using `extraReducers`.

---

## 📦 Features

- Secure API requests using **Bearer tokens**
- Clean error handling and loading states
- Flexible date range queries
- Role-based data fetching for different user types

---

## ⚙️ Async Thunks Overview

### 1. `getUsersByRole`

Fetches users of a specific role (e.g., student, teacher, admin).

```ts
export const getUsersByRole = createAsyncThunk(
  "attendance/getUserByRoleUrl",
  async ({ getUserByRoleUrl, userRole, accessToken }, thunkAPI) => {
    ...
  }
);
```

#### 🔧 Parameters:

- `getUserByRoleUrl`: Base URL to fetch users
- `userRole`: Role string (`'admin'`, `'student'`, etc.)
- `accessToken`: JWT token for authorization

#### ✅ Behavior:

- Sends a `GET` request to: `GET /{getUserByRoleUrl}/{userRole}`
- Adds `Authorization` header
- On success → returns user list
- On error → returns detailed error message

---

### 2. `getAttendanceByUserRole`

Fetches attendance records filtered by role and date range.

```ts
export const getAttendanceByUserRole = createAsyncThunk(
  "attendance/getAttendanceByUserRole",
  async ({ gettAttendanceByUserRoleUrl, userRole, fromDate, toDate, accessToken }, thunkAPI) => {
    ...
  }
);
```

#### 🔧 Parameters:

- `gettAttendanceByUserRoleUrl`: Base URL for attendance
- `userRole`: Role to filter
- `fromDate`, `toDate`: Date range for filtering attendance
- `accessToken`: Auth token

#### ✅ Behavior:

- Sends a `GET` request to:
  `GET /{gettAttendanceByUserRoleUrl}/{userRole}?fromDate=...&toDate=...`
- Adds `Authorization` header and `params` for dates
- Returns attendance records

---

### 3. `getPresentUsersByRole`

Fetches **present users only** for a given role and date range.

```ts
export const getPresentUsersByRole = createAsyncThunk(
  "attendance/getPresentUsersByRole",
  async ({ getPresentUsersByRoleUrl, fromDate, toDate, userRole, accessToken }, thunkAPI) => {
    ...
  }
);
```

#### 🔧 Parameters:

- `getPresentUsersByRoleUrl`: API endpoint for present users
- `userRole`: Target role
- `fromDate`, `toDate`: Date range
- `accessToken`: Bearer token

#### ✅ Behavior:

- Sends a `GET` request to:
  `GET /{getPresentUsersByRoleUrl}/{userRole}?fromDate=...&toDate=...`
- Returns list of users marked as present in the given range

---

## 🔁 Reducer Logic (Extra Reducers)

These async thunks are handled in a reducer using `builder.addCase()` syntax.

Each thunk has **three states**:

- `pending` → Request started
- `fulfilled` → Request succeeded
- `rejected` → Request failed

### ✅ Common State Fields

- `state.loading`: `true` during requests
- `state.error`: Holds any error message
- `state.users`, `state.attendanceRecord`, `state.presentUsers`: Populated with response data

---

### 💼 getUsersByRole Reducer

```ts
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
```

---

### 📊 getAttendanceByUserRole Reducer

```ts
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
```

---

### 👥 getPresentUsersByRole Reducer

```ts
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
```

---

## ✅ Error Handling

Each thunk gracefully handles errors:

- Logs error to console
- Returns a readable error message to `state.error`
- Prioritizes:

  - `error.response.data.message` → from server
  - `error.message` → generic error
  - Fallback message → "Failed to fetch ..."

---

## 🔐 Authorization

All requests include `Authorization` headers using Bearer tokens:

```ts
headers: {
  Authorization: `Bearer ${accessToken}`;
}
```

Ensure the backend validates these tokens for protected routes.

---

## 🧪 Usage Example (Dispatching)

```ts
dispatch(
  getUsersByRole({
    getUserByRoleUrl: "/api/users",
    userRole: "student",
    accessToken
  })
);

dispatch(
  getAttendanceByUserRole({
    gettAttendanceByUserRoleUrl: "/api/attendance",
    userRole: "student",
    fromDate: "2023-01-01",
    toDate: "2023-01-31",
    accessToken
  })
);

dispatch(
  getPresentUsersByRole({
    getPresentUsersByRoleUrl: "/api/present",
    userRole: "teacher",
    fromDate: "2023-01-01",
    toDate: "2023-01-31",
    accessToken
  })
);
```

---

## 📌 Summary

| Feature                   | Endpoint            | Method | Auth | Params               |
| ------------------------- | ------------------- | ------ | ---- | -------------------- |
| Get users by role         | `/users/:role`      | GET    | ✅   | None                 |
| Get attendance by role    | `/attendance/:role` | GET    | ✅   | `fromDate`, `toDate` |
| Get present users by role | `/present/:role`    | GET    | ✅   | `fromDate`, `toDate` |

This module provides a clean, secure, and efficient way to handle role-based user and attendance data in your Redux store.

## **Attendance Slice (Updated)**

**File:** `attendanceSlice.js`

**Description (Updated Part):**
The `attendanceSlice` now includes a new async thunk `getAttendance` for fetching filtered attendance by user role and date range. Additionally, the slice now stores a `message` field when fetching users by role. These updates improve dynamic data fetching for the attendance page and provide better feedback from API calls.

---

### **Updated Features**

1. **New Async Thunk: `getAttendance`**

   - Fetches attendance for a specific `userRole` within a `fromDate`–`toDate` range.
   - Accepts the following parameters:

     ```javascript
     {
       getAttendanceUrl, // API endpoint base URL
         userRole, // role of users to fetch attendance for
         fromDate, // start date for filter
         toDate, // end date for filter
         accessToken; // JWT token for authorization
     }
     ```

   - Returns filtered attendance data from the backend.
   - Handles API errors gracefully and rejects with meaningful messages.

   ```javascript
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
         const message =
           error.response?.data?.message ||
           error.message ||
           `Failed to fetch attendance for ${userRole} ${fromDate} ${toDate}`;
         return thunkAPI.rejectWithValue(message);
       }
     }
   );
   ```

2. **Updated `getUsersByRole` Extra Reducer**

   - Now saves both the `users` array and a backend `message` returned from the API.

   ```javascript
   .addCase(getUsersByRole.fulfilled, (state, action) => {
     state.loading = false;
     state.users = action.payload.users;
     state.message = action.payload.message;
   });
   ```

3. **Extra Reducers for `getAttendance`**

   - Handles pending, fulfilled, and rejected states for the new thunk.
   - Updates `attendanceRecord` on successful fetch.
   - Captures `error` on rejection.

4. **State Additions**

   - Added `message: null` to `initialState` for storing informational messages from API responses.

---

### **Suggested Git Commit**

```
feat: add getAttendance thunk and update attendanceSlice

- Added getAttendance async thunk to fetch attendance filtered by user role and date range
- Updated getUsersByRole extra reducer to store API message alongside users
- Added message field to slice state for backend informational messages
- Handles pending, fulfilled, and rejected states for new thunk
- Improves dynamic attendance fetching and state management for frontend

```
