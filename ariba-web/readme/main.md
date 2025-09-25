# main.jsx

This is the entry point of the React application. It bootstraps the app by:

- Creating a React Router with nested routes to handle navigation.
- Providing the Redux store globally to the app using the `<Provider>` component.
- Wrapping the app with `<StrictMode>` for highlighting potential problems during development.
- Rendering the entire app into the root HTML element.

---

### Key Features

- **Routing:**
  Uses `createBrowserRouter` to define application routes and nested child routes like Dashboard, user profile, teachers, students, attendance, etc.

- **State Management:**
  Connects the Redux store to the app using React Redux’s `<Provider>`.

- **Component Structure:**
  The main app (`<App />`) serves as a layout component for nested routes.
  Here’s a **README section for only the updated code** (new version) that reflects the changes:

---

# Updated React Router Setup

This version updates the routing for the application to use dedicated components for `/me` and `/attendance` instead of placeholders.

## Key Updates

- `/me` → now renders `<MySpace />` component instead of a string placeholder.
- `/attendance` → now renders `<AttendancePage />` component instead of a string placeholder.

## Routing Structure

### Root Route (`/`)

- **Component:** `<App />`
- **Nested Routes:**

| Path          | Component/Page       | Description                            |
| ------------- | -------------------- | -------------------------------------- |
| `/`           | `<Dashboard />`      | Main dashboard                         |
| `/me`         | `<MySpace />`        | Displays logged-in user information    |
| `/teachers`   | `<TeacherPage />`    | Shows teacher-related data             |
| `/students`   | `<StudentPage />`    | Shows student-related data             |
| `/attendance` | `<AttendancePage />` | Displays attendance-related data       |
| `/academic`   | String placeholder   | Placeholder for academic data          |
| `/payment`    | String placeholder   | Placeholder for payment data           |
| `/settings`   | String placeholder   | Placeholder for settings               |
| `/profile`    | String placeholder   | Placeholder for logged-in user profile |

### Authentication Routes

| Path                 | Component/Page     | Description                 |
| -------------------- | ------------------ | --------------------------- |
| `/signup-superAdmin` | String placeholder | Signup page for super admin |
| `/signin`            | `<LoginPage />`    | Login page for all users    |

## Notes

- Redux store is provided globally using `<Provider store={store}>`.
- Only the `/me` and `/attendance` routes have been updated to use proper components.
- Other placeholders remain for pages that are not yet implemented.
