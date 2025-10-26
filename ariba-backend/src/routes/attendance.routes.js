import { createTenant } from "../controllers/organization.controller.js";
import { sanitizeRequests } from "../middlewares/sanitizeData.js";
import { verifyTenant } from "../middlewares/tenant.middleware.js";
import { validateRole } from "../middlewares/verifyRole.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import {
  getAttendance,
  getAttendanceByUserController,
  getPresentDayAttendance,
  getUserByRole,
  markAttendance
} from "../controllers/attendance.controller.js";

const router = Router();
router.post("/create-login/:id", verifyJWT, sanitizeRequests, markAttendance);
router.patch(
  "/create-logout/:id",
  verifyJWT,
  verifyTenant,
  sanitizeRequests,
  markAttendance
);
router.get(
  "/get-attendance/:id",
  verifyJWT,
  sanitizeRequests,
  getAttendanceByUserController
);

// attendance page
router.get("/by-role/:userRole", verifyJWT, sanitizeRequests, getUserByRole);
router.get(
  "/filter-attendance/:userRole",
  verifyJWT,
  sanitizeRequests,
  getAttendance
);
router.get(
  "/my-today/:today",
  verifyJWT,
  verifyTenant,
  sanitizeRequests,
  getPresentDayAttendance
);

export default router;
