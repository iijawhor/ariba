# 🧑‍💻 Create User Feature Documentation

This document describes the **create user flow**, including **route, controller, service, and repository/DAO**, with security and validation details.

---

## 1. **Route: `routes/user.routes.js`**

```js
router
  .route("/create-user")
  .post(verifyJWT, sanitizeRequests, validateRole(["superAdmin"]), createUser);
```

### 🔹 What It Does:

- Defines the `/create-user` endpoint for creating new users.
- Applies middleware:

  1. **`verifyJWT`** → Validates JWT token to ensure only authenticated users can access.
  2. **`sanitizeRequests`** → Sanitizes request data to prevent XSS or injection attacks.
  3. **`validateRole(["superAdmin"])`** → Only users with `superAdmin` role can create new users.

- Calls the **controller** `createUser` to handle the request.

---

## 2. **Controller: `controllers/user.controller.js`**

```js
export const createUser = async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);
    if (!newUser) {
      return res.status(400).json({ message: "User is not created!" });
    }
    return res
      .status(200)
      .json({ message: "User is created successfully", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
```

### 🔹 What It Does:

- Accepts user data (`firstName`, `lastName`, `email`, `password`, `userRole`) from the request body.
- Calls the **service** `createUser` to handle business logic and validation.
- On success, responds with **status 200** and the newly created user.
- On failure, sends the proper error message and status code.

---

## 3. **Service: `services/user.services.js`**

```js
export const createUser = async (userData) => {
  const { firstName, lastName, email, password, userRole } = userData;

  // 1. Validate all required fields
  if (
    [firstName, lastName, email, password, userRole].some((fields) => !fields)
  ) {
    throw new ApiError("All fields are required", 400);
  }

  // 2. Check if user with same email already exists
  const existingUser = await UserRepositories.findUserByEmail(email);
  if (existingUser) {
    throw new ApiError("User with this email already exists", 400);
  }

  // 3. Find organization by email
  const orgEmail = "kasbagolahighmadrasha@gmail.com";
  const organization = await OrganizationRepositories.findOrganizationByEmail(
    orgEmail
  );
  if (!organization) {
    throw new ApiError("Organization not found!", 400);
  }

  // 4. Create new user
  const newUser = await UserRepositories.createUser({
    firstName,
    lastName,
    email,
    password,
    userRole,
    organization: organization._id
  });

  return newUser;
};
```

### 🔹 What It Does:

1. Validates all required fields are provided.
2. Checks if a user with the same email already exists.
3. Ensures the user belongs to a valid organization (hardcoded `kasbagolahighmadrasha@gmail.com`).
4. Creates the new user in the database via the **repository/DAO**.
5. Returns the newly created user object.

---

## 4. **Repository/DAO: `repositories/user.repositories.js`**

```js
export const createUser = (data) => User.create(data);
export const findUserByEmail = (email) => User.findOne({ email });
```

### 🔹 What It Does:

- `createUser(data)` → Inserts a new user into the **User collection**.
- `findUserByEmail(email)` → Retrieves a user by email for validation purposes.

---

## 5. **Security and Middleware**

1. **`verifyJWT`** → Ensures only authenticated users can access the endpoint.
2. **`sanitizeRequests`** → Cleans the request input to prevent XSS attacks.
3. **`validateRole(["superAdmin"])`** → Restricts access to users with the `superAdmin` role only.

---

## 6. **Example Request**

```json
POST /create-user
{
  "firstName": "Ali",
  "lastName": "Khan",
  "email": "ali@example.com",
  "password": "StrongPassword123!",
  "userRole": "admin"
}
```

---

## 7. **Example Response (Success)**

```json
{
  "message": "User is created successfully",
  "user": {
    "_id": "64a1b2c3d4e5f67890",
    "firstName": "Ali",
    "lastName": "Khan",
    "email": "ali@example.com",
    "userRole": "admin",
    "organization": "64a1b2c3d4e5f67899"
  }
}
```

---

## 8. **Example Response (Error)**

```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

---

## ✅ **Flow Summary**

1. Client sends `POST /create-user` with user info.
2. Request passes through **JWT verification**, **input sanitization**, and **role validation**.
3. Controller calls service to validate and create the user.
4. Service interacts with repository/DAO to store the user.
5. Controller responds with success or error message.
