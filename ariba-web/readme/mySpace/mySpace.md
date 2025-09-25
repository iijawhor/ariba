# MySpace Component

The `MySpace` component serves as the **user dashboard** for logged-in users, displaying attendance stats, timings, actions, and detailed attendance records.

## Features

1. **Fetch Attendance Data**

   - Uses Redux to dispatch the `gettAttendanceByUser` action.
   - Fetches attendance records for the logged-in user from the backend API.
   - Stores data in Redux state (`attendance.attendanceByUser`).

2. **Attendance Stats Section**

   - Displays summarized attendance statistics using the `<AttendanceStats />` component.

3. **Timings Section**

   - Shows daily or monthly timings for the user using the `<Timings />` component.

4. **Actions Section**

   - Provides user actions like login/logout attendance using the `<Actions />` component.

5. **Attendance List**

   - Displays detailed attendance records in a table-like layout.
   - Columns: `date`, `gross hours`, `login`, `logout`, `log`.
   - Uses the `<AttendanceList />` component to render each record.

## Key Points

- **Redux Integration:**

  - `useSelector` is used to access `loggedInUser` and `attendance` data from the store.
  - `useDispatch` is used to dispatch the attendance fetch action.

- **API Call:**

  - `gettAttendanceByUser` is dispatched with the API URL, `accessToken`, and `userId`.

- **Layout:**

  - Uses a flex layout with responsive cards for stats, timings, and actions.
  - Attendance list is scrollable with headings displayed at the top.

- **Dependencies:**

  - Components: `AttendanceStats`, `Timings`, `Actions`, `AttendanceList`.
  - Redux slice: `atttendanceSlice.js`.
  - Axios for API calls (though dispatched via Redux thunk)
