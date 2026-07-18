import express from "express";
import  authMiddleware  from "../middlewares/auth.middleware.js";
import { generateRoadmap, getRoadmapHistory, getRoadmapAnalysis } from "../controllers/nextSteps.controller.js";

const router = express.Router();

router.get("/generate", authMiddleware, generateRoadmap);
router.get("/history", authMiddleware, getRoadmapHistory);
router.get("/analysis/:roadmapId", authMiddleware, getRoadmapAnalysis);


export default router;
    