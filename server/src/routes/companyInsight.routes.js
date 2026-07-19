import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {getCompanyInsight, getCompanyHistory, getCompanyInsightById} from "../controllers/companyInsight.controller.js";

const router = express.Router();

router.post("/analysis", authMiddleware, getCompanyInsight);
router.get("/history", authMiddleware, getCompanyHistory);
router.get("/analysis/:id", authMiddleware, getCompanyInsightById);

export default router;