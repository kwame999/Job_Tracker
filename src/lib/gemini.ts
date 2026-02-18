import { GoogleGenAI, Type } from "@google/genai";
import type { CreateAutoJobsTypes } from "../Types";
import type { JobType } from "../Types";
import supabase from './supabaseClient';
const genAI = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_KEY});



const createAutoJobFunctionDeclaration: CreateAutoJobsTypes  = {
  name: 'create_new_job',
  description: 'Creates a new job object for the user based on their career goals',
  parameters: {
    type: Type.OBJECT,
    properties: {
      company: {
        type: Type.STRING,
        description: "The company name, e.g., 'Google', 'Apple'"
      },
      position: {
        type: Type.STRING,
        description: "The job title, e.g., 'Designer', 'Engineer'"
      },
      status: {
        type: Type.STRING,
        description: "The current state of the application",
        enum: ['applied', 'interview', 'offer', 'rejected', 'ghosted'] // Strict presets
      },
      salary: {
        type: Type.STRING,
        description: "The salary range or amount if mentioned"
      },
      mood_txt: {
        type: Type.STRING,
        description: "A brief note on the user's feelings about this specific role"
      },
    },
    required: ['company', 'position', 'status', 'mood_txt']
  },
};





export const analyzeJob = async (company: string, position: string) => {
  const prompt = `Role: ${position} at ${company}`;

  try {
    
    const result = await genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {systemInstruction: `You are a witty, supportive career coach. 
                                     Your job is to analyze job roles and the company 
                                     give a brief, 2-sentence strategy for an applicant. 
                                     Keep it punchy and insightful.`,
                // tools: [{
                //   functionDeclarations: [createAutoJobFunctionDeclaration] 
                // }]                    
                }
        
    });
    return result.text;

  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI coach is on a coffee break. Just be yourself!";
  }
};




export const getCoachResponse = async (userPrompt: string, jobs: JobType[], handleJobs: (job: JobType) => void) => {

  try {
    
    const response = await genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userPrompt,
        config: {systemInstruction: `You are a Career Coach. Here is the user's current job board data: ${JSON.stringify(jobs)}. 
        Answer questions specifically about their jobs, salary, and interview status. Be encouraging but realistic. 
        If the data is empty, give them the choice of creating one through you or one by
        themselvels. Give them free choice and be open to chat about strategies. If they
        say they do not know the salary or are unsure, just leave it blank do not fill`,
                  tools: [{
                  functionDeclarations: [createAutoJobFunctionDeclaration] 
                }]        
      
      }
        
    });
    const calls = response.functionCalls
    if (calls && calls.length > 0) {
       const {data, error} = await supabase
      .from('jobs')
      .insert([ {...calls[0].args, 
                  logo_url: `https://img.logo.dev/${calls[0].args?.company}.com?token=pk_RKtwoXuaQDSJdIEDV1NYVA`,
                  logo_alt: `${calls[0].args?.company} logo`,
                }])
      .select()

      if (data) handleJobs(data[0])
      if (error) { console.error(error) }

      return `Got it! I'm adding that ${calls[0].args?.position} role at ${calls[0].args?.company} to your board.`;
    }
    return response.text;

  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI coach is on a coffee break. Just be yourself!";
  }
};