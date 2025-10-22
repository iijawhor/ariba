# 🧾 Routine Modal — Academic Routine Creation Module

## 📘 Overview

The **`RoutineModal`** component is a part of the Academic Management System that allows administrators to **create and schedule class routines**.
It provides an intuitive interface for selecting classes, subjects, teachers, and time slots with smart dropdowns, search functionality, and Redux-powered backend integration.

---

## 🧩 Features

✅ **Dynamic Routine Creation** — Easily create routines with class, subject, teacher, day, date, and time.
✅ **Searchable Dropdowns** — Type-to-search functionality for subjects and teachers.
✅ **Form Validation** — Prevents submission with missing or invalid fields.
✅ **Outside Click Detection** — Auto-closes dropdown menus when clicking outside.
✅ **Backend Integration** — Submits data securely via Redux and Axios to the API.
✅ **Toast Notifications** — Real-time success or error alerts using `react-toastify`.

---

## ⚙️ Component: `RoutineModal`

### 🧱 Props

| Prop      | Type       | Description                                                         |
| --------- | ---------- | ------------------------------------------------------------------- |
| `onClose` | `function` | Function to close the modal when the user clicks Cancel or outside. |

---

### 🧠 Internal State

| State                 | Type      | Description                                                        |
| --------------------- | --------- | ------------------------------------------------------------------ |
| `formData`            | `object`  | Stores all input field data (class, subject, teacher, date, etc.). |
| `subjectSearch`       | `string`  | Tracks search input for subjects.                                  |
| `teacherSearch`       | `string`  | Tracks search input for teachers.                                  |
| `filteredSubjects`    | `array`   | Dynamically updates based on subject search input.                 |
| `filteredTeachers`    | `array`   | Dynamically updates based on teacher search input.                 |
| `showSubjectDropdown` | `boolean` | Controls visibility of subject dropdown.                           |
| `showTeacherDropdown` | `boolean` | Controls visibility of teacher dropdown.                           |

---

### ⚡ Functionality Breakdown

#### 🧩 1. `handleChange`

Handles general input updates for non-search fields (class, day, date, time).

#### 🧩 2. `handleSubjectSearch`

Filters the subject list based on user input, enabling live search and dropdown display.

#### 🧩 3. `handleTeacherSearch`

Filters the teacher list dynamically for search-based selection.

#### 🧩 4. `selectSubject` / `selectTeacher`

Sets the selected subject or teacher and closes the dropdown.

#### 🧩 5. `useEffect` (Outside Click Handler)

Listens for clicks outside the dropdown area to close open menus, improving UX.

#### 🧩 6. `handleCreateRoutine`

Handles form submission and triggers `handleCreateRoutineHook` from `useAcademic`, which:

- Dispatches the `createRoutine` async thunk.
- Sends POST request with JWT Authorization.
- Handles success/error using toast notifications.

---

## 🪄 Hook: `handleCreateRoutineHook`

```js
const handleCreateRoutineHook = async ({ e, formData }) => {
  e.preventDefault();
  try {
    await dispatch(
      createRoutine({ createRoutineUrl, formData, accessToken })
    ).unwrap();
    toast.success("Routine scheduled successfully");
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong!";
    toast.error(message);
  }
};
```

### ✅ Responsibilities

- Prevent default form submission
- Dispatch the `createRoutine` async action
- Handle API response with `unwrap()` for clear promise control
- Display toast success/error feedback

---

## 🚀 Async Thunk: `createRoutine`

```js
export const createRoutine = createAsyncThunk(
  "academic/createRoutine",
  async ({ createRoutineUrl, formData, accessToken }, thunkAPI) => {
    try {
      const response = await axios.post(createRoutineUrl, formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create routine!";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);
```

### ⚙️ State Management

| Case          | Description                           |
| ------------- | ------------------------------------- |
| **pending**   | Sets `loading = true`, resets error   |
| **fulfilled** | Stores created routine in state       |
| **rejected**  | Captures and stores API error message |

---

## 🧰 Dependencies

| Library            | Usage                                          |
| ------------------ | ---------------------------------------------- |
| `react`            | Component creation and state management        |
| `react-redux`      | Dispatching actions and accessing global state |
| `@reduxjs/toolkit` | Async thunk and slice management               |
| `axios`            | HTTP API communication                         |
| `react-toastify`   | Real-time toast notifications                  |
| `tailwindcss`      | Styling and responsive UI                      |

---

## 🧑‍💻 Example Usage

```jsx
import RoutineModal from "../components/modals/RoutineModal";

const AcademicPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Create Routine</button>
      {isModalOpen && <RoutineModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};
```

---

## 🧭 Future Enhancements

- [ ] Add validation for time conflicts within the same class/teacher
- [ ] Integrate with live timetable view for visual updates
- [ ] Support for weekend scheduling
- [ ] Add backend confirmation of duplicate routines

---

## 📄 Summary

The **`RoutineModal`** provides a modern, interactive, and fully managed interface to handle academic scheduling.
By leveraging **Redux Toolkit**, **Axios**, and **Toastify**, it ensures seamless communication between frontend and backend, offering both a polished UI and robust logic layer.
