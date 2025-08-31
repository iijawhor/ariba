# Navbar Component

The **Navbar** component provides a responsive top navigation bar for the application, including a dynamic page title, a search input with integrated search functionality, notification icon, and user profile dropdown.

---

## Features

- **Dynamic Page Title:**
  Displays the current active menu or page name passed as a prop (`activeMenu`).

- **User Organization Display:**
  If the logged-in user does **not** have an organization, a default organization name ("Kasbagola f. o. b model high madrasha") is shown next to the page title.

- **Search Functionality:**

  - Controlled search input to enter queries.
  - Search can be triggered either by pressing the Enter key or clicking the search button.
  - Validates that the search query is not empty before dispatching a search action.
  - Dispatches an asynchronous Redux thunk (`searchHandler`) to fetch search results from the backend API.
  - Displays errors if the search query is empty or if the API call fails.

- **Notifications Icon:**

  - A bell icon with an indicator to represent new notifications.
  - Currently, this is a static icon placeholder, ready to be enhanced with actual notification logic.

- **User Profile Dropdown:**

  - Shows the logged-in user’s avatar (or a default avatar if none exists), full name, and role.
  - Dropdown menu offers quick links to "Profile" and "Logout".
  - Dropdown toggles on click of the avatar section.

---

## Component Breakdown

### Props

| Name         | Type   | Description                                       |
| ------------ | ------ | ------------------------------------------------- |
| `activeMenu` | String | The title or name of the current active menu/page |

### State

| State         | Type        | Description                               |
| ------------- | ----------- | ----------------------------------------- |
| `searchQuery` | String      | Holds the current search input value      |
| `error`       | String/null | Holds any error message related to search |

### Redux Integration

- Uses `useDispatch` to dispatch `searchHandler` thunk for search requests.
- Uses `useSelector` to access the logged-in user’s information from the Redux store (`state.user.loggedInUser.user`).

---

## How It Works

1. **Title and Organization:**
   The component receives `activeMenu` as a prop and displays it prominently. If the user has no associated organization, a default name is shown.

2. **Search:**
   The search input field updates the `searchQuery` state on user input.
   When the user presses Enter or clicks the search icon:

   - The `handleSearch` function validates the input.
   - If valid, it constructs the API URL using environment variables and dispatches the `searchHandler` thunk.
   - The thunk asynchronously calls the backend, returns results, or handles errors accordingly.
   - Errors are shown to the user via the `error` state.

3. **Notifications:**
   A bell icon is displayed with a notification badge, ready for future notifications implementation.

4. **User Profile:**
   Shows user information and avatar. Clicking the avatar toggles a dropdown with links to profile and logout.

---

## Usage Example

```jsx
import Navbar from "./components/Navbar";

function App() {
  const activeMenu = "Dashboard";

  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {/* Other components */}
    </div>
  );
}
```

---

## Dependencies

- **React** for component structure and hooks (`useState`, `useCallback`).
- **React Router DOM** for navigation (`Link`).
- **Redux Toolkit** for state management (`useDispatch`, `useSelector`).
- **Environment Variables:**
  Expects `VITE_API_BASE_URL` to be set in your `.env` file for the search API endpoint.

---

## Styling

- Uses Tailwind CSS classes for layout and design.
- Responsive adjustments between mobile and desktop views.
- Uses utility classes for spacing, colors, font sizes, and flex layouts.

---

## Notes & Next Steps

- **Search Results Handling:**
  The component currently dispatches the search action but does not display results. Integrate a results component or state handler to show search outcomes.

- **Logout Functionality:**
  The "Logout" link in the dropdown is currently a placeholder. Implement logout logic to clear user sessions.

- **Notification System:**
  Replace the static notification icon with dynamic data reflecting actual notifications.
