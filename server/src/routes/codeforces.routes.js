import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

import { getCodeforcesDashboard, refreshCodeforcesProfile, getCodeforcesHistory, updateCodeforcesUsername } from "../controllers/codeforces.controller.js";

const router = express.Router();


router.get("/", authMiddleware, getCodeforcesDashboard);
router.get("/refresh", authMiddleware, refreshCodeforcesProfile);
router.get("/history", authMiddleware, getCodeforcesHistory);
router.patch("/username", authMiddleware, updateCodeforcesUsername);

export default router;