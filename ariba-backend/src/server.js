import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import { app } from "./app.js";
import { createServer } from "http";
import { initializeSocket } from "./utils/socket.js";
dotenv.config();

const server = createServer(app);
initializeSocket(server);
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 7000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("❌ MongoDB connection failed:", error);
  });
