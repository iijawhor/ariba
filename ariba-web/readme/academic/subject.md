## 📘 Subject Creation Flow (Frontend Documentation)

### 🧩 Overview

This feature allows administrators to **create new subjects** in the academic management system.
It includes:

- A searchable dropdown for selecting or adding a subject name.
- A subject code input field.
- A reusable modal for form submission.
- A Redux async thunk (`createSubject`) that communicates with the backend API.
- Integration with `useAcademic()` hook to manage async logic and toast notifications.

---

### ⚙️ Components & Functions

#### 1. `SubjectModal.jsx`

This component is responsible for rendering the **Create Subject Modal**.

##### ✨ Features:

- Searchable list of common subjects.
- Automatically filters results while typing.
- Handles subject selection and form submission.
- Closes the modal when clicking outside of the dropdown.
- Integrates with `handleCreateSubjectHook` from `useAcademic()`.

##### 🧠 State Management:

| State              | Purpose                                    |
| ------------------ | ------------------------------------------ |
| `formData`         | Holds subject name and subject code        |
| `search`           | Tracks user input for filtering subjects   |
| `filteredSubjects` | Stores dynamically filtered subject list   |
| `showDropdown`     | Controls visibility of the suggestion list |

##### 🧱 Props:

| Prop      | Type     | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| `onClose` | Function | Callback to close the modal after submission or cancel |

##### 💻 Code Snippet:

```jsx
const handleCreateSubject = (e) => {
  handleCreateSubjectHook({ e, formData });
};
```

---

#### 2. `useAcademic.js` Hook

Handles all academic-related logic like API calls, form submissions, and toasts.

##### 📍 Function: `handleCreateSubjectHook`

Used to create a new subject via Redux’s async thunk.

```js
const handleCreateSubjectHook = async ({ e, formData }) => {
  e.preventDefault();
  try {
    await dispatch(
      createSubject({ createSubjectUrl, formData, accessToken })
    ).unwrap();
    toast.success("Subject created successfully");
  } catch (err) {
    const message =
      err?.response?.data?.message || err?.message || "Something went wrong!";
    toast.error(message);
  }
};
```

##### ✅ Responsibilities:

- Prevents default form behavior.
- Dispatches the `createSubject` thunk.
- Displays success or error messages with `react-toastify`.

---

#### 3. `createSubject` Async Thunk

This function is used to send a **POST** request to the backend to create a subject.

##### 🧾 Definition:

```js
export const createSubject = createAsyncThunk(
  "academic/createSubject",
  async ({ createSubjectUrl, formData, accessToken }, thunkAPI) => {
    try {
      const response = await axios.post(createSubjectUrl, formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create subject!";
      return thunkAPI.rejectWithValue(msg);
    }
  }
);
```

##### 📡 Backend Expectation:

The backend should receive the following in `req.body`:

```json
{
  "subjectName": "Mathematics",
  "subjectCode": "MATH101"
}
```

##### ⚙️ Headers:

```
Authorization: Bearer <accessToken>
Content-Type: application/json
```

---

#### 4. Redux Slice (extraReducers)

Handles the `createSubject` lifecycle states (pending, fulfilled, rejected).

```js
builder
  .addCase(createSubject.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(createSubject.fulfilled, (state, action) => {
    state.loading = false;
    state.subject = action.payload;
  })
  .addCase(createSubject.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
```

##### 🧠 State Updates:

| State     | Description                                |
| --------- | ------------------------------------------ |
| `loading` | Indicates if the API call is in progress   |
| `subject` | Stores the created subject data            |
| `error`   | Stores any error message from API response |

---

### 🪄 User Flow

1. User clicks **“Create Subject”** button → opens `SubjectModal`.
2. User types a subject name → dropdown filters dynamically.
3. User selects a subject → enters subject code.
4. On form submit → `handleCreateSubjectHook` dispatches `createSubject`.
5. Redux updates state → toast shows success/error message.
6. Modal closes on success or user action.

---

### 🚀 Example Backend Response

```json
{
  "success": true,
  "message": "Subject created successfully",
  "data": {
    "_id": "6716bcf899e83a1b3c7b2c9a",
    "subjectName": "Mathematics",
    "subjectCode": "MATH101"
  }
}
```

---

### 🧩 Dependencies

- **React** for UI components
- **Redux Toolkit** for state and async management
- **Axios** for API calls
- **React Toastify** for notifications
- **Tailwind CSS** for styling
