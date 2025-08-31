import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Dashboard, LoginPage } from "./allFiles.jsx";
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
        element: "This page will contain the onformation of loggedin user"
      },
      {
        path: "/teachers",
        element: "This page will contain teacher data"
      },
      {
        path: "/students",
        element: "This page will contain  students data"
      },
      {
        path: "/attendance",
        element: "This page will contain  attendance data"
      },
      {
        path: "/academic",
        element: "This page will contain  academic data"
      },
      {
        path: "/payment",
        element: "This page will contain  payment data"
      },
      {
        path: "/settings",
        element: "This page will contain  settings data"
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
