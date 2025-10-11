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

---

### **StudentPage Component Updates Documentation**

**File:** `StudentPage.jsx`

**Updated Features / Changes:**

1. **State Management Changes**

   - **Old:**

     ```js
     const [mode, setMode] = useState("");
     const [userModal, setUserModal] = useState(false);
     ```

     - Managed both `mode` (add/update) and `userModal` (open/close) state for student modals.

   - **New:**

     ```js
     const [creatUserModal, setCreateUserModal] = useState(false);
     ```

     - Replaced `mode` and `userModal` with a single state `creatUserModal` to simplify modal handling.

2. **Child Component Props**

   - **Old:**
     Passed `userModal`, `setUserModal`, `mode`, `setMode` to `StudentList` and `StudentDetails`.
   - **New:**

     - Passing `creatUserModal` and `setCreateUserModal` instead:

       ```js
       <StudentList
         setCreateUserModal={setCreateUserModal}
         creatUserModal={creatUserModal}
       />
       <StudentDetails
         setCreateUserModal={setCreateUserModal}
         creatUserModal={creatUserModal}
       />
       ```

     - This unifies modal state handling across all child components.

3. **Effect on Functionality**

   - Opens/closes the student modal using the `creatUserModal` state.
   - Simplifies the flow by removing separate mode logic (`add/update`) in this parent component.
   - Child components (`StudentList` and `StudentDetails`) now fully control modal behavior using the shared state.

4. **Other Notes**

   - No changes were made to `MessageBox` or `Anouncements` sections.
   - Layout remains the same with three columns:

     - Left: StudentList
     - Middle: StudentDetails
     - Right: MessageBox & Anouncements (hidden on mobile)

---

### **StudentDetails Component Updates Documentation**

**File:** `StudentDetails.jsx`

**Updated Features / Changes:**

1. **State Management Changes**

   - **Old:**

     ```js
     const [timelineModal, setTimelineModal] = useState(false);
     const [userModal, setUserModal] = useState(false);
     const [mode, setMode] = useState("");
     ```

     - Managed `timelineModal` and `userModal` separately along with `mode` for add/update actions.

   - **New:**

     ```js
     const [timelineModal, setTimelineModal] = useState(false);
     ```

     - Removed `userModal` and `mode`.
     - Modal state for creating/updating a student is now controlled via `creatUserModal` and `setCreateUserModal` props passed from the parent (`StudentPage`).

2. **Child Component Changes**

   - **Old:**

     ```js
     <UserModal
       isOpen={userModal}
       onClose={() => setUserModal(false)}
       title="Update User"
       mode={mode}
       userData={userData}
     />
     ```

     - Used `UserModal` to handle updates to a student’s information.

   - **New:**

     ```js
     {
       creatUserModal && (
         <CreateUser
           createUser="Student"
           setCreateUserModal={setCreateUserModal}
         />
       );
     }
     ```

     - Replaced `UserModal` with `CreateUser` modal.
     - `CreateUser` is now rendered conditionally based on `creatUserModal` state.
     - Simplifies the modal logic and unifies creation/updating of student data.

3. **Basic Details Section**

   - **Old:** Rendered details using a `detailFields` array mapped over a grid.
   - **New:**

     - Details are rendered directly with inline JSX for better readability.
     - Supports responsive layout with flex adjustments for smaller screens.
     - Fallbacks for missing fields use `"Not Added"` text.

4. **About Section**

   - **Old:**

     ```js
     <p className="text-gray-700">{userData?.about || "Not Added"}</p>
     ```

   - **New:**

     - Layout updated to match new design style.
     - Uses flex-col with consistent padding and font styling for a cleaner look.

5. **Timeline Section**

   - **Old:**

     - Timeline events rendered in a scrollable div with `ul > li`.
     - `TimelineModal` opened in an absolute container inside the parent div.

   - **New:**

     - Timeline layout slightly restructured for responsiveness.
     - Timeline events now use a custom vertical timeline design (`timeline-start`, `timeline-middle`, `timeline-end`) for visual clarity.
     - `TimelineModal` still opens conditionally using `timelineModal` state but with adjusted positioning (`top-1 left-30`).

