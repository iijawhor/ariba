import { signupUser } from "../controllers/user.controller.js";
import { sanitizeRequests } from "../middlewares/sanitizeData.js";
import { Router } from "express";

const router = Router();
router.route("/signup").post(sanitizeRequests, signupUser);
export default router;
