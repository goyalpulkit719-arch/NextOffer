import asyncHandler from "express-async-handler";
import { generateJobMatchAnalysis } from "../services/jobMatcher.service.js";

export const analyzeJob = asyncHandler(async (req, res) => {

    const { jobTitle, companyName, jobDescription, } = req.body;

    if (!jobTitle.trim() || !companyName.trim() || !jobDescription) {
        const error = new Error(
            "Job title, company name and job description are required."
        );
        error.statusCode = 400;
        throw error;
    }

    const jobMatch = await generateJobMatchAnalysis(
        req.user._id,
        jobTitle.trim(),
        companyName.trim(),
        jobDescription.trim()
    );

    res.status(201).json({
        success: true,
        message: "Job match analysis generated successfully.",
        data: jobMatch,
    });
});