## 📘 **Get Users by Role (Multi-Tenant Access Control)**

### **Overview**

This endpoint retrieves all users belonging to a specific role **within the logged-in user's organization**.
It enforces **JWT authentication** and **tenant-based isolation**, ensuring users can only view data from their own organization.

---

### **🔹 Route Definition**

```js
router.get("/by-role/:userRole", verifyJWT, sanitizeRequests, getUserByRole);
```

- **Method:** `GET`
- **Endpoint:** `/api/v1/attendance/by-role/:userRole`
- **Middlewares:**

  - `verifyJWT` → Validates JWT and attaches user info to `req.user`
  - `sanitizeRequests` → Cleans incoming request data to prevent injection attacks
  - `getUserByRole` → Controller to fetch users by role within the tenant

---

### **🔹 Request Example**

**Endpoint:**

```
GET http://localhost:7000/api/v1/attendance/by-role/admin
```

**Headers:**

```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

> Note:
> The JWT must contain `organization` or `organizationId` for tenant validation.

---

### **🔹 Controller Layer**

```js
export const getUserByRole = async (req, res) => {
  try {
    const users = await UserService.getUsersByRole(req);
    return res
      .status(200)
      .json({ message: "Users fetched successfully", users });
  } catch (error) {
    return res.status(400).json({ message: "Failed to fetch users by role" });
  }
};
```

- Calls the `UserService` layer to handle business logic.
- Returns all users with the requested `userRole` that belong to the same organization as the requester.

---

### **🔹 Service Layer**

```js
export const getUsersByRole = async (req) => {
  return await AttendanceRepositories.getUserByRole(req);
};
```

- Acts as a **bridge** between the controller and repository.
- Keeps business logic separate and reusable across modules.

---

### **🔹 Repository Layer**

```js
export const getUserByRole = async (req) => {
  const { userRole } = req.params;
  const { organization } = req.user;

  console.log("Organization......", organization);
  console.log("User role........", userRole);

  return User.find({ userRole, organization });
};
```

- Handles **database querying** via Mongoose.
- Returns users where both:

  - `userRole` matches the route parameter
  - `organization` matches the logged-in user’s organization (multi-tenant restriction)

---

### **🔹 Authentication Middleware**

```js
export const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // includes organization info
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
```

Ensures every request carries a valid token and attaches user data (including `organization`) to `req.user`.

---

### **✅ Response Example**

**200 OK**

```json
{
  "message": "Users fetched successfully",
  "users": [
    {
      "_id": "6717b0f4c3b8127a66a5b2c0",
      "name": "John Doe",
      "email": "john@school.com",
      "userRole": "admin",
      "organization": "school_123"
    },
    {
      "_id": "6717b0f4c3b8127a66a5b2c9",
      "name": "Jane Smith",
      "email": "jane@school.com",
      "userRole": "admin",
      "organization": "school_123"
    }
  ]
}
```

**400 Bad Request**

```json
{
  "message": "Failed to fetch users by role"
}
```

**401 Unauthorized**

```json
{
  "message": "Unauthorized"
}
```

---

### **🔹 Flow Summary**

```
Request → verifyJWT → sanitizeRequests → getUserByRole (Controller)
           ↓
        UserService.getUsersByRole(req)
           ↓
  AttendanceRepositories.getUserByRole(req)
           ↓
     User.find({ userRole, organization })
           ↓
      Returns filtered users (same tenant only)
```

<!-- get attendance and stats -->
<!-- Attendance Repositories -->

### **Documentation: `getAttendance` Function**

**File:** `attendanceService.js` (example)

**Description:**
Fetches users by their role and aggregates their attendance records within a specified date range. If no dates are provided, it defaults to the last month up to the current day.

---

#### **Function Signature**

```javascript
export const getAttendance = async ({ userRole, fromDate, toDate }) => { ... }
```

---

#### **Parameters**

| Parameter  | Type               | Required | Description                                                                         |
| ---------- | ------------------ | -------- | ----------------------------------------------------------------------------------- |
| `userRole` | `string`           | ✅       | Role of the users to fetch (e.g., `"teacher"`, `"student"`).                        |
| `fromDate` | `string` or `Date` | ❌       | Start date for filtering attendance records. Defaults to one month before `toDate`. |
| `toDate`   | `string` or `Date` | ❌       | End date for filtering attendance records. Defaults to today.                       |

---

#### **Functionality**

1. **Safe Date Handling:**

   - Converts `fromDate` and `toDate` into JavaScript `Date` objects.
   - If `fromDate` is missing, sets it to one month before `toDate`.
   - Extends `toDate` to `23:59:59.999` and `fromDate` to `00:00:00.000` to include full days.

2. **User Filtering:**

   - Uses MongoDB aggregation to fetch all users matching the provided `userRole`.

3. **Attendance Lookup:**

   - Performs a `$lookup` on the `attendances` collection.
   - Filters attendance records for each user within the `fromDate` and `toDate` range.
   - Returns only relevant fields: `date`, `status`, `loggedInAt`, `loggedOutAt`.

4. **Projection:**

   - Returns a clean object for each user:

     ```json
     {
       "firstName": "string",
       "lastName": "string",
       "email": "string",
       "userRole": "string",
       "attendanceRecords": [
         {
           "date": "Date",
           "status": "string",
           "loggedInAt": "Date",
           "loggedOutAt": "Date"
         }
       ]
     }
     ```

---

#### **Example Usage**

```javascript
const attendanceList = await getAttendance({
  userRole: "teacher",
  fromDate: "2025-09-01",
  toDate: "2025-09-30"
});

