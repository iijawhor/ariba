## **1. Attendance Component**

**File:** `Attendance.jsx`

**Description (Updated Part):**
The `Attendance` component now integrates with Redux to fetch user and attendance data, flattens nested attendance records, and uses a custom hook (`useAttendanceStats`) to calculate attendance statistics like total users, present users, absent count, and percentage. The UI dynamically displays the attendance list with proper date formatting, total hours, and user-specific information.

---

**Updated Features:**

- **Redux Integration:**
  Fetches `users` and `attendanceRecord` from the Redux store.

  ```javascript
  const userByRole = useSelector((state) => state.attendance.users) || [];
  const attendanceData = useSelector(
    (state) => state.attendance.attendanceRecord
  );
  ```

- **Flatten Attendance Records:**
  Converts nested `attendanceRecords` into a single array with extra user info (`userName`, `userRole`, `email`) for easier rendering.
- **Attendance Stats Hook:**
  Uses `useAttendanceStats(attendanceList, userByRole, filterValue)` to calculate statistics like `totalUsers`, `presentUsers`, `absentCount`, and `percentage`.
- **Dynamic Display:**

  - Status is displayed as "Present", "Absent", or "Not Found" based on `record.status`.
  - Login and logout times are formatted using `toLocaleString("en-IN")`.
  - Total hours are displayed or `—` if unavailable.

- **No Records Handling:**
  Displays a user-friendly message if no attendance records are found for the selected date range or user role.

---

## **2. FilterDates Component**

**File:** `FilterDates.jsx`

**Description (Updated Part):**
`FilterDates` now supports **immediate attendance fetching** when the "To" date changes, by calling `handleGetAttendance` with updated filter values.

---

**Updated Features:**

- **Immediate Fetch on To Date Change:**

  ```javascript
  onChange={(e) => {
    const newToDate = e.target.value;
    setFilterValue((prev) => ({ ...prev, toDate: newToDate }));
    handleGetAttendance({ ...filterValue, toDate: newToDate });
  }}
  ```

- Ensures the UI updates the filter state and triggers data fetching without needing an additional search button press.

---

## **3. UserFilter Component**

**File:** `UserFilter.jsx`

**Description (Updated Part):**
Updated the user role dropdown to **capitalize options** and standardize the role values (`teacher`, `student`, `admin`).

---

**Updated Features:**

- **Capitalized Dropdown Options:**

  ```javascript
  {
    ["teacher", "student", "admin"].map((option) => (
      <option key={option} value={option} className="text-gray-900 capitalize">
        {option}
      </option>
    ));
  }
  ```

- Simplified styling and ensured the `value` matches the internal filter state.

---

### **Suggested Git Commit**

````
feat: update Attendance, FilterDates, and UserFilter components

- Attendance:
  - Integrates with Redux to fetch users and attendance records
  - Flattens nested attendance data with user details
  - Uses useAttendanceStats hook to calculate total, present, absent, and percentage
  - Formats login/logout times and displays total hours
  - Handles no-records scenario with user-friendly message

- FilterDates:
  - Calls handleGetAttendance immediately when "To" date changes for instant filtering

- UserFilter:
  - Standardized dropdown values to "teacher", "student", "admin"
  - Capitalized dropdown display options for consistency


## **AttendancePage Component (Updated)**

**File:** `AttendancePage.jsx`

**Description (Updated Part):**
The `AttendancePage` component now integrates hooks and Redux to automatically fetch users and attendance records when filter values change. It includes improved state management and API interaction for attendance filtering.

---

### **Updated Features**

1. **Custom Hook Integration (`useAttendance`):**

   * Fetches users by role dynamically whenever `filterValue.user` changes.

   ```javascript
   const { getUserByRole } = useAttendance(filterValue.user);
   useEffect(() => {
     getUserByRole();
   }, [filterValue]);
````

2. **Redux Attendance Fetching:**

   - Dispatches `getAttendance` action whenever both `fromDate` and `toDate` are set in `filterValue`.
   - Uses `accessToken` from the logged-in user for authenticated API requests.

   ```javascript
   useEffect(() => {
     if (filterValue.fromDate && filterValue.toDate) {
       dispatch(
         getAttendance({
           getAttendanceUrl,
           userRole: filterValue.user,
           fromDate: filterValue.fromDate,
           toDate: filterValue.toDate,
           accessToken
         })
       );
     }
   }, [filterValue]);
   ```

3. **FilterDates Enhancement:**

   - Passes `handleGetAttendance` to `FilterDates` to allow immediate attendance fetch on date selection.

   ```javascript
   <FilterDates
     filterValue={filterValue}
     setFilterValue={setFilterValue}
     handleGetAttendance={handleGetAttendance}
   />
   ```

4. **Logging and Debugging:**

   - Logs `users` from Redux store and `accessToken` for verification purposes.

5. **No major structural changes to layout:**

   - Filters section and attendance table section remain the same but now dynamically fetch data based on filters.

---

### **Suggested Git Commit**

```
feat: enhance AttendancePage with dynamic attendance fetching

