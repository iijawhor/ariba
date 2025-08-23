# 🔑 **Signin Flow Documentation**

This document describes the **signin (login) process** including **route, controller, service, repository, and helper function** in detail.

## 1. **Route: `routes/user.routes.js`**

```js
router.route("/signin").post(sanitizeRequests, signinUser);
```

### 🔹 What It Does:

- Defines the `/signin` endpoint for login requests.
- Uses `sanitizeRequests` middleware to clean request data (against XSS/injection).
- Passes control to the **controller** (`signinUser`) for processing.

## 2. **Controller: `controllers/user.controller.js`**

````js
export const signinUser = async (req, res) => {
  try {
    const user = await UserService.signin(req.body);
    if (!user) {
      return res
        .status(401)
        .json({ message: "login failed. Please check your credentials." });
    }

    const { accessToken, refreshToken } = await UserService.signin(req.body);
    const options = { httpOnly: true, secure: true };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User logged in successfully",
        ...user
      });
  } catch (error) {
    console.log(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};

### 🔹 What It Does:

- Accepts login data (`email`, `password`) from `req.body`.
- Calls `UserService.signin()` to validate user credentials.
- On success:

  - Generates `accessToken` and `refreshToken`.
  - Sets them as **secure, httpOnly cookies** (to prevent XSS theft).
  - Responds with success message and user info.

- On failure:

  - Returns `401` for invalid credentials.
  - Handles unexpected errors with status code and message.

---

## 3. **Service: `services/user.services.js`**

```js
export const signin = async (userData) => {
  const { email, password } = userData;

  const user = await UserRepositories.findUserByEmail(email);
  if (!user) {
    throw new ApiError("User not found!", 404);
  }

  const passwordIsMatch = await bcrypt.compare(password, user.password);
  if (!passwordIsMatch) {
    throw new ApiError("Invalid credentials.", 401);
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await UserRepositories.findUserById(user._id).select(
    "-password -refreshToken"
  );
  console.log("loggedInUser..", loggedInUser);

  return { user: loggedInUser, refreshToken, accessToken };
};

### 🔹 What It Does:

1. Extracts `email` and `password` from login data.
2. Validates:

   - Finds user by email.
     ⬇️ If not found → throw `404 User not found`.
   - Compares input password with hashed password using `bcrypt.compare`.
     ⬇️ If mismatch → throw `401 Invalid credentials`.

3. If valid:

   - Calls `generateAccessAndRefreshToken()` to create new tokens.
   - Retrieves the user without sensitive fields (`password`, `refreshToken`).
   - Returns user + tokens.

---

## 4. **Helper Function: `generateAccessAndRefreshToken`**

```js
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await UserRepositories.findUserById(userId);

    if (!user) {
      throw new ApiError("User not found! in token", 404);
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      "Something went wrong while generating access and refresh token",
      500
    );
  }
};
```

### 🔹 What It Does:

- Finds the user by `userId`.
- Generates:

  - **Access Token** (short-lived, for authentication).
  - **Refresh Token** (longer-lived, for renewing sessions).

- Stores refresh token in DB for session management.
- Returns both tokens for further use.

---

## 5. **Repository: `repositories/user.repositories.js`**

```js
export const findUserById = (userId) => {
  return User.findById(userId);
};
```

### 🔹 What It Does:

- Fetches user from the DB by `userId`.
- Used for:

  - Verifying existence before generating tokens.
  - Returning sanitized user object in signin.

---

## 🔄 **Signin Flow Summary**

1. **Client** sends `POST /signin` with `email` + `password`.
2. **Middleware** `sanitizeRequests` cleans input.
3. **Controller** `signinUser` calls service and handles response.
4. **Service** `signin`:

   - Checks if user exists.
   - Validates password using `bcrypt`.
   - Generates access/refresh tokens.

5. **Helper** `generateAccessAndRefreshToken` issues JWT tokens.
6. **Repository** fetches user from DB.
7. **Controller** sets secure cookies and responds with success message + user.

---

## 🛡 Security Features

- **HttpOnly & Secure cookies** → prevents JS access and MITM attacks.
- **Refresh token stored in DB** → allows logout and token invalidation.
- **Sanitization middleware** → prevents XSS/SQL injection.
- **Bcrypt password hashing** → protects stored passwords.
- **Custom ApiError handling** → consistent error responses.

---

## ✅ Example Response (success)

```json
{
  "message": "User logged in successfully",
  "user": {
    "_id": "65e1234abcd567",
    "firstName": "Ali",
    "lastName": "Khan",
    "email": "ali@example.com",
    "role": "superAdmin"
  }
}
```

## ❌ Example Response (invalid login)

```json
{
  "success": false,
  "message": "Invalid credentials."
}
```
````
