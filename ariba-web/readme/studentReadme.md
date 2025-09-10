# 📘 Student Module

This module manages **student profiles, listings, and details** within the application. It provides a full layout for viewing students, searching/filtering, adding new students, and managing student timelines.

## 🚀 Components

### 1. `StudentPage`

- Acts as the **main container** for student-related features.
- Layout includes:

  - **StudentList** (left panel): list of students by organization.
  - **StudentDetails** (middle panel): profile, about, and timeline.
  - **MessageBox** & **Anouncements** (right panel, hidden on small screens).

---

### 2. `StudentList`

- Displays a list of students for the logged-in user’s organization.
- Features:

  - Fetches students via `getOrganizationUsers` thunk.
  - Search functionality (by first/last name).
  - Active student highlighting with row selection.
  - Fetches student details on selection via `getUser` thunk.
  - Integrated `CreateUser` modal for adding new students.

- Responsive design with TailwindCSS.

---

### 3. `StudentDetails`

- Displays detailed profile information of the selected student.
- Sections:

  - **Basic Details** → Name, phone, email, department, gender, DOB, address.
  - **About** → Student bio/description.
  - **Timeline** → Displays student events chronologically.

- Features:

  - `CreateUser` modal toggle for creating new students.
  - `TimelineModal` toggle for adding new timeline events.
  - Uses Redux state (`user.userDetails`) for student data.

---

## 🔗 Redux Integration

- Connected to `userSlice` with the following thunks:

  - `getOrganizationUsers` → fetch students by organization & role.
  - `getUser` → fetch a specific student’s details.
  - `addTimeline` → update student timeline events.
  - `createUser` → add a new student.

---

## 🛠️ Tech Stack

- **React** (functional components with hooks)
- **Redux Toolkit** (state management, async thunks)
- **Axios** (API calls)
- **TailwindCSS** (styling and responsive layout)

---

## 📂 Usage

```jsx
import StudentPage from "./components/students/StudentPage";

function App() {
  return <StudentPage />;
}
```

---

## ✅ Features Summary

- Student listing with search and filtering.
- Student details with profile, about, and timeline.
- Add new students via modal form.
- Add timeline events for students.
- Responsive, clean UI built with TailwindCSS.
