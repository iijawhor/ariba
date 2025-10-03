import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import {
  AcademicPage,
  AttendancePage,
  Dashboard,
  LoginPage,
  MySpace,
  Payment,
  StudentPage,
  TeacherPage,
  SettingsPage
} from "./allFiles.jsx";
import { store } from "./store/store.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/me",
        element: <MySpace />
      },
      {
        path: "/teachers",
        element: <TeacherPage />
      },
      {
        path: "/students",
        element: <StudentPage />
      },
      {
        path: "/attendance",
        element: <AttendancePage />
      },
      {
        path: "/academic",
        element: <AcademicPage />
      },
      {
        path: "/payment",
        element: <Payment />
      },
      {
        path: "/settings",
        element: <SettingsPage />
      },
      {
        path: "/profile",
        element: "This page will logged in user profile"
      }
    ]
  },
  {
    path: "/signup-superAdmin",
    element: "Signup"
  },
  {
    path: "/signin",
    element: <LoginPage />
  }
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
