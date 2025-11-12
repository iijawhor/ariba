import { Server } from "socket.io";
import crypto from "crypto";
import jwt from "jsonwebtoken"; // ❗ You forgot this import
import { Announcement } from "../models/announcement.model.js";
import ApiError from "./ApiError.js";

const getSecuredRoom = (orgId) => {
  return crypto
    .createHash("sha256")
    .update(orgId.toString()) // use organization _id
    .digest("hex");
};

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173", // local dev
        "https://elegant-banoffee-fc2521.netlify.app", // deployed frontend
        "https://aribe.netlify.app",
        process.env.CORS_ORIGIN // optional .env value
      ],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    const { token } = socket.handshake.auth;
    if (!token) {
      return;
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      socket.user = decoded;
    } catch (err) {
      console.log("❌ Invalid token:", err.message);
      socket.disconnect(true);
      return; // ❗ stop further processing
    }

    console.log("✅ User connected:", socket.id);
    socket.on("joinAnnouncements", async ({ title, content, targetUser }) => {
      try {
        const { organization, _id: userId } = socket.user;

        if (!title || !content || !targetUser) {
          throw new ApiError("All fields are required", 400);
        }

        if (!organization?._id) {
          throw new ApiError("Organization not found for this user", 400);
        }

        // Join organization-secured room (only if not already joined)
        const room = getSecuredRoom(organization._id);
        socket.join(room);

        // Create the announcement
        const newAnnouncement = await Announcement.create({
          title,
          content,
          targetUser,
          organization: organization._id,
          createdBy: userId || null
        });

        // Emit to all users in the same organization
        io.to(room).emit("announcementReceived", newAnnouncement);
      } catch (error) {
        console.error("Error creating announcement:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};
