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
