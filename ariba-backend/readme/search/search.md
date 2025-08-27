# 🔍 User Search API (Node.js + Express + Mongoose)

This project provides a **search functionality** for users stored in MongoDB using **Node.js, Express, and Mongoose**.
The search is **generic** and reusable across multiple models, supports **pagination**, and uses **regex search** for flexible matching.

---

## 📂 Project Structure

```
src/
 ├── controllers/
 │    └── user.controller.js    # Handles API requests & responses
 ├── services/
 │    └── user.service.js       # Business logic layer
 ├── repositories/
 │    └── user.repository.js    # Handles database operations
 ├── utils/
 │    └── searchQuery.js        # Generic reusable search function
 ├── models/
 │    └── user.model.js         # Mongoose schema & model
 ├── routes/
 │    └── user.routes.js        # Defines API routes
```

---

## ⚡ API Flow

1. **Client** sends request → `/search?query=John&page=1&limit=10`
2. **Controller (`searchUser`)** receives request and calls the service
3. **Service (`searchUser`)** validates input and calls repository
4. **Repository (`searchUsers`)** calls generic `searchQuery`
5. **Generic Search (`searchQuery`)** builds MongoDB query using `$regex`
6. **MongoDB** returns results → sent back to client

---

## 📝 Code Overview

### Generic Search Function (`utils/searchQuery.js`)

```js
export const searchQuery = async (
  model,
  query,
  searchFields,
  limit = 15,
  page = 1
) => {
  if (!query || query.length < 3) {
    return [];
  }

  const searchConditions = searchFields.map((field) => ({
    [field]: { $regex: query, $options: "i" }
  }));

  const skip = (page - 1) * limit;

  return model
    .find({ $or: searchConditions })
    .select("firstName lastName email phoneNumber userRole")
    .skip(skip)
    .limit(limit)
    .lean();
};
```

---

### Repository (`repositories/user.repository.js`)

```js
export const searchUsers = (queryData) => {
  const { query, limit, page } = queryData;

  // Escape regex special characters
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const safeQuery = escapeRegex(query);

  return searchQuery(
    User,
    safeQuery,
    ["firstName", "lastName", "email", "phoneNumber"],
    limit,
    page
  );
};
```

---

### Service (`services/user.service.js`)

```js
export const searchUser = async (searchFields) => {
  const { query } = searchFields;
  if (!query) {
    throw new ApiError("Please enter query to search!", 400);
  }

  return UserRepositories.searchUsers(searchFields);
};
```

---

### Controller (`controllers/user.controller.js`)

```js
export const searchUser = async (req, res) => {
  try {
    const result = await UserService.searchUser(req.query);

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }

    res.status(200).json({
      success: true,
      message: `Found ${result.length} matching users.`,
      data: result
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
```

---

### Route (`routes/user.routes.js`)

```js
router.route("/search").get(verifyJWT, sanitizeRequests, searchUser);
```

---

## 🔑 Example Request (Postman)

### Endpoint

```
GET /api/v1/users/search?query=John&page=1&limit=5
```

### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

### Response

```json
{
  "success": true,
  "message": "Found 2 matching users.",
  "data": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phoneNumber": "1234567890",
      "userRole": "student"
    },
    {
      "firstName": "Johnny",
      "lastName": "Smith",
      "email": "johnny@example.com",
      "phoneNumber": "9876543210",
      "userRole": "teacher"
    }
  ]
}
```

## 📌 Notes

- **Pagination** supported via `page` and `limit`
- **Regex search** (case-insensitive) for flexible matching
- **Security**: `escapeRegex` prevents regex injection attacks
- **JWT authentication** required for access

---

## 🚀 Future Improvements

- Switch from regex to **MongoDB text indexes** for better performance on large datasets:

  ```js
  userSchema.index({ firstName: "text", lastName: "text", email: "text" });
  ```

- Add filters (e.g., `role`, `status`)
- Implement caching (Redis) for repeated queries
