import { sanitizeRequests } from "../middlewares/sanitizeData.js";
import { verifyTenant } from "../middlewares/tenant.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { getAnnouncement } from "../controllers/announcement.controller.js";

const router = Router();

router.get(
  "/get-announcement",
  verifyJWT,
  verifyTenant,
  sanitizeRequests,
  getAnnouncement
);

export default router;
