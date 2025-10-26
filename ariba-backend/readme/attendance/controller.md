# Attendance Controller

This module provides controller functions for handling HTTP requests related to user attendance. It interacts with the attendance service to perform operations and sends appropriate responses to the client.

## Features

- **Mark Attendance**
  Handles user login and logout requests and returns success messages.

- **Get Attendance by User**
  Retrieves all attendance records for a given user and returns them in the response.

## Functions

### `markAttendance(req, res)`

Marks attendance for a user based on the `status` field (`in` for login, `out` for logout).

**Request Parameters:**

- `req.params.id` – the user ID
- `req.body.status` – `"in"` or `"out"`
- `req.body.attendanceId` – required for logout

**Response Example:**

```json
{
  "message": "Logged in successfully",
  "data": {
    "_id": "attendance_id",
    "user": "user_id",
    "loggedInAt": "2025-09-25T09:00:00Z",
    "loggedOutAt": "2025-09-25T17:00:00Z",
    "status": "in"
  }
}
```

**Error Response Example:**

```json
{
  "message": "Already logged in!"
}
```

---

### `getAttendanceByUserController(req, res)`

Fetches all attendance records for a specific user and returns them in the response.

**Request Parameters:**

- `req.params.id` – the user ID

**Response Example:**

```json
{
  "message": "Attendance fetched successfully",
  "attendance": [
    {
      "_id": "attendance_id",
      "user": "user_id",
      "loggedInAt": "2025-09-25T09:00:00Z",
      "loggedOutAt": "2025-09-25T17:00:00Z",
      "status": "in"
    }
  ]
}
```

**Error Response Example:**

```json
{
  "message": "Failed to get the user attendance"
}
```

1. Controller

Handles HTTP requests and responses.

export const getPresentDayAttendance = async (req, res) => {
try {
const response = await AttendanceService.getPresentDayAttendance(req);
return res
.status(200)
.json({ message: "Successfully fetched today's attendance", response });
} catch (error) {
return res
.status(400)
.json({ message: "Failed to get today's attendance" });
}
};

Description:

Receives the request and delegates it to the service layer.

Returns HTTP 200 on success with the attendance record.

Returns HTTP 400 if there is an error.
