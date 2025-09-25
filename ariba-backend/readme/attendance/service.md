# Attendance Service

This module contains service functions for managing user attendance, including marking login/logout and retrieving attendance records. It handles validation, error checking, and interacts with the `Attendance` repository.

## Features

- **Mark Attendance**
  Handles user login and logout, including validation for status and preventing duplicate logins.

- **Get Attendance by User**
  Retrieves all attendance records for a specific user.

## Functions

### `markAttendance(req)`

Marks attendance based on the `status` field in the request body (`in` for login, `out` for logout).

**Request Parameters:**

- `req.params.id` – the user ID
- `req.body.status` – `in` or `out`
- `req.body.attendanceId` – required for logout

**Behavior:**

- `in` – creates a new login record if no existing attendance for today
- `out` – updates an existing attendance record with logout time
- Throws errors for invalid status, missing user ID, or duplicate login

**Example Request Body:**

```json
{
  "status": "in",
  "attendanceId": "optional_for_login"
}
```

**Example Errors:**

- `"Already logged in!"` – if user tries to log in twice
- `"Attendance not found!"` – if logout is attempted without a record

---

### `getAttendanceByUserService(req)`

Fetches all attendance records for a given user.

**Request Parameters:**

- `req.params.id` – the user ID

**Response Example:**

```json
[
  {
    "_id": "attendance_id",
    "user": "user_id",
    "loggedInAt": "2025-09-25T09:00:00Z",
    "loggedOutAt": "2025-09-25T17:00:00Z",
    "status": "in"
  }
]
```
