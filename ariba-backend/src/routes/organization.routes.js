import {
  createTenant,
  getTenant
} from "../controllers/organization.controller.js";
import { sanitizeRequests } from "../middlewares/sanitizeData.js";
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
router.get(
  "/get-tenant",
  verifyJWT,
  validateRole(["superAdmin", "admin", "teacher", "student"]),
  getTenant
);
export default router;
