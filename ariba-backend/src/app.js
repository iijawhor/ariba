import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
const app = express();
const upload = multer();
const allowedOrigins = [
  "http://localhost:5174", // Local Vite dev server
  "https://elegant-banoffee-fc2521.netlify.app", // deployed frontend
  process.env.CORS_ORIGIN // optional .env value
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow non-browser requests

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(upload.none()); // for parsing multipart/form-data

app.use((err, req, res, next) => {
  console.error(err); // Log the actual error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

import userRouter from "./routes/user.routes.js";
import organizationRouter from "./routes/organization.routes.js";
import attendanceRouter from "./routes/attendance.routes.js";
import academicRouter from "./routes/academic.routes.js";
import announcementRouter from "./routes/announcement.routes.js";
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/organization/", organizationRouter);
app.use("/api/v1/attendance/", attendanceRouter);
app.use("/api/v1/academic/", academicRouter);
app.use("/api/v1/announcement/", announcementRouter);

export { app };
