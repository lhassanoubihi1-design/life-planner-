
import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, LifePlan } from "../types";

export const generatePlan = async (prefs: UserPreferences): Promise<LifePlan> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Create a detailed, hyper-personalized premium life plan for ${prefs.name}. 
  Main Goal: ${prefs.mainGoal}. 
  Current roadblock: ${prefs.currentStruggle}. 
  Daily energy levels: ${prefs.energyLevel}. 
  Plan tone: ${prefs.tone}. 
  Include a structured routine, habits, weekly milestones, and a specific 7-day schedule (Monday to Sunday) that progressively builds toward the main goal.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: "You are a world-class performance coach. Your plans are visually rich, actionable, and logically structured. Output ONLY valid JSON according to the schema. Ensure the weeklySchedule has exactly 7 days.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          morningRoutine: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                activity: { type: Type.STRING },
                description: { type: Type.STRING },
                focus: { type: Type.STRING }
              },
              required: ["time", "activity", "description", "focus"]
            }
          },
          afternoonRoutine: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                activity: { type: Type.STRING },
                description: { type: Type.STRING },
                focus: { type: Type.STRING }
              },
              required: ["time", "activity", "description", "focus"]
            }
          },
          eveningRoutine: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                activity: { type: Type.STRING },
                description: { type: Type.STRING },
                focus: { type: Type.STRING }
              },
              required: ["time", "activity", "description", "focus"]
            }
          },
          habits: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                habit: { type: Type.STRING },
                frequency: { type: Type.STRING },
                benefit: { type: Type.STRING }
              },
              required: ["habit", "frequency", "benefit"]
            }
          },
          weeklyGoals: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          growthMindsetTip: { type: Type.STRING },
          weeklySchedule: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                focus: { type: Type.STRING },
                keyTask: { type: Type.STRING }
              },
              required: ["day", "focus", "keyTask"]
            }
          }
        },
        required: ["morningRoutine", "afternoonRoutine", "eveningRoutine", "habits", "weeklyGoals", "growthMindsetTip", "weeklySchedule"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || '{}');
    return data as LifePlan;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    throw new Error("Could not generate plan. Please try again.");
  }
};
