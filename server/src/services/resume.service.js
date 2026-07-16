import Resume from "../models/resume.model.js";
import User from "../models/user.model.js";
import downloadPdf from "../utils/downloadPdf.js"
import resumeAnalysisPrompt from "../prompts/resumeAnalysis.prompt.js";
import analyzeResumeWithGemini from "./gemini.service.js";
import validateResumeAnalysis from "../utils/validateResumeAnalysis.js";


export const uploadResume = async (userId, resumeUrl, originalName, fileSize) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    if (user.currentResume) {
        await Resume.findByIdAndUpdate(
            user.currentResume,
            {
                isCurrent: false,
            }
        );
    }

    const resume = await Resume.create({
        userId,

        fileUrl: resumeUrl,

        originalName: originalName,

        fileSize: fileSize,

        isCurrent: true,

        isAnalyzed: false,
    });

    user.currentResume = resume._id;

    await user.save();

    return resume;
};


export const getResumeAnalysis = async (userId, resumeId) => {

    const resume = await Resume.findOne({ _id: resumeId, userId });

    if (!resume) {
        throw new Error("Resume not found.");
    }

    if (!resume.isAnalyzed) {
        throw new Error("This resume has not been analyzed yet.");
    }

    return {
        id: resume._id,
        originalName: resume.originalName,
        fileSize: resume.fileSize,
        updatedAt: resume.updatedAt,
        analysis: resume.analysis,
    };
};


export const analyzeResume = async (userId) => {

    const resume = await Resume.findOne({userId, isCurrent:true,});

    if(!resume) {
        throw new Error("No resume found");
    }

    if(resume.isAnalyzed) {
        return {
            _id: resume._id,
            originalName: resume.originalName,
            fileUrl: resume.fileUrl,
            updatedAt: resume.updatedAt,
            analysis: resume.analysis,
        };
    }

    const pdfBuffer = await downloadPdf(resume.fileUrl);

    const analysis = await analyzeResumeWithGemini(pdfBuffer, resumeAnalysisPrompt);

    validateResumeAnalysis(analysis);

    const { projects, skills, atsCompatibility, resumeStructure, grammar, } = analysis.sectionScores;

    const placementScore = Math.round( projects.score * 0.40 + skills.score * 0.25 + atsCompatibility.score * 0.20 + resumeStructure.score * 0.10 + grammar.score * 0.05 );

    let level;

    if (placementScore >= 90) {
        level = "Excellent";
    } else if (placementScore >= 75) {
        level = "Good";
    } else if (placementScore >= 60) {
        level = "Average";
    } else if (placementScore >= 40) {
        level = "Needs Improvement";
    } else {
        level = "Poor";
    }

    analysis.placementReadiness = {
        score: placementScore,
        level,
    };

    resume.analysis = analysis;

    resume.isAnalyzed = true;

    const updatedResume = await resume.save();

    if (!updatedResume) {
        throw new Error("Failed to save resume analysis.");
    }

    return {
        _id: updatedResume._id,
        originalName: updatedResume.originalName,
        fileUrl: updatedResume.fileUrl,
        updatedAt: updatedResume.updatedAt,
        analysis: updatedResume.analysis,
    }

}


export const getResumeHistory = async(userId) => {

    const resumes = await Resume.find({
        userId,
        isAnalyzed: true,
    })
    .select("_id originalName fileUrl fileSize isCurrent updatedAt analysis.ats.score analysis.placementReadiness")
    .sort({createdAt: -1});

    if(resumes.length === 0) {
        throw new Error("No analyzed resumes found");
    }

    return resumes;

};


export const getCurrentResume = async (userId) => {

    const resume = await Resume.findOne({
        userId,
        isCurrent: true,
    });

    if (!resume) {
        return {
            message: "No resume uploaded yet.",
            data: null,
        };
    }

    if (!resume.isAnalyzed) {
        return {
            message: "Current resume is not analyzed.",
            data: {
                _id: resume._id,
                originalName: resume.originalName,
                fileUrl: resume.fileUrl,
                isAnalyzed: false,
            },
        };
    }

    return {
        message: "Current resume fetched successfully.",
        data: {
            _id: resume._id,
            originalName: resume.originalName,
            fileUrl: resume.fileUrl,
            updatedAt: resume.updatedAt,
            isAnalyzed: true,
            analysis: resume.analysis,
        },
    };
};
