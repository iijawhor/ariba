import {
  createUser,
  signinUser,
  signupUser
} from "../controllers/user.controller.js";
import { sanitizeRequests } from "../middlewares/sanitizeData.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateRole } from "../middlewares/verifyRole.js";
import { Router } from "express";

const router = Router();
router.route("/signup").post(sanitizeRequests, signupUser);
router
  .route("/create-user")
  .post(verifyJWT, sanitizeRequests, validateRole(["superAdmin"]), createUser);
router.route("/signin").post(sanitizeRequests, signinUser);
export default router;
