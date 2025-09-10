# 📘 Teacher Management Module

This module provides a **teacher management UI** for the school management system. It is composed of three main components:

- **TeacherList** – Lists teachers in an organization with search and selection.
- **TeacherDetails** – Displays selected teacher’s profile, details, and timeline.
- **TeacherPage** – Layout container that integrates the list, details, messages, and announcements.

---

## 📂 Components

### 1. `TeacherList.jsx`

**Purpose:**

- Fetches and displays all teachers in the logged-in user’s organization.
- Provides a **search bar** to filter teachers by first or last name.
- Allows selecting a teacher to view details.
- Provides a button to open the **Create Teacher Modal**.

**Key Features:**

- Uses `getOrganizationUsers` to fetch teachers by organization.
- Dispatches `getUser` to fetch details for a specific teacher.
- Search filtering with controlled input.
- Highlights the active/selected teacher row.

**Props:**

- `creatUserModal` → Boolean flag for modal state.
- `setCreateUserModal` → Function to toggle modal.

---

### 2. `TeacherDetails.jsx`

**Purpose:**

- Displays **profile details** of the selected teacher.
- Renders sections for **Basic Details, About, and Timeline**.
- Supports editing/adding a new teacher through the **CreateUser** modal.
- Displays a **TimelineModal** for adding timeline events.

**Key Features:**

- Selects teacher details from Redux (`user.userDetails`).
- Handles missing values gracefully with `"Not Added"`.
- Timeline list with event date and description.
- Modal for creating a new teacher.

**Props:**

- `creatUserModal` → Boolean flag for modal state.
- `setCreateUserModal` → Function to toggle modal.

---

### 3. `TeacherPage.jsx`

**Purpose:**

- Acts as the **main layout container** for teacher-related views.
- Splits the page into three sections:

  - **Left Panel:** `TeacherList`
  - **Middle Panel:** `TeacherDetails`
  - **Right Panel (Desktop only):** `MessageBox` & `Anouncements`

**Key Features:**

- Maintains the `creatUserModal` state.
- Responsive layout: hides right panel on small screens.
- Provides a clean side-by-side teacher management UI.

---

## 🔄 Data Flow

1. Logged-in user is fetched from Redux (`state.user.loggedInUser`).
2. `TeacherList` dispatches `getOrganizationUsers` with the organization ID to fetch all teachers.
3. Clicking on a teacher row dispatches `getUser` with the teacher ID.
4. Teacher details are stored in Redux (`user.userDetails`).
5. `TeacherDetails` consumes this data and displays it.
6. Modals (`CreateUser`, `TimelineModal`) allow adding new data.

---

## 🛠️ Tech Stack

- **React** – UI components
- **Redux Toolkit** – State management
- **TailwindCSS** – Styling and responsive layout
- **Vite** – Build tool
- **Custom APIs**

  - `/user/get-organization-users/?organizationId=...`
  - `/user/get-user-by-id`

---

## 🚀 Usage

1. Import `TeacherPage` into your routing/layout:

```jsx
import TeacherPage from "./components/TeacherPage";

function App() {
  return (
    <div className="h-screen">
      <TeacherPage />
    </div>
  );
}
```

2. Ensure your Redux `userSlice` is properly configured with:

   - `getOrganizationUsers`
   - `getUser`

3. Add environment variables in `.env`:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 📌 Notes

- The right panel (`MessageBox`, `Anouncements`) is hidden on small screens (`md:inline`).
- Teacher IDs are currently displayed as `student.ids || "ariba1"`. Adjust this field to map your backend data correctly.
- `CreateUser` and `TimelineModal` components must be defined in `allFiles.jsx`.
