# Attendance Model

This module defines the `Attendance` Mongoose model, which is used to track user attendance, including login and logout times, status, and device information.

## Schema Fields

| Field         | Type     | Description                                                                            |
| ------------- | -------- | -------------------------------------------------------------------------------------- |
| `user`        | ObjectId | Reference to the `User` model. Required.                                               |
| `status`      | String   | Attendance status. Enum: `"in"`, `"out"`, `"yet to login"`. Default: `"yet to login"`. |
| `loggedInAt`  | Date     | Timestamp when the user logged in. Default: `null`.                                    |
| `loggedOutAt` | Date     | Timestamp when the user logged out. Default: `null`.                                   |
| `date`        | Date     | The date for the attendance record. Defaults to midnight of the current day.           |
| `ipAddress`   | String   | Optional IP address from which the attendance was marked. Default: empty string.       |
| `device`      | String   | Optional device information. Default: empty string.                                    |

## Timestamps

- `createdAt` – Automatically set when the record is created.
- `updatedAt` – Automatically updated whenever the record changes.

## Indexing

- A unique index is created on `{ user, date }` to ensure only **one attendance record per user per day**.

## Example Document

```json
{
  "_id": "attendance_id",
  "user": "user_id",
  "status": "in",
  "loggedInAt": "2025-09-25T09:00:00Z",
  "loggedOutAt": null,
  "date": "2025-09-25T00:00:00Z",
  "ipAddress": "192.168.1.1",
  "device": "Chrome",
  "createdAt": "2025-09-25T09:00:00Z",
  "updatedAt": "2025-09-25T09:00:00Z"
}
```
