# AttendanceStats Component

The `AttendanceStats` component displays **summary statistics** for a user’s attendance and class attendance in a compact card layout.

## Features

1. **User Summary Section**

   - Displays an icon and label "Me" representing the logged-in user.
   - Shows average hours per day (`Avg hrs / day`).

2. **Class Summary Section**

   - Displays an icon and label "My class" representing the user's class.
   - Shows average hours per day for the class.

3. **Styling & Layout**

   - Card-style layout with padding, borders, and rounded corners.
   - Flexbox layout to evenly space elements vertically and horizontally.
   - Uses SVG icons to visually differentiate sections.

4. **Reusable Design**

   - Can be extended to display more attendance-related stats or metrics.

## Example Usage

```jsx
<AttendanceStats />
```

- Renders a card with two sections: user stats and class stats.
