# Actions Component

The `Actions` component provides **clock-in and clock-out functionality** for users within the attendance dashboard. It handles user interactions for logging work hours and integrates with Redux to manage state and API calls.

## Features

1. **Live Clock Display**

   - Uses the `<LiveClock />` component to show the current time.

2. **Clock In / Clock Out Button**

   - Users can click to **Clock In** or **Clock Out**.
   - Button text dynamically changes based on login state (`Web Clock In` / `Web Clock Out`).

3. **Logout Confirmation Popup**

   - If a user tries to log out, a popup appears asking for confirmation.
   - Options: `Cancel` or `Logout`.

4. **Redux Integration**

   - Dispatches `markClockIn` action for logging in.
   - Dispatches `markClockOut` action for logging out.
   - Accesses `loggedInUser` and `attendanceRecord` from Redux store.
   - Displays error messages if any (e.g., "Already Logged In").

5. **State Management**

   - `isLoggedIn` – Tracks whether the user is currently logged in.
   - `showLogoutPopup` – Controls visibility of the logout confirmation popup.

6. **Styling & Layout**

   - Card-style container with border and shadow.
   - Flexible layout for live clock and action buttons.
   - Popup styled with absolute positioning and interactive buttons.

## Props / Data

- **Redux State Used:**

  - `loggedInUser` – To get access token and user ID.
  - `attendanceRecord` – To track current attendance record.
  - `attendanceError` – To display errors if any.

- **API URLs:**

  - `attendanceUrlLogin` → POST `/api/v1/attendance/create-login`
  - `attendanceUrlLogout` → PATCH `/api/v1/attendance/create-logout`
