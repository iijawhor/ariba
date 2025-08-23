import { signinUser, signupUser } from "../controllers/user.controller.js";
import { sanitizeRequests } from "../middlewares/sanitizeData.js";
import { Router } from "express";

const router = Router();
router.route("/signup").post(sanitizeRequests, signupUser);
router.route("/signin").post(sanitizeRequests, signinUser);
export default router;
