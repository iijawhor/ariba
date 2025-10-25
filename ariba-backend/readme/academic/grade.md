# **Academic Module Documentation – Class/Grade Creation**

## **1. Overview**

This module allows the creation of school classes/grades with specific sections and capacity. It supports multi-section classes and ensures unique class entries. Access is restricted to authorized roles (admin or teacher).

---

## **2. API Endpoint**

### **Create Grade/Class**

- **URL:** `/api/academic/create-grade`
- **Method:** `POST`
- **Access:** `Admin` or `Teacher` (JWT required)

#### **Request Body:**

| Field     | Type   | Required | Description                                   |
| --------- | ------ | -------- | --------------------------------------------- |
| className | String | Yes      | Name of the grade/class (allowed: "V" to "X") |
| section   | String | Yes      | Section name (allowed: "A", "B", "C", "D")    |
| capacity  | Number | Yes      | Maximum number of students in the section     |

#### **Example Request:**

```json
{
  "className": "V",
  "section": "A",
  "capacity": 40
}
```

#### **Response:**

- **Success (200):**

```json
{
  "message": "Class created successfully",
  "newClass": {
    "_id": "650f1a4f3b6c2a0012a45678",
    "className": "V",
    "sections": [
      {
        "sectionName": "A",
        "capacity": 40
      }
    ],
    "subjects": [],
    "createdAt": "2025-10-20T16:30:00.000Z",
    "updatedAt": "2025-10-20T16:30:00.000Z"
  }
}
```

- **Error (400):**

```json
{
  "message": "Failed to create class"
}
```

- **Error (404 or 400) for missing or duplicate fields:**

```json
{
  "message": "Please enter required fields!"
}
```

```json
{
  "message": "Grade already exist"
}
```

---

## **3. Middleware**

1. **`verifyJWT`** – Validates JWT token for authenticated users.
2. **`validateRole`** – Checks if the user has the required role (`admin` or `teacher`).
3. **`sanitizeRequests`** – Sanitizes incoming request data to prevent malicious inputs.
4. **`verifyTenant`** – (Optional) Ensures the user belongs to a specific tenant (multi-tenant support).

---

## **4. Controller**

`academic.controller.js`

- **Function:** `createClass(req, res)`
- Handles incoming API requests, calls the service layer, and sends JSON response.
- Returns HTTP 200 on success and 400 on failure.

```javascript
export const createClass = async (req, res) => {
  try {
    const newClass = await AcademicServices.createClass(req);
    return res
      .status(200)
      .json({ message: "Class created successfully", newClass });
  } catch (error) {
    console.log("Failed to create Class ERROR......", error);
    return res.status(400).json({ message: "Failed to create class" });
  }
};
```

---

## **5. Service Layer**

`academic.service.js`

- **Function:** `createClass(req)`
- Validates request body, checks if grade exists, and calls repository to save class.

```javascript
export const createClass = async (req) => {
  const { className, section, capacity } = req.body;

  if (!className) {
    throw new ApiError("Please enter required fields!", 404);
  }

  const gradeExist = await Grade.findOne({ className });
  if (gradeExist) {
    throw new ApiError("Grade already exist", 400);
  }

  return await AcademicRepositories.createClass({
    className,
    section,
    capacity
  });
};
```

---

## **6. Repository Layer**

`academic.repositories.js`

- **Function:** `createClass({ className, section, capacity })`
- Interacts with the MongoDB `Grade` model to persist data.

```javascript
export const createClass = async ({ className, section, capacity }) => {
  return await Grade.create({
    className,
    sections: [{ sectionName: section, capacity: capacity }]
  });
};
```

---

## **7. Model**

`class.model.js`

- **Mongoose Model:** `Grade`
- **Schema:**

```javascript
const gradeSchema = new Schema(
  {
    className: {
      type: String,
      required: true,
      enum: ["V", "VI", "VII", "VIII", "IX", "X"]
    },
    sections: [
      {
        sectionName: {
          type: String,
          required: true,
          enum: ["A", "B", "C", "D"]
        },
        capacity: {
          type: Number,
          required: true,
          min: 1,
          default: 30
        }
      }
    ],
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
      }
    ],
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);
```

