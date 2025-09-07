
import { GoogleGenAI } from "@google/genai";
import { type SimulationStep } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateGuidance(step: SimulationStep, strategy: string): Promise<string> {
  const prompt = `
    You are an expert consultant in systems dynamics and business strategy.
    A user is building a simple systems dynamic simulation to test a strategy.

    User's Strategy: "${strategy}"

    Current Step: "${step.title}"
    Step Description: "${step.description}"

    Your Task:
    Provide clear, concise, and actionable guidance for the user on how to complete the CURRENT STEP specifically for THEIR STRATEGY.
    - Explain the importance of this step in the context of their stated strategy.
    - Provide concrete examples and a list of potential items they should consider or create for this step.
    - Format your response using markdown-style headings (e.g., using '**' for bolding titles) and bullet points (using '-') for readability.
    - Keep the tone helpful and encouraging.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
        topP: 0.95,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get response from AI. Please check API key and network connection.");
  }
}
