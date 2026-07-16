import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const model = process.env.GEMINI_MODEL;

export { ai, model };