# 📌 Signup Flow Documentation

This document explains the signup functionality in detail, covering **routes, controller, service, repository, and model methods**.

---

## 1. **Route: `routes/user.routes.js`**

```js
import { signupUser } from "../controllers/user.controller.js";
import { sanitizeRequests } from "../middlewares/sanitizeData.js";
import { Router } from "express";

const router = Router();
router.route("/signup").post(sanitizeRequests, signupUser);
export default router;
```

### 🔹 What It Does:

- Defines the `/signup` endpoint.
- Uses `sanitizeRequests` middleware to clean incoming data (protects against XSS/injection).
- Passes control to the **controller** (`signupUser`) for request handling.

---

## 2. **Controller: `controllers/user.controller.js`**

```js
import * as UserService from "../services/user.services.js";

export const signupUser = async (req, res) => {
  try {
    const newUser = await UserService.signup(req.body);
    if (!newUser) {
      return res.status(400).json({ message: "User could not be created." });
    }

    return res
      .status(200)
      .json({ message: "User is created successfully", newUser });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
```

### 🔹 What It Does:

- Accepts sanitized request data (`req.body`).
- Calls `UserService.signup()` to handle business logic.
- Handles success:

  - Responds with `200` and success message + user object.

- Handles failure:

  - Returns appropriate error response with `statusCode` and error message.

---

## 3. **Service: `services/user.services.js`**

```js
import * as UserRepositories from "../repositories/user.repositories.js";
import ApiError from "../utils/ApiError.js";

export const signup = async (userData) => {
  const {
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
    userRole = "superAdmin"
  } = userData;

  // ✅ Field validation
  if (
    [email, firstName, lastName, phoneNumber, password, userRole].some(
      (fields) => !fields
    )
  ) {
    throw new ApiError("All fields are required!", 400);
  }

  // ✅ Check if user already exists
  const existingUser = await UserRepositories.findUserByEmail(email);
  if (existingUser) {
    throw new ApiError("User with this email already exist", 409);
  }

  // ✅ Create new user
  const newUser = await UserRepositories.signup({
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
    userRole
  });

  return newUser;
};
```

### 🔹 What It Does:

- Extracts required fields from `userData`.
- Validates that all required fields are present.
- Checks if a user already exists with the given email.
- If unique, calls `UserRepositories.signup()` to create the user.
- Throws `ApiError` for any validation or conflict issues.

---

## 4. **Repository: `repositories/user.repositories.js`**

```js
import { User } from "../models/user.model.js";

export const signup = (data) => User.create(data);
export const findUserByEmail = (email) => User.findOne({ email });
```

### 🔹 What It Does:

- `signup(data)` → Inserts a new user into the database.
- `findUserByEmail(email)` → Finds a user by email for duplicate check.

This layer abstracts **direct database operations** from business logic.

---

## 5. **Model: `models/user.model.js` (Relevant Part)**

```js
import mongoose, { model, Schema } from "mongoose";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  userRole: {
    type: String,
    enum: ["superAdmin", "admin", "teacher", "student"]
  }
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await compare(password, this.password);
};

// JWT access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

export const User = model("User", userSchema);
```

### 🔹 What It Does:

- Defines the `User` schema.
- Hashes passwords before saving to DB.
- Provides a method to validate password.
- Provides a method to generate JWT tokens for authentication.

---

## 🔄 Signup Flow Summary

1. **Route** `/signup`
   ⬇️
2. **Middleware** `sanitizeRequests` → cleans input
   ⬇️
3. **Controller** `signupUser` → handles request/response
   ⬇️
4. **Service** `signup` → business logic (validation + email check + create user)
   ⬇️
5. **Repository** → performs DB operations
   ⬇️
6. **Model** → User schema handles hashing, methods, and JWT

---

⚡ This structure ensures:

- **Clean separation of concerns**
- **Validation at multiple layers**
- **Reusable service & repository functions**
- **Secure handling of user data**

flowchart TD
A[Client Request: POST /signup] --> B[Middleware: sanitizeRequests]
B --> C[Controller: signupUser]
C -->|calls| D[Service: signup]
D -->|validates fields| E{All fields present?}
E -- No --> F[Throw ApiError: 400 "All fields are required"]
E -- Yes --> G[Check User by Email]
G -->|exists| H[Throw ApiError: 409 "User already exists"]
G -->|not exists| I[Repository: signup()]
I --> J[Model: User.create()]
J -->|pre-save hook| K[Hash Password]
K --> L[Save User to DB]
L --> M[Return newUser]
M --> N[Controller: success response]
N --> O[Response: 200 { message: "User created successfully", newUser }]
