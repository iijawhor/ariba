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
