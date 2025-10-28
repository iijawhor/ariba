import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
const app = express();
const upload = multer();
const allowedOrigins = [
  "http://localhost:5173", // Local Vite dev server
  "http://localhost:3000", // Alternative local port
  "http://13.233.13.228", // Production IP
  process.env.CORS_ORIGIN // From .env if set
].filter(Boolean);
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
//   })
// );
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps, etc.)
      if (!origin) return callback(null, true);

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
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/organization/", organizationRouter);
app.use("/api/v1/attendance/", attendanceRouter);
app.use("/api/v1/academic/", academicRouter);

export { app };
