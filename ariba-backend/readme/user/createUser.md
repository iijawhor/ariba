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

Ah! Now I understand clearly — you want a **concise documentation highlighting all the changes in the updated version compared to the old code**, not a full method-by-method doc. Here's a proper **GitHub-style update summary** focusing only on the updated parts:

---

# 📝 User Service – Updated Version Highlights

This document summarizes **only the changes** made in the updated user service compared to the old version.

---

## **1. createUser**

**Changes:**

```diff
- religion,
+ dateOfBirth
```

- Removed `religion` from required field validation.
- Field order cleaned for readability.
- Organization fetching remains static (`kasbagolahighmadrasha@gmail.com`).
- All other logic unchanged.

---

## **2. updateUser**

**Changes:**

```diff
- const allowedOptions = [
-   "firstName", "lastName", "about", "address",
-   "phoneNumber", "dateOfjoining", "dateOfBirth", "gender", "religion"
- ];
- const filteredUpdates = Object.fromEntries(
-   Object.entries(updatedValue).filter(([key]) => allowedOptions.includes(key))
- );
- if (Object.keys(filteredUpdates).length === 0) {
-   throw new ApiError("No valid fields provided to update.", 400);
- }
+ const allowedOptions = [
+   "firstName", "lastName", "about", "dateOfBirth",
+   "address", "phoneNumber", "gender", "religion"
+ ];
+ const invalidKeys = Object.keys(updatedValue).filter(
+   (key) => !allowedOptions.includes(key)
+ );
+ if (invalidKeys.length > 0) {
+   throw new ApiError(`These fields are not allowed: ${invalidKeys.join(", ")}`, 400);
+ }
```

- Removed `dateOfjoining` from allowed fields.
- Invalid fields now **throw an explicit error** instead of silently filtering.
- Added clearer validation for empty updates and user not found.

---

## **3. addTimeline**

**Change:**

```diff
+ console.log("Timeline service ....", id, title, event, date);
```

- Added a debug log for timeline inputs.

---

## **4. Minor Validation & Error Handling**

- Standardized empty value checks (`if (!updatedValue)` and required fields).
- Improved error messages in `updateUser` and `createUser`.
- Code readability and maintainability improved; removed unused/old fields like `dateOfjoining`.

---

✅ **Summary:**

- **updateUser:** stricter validation, explicit error for invalid keys.
- **createUser:** lighter required fields check (removed `religion` from mandatory).
- **addTimeline:** debug logging added.
- **Overall:** cleaner code, better error reporting, and improved maintainability

---

# 📝 Auth & User Controller – Updated Highlights

### **1. getUsersByOrganization**

**Change:**

```diff
- const { organizationId, userRole } = req.query;
+ const { organization, userRole } = req.query;

- const users = await UserService.getOrganizationUsers({
-   organizationId,
-   userRole
- });
+ const users = await UserService.getOrganizationUsers({
+   organizationId: organization,
+   userRole
+ });
```

- Updated query parameter from `organizationId` to `organization` for better naming consistency.
- Passed as `organizationId` internally to service method.

---

### **2. Other Changes**

- No other functional changes detected in the new version.
- All other controller methods (`signupUser`, `signinUser`, `logoutUser`, `createUser`, `searchUser`, `getCurrentUser`, `refreshAccessToken`, `getUserDetailsById`, `addTimeline`, `updateUser`) remain **unchanged** in logic and structure.

---

✅ **Summary:**

- **Only change:** `getUsersByOrganization` query parameter updated from `organizationId` → `organization`.
- No other updates or refactors in the controller code.

---

# 📝 User Repositories – Updated Highlights

### **addTimeline**

**Change:**

```diff
- return await User.findByIdAndUpdate(
-   _id,
-   { $push: { timeline: [{ title, eventDate, event }] } },
-   { new: true }
- );
+ console.log("REPOS......", _id, title, event, eventDate);
+ return await User.findByIdAndUpdate(
+   _id,
+   { $push: { timeline: [{ title, eventDate, event }] } },
+   { new: true }
+ );
```

- Added a debug log to inspect timeline inputs when adding a timeline entry.

---

✅ **Summary:**

- **Only update:** `addTimeline` now logs `_id`, `title`, `event`, and `eventDate` for debugging purposes.
- No other methods or logic were modified
