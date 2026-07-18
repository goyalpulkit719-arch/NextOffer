import downloadPdf from "../utils/downloadPdf.js";
import { analyzeResumeWithGemini, generateContentWithGemini, } from "./gemini.service.js";
import validateNextSteps from "../utils/validateNextSteps.js";
import nextStepsPrompt from "../prompts/nextSteps.prompt.js";

const generateNextSteps = async ({
    companyName,
    companyInsight,
    leetcodeProfile,
    codeforcesProfile,
    resumeUrl = null,
}) => {

    const prompt = nextStepsPrompt({
        hasResume: !!resumeUrl,
        companyName,
        companyInsight,
        leetcodeProfile,
        codeforcesProfile,
    });

    let roadmap;

    if (resumeUrl) {

        const pdfBuffer = await downloadPdf(resumeUrl);
        roadmap = await analyzeResumeWithGemini(pdfBuffer, prompt);
    }
    else{

        roadmap = await generateContentWithGemini(prompt);
    }

    validateNextSteps(roadmap);

    return roadmap;
};



export default generateNextSteps;