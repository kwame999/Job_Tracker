import { GoogleGenAI } from "@google/genai";
import type { JobType } from "../Types";

const genAI = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_KEY});

export const analyzeJob = async (company: string, position: string) => {
  const prompt = `Role: ${position} at ${company}`;

  try {
    
    const result = await genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {systemInstruction: 'You are a witty, supportive career coach. Your job is to analyze job roles and the company give a brief, 2-sentence strategy for an applicant. Keep it punchy and insightful.' }
        
    });
    return result.text;

  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI coach is on a coffee break. Just be yourself!";
  }
};


export const getCoachResponse = async (userPrompt: string, jobs: JobType[]) => {

  try {
    
    const response = await genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userPrompt,
        config: {systemInstruction: `You are a Career Coach. Here is the user's current job board data: ${JSON.stringify(jobs)}. 
        Answer questions specifically about their jobs, salary, and interview status. Be encouraging but realistic. If the data is empty
        prompt the user to go create a job` }
        
    });
    return response.text;

  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI coach is on a coffee break. Just be yourself!";
  }
};