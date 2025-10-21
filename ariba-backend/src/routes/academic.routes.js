import rateLimit from "express-rate-limit";
import { sanitizeRequests } from "../middlewares/sanitizeData.js";
import { verifyTenant } from "../middlewares/tenant.middleware.js";
import { validateRole } from "../middlewares/verifyRole.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  createClass,
  createSubject
} from "../controllers/academic.controller.js";
import { Router } from "express";

const router = Router();
const subjectLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 50,
  message: "Too many subject creation requests. Please try later."
});

router.post(
  "/create-grade",
  verifyJWT,
  // verifyTenant,
  validateRole(["teacher", "admin"]),
  sanitizeRequests,
  subjectLimiter,
  createClass
);
router.post(
  "/create-subject",
  verifyJWT,
  // verifyTenant,
  validateRole(["teacher", "admin"]),
  sanitizeRequests,
  createSubject
);
export default router;
