# Attendance API Routes

This module provides API endpoints to handle attendance tracking, including login, logout, and fetching attendance records for users.

## Base URL

```
/api/v1/attendance
```

## Endpoints

### 1. **Mark Attendance Login**

```
POST /create-login/:id
```

**Description:**
Record a login for a specific user.

**Middleware:**

- `verifyJWT` – ensures the request is authenticated
- `sanitizeRequests` – sanitizes incoming data

**URL Parameters:**

- `id` – the user ID for whom attendance is being recorded

**Request Body:**

```json
{
  "loggedInAt": "2025-09-25T09:00:00Z",
  "status": "Present"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "attendance_id",
    "user": "user_id",
    "loggedInAt": "2025-09-25T09:00:00Z",
    "status": "Present"
  }
}
```

---

### 2. **Mark Attendance Logout**

```
PATCH /create-logout/:id
```

**Description:**
Update a user's attendance with logout time and status.

**Middleware:**

- `verifyJWT` – ensures the request is authenticated
- `sanitizeRequests` – sanitizes incoming data

**URL Parameters:**

- `id` – the user ID whose attendance is being updated

**Request Body:**

```json
{
  "loggedOutAt": "2025-09-25T17:00:00Z",
  "status": "Present"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "attendance_id",
    "user": "user_id",
    "loggedInAt": "2025-09-25T09:00:00Z",
    "loggedOutAt": "2025-09-25T17:00:00Z",
    "status": "Present"
  }
}
```

---

### 3. **Get Attendance by User**

```
GET /get-attendance/:id
```

**Description:**
Fetch all attendance records for a specific user.

**Middleware:**

- `verifyJWT` – ensures the request is authenticated
- `sanitizeRequests` – sanitizes incoming data

**URL Parameters:**

- `id` – the user ID

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "attendance_id",
      "user": "user_id",
      "loggedInAt": "2025-09-25T09:00:00Z",
      "loggedOutAt": "2025-09-25T17:00:00Z",
      "status": "Present"
    }
  ]
}
```
