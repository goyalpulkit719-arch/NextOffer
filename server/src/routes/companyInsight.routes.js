import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {getCompanyInsight} from "../controllers/companyInsight.controller.js";

const router = express.Router();

router.get("/analysis", authMiddleware, getCompanyInsight);

export default router;