- Integrates useAttendance hook to fetch users by role when filter changes
- Dispatches getAttendance Redux action on filter date changes
- Passes handleGetAttendance to FilterDates for immediate API calls
- Uses logged-in user's accessToken for authenticated requests
- Adds console logs for debugging users and accessToken
```

## **Card Component**

**File:** `Card.jsx`

**Description:**
The `Card` component is a reusable UI card for displaying attendance statistics. It shows total users, present and absent counts, and attendance percentage in a visually appealing layout. The component supports optional styling for extra content via the `style` prop.

---

### **Props**

| Prop         | Type     | Default        | Description                                                         |
| ------------ | -------- | -------------- | ------------------------------------------------------------------- |
| `style`      | `string` | `undefined`    | Optional CSS class names to add extra content below the main stats. |
| `title`      | `string` | `"Attendance"` | Title of the card (e.g., user role or label).                       |
| `totalUsers` | `number` | `0`            | Total number of users in the selected group.                        |
| `present`    | `number` | `0`            | Number of users marked as present.                                  |
| `percentage` | `number` | `0`            | Attendance percentage (calculated externally).                      |

---

### **Behavior**

1. **Absent Count Calculation**

   ```javascript
   const absent = totalUsers - present;
   ```

   - Automatically computes the absent users based on `totalUsers` and `present`.

2. **Stats Display**

   - Shows total users, present users, and absent users with color coding:

     - Total Users → Blue
     - Present → Green
     - Absent → Red

3. **Attendance Percentage**

   - Displays a circular badge with the `percentage` formatted to **2 decimal places**.
   - Default is `0%` if no value is provided.

4. **Optional Extra Content**

   - If `style` prop is passed, renders an extra content area below the main stats.

---

### **Usage Example**

```jsx
<Card
  title="Teacher Attendance"
  totalUsers={50}
  present={35}
  percentage={70.0}
  style="custom-class-for-extra-content"
/>
```

- Displays a card titled "Teacher Attendance" with 50 total users, 35 present, 15 absent, and 70% attendance.
- Additional custom content can be rendered using the `style` prop.

---

### **Notes**

- `percentage` is expected to be pre-calculated externally (e.g., from a helper hook).
- Ensures responsive design with Tailwind classes (`flex`, `gap`, `sm:flex-row`).
- Hover effect included via Tailwind classes (`hover:shadow-lg`) for interactive feedback.
- The circular percentage badge is purely visual and not interactive.

## **1. `useAttendance` Hook**

**File:** `useAttendance.js`

**Description:**
This hook provides a function to fetch users by their role from the backend and store them in the Redux state. It is useful for dynamically loading users for attendance management based on the selected role.

---

### **Usage**

```javascript
const { getUserByRole } = useAttendance("teacher");
getUserByRole(); // Fetches users with role 'teacher'
```

---

### **Implementation Details**

- **Dependencies:**
  Uses `useSelector` to access logged-in user info and `useDispatch` to dispatch Redux actions.

- **Props / Parameters:**

  | Parameter  | Type     | Description                                              |
  | ---------- | -------- | -------------------------------------------------------- |
  | `userRole` | `string` | The role of users to fetch (e.g., "teacher", "student"). |

- **Returned Object:**

  | Key             | Type       | Description                                    |
  | --------------- | ---------- | ---------------------------------------------- |
  | `getUserByRole` | `function` | Function to fetch users of the specified role. |

- **Behavior:**

  1. Retrieves `accessToken` from logged-in user in Redux store.
  2. Constructs backend URL using `VITE_API_BASE_URL`.
  3. Dispatches `getUsersByRole` async thunk to fetch users.
  4. Handles errors and shows a toast notification if fetching fails.

---

## **2. `useAttendanceStats` Hook**

**File:** `useCalculatePercentage.js`

**Description:**
This hook calculates attendance statistics such as total users, present users, absent count, and attendance percentage for a given list of users and their attendance records. It supports filtering by a date range.

---

### **Usage**

```javascript
const { totalUsers, presentUsers, absentCount, percentage } =
  useAttendanceStats(attendanceList, userByRole, filterValue);
```

- `attendanceList`: Array of users with their attendance records.
- `userByRole`: Array of all users in the selected role.
- `filterValue`: Object containing `fromDate` and `toDate` for filtering attendance records.

---

### **Returned Object**

| Key            | Type   | Description                                                   |
| -------------- | ------ | ------------------------------------------------------------- |
| `totalUsers`   | number | Total number of users in the role.                            |
| `presentUsers` | number | Count of unique users marked present in the given date range. |
| `absentCount`  | number | Number of users absent (`totalUsers - presentUsers`).         |
| `percentage`   | string | Attendance percentage as a string with 2 decimal places.      |

---

### **Implementation Details**

- **Memoization:**
  Uses `useMemo` to avoid recalculation unless `attendanceList`, `userByRole`, or `filterValue` changes.

- **Steps:**

  1. Flatten `attendanceRecords` and attach `userName`, `userRole`, and `email` for uniqueness.
  2. Parse `fromDate` and `toDate` from `filterValue`.
  3. Filter records within the specified date range.
  4. Use a `Set` to count unique users present.
  5. Calculate absent count and percentage.

- **Date Handling:**

  - If no `fromDate` or `toDate` is provided, all records are included.
  - `percentage` is computed as `(presentUsers / totalUsers) * 100` and returned as a fixed 2-decimal string.

---

✅ Both hooks work together: `useAttendance` fetches user data, and `useAttendanceStats` computes the attendance metrics for UI display.
