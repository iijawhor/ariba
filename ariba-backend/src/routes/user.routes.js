import {
  createUser,
  searchUser,
  signinUser,
  signupUser,
  logoutUser,
  refreshAccessToken,
  getUserDetailsById,
  getUsersByOrganization,
  addTimeline,
  updateUser
} from "../controllers/user.controller.js";
import { sanitizeRequests } from "../middlewares/sanitizeData.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateRole } from "../middlewares/verifyRole.js";
import { Router } from "express";
const router = Router();
router.route("/signup").post(sanitizeRequests, signupUser);
router
  .route("/create-user")
  .post(
    verifyJWT,
    sanitizeRequests,
    validateRole(["superAdmin", "admin"]),
    createUser
  );
router.route("/update-user/:id").patch(verifyJWT, sanitizeRequests, updateUser);
router.route("/signin").post(sanitizeRequests, signinUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/search").get(sanitizeRequests, searchUser);
router.route("/get-user-by-id/:id").get(getUserDetailsById);
router.route("/get-organization-users").get(getUsersByOrganization);
router.route("/add-timeline/:id").patch(addTimeline);
export default router;
