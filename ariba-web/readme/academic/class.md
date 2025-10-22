# 📘 Academic Grade Creation (Redux + Axios + React Hook)

This module handles **creating new Grades (Classes/Batches)** in your academic management system using Redux Toolkit and Axios. It is built with proper async handling, toast notifications, and modular hooks for easy integration in any React component.

---

## ⚙️ Overview

The feature includes:

- A **Redux slice** that handles state and API integration.
- A **custom hook** (`useAcademic`) that provides the create-grade functionality to components.
- A **modal component** (`ClassModal`) that allows users to input grade details (Class, Section, Capacity) and submit them.

---

## 🧩 Folder Structure

```
src/
├── store/
│   └── slices/
│       └── academicSlice.js       # Contains createGrade async thunk + slice
├── hooks/
│   └── useAcademic.js             # Custom hook to trigger grade creation
├── components/
│   └── modals/
│       └── ClassModal.jsx         # UI form for creating a class/batch
```

---

## 🚀 1. Redux Slice: `academicSlice.js`

### **Purpose**

Handles API calls and state management for creating a new Grade.

### **Code Summary**

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Async thunk to create a new grade
export const createGrade = createAsyncThunk(
  "grade/createGrade",
  async ({ createGradeUrl, formData, accessToken }, thunkAPI) => {
    try {
      const response = await axios.post(createGradeUrl, formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create Grade!";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// 🔹 Slice to handle state updates
const academicSlice = createSlice({
  name: "academic",
  initialState: { grade: null, loading: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.grade = action.payload;
      })
      .addCase(createGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default academicSlice.reducer;
```

### **State Structure**

```js
{
  grade: null,        // Stores the latest created grade details
  loading: false,     // Indicates API request in progress
  error: null         // Holds any error message from the API
}
```

---

## 🪝 2. Custom Hook: `useAcademic.js`

### **Purpose**

Provides an easy interface for components to trigger grade creation without managing Redux logic manually.

### **Code Summary**

```js
import { useDispatch, useSelector } from "react-redux";
import { createGrade } from "../store/slices/academicSlice.js";
import { toast } from "react-toastify";

const createGradeUrl = `${
  import.meta.env.VITE_API_BASE_URL
}/academic/create-grade`;

export const useAcademic = () => {
  const user = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const accessToken = user?.accessToken;

  const handleCreateGradeHook = async ({ e, formData }) => {
    e.preventDefault();
    try {
      await dispatch(
        createGrade({ createGradeUrl, formData, accessToken })
      ).unwrap();
      toast.success("Grade created successfully!");
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong!";
      toast.error(message);
    }
  };

  return { handleCreateGradeHook };
};
```

### **Usage**

Call the hook inside any component that needs to create a grade:

```js
const { handleCreateGradeHook } = useAcademic();
handleCreateGradeHook({ e, formData });
```

---

## 🧾 3. UI Component: `ClassModal.jsx`

### **Purpose**

A modal that provides the form UI for creating a new grade (Class + Section + Capacity).

### **Key Features**

- Dropdowns for selecting class and section.
- Input for specifying class capacity.
- On submission, triggers `handleCreateGradeHook` from the custom hook.

### **Code Summary**

```js
import { useState } from "react";
import { ModalWrapper } from "../../allFiles";
import { useAcademic } from "../../hooks/useAcademic.js";

const ClassModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    className: "",
    section: "",
    capacity: ""
  });

  const classes = ["V", "VI", "VII", "VIII", "IX", "X"];
  const sections = ["A", "B", "C", "D"];
  const { handleCreateGradeHook } = useAcademic();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreateGrade = (e) => {
    handleCreateGradeHook({ e, formData });
  };

  return (
    <ModalWrapper
      title="Create Class / Batch"
      onClose={onClose}
      onSubmit={handleCreateGrade}
      className="space-y-4"
    >
      {/* Form Inputs */}
      {/* Class Dropdown */}
      {/* Section Dropdown */}
      {/* Capacity Input */}
    </ModalWrapper>
  );
};

export default ClassModal;
```

---

## 🧠 Data Flow Summary

```
[ClassModal.jsx]
     ↓ (formData)
[useAcademic Hook]
     ↓ (dispatch)
[createGrade AsyncThunk]
     ↓ (Axios POST)
[Backend API: /academic/create-grade]
     ↓
Redux Store Updates (academicSlice)
     ↓
Toast Notification shown to user
```

---

## 🌐 API Contract

### **Endpoint**

`POST /academic/create-grade`

### **Headers**

```
Authorization: Bearer <accessToken>
Content-Type: application/json
```

### **Request Body**

```json
{
  "className": "VIII",
  "section": "A",
  "capacity": 40
}
```

### **Response (Success)**

```json
{
  "message": "Grade created successfully",
  "data": {
    "_id": "6717a8e8f1234567890abcd",
    "className": "VIII",
    "section": "A",
    "capacity": 40
  }
}
```

### **Response (Error)**

```json
{
  "message": "Grade already exists for this section"
}
```

---

## 🔔 Toast Notifications

| Type       | Message                                               |
| ---------- | ----------------------------------------------------- |
| ✅ Success | "Grade created successfully!"                         |
| ❌ Error   | "Something went wrong!" or specific API error message |

---

## 🧰 Dependencies

| Library            | Purpose                                   |
| ------------------ | ----------------------------------------- |
| `@reduxjs/toolkit` | State management and async thunk handling |
| `react-redux`      | Access Redux store and dispatch actions   |
| `axios`            | API requests                              |
| `react-toastify`   | Toast notifications                       |

---

## 🧑‍💻 Example `.env` Configuration

```bash
VITE_API_BASE_URL=https://your-backend-url.com/api/v1
```

---

## ✅ Best Practices

- Always use `.unwrap()` when calling async thunks to handle errors with `try/catch`.
- Validate form fields before dispatching API calls.
- Keep `createGradeUrl` dynamic via environment variables for easier environment switching.
- Use `toast` for user feedback after API success or failure.
