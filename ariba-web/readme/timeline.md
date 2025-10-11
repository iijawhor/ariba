### **TimelineModal Component**

A React component that allows users to add a timeline event to a student or user profile.

#### **Props**

| Prop Name          | Type       | Description                                                   |
| ------------------ | ---------- | ------------------------------------------------------------- |
| `id`               | `string`   | The ID of the user to which the timeline event will be added. |
| `setTimelineModal` | `function` | Function to toggle the visibility of the modal.               |

#### **State**

| State Name     | Type     | Description                                                                      |
| -------------- | -------- | -------------------------------------------------------------------------------- |
| `timelineData` | `object` | Holds the values of the timeline form fields: `title`, `event`, and `eventDate`. |

#### **Form Inputs**

The component has three inputs:

1. **Title** – Text input for the timeline event title.
2. **Event** – Text input for the description of the event.
3. **Event Date** – Date input for the event’s date.

Each input is controlled via the `timelineData` state and updates using the `onHandleChange` function.

#### **Redux**

- Uses `useDispatch` to dispatch actions.
- Uses the `addTimeline` action from the `userSlice` to add a timeline event to the backend.

#### **API**

- `addTimelineApi` is the endpoint used to submit the timeline event:
  `http://localhost:7000/api/v1/user/add-timeline`.

#### **Handlers**

| Function               | Description                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `onHandleChange(e)`    | Updates `timelineData` when a form field changes.                                                                |
| `handleAddTimeline(e)` | Prevents default form submission and dispatches `addTimeline` action with the current timeline data and user ID. |

#### **Structure**

- **Header**: Displays "Add Timeline" title and a close button (X) that toggles the modal visibility.
- **Form**: Contains input fields for the timeline data and a submit button.
- **Styling**: TailwindCSS classes used for layout, colors, borders, focus effects, and responsiveness.

#### **Usage**

```jsx
<TimelineModal id={userId} setTimelineModal={setTimelineModal} />
```
