# 🎓 Academic Management Page

The **Academic Management Page** is the central dashboard for managing a school's academic structure — including **classes, subjects, teachers, and routines**.
It provides intuitive UI elements, interactive modals, and visual summaries to help administrators streamline daily academic operations.

---

## 🧭 Overview

This page serves as the **main hub** for all academic-related activities in your system.
Users can:

- Create classes or batches
- Manage subjects and assign them
- Assign teachers
- Create and view class routines
- Get an overview of total academic entities (classes, subjects, teachers)

---

## 🧩 Component Path

```
src/pages/AcademicPage.jsx
```

---

## ⚙️ Key Features

| Feature                     | Description                                                    |
| --------------------------- | -------------------------------------------------------------- |
| 🎓 **Create Class / Batch** | Opens a modal to create a new class with section and capacity. |
| 📘 **Create Subject**       | Add new subjects to the academic database.                     |
| 🔗 **Assign Subject**       | Assign existing subjects to specific classes or grades.        |
| 👨‍🏫 **Assign Teacher**       | Map teachers to classes or subjects.                           |
| 🕒 **Create Routine**       | Define daily or weekly timetables for classes.                 |
| 👁️ **View Routine**         | View the full class routine based on selected filters.         |
| 📊 **Academic Overview**    | Displays total counts of classes, subjects, and teachers.      |

---

## 🧱 Component Structure

### **Imports**

```js
import React, { useState } from "react";
import {
  ClassModal,
  SubjectModal,
  AssignSubjectModal,
  AssignTeacherModal,
  RoutineModal,
  InfoCard
} from "../allFiles";
import ViewRoutineModal from "../components/modals/ViewRoutineModal.jsx";
import RoutineFilter from "../academic/RoutineFilter.jsx";
```

### **State Variables**

```js
const [activeModal, setActiveModal] = useState(null);
const [routineFilter, setRoutineFilter] = useState({
  date: new Date().toISOString().split("T")[0],
  class: "",
  teacher: "",
  day: ""
});
```

### **Dynamic Data (Sample)**

The page uses placeholder arrays for demo purposes (later replaced with API data):

```js
const classes = ["Class 1", "Class 2", "Class 3"];
const subjects = ["Mathematics", "Science", "English"];
const teachers = ["Mr. Sharma", "Ms. Rani", "Mr. Ali"];
const routines = [
  {
    class: "Class 1",
    teacher: "Mr. Sharma",
    day: "Monday",
    subject: "Math",
    time: "9:00–10:00"
  }
  // ...
];
```

---

## 🧠 UI Breakdown

### **1️⃣ Header Section**

A gradient header with the title and short description.

```jsx
<div className="rounded-2xl bg-gradient-to-r from-[#1E56D9] via-[#2C80FF] to-[#5CAEFF] p-6">
  <h1 className="text-3xl font-extrabold text-white">Academic Management</h1>
  <p className="text-sm text-blue-100">
    Streamline your school’s academic structure...
  </p>
</div>
```

Includes 5 action buttons for opening respective modals:

```js
const buttons = [
  { label: "Create Class / Batch", modal: "class" },
  { label: "Create Subject", modal: "subject" },
  { label: "Assign Subject", modal: "assignSubject" },
  { label: "Assign Teacher", modal: "assignTeacher" },
  { label: "Create Routine", modal: "createRoutine" }
];
```

Each button sets `activeModal` when clicked.

---

### **2️⃣ Overview Cards**

Displays quick info using the `InfoCard` component:

```jsx
<InfoCard title="Classes / Batches" items={classes} />
<InfoCard title="Subjects" items={subjects} />
<InfoCard title="Teachers" items={teachers} />
```

---

### **3️⃣ Routine Filter**

The `RoutineFilter` component allows filtering routines by class, teacher, and date.
Also includes a button to view the routine:

```jsx
<RoutineFilter
  classes={classes}
  teachers={teachers}
  onFilterChange={(filters) => setRoutineFilter(filters)}
  onViewRoutine={() => setActiveModal("viewRoutine")}
/>
```

---

### **4️⃣ Insights / Analytics**

Shows a summary section with total counts:

```jsx
<div className="bg-white rounded-2xl p-6 shadow-sm border">
  <h2 className="text-[#2C80FF] text-xl font-semibold mb-5">
    Academic Overview
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    <div className="bg-[#EEF4FF] p-5 rounded-xl text-center">
      <h3>Total Classes</h3>
      <p className="text-3xl font-extrabold">{classes.length}</p>
    </div>
    ...
  </div>
</div>
```

---

### **5️⃣ Modals**

Depending on the active modal state, the page renders:

```jsx
{
  activeModal === "class" && <ClassModal onClose={closeModal} />;
}
{
  activeModal === "subject" && <SubjectModal onClose={closeModal} />;
}
{
  activeModal === "assignSubject" && (
    <AssignSubjectModal onClose={closeModal} />
  );
}
{
  activeModal === "assignTeacher" && (
    <AssignTeacherModal onClose={closeModal} />
  );
}
{
  activeModal === "createRoutine" && <RoutineModal onClose={closeModal} />;
}
{
  activeModal === "viewRoutine" && (
    <ViewRoutineModal
      onClose={closeModal}
      filters={routineFilter}
      routines={routines}
    />
  );
}
```

Each modal handles its own logic for form inputs and submission.

---

## 🧭 Data Flow Summary

```
User clicks “Create Class”
        ↓
activeModal = "class"
        ↓
<ClassModal> opens
        ↓
User fills form → submits
        ↓
Dispatch createGrade thunk (API)
        ↓
Toast + Store update + Close modal
```

Similarly, all other modals follow the same open → submit → close workflow.

---

## 🧰 Dependencies Used

| Package            | Purpose                                |
| ------------------ | -------------------------------------- |
| `react`            | Core library for UI                    |
| `react-redux`      | Access global state & dispatch actions |
| `react-toastify`   | Display toast notifications            |
| `tailwindcss`      | Styling and responsive design          |
| `@reduxjs/toolkit` | Async state management                 |
| `axios`            | API requests                           |

---

## 🧩 Environment Variables

Ensure the following variable is defined in your `.env` file:

```bash
VITE_API_BASE_URL=https://your-backend-api.com/api/v1
```

---

## 🪄 Styling & UX Notes

- The page uses a **clean gradient header** and **rounded card UI**.
- Each modal uses a **blurred backdrop overlay** for focus.
- Buttons have subtle **hover scale animations**.
- The layout is **fully responsive**, working across mobile and desktop.

---

## 🧑‍💻 Developer Notes

- Each modal’s logic (API calls, validation) is modular — making it easy to maintain or extend.
- All dynamic data (`classes`, `subjects`, etc.) can later be fetched from APIs and connected via Redux.
- The page can easily integrate analytics widgets (e.g., attendance, student stats) under the same layout.

---

## ✅ Example Future Enhancements

- 🔁 Connect to live API endpoints
- 📅 Add routine calendar visualization
- 👩‍🏫 Add teacher profile integration
- 🧾 Add CSV/Excel export for academic data