---

## **8. Router**

`academic.routes.js`

```javascript
router.post(
  "/create-grade",
  verifyJWT,
  validateRole(["teacher", "admin"]),
  sanitizeRequests,
  createClass
);
```

---

## **9. Notes**

- Multi-section classes are supported (each class can have multiple sections).
- Default capacity is `30` if not provided.
- Unique validation on `className` ensures no duplicate grades exist.
- The system is ready for multi-tenant support with optional `verifyTenant` middleware.
  <!-- GET GRADES -->
  Here’s a clean and professional **README section** explaining your `/get-grades` endpoint setup — including what each middleware and function does, and how the data flows 👇

---

## 📘 **GET /api/v1/academic/get-grades**

### 🔹 **Description**

This endpoint retrieves all grades associated with a specific organization (tenant).
Only **authenticated** users with the roles of **teacher** or **admin** are allowed to access this route.

---

### 🧭 **Endpoint**

```
GET /api/v1/academic/get-grades
```

---

### 🔐 **Middlewares**

| Middleware                           | Purpose                                                                                                                                      |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `verifyJWT`                          | Validates the user's JSON Web Token to ensure authentication.                                                                                |
| `verifyTenant`                       | Confirms that the user belongs to a valid organization (tenant) and attaches the organization info (like `req.organization`) to the request. |
| `validateRole(["teacher", "admin"])` | Restricts access to only teachers and admins. Other roles cannot fetch grades.                                                               |
| `sanitizeRequests`                   | Cleans incoming request data (query parameters, headers) to prevent injection or malicious input. _(Optional but recommended for safety)_    |

---

### ⚙️ **Controller**

```js
export const getGrades = async (req, res) => {
  try {
    const grades = await AcademicServices.getGrades(req);
    return res
      .status(200)
      .json({ message: "Grades fetched successfully", grades });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error?.response?.message || "Failed to get grades!" });
  }
};
```

#### 🧩 Explanation:

- The controller calls the `AcademicServices.getGrades(req)` service.
- It extracts the organization info from the request (added by `verifyTenant`).
- It returns all grades related to that organization.

---

### 🧠 **Service Layer**

```js
export const getGrades = async ({ organization }) => {
  return await Grade.find({ organization });
};
```

#### 💡 Purpose:

- Interacts directly with the `Grade` model.
- Queries all grades belonging to the provided `organization`.

---

### 🗃️ **Data Flow**

1. **Client** sends a request:
   `GET /api/v1/academic/get-grades` with a valid JWT token.
2. **Server** verifies:

   - JWT → Valid user
   - Tenant → Organization identified
   - Role → Must be teacher/admin

3. **Service** runs query:
   `Grade.find({ organization })`
4. **Response** sent back:

   ```json
   {
     "message": "Grades fetched successfully",
     "grades": [ ... ]
   }
   ```

---

### 🧾 **Example Response**

```json
{
  "message": "Grades fetched successfully",
  "grades": [
    {
      "_id": "671a12ab23...",
      "name": "Grade 6",
      "organization": "670f91e7..."
    },
    { "_id": "671a12ab25...", "name": "Grade 7", "organization": "670f91e7..." }
  ]
}
```

---

### 🚫 **Possible Errors**

| Status | Message                 | Cause                                       |
| ------ | ----------------------- | ------------------------------------------- |
| 400    | `Failed to get grades!` | Invalid organization or missing tenant data |
| 401    | `Unauthorized`          | Missing or invalid JWT token                |
| 403    | `Forbidden`             | User role not allowed (not admin/teacher)   |

---

### ✅ **Best Practices**

- Always ensure the `verifyTenant` middleware attaches the correct organization ID to `req`.
- Consider adding `organization` field to the `Grade` schema if you want full tenant isolation.
- Return consistent JSON structures (with both `message` and `data` keys).
