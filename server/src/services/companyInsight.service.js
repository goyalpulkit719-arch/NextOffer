import {generateContentWithGemini} from "./gemini.service.js";
import { companyInsightPrompt } from "../prompts/companyInsight.prompt.js";
import validateCompanyInsight from "../utils/validateCompanyInsight.js";

export const generateCompanyInsight = async (companyName) => {
  const prompt = companyInsightPrompt(companyName);

  const analysis = await generateContentWithGemini(prompt);

  validateCompanyInsight(analysis);

  return analysis;
};