import asyncHandler from "express-async-handler";
import imagekit from "../config/imagekit.js";

import { uploadResume, getResumeAnalysis, analyzeResume, getResumeHistory, getCurrentResume } from "../services/resume.service.js";

export const uploadResumeC = asyncHandler(async (req, res) => {

    if (!req.file) {
            throw new Error("Resume file is required.");
        }
    
    const uploadedFile = await imagekit.files.upload({
        file: req.file.buffer.toString("base64"),
        fileName: `${req.user._id}-${Date.now()}`,
        folder: "/NextOffer/Resume"
    });

    const resume = await uploadResume(req.user._id, uploadedFile.url, req.file.originalname, req.file.size);

    res.status(201).json({
        success: true,
        message: "Resume uploaded successfully.",
        data: {
            _id: resume._id,
            originalName: resume.originalName,
            fileSize: resume.fileSize,
            isAnalyzed: resume.isAnalyzed,
            createdAt: resume.createdAt,
        },
    });

});

export const getResumeAnalysisC = asyncHandler(async (req, res) => {

    const analysis = await getResumeAnalysis(
        req.user._id,
        req.params.resumeId
    );

    res.status(200).json({
        success: true,
        message: "Resume Fetched Successfully",
        data: analysis,
    });

});

export const analyzeResumeC = asyncHandler(async (req, res) => {

    const resume = await analyzeResume(req.user._id);

    return res.status(200).json({
        success: true,
        message: "Resume analyzed successfully",
        data: resume,
    })

});

export const getResumeHistoryC = asyncHandler(async(req, res) => {

    const data = await getResumeHistory(req.user._id);

    return res.status(200).json({
        success: true,
        message: "Resume history fetched successfully",
        data,
    })

});

export const getCurrentResumeC = asyncHandler(async (req, res) => {

    const { message, data } = await getCurrentResume(req.user._id);

    return res.status(200).json({
        success: true,
        message,
        data,
    });
    
});
