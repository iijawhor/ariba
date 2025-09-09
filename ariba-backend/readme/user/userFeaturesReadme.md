# 🆕 Updated User Repository Functions

This section documents the **newly added functions** in the updated `user.repository.js`.

## 📌 `findUserDetailsById(userId)`

Fetches a user’s details along with their organization information using an **aggregation pipeline**.

- **Parameters:**

  - `userId` (`String | ObjectId`) – The user’s MongoDB ID.

- **Behavior:**

  - Matches the user by ID.
  - Looks up the corresponding organization from the `organizations` collection.
  - Unwinds the organization details (single object instead of array).
  - Projects out sensitive/unnecessary fields like `password` and `__v`.

- **Returns:**
  A user document enriched with `organizationDetails`.

---

## 📌 `findOrganizationUsers(organizationId, userRole)`

Finds all users belonging to a specific organization and role.

- **Parameters:**

  - `organizationId` (`String | ObjectId`) – The organization’s ID.
  - `userRole` (`String`) – The role of users to filter by.

- **Behavior:**

  - Queries all users in the given organization with the specified role.
  - Excludes sensitive fields (`password`, `__v`) and other non-essential fields (`timeline`, `religion`, `education`, `dateOfjoining`).

- **Returns:**
  An array of user documents.

---

## 📌 `addTimeline(_id, title, event, eventDate)`

Adds a new timeline entry to a user’s profile.

- **Parameters:**

  - `_id` (`String | ObjectId`) – User ID.
  - `title` (`String`) – Title of the timeline event.
  - `event` (`String`) – Description of the event.
  - `eventDate` (`Date`) – Date of the event.

- **Behavior:**

  - Pushes a new object (`{ title, eventDate, event }`) into the `timeline` array field of the user document.

- **Returns:**
  The updated user document including the new timeline entry.

---

## 📌 `updateUser(_id, updatedValue)`

Updates user details with validation.

- **Parameters:**

  - `_id` (`String | ObjectId`) – User ID.
  - `updatedValue` (`Object`) – Key-value pairs of fields to update.

- **Behavior:**

  - Uses `findByIdAndUpdate` with `{ new: true, runValidators: true }` for safe updates.

- **Returns:**
  The updated user document.

---

# 🆕 Updated User Services

## 📌 `getUserDetailsById(userId)`

Fetches a user’s details along with their organization information.

- **Parameters:**

  - `userId` (`String | ObjectId`) – The user’s MongoDB ID.

- **Behavior:**

  - Validates that a `userId` is provided.
  - Calls `UserRepositories.findUserDetailsById`.
  - Ensures the user exists.

- **Returns:**
  A single user object enriched with `organizationDetails`.

---

## 📌 `getOrganizationUsers({ organizationId, userRole })`

Fetches all users from a specific organization filtered by role.

- **Parameters:**

  - `organizationId` (`String | ObjectId`) – The organization’s ID.
  - `userRole` (`String`) – (Optional) The role of users to filter by.

- **Behavior:**

  - Validates that `organizationId` is provided.
  - Calls `UserRepositories.findOrganizationUsers`.
  - Ensures users exist.

- **Returns:**
  An array of users without sensitive fields.

---

## 📌 `addTimeline(id, title, event, date)`

Adds a new timeline entry for a user.

- **Parameters:**

  - `id` (`String | ObjectId`) – User ID.
  - `title` (`String`) – Title of the timeline event.
  - `event` (`String`) – Description of the event.
  - `date` (`Date`) – Date of the event.

- **Behavior:**

  - Validates that `id` and `title` are provided.
  - Calls `UserRepositories.addTimeline`.
  - Ensures timeline creation succeeds.

- **Returns:**
  Updated user document with the new timeline entry.

---

## 📌 `updateUser(_id, updatedValue)`

Updates allowed user fields with validation.

- **Parameters:**

  - `_id` (`String | ObjectId`) – User ID.
  - `updatedValue` (`Object`) – Key-value pairs of fields to update.

- **Behavior:**

  - Ensures the user exists.
  - Validates that `updatedValue` is provided.
  - Restricts updates to the following allowed fields:

    ```
    firstName, lastName, about, dateOfBirth, address,
    phoneNumber, gender, religion
    ```

  - Throws an error if invalid fields are provided.
  - Calls `UserRepositories.updateUser` with validation enabled.

- **Returns:**
  Updated user document.

---

# 🆕 Updated Auth Controller Methods

## 📌 `getUserDetailsById(req, res)`

Fetches details of a specific user by their **ID**.

- **Endpoint Example:**
  `GET /api/users/:id`

- **Parameters (req.params):**

  - `id` (`String | ObjectId`) – The user’s MongoDB ID.

- **Behavior:**

  - Calls `UserService.getUserDetailsById(userId)` to fetch details.
  - Returns the user document enriched with additional info (organization, etc.).

- **Response Example:**

  ```json
  {
    "success": true,
    "message": "User fetched successfully",
    "data": {
      "_id": "64ac...",
      "firstName": "John",
      "lastName": "Doe",
      "organizationDetails": {...}
    }
  }
  ```

---

## 📌 `getUsersByOrganization(req, res)`

Fetches all users in a given organization with a specific role.

