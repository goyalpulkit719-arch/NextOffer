import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { analyzeJob } from "../controllers/jobMatcher.controller.js";

const router = express.Router();

router.get("/analyze", authMiddleware, analyzeJob);

export default router;