console.log(attendanceList);
```

**Output:**

```json
[
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "userRole": "teacher",
    "attendanceRecords": [
      {
        "date": "2025-09-05T00:00:00.000Z",
        "status": "in",
        "loggedInAt": "2025-09-05T09:00:00.000Z",
        "loggedOutAt": "2025-09-05T17:00:00.000Z"
      }
    ]
  }
]
```

---

#### **Notes**

- Ensure that the `attendances` collection stores the `user` field as a reference to the `User` `_id`.
- The function supports optional date filtering; leaving both dates empty fetches attendance from the last month.
<!-- Attendance Service -->

### **Service: `getAttendance`**

**File:** `attendance.services.js`

**Description:**
Fetches users along with their attendance records filtered by role, date range, and optionally attendance status. This service acts as a bridge between the controller and the repository, applying query parameters from the request.

---

#### **Function Signature**

```javascript
export const getAttendance = async (req) => { ... }
```

---

#### **Parameters**

| Parameter             | Type                         | Required | Description                                                                           |
| --------------------- | ---------------------------- | -------- | ------------------------------------------------------------------------------------- |
| `req.params.userRole` | `string`                     | ✅       | The role of users to fetch (e.g., `"teacher"`, `"student"`).                          |
| `req.query.fromDate`  | `string` (YYYY-MM-DD)        | ❌       | Optional start date for filtering attendance records. Defaults handled in repository. |
| `req.query.toDate`    | `string` (YYYY-MM-DD)        | ❌       | Optional end date for filtering attendance records. Defaults handled in repository.   |
| `req.query.status`    | `string` (`"in"` or `"out"`) | ❌       | Optional filter to fetch only records with a specific attendance status.              |

---

#### **Functionality**

1. Logs the request query for debugging:

   ```javascript
   console.log("In service...", userRole, fromDate, toDate, status);
   ```

2. Calls the repository function `AttendanceRepositories.getAttendance` with the following parameters:

   - `userRole` → filters users by role.
   - `fromDate` and `toDate` → filter attendance within a specific date range.
   - `status` → filter attendance by status if provided.

3. Returns an array of user objects with their attendance records.

---

#### **Example Usage**

```javascript
GET /api/attendance/teacher?fromDate=2025-09-01&toDate=2025-09-30&status=in
```

**Controller Call:**

```javascript
const attendance = await getAttendance(req);
```

**Example Output:**

```json
[
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "userRole": "teacher",
    "attendanceRecords": [
      {
        "date": "2025-09-05T00:00:00.000Z",
        "status": "in",
        "loggedInAt": "2025-09-05T09:00:00.000Z",
        "loggedOutAt": "2025-09-05T17:00:00.000Z"
      }
    ]
  }
]
```

---

#### **Notes**

- The service supports optional query filters; if dates or status are missing, defaults are handled in the repository layer.
- Useful for building attendance reports, analytics, or dashboards filtered by user role and date range.

<!-- attendance controller -->

### **Controller: `getAttendance`**

**File:** `attendance.controller.js`

**Description:**
Handles HTTP requests to fetch attendance records for users filtered by role, date range, and optional status. Calls the corresponding service and returns a JSON response to the client.

---

#### **Function Signature**

```javascript
export const getAttendance = async (req, res) => { ... }
```

---

#### **Parameters**

| Parameter             | Type                         | Required | Description                                                              |
| --------------------- | ---------------------------- | -------- | ------------------------------------------------------------------------ |
| `req.params.userRole` | `string`                     | ✅       | Role of the users to fetch (e.g., `"teacher"`, `"student"`).             |
| `req.query.fromDate`  | `string` (YYYY-MM-DD)        | ❌       | Optional start date for filtering attendance records.                    |
| `req.query.toDate`    | `string` (YYYY-MM-DD)        | ❌       | Optional end date for filtering attendance records.                      |
| `req.query.status`    | `string` (`"in"` or `"out"`) | ❌       | Optional filter to fetch only records with a specific attendance status. |
| `res`                 | `object`                     | ✅       | Express response object used to send JSON response.                      |

---

#### **Functionality**

1. Calls the service layer `AttendanceService.getAttendance(req)` to fetch filtered attendance records.
2. Logs request params and query for debugging purposes.
3. Returns a **200 OK** JSON response with:

   ```json
   {
     "message": "Attendance fetched successfully",
     "attendance": [...]
   }
   ```

4. Catches errors and returns a **400 Bad Request** with a failure message if something goes wrong.

---

#### **Example Usage (Express Route)**

```javascript
// Route
app.get('/api/attendance/:userRole', getAttendance);

// Request
GET /api/attendance/teacher?fromDate=2025-09-01&toDate=2025-09-30&status=in

// Response
{
  "message": "Attendance fetched successfully",
  "attendance": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "userRole": "teacher",
      "attendanceRecords": [
        {
          "date": "2025-09-05T00:00:00.000Z",
          "status": "in",
          "loggedInAt": "2025-09-05T09:00:00.000Z",
          "loggedOutAt": "2025-09-05T17:00:00.000Z"
        }
      ]
    }
  ]
}
```
