# Sidebar Component

## Overview

The `Sidebar` component is a reusable React sidebar navigation panel designed for use in admin dashboards or applications with a sidebar menu. It provides a vertically stacked menu with icons and text labels, a logo at the top, and an optional promotional section at the bottom.

This sidebar is responsive and styled primarily using Tailwind CSS classes. It supports toggling the active menu item and conditionally shows or hides menu item names based on screen size.

---

## Features

- **Responsive design**: The sidebar adjusts visibility of menu item names on smaller screens.
- **Customizable menu items**: Accepts an array of menu objects that define the menu label, destination URL, and icon.
- **Active menu tracking**: Clicking a menu item triggers a callback to update the active menu.
- **Logo display**: Displays a logo image at the top linked to the homepage.
- **Promotional section**: A styled section at the bottom encourages admin access with an image and a button.
- **Clean and modern styling**: Uses Tailwind CSS for quick styling and layout.

---

## Props

| Prop            | Type       | Description                                                           |
| --------------- | ---------- | --------------------------------------------------------------------- |
| `sidebar`       | `Array`    | Array of menu item objects, each containing `name`, `to`, and `icon`. |
| `setActiveMenu` | `Function` | Function called when a menu item is clicked, passing the active name. |

### Menu item object shape

Each item in the `sidebar` array should be an object with:

- `name` (string): Label text for the menu item.
- `to` (string): URL path the menu item links to.
- `icon` (React element): Icon component or element to display.

---

## Component Structure

- **Wrapper `div`**: Contains the sidebar with padding and background styling.
- **Logo section**: Centered logo image wrapped in a React Router `Link` to the homepage (`/`).
- **Menu list (`ul`)**: Maps over `sidebar` prop to generate clickable `Link` items with icons and labels.
- **Promotional section**: Positioned absolutely at the bottom, displays an image, some text, and an "Admin +" button.

---

## Usage Example

```jsx
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { HomeIcon, UserIcon } from "./icons";

const sidebarItems = [
  { name: "home", to: "/", icon: <HomeIcon /> },
  { name: "profile", to: "/profile", icon: <UserIcon /> }
];

function App() {
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <div className="flex">
      <Sidebar sidebar={sidebarItems} setActiveMenu={setActiveMenu} />
      <main className="flex-grow">{/* Main content */}</main>
    </div>
  );
}

export default App;
```

---

## Styling Notes

- Uses Tailwind CSS utility classes for layout, spacing, colors, and typography.
- Sidebar background color: `#2C80FF` (blue).
- Text color for menu items: white.
- Menu items are flex containers to align icons and text horizontally.
- On small screens, menu item names are hidden (`hidden md:inline`).
- The promo section is only visible on medium screens and up (`hidden md:inline`).
- Logo and promo images use relative paths — adjust based on your project’s asset folder.

---

## Future Improvements

- Add toggle functionality for collapsing the sidebar.
- Highlight the active menu item visually.
- Add ARIA attributes for better accessibility.
- Implement proper error handling for missing images or broken links.
- Add unit tests for interactions and rendering.

---

## Summary

The `Sidebar` component is a flexible and styled navigation sidebar that integrates easily into React projects using React Router and Tailwind CSS. By passing a menu array and an active state setter, it allows dynamic menu generation and active item tracking with clean UI/UX.
