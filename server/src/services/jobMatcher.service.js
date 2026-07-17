import downloadPdf from "../utils/downloadPdf.js";
import { jobMatcherPrompt } from "../prompts/jobMatcher.prompt.js";
import validateJobMatch from "../utils/validateJobMatch.js";
import analyzeResumeWithGemini from "./gemini.service.js";
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

    if(!jobMatch) {
        throw new Error("Error to generate job match analysis");
    }

    return jobMatch;

};