import {
  createUser,
  searchUser,
  signinUser,
  signupUser,
  logoutUser,
  getUserDetailsById,
  getUsersByOrganization,
  addTimeline,
  updateUser,
  getCurrentUser
} from "../controllers/user.controller.js";
import { refreshAccessToken } from "../services/user.services.js";
import { sanitizeRequests } from "../middlewares/sanitizeData.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateRole } from "../middlewares/verifyRole.js";
import { Router } from "express";
import { verifyTenant } from "../middlewares/tenant.middleware.js";
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
// router.route("/refresh-token").post((req, res, next) => {
//   console.log("Cookies received in /refresh-token route:", req.cookies);
//   next(); // continue to controller
// }, refreshAccessToken);

router.route("/search").get(sanitizeRequests, searchUser);
router.route("/get-user-by-id/:id").get(getUserDetailsById);
router
  .route("/get-organization-users")
  .get(verifyJWT, verifyTenant, getUsersByOrganization);
router.route("/add-timeline/:id").patch(addTimeline);
router.route("/get-current-user").get(verifyJWT, getCurrentUser);
export default router;
