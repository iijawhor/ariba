# 📝 CreateUser Component

The `CreateUser` component provides a **modal-based form** for creating new users (students, teachers, or admins). It integrates with **Redux Toolkit** for state management and dispatches an API call to persist the new user in the backend.

---

## 🚀 Features

- Modal UI with a clean TailwindCSS design.
- Controlled form with local state (`useState`) for input handling.
- Fields:

  - **First Name** & **Last Name**
  - **Email** & **Password**
  - **Date of Birth** & **Phone Number**
  - **Department** (Science, Arts, Commerce)
  - **Role** (Student, Teacher, Admin)
  - **Gender** (Male, Female, Other)
  - **About** (textarea)
  - **Address** (textarea)

- **Close button** with SVG gradient icon.
- **Submit button** dynamically labels based on the `createUser` prop (e.g., "Create Teacher").
- Validates required fields before submission.
- Dispatches `createUser` thunk to backend with `accessToken`.

---

## 🔗 Redux Integration

Uses `userSlice` thunks:

- `createUser` → Dispatches a POST request to `create-user` API with:

  - `createUserApi` → Endpoint for user creation
  - `userData` → Form input data
  - `accessToken` → Auth token from logged-in user

Redux State Access:

- `createdUser` → Stores details of the most recently created user.
- `loggedInUser` → Provides auth token for secure API requests.

---

## 📂 Props

| Prop                 | Type       | Description                                                       |
| -------------------- | ---------- | ----------------------------------------------------------------- |
| `createUser`         | `string`   | Used in the submit button label (e.g., `"Teacher"`, `"Student"`). |
| `setCreateUserModal` | `function` | Callback to toggle modal visibility.                              |

---

## 🛠️ Tech Stack

- **React** (functional components + hooks)
- **Redux Toolkit** (state & async thunks)
- **TailwindCSS** (styling)
- **Axios** (handled inside slice for API requests)

---

## 📌 Usage

```jsx
import CreateUser from "./components/CreateUser";

function App() {
  const [createUserModal, setCreateUserModal] = useState(false);

  return (
    <>
      {createUserModal && (
        <CreateUser
          createUser="Teacher"
          setCreateUserModal={setCreateUserModal}
        />
      )}
    </>
  );
}
```

---

## ✅ Example Flow

1. User clicks **"Create User"** button.
2. `CreateUser` modal opens.
3. User fills in details & selects role/department.
4. On submit:

   - Dispatches `createUser` thunk with API, user data, and token.
   - Closes modal if successful.
   - Updates Redux state with newly created user.
