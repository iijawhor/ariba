## 📢 Real-Time Announcement & Notification System

**Tech Stack:** React + Redux Toolkit + Socket.IO + Express + MongoDB

### 🚀 Overview

This module implements a **real-time announcement system** that allows admins or teachers to publish announcements instantly.
Announcements are broadcasted to all connected users through **Socket.IO**, while persistent storage and state synchronization are handled via **MongoDB** and **Redux Toolkit**.

---

## 🧭 System Architecture

```
Frontend (React)
│
├── src/
│   ├── hooks/
│   │   └── useAnnouncement.js        # Custom hook for fetching & dispatching announcements
│   ├── store/
│   │   ├── slices/
│   │   │   └── announcementSlice.js  # Redux slice (loading, error, announcements)
│   │   └── store.js                  # Global store configuration
│   ├── utils/
│   │   └── socket.js                 # Socket.IO client setup
│   ├── components/
│   │   └── modals/
│   │       └── Anouncements.jsx      # Modal for creating & publishing new announcements
│   ├── pages/
│   │   └── Dashboard.jsx             # Displays all announcements + publish button
│   └── App.jsx                       # Socket initialization & global structure
│
└── Backend (Express)
    ├── src/
    │   ├── controllers/
    │   │   └── announcement.controller.js   # Handles CRUD and broadcast logic
    │   ├── models/
    │   │   └── announcement.model.js        # Mongoose schema for announcements
    │   ├── repositories/
    │   │   └── announcement.repositories.js # Database operations (create, fetch)
    │   ├── routes/
    │   │   └── announcement.routes.js       # REST endpoints
    │   ├── services/
    │   │   └── announcement.service.js      # Business logic for announcement flow
    │   ├── utils/
    │   │   └── socket.js                    # Socket.IO server setup
    │   ├── middlewares/
    │   │   └── tenant.middleware.js         # Tenant/org-based room isolation
    │   ├── app.js                           # App middleware and routes
    │   └── server.js                        # Entry point (includes socket init)
```

---

## 💡 How It Works

### 🔹 Backend (Express + Socket.IO)

1. **Socket Initialization**

   - Implemented in `src/utils/socket.js`
   - Each user connects via Socket.IO and joins a room based on their organization or tenant.
   - When a new announcement is created, it’s broadcasted to all users in that room.

2. **Announcement Flow**

   - REST endpoints (`/api/v1/announcements`) handle fetching and creation.
   - Upon creation, the controller emits the event:

     ```js
     io.to(room).emit("announcementReceived", newAnnouncement);
     ```

   - Data is also saved persistently in MongoDB via Mongoose.

---

### 🔹 Frontend (React + Redux + Socket.IO)

1. **Socket Setup**

   - Configured in `src/utils/socket.js`
   - Establishes connection once and listens for:

     ```js
     socket.on("announcementReceived", (data) => {
       dispatch(addNewAnnouncement(data));
     });
     ```

2. **Redux Slice (`announcementSlice.js`)**

   - Manages states:

     - `loading`: Boolean for fetch status
     - `announcements`: Array of all announcements
     - `error`: Any failure messages

   - Async thunk:

     ```js
     getAnnouncement({ getAnnouncementApiUrl, accessToken });
     ```

     Fetches announcements from backend with bearer authentication.

3. **Custom Hook (`useAnnouncement.js`)**

   - Abstracts the async call logic.
   - Provides functions like:

     ```js
     const { getAnnouncementHook } = useAnnouncement();
     ```

   - Dispatches `getAnnouncement` thunk and updates Redux store.

4. **Dashboard.jsx**

   - Renders the announcement list with real-time updates.
   - Shows a loading spinner (via Redux `loading` flag).
   - Allows users to open the **Publish Announcement Modal**.

5. **Announcements Modal (`Anouncements.jsx`)**

   - Allows teachers/admins to publish new announcements.
   - Sends data through the backend API, which triggers Socket.IO broadcast.

---

## ⚙️ Key Features

✅ **Real-time updates** — Instantly reflect announcements across connected users.
✅ **Persistent storage** — All announcements are stored in MongoDB.
✅ **Redux state sync** — Loading, error, and data updates managed globally.
✅ **Modular architecture** — Each concern (UI, logic, state, socket) separated cleanly.
✅ **Role-based broadcast** — Socket.IO rooms ensure announcements reach the right users.

---

## 🧩 Example Socket Flow

1. **Frontend connects:**

   ```js
   socket.emit("joinAnnouncements", { userRole, organization });
   ```

2. **Backend joins room:**

   ```js
   const room = getSecuredRoom(organization._id);
   socket.join(room);
   ```

3. **Admin publishes announcement:**

   ```js
   io.to(room).emit("announcementReceived", { title, content });
   ```

4. **Frontend receives in real-time:**

   ```js
   socket.on("announcementReceived", (data) => {
     dispatch(addNewAnnouncement(data));
   });
   ```

---

## 🧠 State Flow Summary

| Step | Source                         | Action                                | Result                                |
| ---- | ------------------------------ | ------------------------------------- | ------------------------------------- |
| 1    | User opens Dashboard           | `useEffect` → `getAnnouncementHook()` | Redux sets `loading=true`             |
| 2    | Backend responds               | `fulfilled` action                    | Announcements stored, `loading=false` |
| 3    | Admin posts a new announcement | Socket event emitted                  | All clients receive it instantly      |
| 4    | Redux updates list             | UI re-renders immediately             | No reload needed                      |

---

## 🧰 Environment Variables (example)

```bash
# Backend
PORT=7000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173

# Frontend
VITE_API_URL=http://localhost:7000/api/v1
```

---

## 🧪 Testing the System

1. Start the backend:

   ```bash
   npm run dev
   ```

2. Start the frontend:

   ```bash
   npm run dev
   ```

3. Login as a teacher/admin.
4. Open another browser window as a student.
5. Publish a new announcement → It appears instantly in the student’s dashboard.

---

## 🧩 Future Improvements

- 🔔 Add browser notification (push API integration)
- 🕓 Add timestamps & filters (today / this week)
- 🧑‍💼 Role-based publish permissions
- 📱 Responsive mobile-friendly view
