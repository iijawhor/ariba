**Documentation for `useGetUsers` Hook**

---

### **Purpose:**

`useGetUsers` is a custom React hook designed to manage fetching, filtering, and selecting users (teachers or students) within an organization. It integrates Redux state and APIs to provide a ready-to-use list of users and selected user details.

---

### **Usage:**

```javascript
const { users, searchQuery, setSearchQuery, isActive, handleSelectUser } =
  useGetUsers(organizationId, "student");
```

---

### **Parameters:**

- **organization** `(string)` – The ID of the organization whose users need to be fetched.
- **userRole** `(string)` – The role of users to fetch, e.g., `"student"` or `"teacher"`.

---

### **Returned Values:**

- **users** `(array)` – List of users filtered by search query.
- **searchQuery** `(string)` – Current search input value.
- **setSearchQuery** `(function)` – Function to update search input.
- **isActive** `(number)` – Index of the currently selected user in the displayed list.
- **handleSelectUser** `(function)` – Function to select a user by index and fetch their details.

---

### **Internal Functionality:**

1. Fetches users for the specified organization and role using the Redux action `getOrganizationUsers`.
2. Automatically fetches the first user’s details when the list loads using `getUser`.
3. Provides search filtering functionality based on `firstName` or `lastName`.
4. Tracks which user is currently active and allows updating the active selection.

---

### **Example in a Component:**

```javascript
const { users, searchQuery, setSearchQuery, isActive, handleSelectUser } =
  useGetUsers(orgId, "teacher");

return (
  <div>
    <input
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search users"
    />
    <ul>
      {users.map((user, index) => (
        <li
          key={user._id}
          style={{ background: index === isActive ? "blue" : "white" }}
          onClick={() => handleSelectUser(index, user._id)}
        >
          {user.firstName} {user.lastName}
        </li>
      ))}
    </ul>
  </div>
);
```
