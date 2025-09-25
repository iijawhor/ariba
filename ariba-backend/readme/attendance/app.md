# Attendance Feature

This module provides functions to manage user attendance, including login and logout tracking. It uses the `Attendance` model for database operations.

## Features

- **Get Attendance by ID**
  Retrieve a single attendance record using its unique ID.

- **Get Attendance by User ID**
  Fetch all attendance records for a specific user.

- **Create Attendance Login**
  Record a new login entry when a user logs in.

- **Create Attendance Logout**
  Update an existing attendance record with logout time and status.

## Functions

### `getAttendanceById(id)`

Fetches an attendance record by its ID.

### `getAttendanceByUserId(userId)`

Returns all attendance records associated with a given user.

### `createAttendanceLogin(attendanceData)`

Creates a new attendance record when a user logs in.

### `createAttendanceLogout(data)`

Updates an existing attendance record with `loggedOutAt` and `status` fields when a user logs out.

## Example Data Structure

```json
{
  "_id": "attendance_id",
  "user": "user_id",
  "loggedInAt": "2025-09-25T09:00:00Z",
  "loggedOutAt": "2025-09-25T17:00:00Z",
  "status": "Present"
}
```
