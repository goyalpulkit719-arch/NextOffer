import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

import { getLeetcodeDashboard, refreshLeetcodeProfile, getLeetcodeHistory, updateLeetcodeUsername } from "../controllers/leetcode.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getLeetcodeDashboard);
router.get("/refresh", authMiddleware, refreshLeetcodeProfile);
router.get("/history", authMiddleware, getLeetcodeHistory);
router.patch("/username", authMiddleware, updateLeetcodeUsername);

export default router;