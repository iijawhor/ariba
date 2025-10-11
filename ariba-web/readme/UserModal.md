# **UserModal Component Documentation**

The `UserModal` component is a reusable modal used to **create or update a user** in the application. It handles form input state, submission, and UI rendering for both adding new users and editing existing ones.

---

## **Imports**

```javascript
import { useState, useEffect } from "react";
import { useSaveUser } from "../hooks/useSaveUser.js";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
```

- **`useState`** and **`useEffect`**: Manage component state and lifecycle.
- **`useSaveUser`**: Custom hook to handle user creation and update actions.
- **`useSelector`**: Access Redux state (`error`, `message`, `createdUser`).
- **`ToastContainer` and `toast`**: For showing toast notifications on success or error.

---

## **Props**

The `UserModal` component accepts the following props:

| Prop       | Type       | Description                                                                     |
| ---------- | ---------- | ------------------------------------------------------------------------------- |
| `isOpen`   | `boolean`  | Controls whether the modal is displayed.                                        |
| `onClose`  | `function` | Callback function to close the modal.                                           |
| `userData` | `object`   | User data for editing an existing user.                                         |
| `mode`     | `string`   | Determines the mode of the modal: `"add"` for creating, `"update"` for editing. |

---

## **State**

```javascript
const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  organization: "",
  dateOfBirth: "",
  about: "",
  gender: "",
  religion: "",
  address: "",
  userRole: "",
  department: "",
  dateOfjoining: ""
});
```

- **`formData`**: Stores all form inputs.
- Reset to empty for "add" mode.
- Pre-filled with `userData` for "update" mode.

---

## **Derived Variables**

```javascript
const isEdit = mode === "update";
const error = useSelector((state) => state.user.error);
const success = useSelector((state) => state.user.message);
const createdUser = useSelector((state) => state.user.createdUser);
```

- `isEdit`: Boolean to check if the modal is in update mode.
- `error`, `success`, `createdUser`: Redux state for displaying toast notifications.

---

## **useEffect**

```javascript
useEffect(() => {
  if (!isOpen) return;

  if (mode === "update" && userData) {
    setFormData({ ...userData });
  }

  if (mode === "add") {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      organization: "",
      dateOfBirth: "",
      about: "",
      gender: "",
      religion: "",
      address: "",
      userRole: "",
      department: "",
      dateOfjoining: ""
    });
  }
}, [isOpen, mode]);
```

- Ensures form is **reset or pre-filled** when modal opens.
- Runs only when modal opens or mode changes.

---

## **Form Handling**

### **handleChange**

```javascript
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};
```

- Updates `formData` dynamically for any input field.

### **handleSubmit**

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  saveUser({ e, formData, userId: userData?._id, mode });
};
```

- Prevents default form submission.
- Calls `saveUser` hook with the current `formData`.
- Handles both "add" and "update" based on `mode`.

---

## **Icons**

- Each input has an optional SVG icon to indicate the field type.
- Example:

```javascript
icons = {
  firstName: <svg ... />,
  email: <svg ... />,
  password: <svg ... />
}
```

- Icons are displayed inside input fields for a better UX.

---

## **Form Inputs**

The modal has **two main types of inputs**:

1. **Text Inputs**

   - First Name, Last Name, Email, Password (only for add), Phone Number, Dates (DOB, Joining)
   - Controlled components bound to `formData`.
   - Icons displayed where appropriate.

2. **Select Dropdowns**

   - Organization (pre-selected if editing)
   - Department (Science, Commerce, Arts, Math, English, Physical Education)
   - Gender (Male, Female, Others)
   - Religion (Islam, Christian, Hindu, Not willing to share)
   - User Role (Teacher, Student, Admin)

3. **Textareas**

   - About (short bio)
   - Address (full address)

---

## **Buttons**

- **Cancel**

  - Closes modal (`onClose`)

- **Submit**

  - Calls `handleSubmit`
  - Text changes dynamically based on `mode` ("Create" or "Update")

---

## **Modal Layout**

- Full-screen overlay (`fixed inset-0 bg-black/40`)
- Centered modal with **scrollable content** (`max-h-[90vh] overflow-y-auto`)
- Rounded corners and shadow for aesthetics
- Top border highlights with brand color `[#2C80FF]`
- Form uses **grid layout** for responsive two-column design.

---

## **Toast Notifications**

- `ToastContainer` is rendered inside modal.
- Can be used to show success/error messages after submission.

---

## **Conditional Rendering**

```javascript
if (!isOpen) return null;
```

- Modal **does not render** unless `isOpen` is `true`.

---

## **Usage Example**

```javascript
<UserModal
  isOpen={isUserModalOpen}
  onClose={() => setUserModalOpen(false)}
  userData={selectedUser}
  mode="update"
/>
```

- Opens the modal for editing `selectedUser`.
- To create a new user, set `mode="add"` and `userData={null}`.

---

This component is **highly reusable** for any form where users need to be added or updated, with all fields, validation, and UI handled in one place.
