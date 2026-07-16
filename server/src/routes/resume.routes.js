import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import uploadResume from "../middlewares/uploadResume.middleware.js";

import { uploadResumeC, getResumeAnalysisC, analyzeResumeC, getResumeHistoryC, getCurrentResumeC } from "../controllers/resume.controller.js";

const router = express.Router();

router.post( "/upload", authMiddleware, uploadResume.single("resume"), uploadResumeC );

router.get( "/analysis/:resumeId", authMiddleware, getResumeAnalysisC );

router.get("/analyze", authMiddleware, analyzeResumeC);

router.get("/history", authMiddleware, getResumeHistoryC);

router.get("/current", authMiddleware, getCurrentResumeC);



export default router;