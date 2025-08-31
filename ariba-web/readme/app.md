# App.jsx

The main layout component of the application that provides the overall structure and navigation for the dashboard.

---

### Features

- **Sidebar Navigation:**
  Displays a sidebar menu with different sections like Dashboard, My Space, Teachers, Students, Attendance, Academic, Payment, and Settings. Each menu item has an associated icon and route.

- **Navbar:**
  Shows the top navigation bar reflecting the currently active menu item.

- **Routing Outlet:**
  Uses React Router's `<Outlet />` to render nested route components inside the main layout.

- **State Management:**
  Manages the active menu state to highlight the currently selected section in the sidebar.

- **Responsive Design:**
  The layout is designed to be flexible and adaptive using Tailwind CSS classes for spacing and styling.

---

### How it works

1. Defines the sidebar menu as an array of objects, each containing a `name`, `icon`, `to` (route path), and an `id`.
2. Maintains `activeMenu` state to keep track of the current menu selection.
3. Renders the `<Sidebar />` component with the sidebar items and state updater function.
4. Renders the `<Navbar />` component that shows the active menu title.
5. Renders the nested routes inside the main content area using `<Outlet />`.

---

### Usage

Include `<App />` as a wrapper for nested routes in your router configuration. This component sets the UI structure and navigation context for all child pages.