- **Endpoint Example:**
  `GET /api/users?organization=ORG_ID&userRole=teacher`

- **Parameters (req.query):**

  - `organization` (`String | ObjectId`) – Organization ID.
  - `userRole` (`String`) – Role filter (e.g., `teacher`, `student`).

- **Behavior:**

  - Calls `UserService.getOrganizationUsers({ organizationId, userRole })`.
  - Returns an array of users that belong to the organization with the given role.

- **Response Example:**

  ```json
  {
    "success": true,
    "message": "User fetched successfully",
    "users": [
      {
        "_id": "64ac...",
        "firstName": "Alice",
        "lastName": "Smith",
        "role": "teacher"
      }
    ]
  }
  ```

---

## 📌 `addTimeline(req, res)`

Adds a timeline entry to a user’s profile.

- **Endpoint Example:**
  `POST /api/users/:id/timeline`

- **Parameters:**

  - `req.params.id` – User ID.
  - `req.body` – Timeline object containing:

    - `title` (`String`)
    - `event` (`String`)
    - `eventDate` (`Date`)

- **Behavior:**

  - Calls `UserService.addTimeline(id, title, event, eventDate)`.
  - Pushes the event into the user’s `timeline` array.

- **Response Example:**

  ```json
  {
    "success": true,
    "message": "Timeline added successfully",
    "timeline": [
      {
        "title": "Joined School",
        "eventDate": "2023-08-01",
        "event": "Started as teacher"
      }
    ]
  }
  ```

---

## 📌 `updateUser(req, res)`

Updates user details safely.

- **Endpoint Example:**
  `PUT /api/users/:id`

- **Parameters:**

  - `req.params.id` – User ID.
  - `req.body` – Object with updated fields.

- **Behavior:**

  - Calls `UserService.updateUser(id, req.body)`.
  - Validates allowed fields before updating.
  - Returns the updated user document.

- **Response Example:**

  ```json
  {
    "success": true,
    "message": "User updated successfully",
    "data": {
      "_id": "64ac...",
      "firstName": "John",
      "lastName": "Updated"
    }
  }
  ```

# 🆕 Updated User Model

This document explains the updates made to the **`User` model** (`user.model.js`).

## 📌 New Additions

### 1. `about` field

- **Type:** `String`
- **Validation:** Minimum 3 characters, Maximum 200 characters.
- **Purpose:** Stores a short description or bio about the user.

---

## 📌 Existing Features (Retained)

- **Timeline Schema**

  - Each timeline entry has `title`, `event`, and `eventDate`.
  - `eventDate` uses a getter to format dates as `YYYY-MM-DD`.

- **Core Fields**

  - `firstName`, `lastName`, `email`, `password`, `phoneNumber`.
  - Validation includes strong password check, 10-digit phone validation, and email format validation.

- **User Metadata**

  - `organization` (ref: `Organization`).
  - `dateOfBirth`, `dateOfJoining` (with formatted getter).
  - `bloodGroup`, `age`, `gender`, `religion`, `address`.
  - `education`, `department`, `avatar`.

- **Role & Status**

  - `userRole`: One of `superAdmin`, `admin`, `teacher`, `student`.
  - `status`: Either `active` or `inactive`.

- **Authentication**

  - Password hashing using `bcrypt` before saving.
  - `isPasswordCorrect` method for login checks.
  - `generateAccessToken` & `generateRefreshToken` methods for JWT handling.
  - `refreshToken` stored in DB.

- **Indexes**

  - Text indexes on `firstName`, `lastName`, `email`, `phoneNumber`, `userRole` for efficient search.

---

## ✅ Why This Update?

The `about` field was added to let users **add personal bios or descriptions**, improving profile customization and user context in applications.
Got it 👍 Since you already had a **routes README style** for the other updates, here’s one that clearly documents the **newly added/modified routes** compared to the old version:

---

# 🆕 Updated User Routes

## 📌 New Routes

### 1. `PATCH /update-user/:id`

Updates user details.

- **Middleware:**

  - `verifyJWT` – Ensures the request is authenticated.
  - `sanitizeRequests` – Sanitizes input before processing.

- **Controller:**

  - `updateUser` – Handles updating user fields.

---

### 2. `GET /get-user-by-id/:id`

Fetches user details along with organization information.

- **Controller:**

  - `getUserDetailsById`

---

### 3. `GET /get-organization-users`

Retrieves users belonging to a specific organization and role.

- **Controller:**

  - `getUsersByOrganization`

---

### 4. `PATCH /add-timeline/:id`

Adds a new timeline entry to the user’s profile.

- **Controller:**

  - `addTimeline`

---

## 📌 Modified Routes

### `POST /create-user`

- **Old Behavior:** Allowed only `superAdmin` role.
- **New Behavior:** Allows both `superAdmin` and `admin` roles.

---

## 📌 Unchanged Routes

- `POST /signup` → Registers a new user.
- `POST /signin` → Signs in a user.
- `POST /logout` → Logs out a user (requires JWT).
- `POST /refresh-token` → Refreshes access tokens.
- `GET /search` → Searches users (with sanitization).

---

✅ These changes expand the **user management functionality** by adding timeline support, user updates, and richer organization-based queries.
