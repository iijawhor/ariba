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
