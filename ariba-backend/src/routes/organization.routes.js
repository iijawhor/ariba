import { createTenant } from "../controllers/organization.controller.js";
import { sanitizeRequests } from "../middlewares/sanitizeData.js";
import { verifyTenant } from "../middlewares/tenant.middleware.js";
import { validateRole } from "../middlewares/verifyRole.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();
router.route("/create-tenant");
router.post(
  "/create-tenant",
  verifyJWT,
  validateRole(["superAdmin"]),
  sanitizeRequests,
  createTenant
);
export default router;
