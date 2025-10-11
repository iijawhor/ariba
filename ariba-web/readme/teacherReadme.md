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

### **Updated Documentation**

1. **State Variables**

```diff
- const [mode, setMode] = useState("");
- const [userModal, setUserModal] = useState(false);
+ const [creatUserModal, setCreateUserModal] = useState(false);
```

**Update:**

- Removed `mode` and `userModal` state.
- Added `creatUserModal` state (note the typo `creatUserModal`) to manage modal visibility.

2. **Props Passed to Child Components**

```diff
- <TeacherList
-   userModal={userModal}
-   setUserModal={setUserModal}
-   mode={mode}
-   setMode={setMode}
- />
+ <TeacherList
+   setCreateUserModal={setCreateUserModal}
+   creatUserModal={creatUserModal}
+ />
```

```diff
- <TeacherDetails
-   userModal={userModal}
-   setUserModal={setUserModal}
-   mode={mode}
-   setMode={setMode}
- />
+ <TeacherDetails
+   setCreateUserModal={setCreateUserModal}
+   creatUserModal={creatUserModal}
+ />
```

**Update:**

- Updated child components to use the new modal state instead of previous `mode` and `userModal`.

3. **Other Code**

- No other changes; layout and structure remain the same.

---

### **Suggested Git Commit Message**

```
refactor(TeacherPage): replace mode/userModal with creatUserModal state

- Removed mode and userModal state variables
- Added creatUserModal state to manage modal visibility
- Updated props passed to TeacherList and TeacherDetails
```

### **Updated Parts Documentation**

1. **State and Props**

```diff
- const [timelineModal, setTimelineModal] = useState(false);
- const userDetails = useSelector((state) => state.user.userDetails);
- const userData = userDetails?.data;
-
- const hanleUpdateModal = () => {
-   setMode("update");
-   setUserModal(true);
- };
+ const [timelineModal, setTimelineModal] = useState(false);
+ const userDetails = useSelector((state) => state.user.userDetails);
+ const userData = userDetails?.data;
```

**Update:**

- Removed `userModal`, `setUserModal`, `mode`, and `setMode` props.
- Added `creatUserModal` and `setCreateUserModal` props to handle modal visibility for creating a new teacher.
- Removed the old `hanleUpdateModal` function.

---

2. **Header Button**

```diff
- <button
-   onClick={hanleUpdateModal}
-   className="flex items-center cursor-pointer gap-1 border border-[#2C80FF] px-3 py- rounded-full bg-[#2C80FF] text-white hover:bg-blue-600 transition"
- >
-   ...
- </button>
+ <button
+   onClick={() => setCreateUserModal((prev) => !prev)}
+   className="bg-blue-500 p-0.5 text-sm pl-1 pr-1 rounded-md hover:bg-blue-600 transition-colors text-white font-semibold"
+ >
+   Add Teacher
+ </button>
```

**Update:**

- Replaced "Update" button with "Add Teacher" button to open the creation modal.

---

3. **Removed UserModal**

```diff
- <UserModal
-   isOpen={userModal}
-   onClose={() => setUserModal(false)}
-   title="Update User"
-   mode={mode}
-   userData={userData}
- />
```

**Update:**

- The old `UserModal` for updating is removed.
- The creation of a teacher is now handled by `CreateUser` modal via `creatUserModal`.

---

4. **Basic Details Grid**

```diff
- const detailFields = [...]
- <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
-   {detailFields.map(...)}
- </div>
+ <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 text-sm md:text-base font-medium tracking-wide">
+   <p>First Name: {userData?.firstName || "Not Added"}</p>
+   <p>Last Name: {userData?.lastName || "Not Added"}</p>
+   ...
+ </div>
```

**Update:**

- Replaced the dynamic `detailFields` mapping with explicit `<p>` elements for each field.

---

5. **Other Adjustments**

- Minor styling changes (`p-4 → p-2`, `rounded-lg → rounded-md`).
- Timeline section and About section remain largely the same but are slightly simplified.
- Timeline modal toggle updated to use `prev` state.

---

### **Suggested Git Commit Message**

```
refactor(TeacherDetails): replace update modal with create teacher modal

- Removed update modal state and props (userModal, setUserModal, mode, setMode)
- Added creatUserModal and setCreateUserModal for creating teachers
- Replaced Update button with Add Teacher button
- Simplified Basic Details grid from dynamic mapping to explicit fields
- Minor styling adjustments for padding and rounded corners
```

## **TeacherList Component — Updated Documentation**

### **1. Props Updated**

- **Old:** `userModal`, `setUserModal`, `mode`, `setMode`
- **New:** `creatUserModal`, `setCreateUserModal`
- **Reason:** Unified modal logic for teacher creation; removed unnecessary `mode` logic and user update modal integration.

### **2. Add Teacher Button**

- **Old:** Handled `userModal` and `mode` to add a teacher.
- **New:**

```js
<button
  onClick={() => setCreateUserModal((prev) => !prev)}
  className="cursor-pointer"
>
  ...
</button>
```

- **Effect:** Toggles the `CreateUser` modal for adding a new teacher without affecting `mode`.

### **3. Redux & User Data**

- **Old:** Used `useGetUsers` custom hook for fetching teachers.
- **New:** Directly uses Redux:

  ```js
  const teachers = useSelector((state) => state.user.usersByOrganization?.users || []);
  const organization = user?.organization;
  useEffect(() => {
    if (organization) dispatch(getOrganizationUsers({ ... }));
  }, [organization]);
  ```

- **Effect:** Simplifies fetching teachers and aligns with full app Redux flow.

### **4. Search Functionality**

- **Old:** Managed via `useGetUsers` hook.
- **New:** Local state search filtering:

```js
const filteredTeachers = teachers.filter((teacher) => {
  const query = searchQuery.toLowerCase();
  return (
    teacher.firstName?.toLowerCase().includes(query) ||
    teacher.lastName?.toLowerCase().includes(query)
  );
});
const displayTeachers = searchQuery ? filteredTeachers : teachers;
```

- **Effect:** Directly filters teacher list based on search input.

### **5. Table Headers**

- **Old:** `header = ["photo", "name", "id"]`
- **New:** `header = [{ name: "photo", id: 1 }, { name: "name", id: 2 }, { name: "id", id: 3 }]`
- **Effect:** Added `id` for `key` in rendering, improving React rendering and eliminating key warnings.

### **6. Teacher Row Selection**

- **Old:** `handleSelectUser` from hook.
- **New:** `handleGetUser` dispatches `getUser` directly from Redux:

```js
const handleGetUser = (rowIndex, id) => {
  setIsActive(rowIndex);
  dispatch(getUser({ getUserApi, id }));
};
```

- **Effect:** Selects a teacher and fetches full details for `TeacherDetails` view.

### **7. Display Logic**

- **Old:** Displayed `users` from hook.
- **New:** Displayed `displayTeachers` (filtered if search query exists).
- **Effect:** Shows real-time filtered results while keeping full list intact.

### **8. UI Changes**

- Replaced plus icon styling with blue circle SVG.
- Search input has updated padding and colors (`bg-[#E7EAFE]`, `rounded-md`, `flex-1`).
- Table row highlights active teacher (`bg-[#2C80FF]` / white text) without needing extra props.

---

✅ **Summary:**
The updated `TeacherList` simplifies modal logic, removes the `mode` prop, integrates Redux for teacher fetching, and implements local search filtering. The UI is updated for better alignment with the new `TeacherDetails` and `TeacherPage` layout.
