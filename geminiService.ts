
import { GoogleGenAI } from "@google/genai";

// Fix: Exclusively use process.env.API_KEY for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getLegalAssistantResponse(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are an AI assistant for the Uganda Christian Lawyers Fraternity. You help summarize legal concepts, explain Christian legal ethics, and provide preliminary guidance based on Ugandan law and Christian values. Always include a disclaimer that you are an AI and not a lawyer providing professional legal advice.",
      }
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI service. Please try again later.";
  }
}
