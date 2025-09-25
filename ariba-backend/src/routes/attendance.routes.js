import { createTenant } from "../controllers/organization.controller.js";
import { sanitizeRequests } from "../middlewares/sanitizeData.js";
import { verifyTenant } from "../middlewares/tenant.middleware.js";
import { validateRole } from "../middlewares/verifyRole.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import {
  getAttendanceByUserController,
  markAttendance
} from "../controllers/attendance.controller.js";

const router = Router();
router.post("/create-login/:id", verifyJWT, sanitizeRequests, markAttendance);
router.patch("/create-logout/:id", verifyJWT, sanitizeRequests, markAttendance);
router.get(
  "/get-attendance/:id",
  verifyJWT,
  sanitizeRequests,
  getAttendanceByUserController
);

export default router;
