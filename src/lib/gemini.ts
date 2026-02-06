import { GoogleGenAI } from "@google/genai";


const genAI = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_KEY});

export const analyzeJob = async (company: string, position: string) => {
  const prompt = `Role: ${position} at ${company}`;

  try {
    const result = await genAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {systemInstruction: 'You are a witty, supportive career coach. Your job is to analyze job roles and the company give a brief, 2-sentence strategy for an applicant. Keep it punchy and insightful.' }
        
    });
    const response = result.text;
    return response;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI coach is on a coffee break. Just be yourself!";
  }
};