import downloadPdf from "../utils/downloadPdf.js";
import { jobMatcherPrompt } from "../prompts/jobMatcher.prompt.js";
import validateJobMatch from "../utils/validateJobMatch.js";
import {analyzeResumeWithGemini} from "./gemini.service.js";
import Resume from "../models/resume.model.js";
import JobMatch from "../models/jobMatcher.model.js";

export const generateJobMatchAnalysis = async ( userId, jobTitle, companyName, jobDescription ) => {

    
    const resume = await Resume.findOne({userId, isCurrent:true});

    if(!resume) {
        throw new Error("No resume found");
    }

    const pdfBuffer = await downloadPdf(resume.fileUrl);

    const prompt = jobMatcherPrompt(jobTitle, companyName, jobDescription);

    const analysis = await analyzeResumeWithGemini(pdfBuffer, prompt);

    validateJobMatch(analysis);

    const jobMatch = await JobMatch.create({
        userId,
        resumeId: resume._id,
        jobTitle,
        companyName,
        jobDescription,
        ...analysis,
    });

    await jobMatch.populate({
        path: "resumeId",
        select: "originalName fileUrl",
    });

    return jobMatch;

};


export const getJobMatchHistory = async (userId) => {

    const history = await JobMatch.find(
        { userId },
        {
            jobTitle: 1,
            companyName: 1,
            updatedAt: 1,
        }
    ).populate({path: "resumeId", select:"originalName fileUrl"}).sort({ updatedAt: -1 })

    return history;

};


export const getJobMatchAnalysis = async (userId, jobMatchId) => {

    const jobMatch = await JobMatch.findOne({
        _id: jobMatchId,
        userId,
    }).populate({path: "resumeId", select:"originalName fileUrl"});

    if (!jobMatch) {
        const error = new Error("Job match analysis not found.");
        error.statusCode = 404;
        throw error;
    }

    return jobMatch;

};