6. **Other Notes**

   - Parent-controlled `creatUserModal` simplifies modal handling across `StudentPage`, `StudentList`, and `StudentDetails`.
   - All sections (Basic Details, About, Timeline) updated for uniform padding, font, and responsive behavior.
   - Timeline now uses a visually distinct color scheme with `#2C80FF` for events and icons.

---

### **StudentList Component Updates Documentation**

**File:** `StudentList.jsx`

**Updated Features / Changes:**

1. **State & Props Changes**

   - **Old:**

     ```js
     const [isActive, setIsActive] = useState(0);
     const [userModal, setUserModal] = useState(false);
     const [mode, setMode] = useState("");
     const { users, searchQuery, setSearchQuery, isActive, handleSelectUser } =
       useGetUsers(organization, "student");
     ```

     - `userModal` and `mode` were used to manage modal open/close and add/update mode.
     - Student list and search handled via a custom hook `useGetUsers`.

   - **New:**

     ```js
     const [isActive, setIsActive] = useState(0);
     const [searchQuery, setSearchQuery] = useState("");
     const students = useSelector(
       (state) => state.user.usersByOrganization?.users || []
     );
     ```

     - Removed `userModal` and `mode`.
     - Modal state now managed through `creatUserModal` and `setCreateUserModal` props from parent.
     - Student data fetched directly from Redux store instead of a custom hook.

2. **Data Fetching**

   - **Old:** Student fetching was handled externally through `useGetUsers`.
   - **New:**

     - Uses Redux `getOrganizationUsers` async thunk to fetch students for the organization:

       ```js
       useEffect(() => {
         dispatch(
           getOrganizationUsers({
             getOrganizationUserApi,
             organization,
             userRole: "student"
           })
         );
       }, []);
       ```

     - Individual student details fetched via `getUser` thunk:

       ```js
       const handleGetUser = (rowIndex, id) => {
         setIsActive(rowIndex);
         dispatch(getUser({ getUserApi, id }));
       };
       ```

3. **Search Implementation**

   - **Old:** Search query handled by `useGetUsers` hook.
   - **New:** Local `searchQuery` state used to filter students directly:

     ```js
     const filteredUser = students?.filter((student) => {
       const query = searchQuery?.toLowerCase();
       return (
         student.firstName?.toLowerCase().includes(query) ||
         student.lastName?.toLowerCase().includes(query)
       );
     });
     const displayStudent = searchQuery ? filteredUser : students;
     ```

4. **Modal Changes**

   - **Old:**

     ```js
     <UserModal
       isOpen={userModal}
       mode={mode}
       onClose={() => setUserModal(false)}
     />
     ```

   - **New:**

     ```js
     {
       creatUserModal && (
         <CreateUser
           createUser="Student"
           setCreateUserModal={setCreateUserModal}
         />
       );
     }
     ```

     - Replaced `UserModal` with `CreateUser` modal.
     - Modal now controlled via parent props `creatUserModal` and `setCreateUserModal`.

5. **Table / List Rendering**

   - **Old:** Rendered table rows using `flex` with hover effects and `handleSelectUser` from hook.
   - **New:**

     - Table headers and rows are rendered from Redux student data.
     - Selected student is highlighted using `isActive` state.
     - Avatar, Name, and ID displayed similarly, with fallback values.
     - Added condition to render `<hr>` only if not the last row.
     - Responsive adjustments using `md:` and flex ratios.

6. **Styling Updates**

   - Minor styling changes for consistent font, spacing, and responsive behavior.
   - Uses `font-[sans-serif]`, `tracking-wider`, and smaller font sizes for mobile screens.
   - Search input simplified and inline-styled for better control.

7. **Other Notes**

   - Simplifies logic by removing dependency on custom hooks (`useGetUsers`).
   - Makes the component fully reliant on Redux for data, improving maintainability.
   - Parent component (`StudentPage`) fully controls creation modal state.

---
