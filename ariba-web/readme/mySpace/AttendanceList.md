# AttendanceList Component

The `AttendanceList` component renders **individual attendance records** in a row format, showing login/logout times, gross hours worked, and additional actions.

## Features

1. **Display Attendance Data**

   - Shows the following details for each attendance record:

     - **Date** – Formatted using `getISTDate`.
     - **Gross Hours** – Calculated using `calculateGrossHours` from login and logout times.
     - **Login Time** – Formatted using `getISTTime`.
     - **Logout Time** – Formatted using `getISTTime`.

2. **More Actions Button**

   - A three-dot button (`<svg>`) is provided for additional actions (future functionality can be added here).

3. **Styling & Layout**

   - Uses a flex layout with proper spacing between elements.
   - Each row has a light gray background and text centered vertically.
   - Text is styled consistently with `font-[sans-serif]` and `text-gray-600`.

## Props

- `attendance` – Object containing attendance details:

  ```js
  {
    loggedInAt: Date,
    loggedOutAt: Date,
    ...otherFields
  }
  ```

## Example Usage

```jsx
<AttendanceList attendance={attendanceRecord} />
```

- Each row will render the date, gross hours, login/logout times, and a "more actions" button.
