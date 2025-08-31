import {
  createUser,
  searchUser,
  signinUser,
  signupUser,
  logoutUser,
  refreshAccessToken
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
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/search").get(sanitizeRequests, searchUser);
export default router;
