# 📘 Create Subject — Feature Documentation

This module allows administrators or teachers to **create a new subject** in the academic system.
It includes both **frontend UI (React)** and **backend API logic (Node.js/Express + Service + Repository layer)**.

---

## 🧩 Frontend: `SubjectModal.jsx`

### **Purpose**

A modal component that allows users to create a new subject by selecting from a predefined list or adding a new one manually.

### **File:**

`src/components/modals/SubjectModal.jsx`

---

### **Features**

- Search and select subject names from a predefined list.
- Auto-suggest dropdown while typing.
- Auto-close dropdown when clicking outside.
- Capture both subject name and subject code.
- Submits data for subject creation.

---

### **Code Overview**

```jsx
import React, { useState, useRef, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
```

The component uses React hooks for managing form data, search state, and dropdown visibility.

#### **State Variables**

| State              | Type    | Description                                       |
| ------------------ | ------- | ------------------------------------------------- |
| `formData`         | Object  | Holds `subjectName` and `subjectCode`.            |
| `search`           | String  | Stores the input value for subject search.        |
| `filteredSubjects` | Array   | Contains filtered subjects based on search input. |
| `showDropdown`     | Boolean | Controls visibility of the dropdown menu.         |

#### **useRef**

Used to detect clicks outside the dropdown and close it automatically.

---

### **Main Functions**

| Function                   | Purpose                                                            |
| -------------------------- | ------------------------------------------------------------------ |
| `handleSearch(e)`          | Filters subjects based on search input and shows dropdown.         |
| `handleSelectSubject(sub)` | Sets selected subject to the input field and hides dropdown.       |
| `handleChange(e)`          | Updates form data for subject code or manually typed subject name. |
| `onSubmit()`               | Currently logs form data (to be replaced with an API call).        |

---

### **UI Flow**

1. The user opens the modal.
2. Types in the subject name → dropdown shows matching suggestions.
3. Selects a subject or types a new one.
4. Enters the subject code.
5. Submits the form.

---

### **Example Screenshot (Conceptually)**

```
+-----------------------------+
| Create Subject              |
|------------------------------|
| Subject Name: [English ▼]   |
| Subject Code:  [ENG101]     |
|                             |
| [Cancel]     [Create]       |
+-----------------------------+
```

---

### **Props**

| Prop      | Type     | Description                  |
| --------- | -------- | ---------------------------- |
| `onClose` | Function | Function to close the modal. |

---

### **Sample Submit Action**

Once connected to backend:

```js
onSubmit={() => handleCreateSubject(formData)}
```

---

## ⚙️ Backend Architecture

The backend follows a **Service–Repository pattern** for clean separation of logic.

---

### **1️⃣ Repository Layer**

**File:** `repositories/AcademicRepositories.js`

Handles direct database interaction.

```js
export const createSubejct = async ({ subjectName, subjectCode }) => {
  return await Subject.create({ subjectName, subjectCode });
};
```

#### **Responsibilities**

- Interacts directly with the `Subject` model (e.g., Mongoose model).
- Creates and saves a new subject in the database.

#### **Parameters**

| Name          | Type   | Required | Description            |
| ------------- | ------ | -------- | ---------------------- |
| `subjectName` | String | ✅       | Name of the subject.   |
| `subjectCode` | String | ❌       | Optional subject code. |

#### **Returns**

- The newly created subject object.

---

### **2️⃣ Service Layer**

**File:** `services/AcademicServices.js`

Contains validation and business logic.

```js
export const createSubject = async (req) => {
  const { subjectName, subjectCode } = req.body;
  if (!subjectName) {
    throw new ApiError("Please Provide subject name", 400);
  }
  return await AcademicRepositories.createSubejct({ subjectName, subjectCode });
};
```

#### **Responsibilities**

- Validates input data.
- Passes validated data to repository for persistence.

#### **Error Handling**

Throws `ApiError` if `subjectName` is missing.

---

### **3️⃣ Controller Layer**

**File:** `controllers/AcademicController.js`

Handles incoming HTTP requests and responses.

```js
export const createSubject = async (req, res) => {
  try {
    const newSubject = await AcademicServices.createSubject(req);
    return res
      .status(200)
      .json({ message: "Subject created successfully", newSubject });
  } catch (error) {
    return res.status(400).json({ message: "Failed to create subject" });
  }
};
```

#### **Responsibilities**

- Receives `req` and `res` from the client.
- Calls the `AcademicServices.createSubject` service.
- Sends back success or failure response.

---

### **API Specification**

| Method   | Endpoint                | Description           |
| -------- | ----------------------- | --------------------- |
| **POST** | `/api/academic/subject` | Create a new subject. |

#### **Request Body Example**

```json
{
  "subjectName": "Mathematics",
  "subjectCode": "MATH101"
}
```

#### **Success Response**

```json
{
  "message": "Subject created successfully",
  "newSubject": {
    "_id": "6715d8b...",
    "subjectName": "Mathematics",
    "subjectCode": "MATH101"
  }
}
```

#### **Error Response**

```json
{
  "message": "Failed to create subject"
}
```

---

### **Flow Summary**

```
Frontend (SubjectModal.jsx)
    ↓
Backend API (POST /api/academic/subject)
    ↓
Controller → Service → Repository → Database
```

---

## ✅ Next Steps / Improvements

- Connect frontend submit button to backend API.
- Add toast notifications for success/error.
- Add validation for duplicate subjects.
- Show loader or disable button during API call.
- Unit tests for service and controller.
