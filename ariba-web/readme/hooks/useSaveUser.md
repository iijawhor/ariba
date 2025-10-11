**Documentation for `useSaveUser` Hook**

---

### **Purpose:**

`useSaveUser` is a custom React hook that provides a reusable function to handle creating and updating users in the system. It integrates with Redux actions `createUser` and `updateUser` to manage API calls and state updates.

---

### **Usage:**

```javascript
const { saveUser } = useSaveUser();

// Example in a form submit handler
<form onSubmit={(e) => saveUser({ e, formData, userId, mode })}>
```

---

### **Returned Values:**

- **saveUser** `(function)` – Handles form submission for adding or updating a user.
  **Parameters:**

  - **e** `(Event)` – The form submission event.
  - **formData** `(object)` – Object containing user details from the form.
  - **userId** `(string)` – The ID of the user to update (required in update mode).
  - **mode** `(string)` – Either `"add"` for creating a new user or `"update"` for updating an existing user.

---

### **Internal Functionality:**

1. Determines the operation based on `mode`.
2. Dispatches the appropriate Redux action:

   - `createUser` → Sends `formData` to `createUserApi`.
   - `updateUser` → Sends `formData` along with `userId` to `updateUserApi`.

3. Includes `accessToken` from the logged-in user for authentication.

---

### **API Endpoints Used:**

- **Create User:** `${VITE_API_BASE_URL}/user/create-user`
- **Update User:** `${VITE_API_BASE_URL}/user/update-user`
