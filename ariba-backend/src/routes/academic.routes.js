import { sanitizeRequests } from "../middlewares/sanitizeData.js";
import { verifyTenant } from "../middlewares/tenant.middleware.js";
import { validateRole } from "../middlewares/verifyRole.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createClass } from "../controllers/academic.controller.js";
import { Router } from "express";

const router = Router();
router.route("/create-tenant");
router.post(
  "/create-grade",
  verifyJWT,
  // verifyTenant,
  validateRole(["teacher", "admin"]),
  sanitizeRequests,
  createClass
);
export default router;
