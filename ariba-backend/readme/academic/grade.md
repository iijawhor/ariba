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
