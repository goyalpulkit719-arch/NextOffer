import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { analyzeJob, getJobMatchHistoryC, getJobMatchAnalysisC } from "../controllers/jobMatcher.controller.js";

const router = express.Router();

router.get("/analyze", authMiddleware, analyzeJob);
router.get("/history", authMiddleware, getJobMatchHistoryC);
router.get("/analysis/:id", authMiddleware, getJobMatchAnalysisC);

export default router;