# `verifyJWT` Middleware

This middleware is responsible for validating JSON Web Tokens (JWT) in incoming requests and attaching the authenticated user to the `req` object. It ensures that only authorized users can access protected routes.

---

## 📌 File

`middlewares/verifyJWT.js`

---

## 📖 Usage

Attach the middleware to any protected route:

```js
import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { getProfile } from "../controllers/user.controller.js";

const router = Router();

router.get("/profile", verifyJWT, getProfile);

export default router;
```

Now, only requests with a valid JWT will be able to access `/profile`.

---

## ⚙️ How it Works

1. **Token Extraction**

   - The middleware looks for the token in:

     - `req.cookies.accessToken` (cookie-based auth), or
     - `Authorization` header with the format:

       ```
       Authorization: Bearer <token>
       ```

2. **Token Verification**

   - Uses `jwt.verify()` with `process.env.ACCESS_TOKEN_SECRET` to validate the token.
   - Extracts the `_id` from the decoded token.

3. **User Lookup**

   - Fetches the user from the database by `_id` using `User.findById()`.
   - Excludes sensitive fields (`password`, `refreshToken`) from the response.

4. **Attach User**

   - If valid, attaches the user to `req.user` so it can be accessed in controllers.

5. **Error Handling**

   - If the token is missing, invalid, or the user is not found, it throws an `ApiError` with status `401 Unauthorized`.

---

## 🔒 Security Notes

- Access token should be **short-lived** (e.g., 15–30 minutes).
- Use **refresh tokens** to issue new access tokens when needed.
- Always store access tokens securely (prefer **HttpOnly cookies** over localStorage).

---

## ✅ Example Request

**Request with Authorization header:**

```http
GET /profile HTTP/1.1
Host: api.example.com
Authorization: Bearer <your_access_token>
```

**Request with Cookies:**

```http
GET /profile HTTP/1.1
Host: api.example.com
Cookie: accessToken=<your_access_token>
```
