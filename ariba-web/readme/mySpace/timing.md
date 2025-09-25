# Timings Component

The `Timings` component displays **weekly and daily timings** for a user in a visual card format. It highlights the current day and shows work hours and total hours worked.

## Features

1. **Weekly Overview**

   - Displays all days of the week as circular indicators.
   - Highlights the **current day** using a distinct border and text color.

2. **Daily Timings**

   - Shows today's work schedule (e.g., `10 AM - 4:30 PM`).
   - Displays a progress bar representing hours worked (`7:00 hrs` in the example).

3. **Additional Metrics**

   - Displays extra time metrics, such as break or remaining time (`45 mins`).
   - Uses SVG icons for visual clarity.

4. **Styling & Layout**

   - Card-style container with padding, border, and rounded corners.
   - Flexbox layout to evenly space days and metrics.
   - Uses consistent font styling (`sans-serif`) and color theme (`#2C80FF`).

## Example Usage

```jsx
<Timings />
```

- Renders a card showing the current day in the week, today’s timings, progress bar, and additional time metrics.
