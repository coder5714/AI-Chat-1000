import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import type { AIModel } from '../types.ts';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This function now returns both the response text and the updated chat instance
export async function getChatResponse(
  chatInstance: Chat | null,
  model: AIModel,
  prompt: string
): Promise<{ response: string; chat: Chat }> {
  try {
    const chat = chatInstance || ai.chats.create({
      model: model.geminiModel,
      config: {
        systemInstruction: model.systemInstruction,
      },
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message: prompt });
    const responseText = result.text;

    if (!responseText) {
      throw new Error("Received an empty response from the API.");
    }
    
    return { response: responseText, chat };
  } catch (error) {
    console.error("Error fetching response from Gemini API:", error);
    throw new Error(`Failed to get response from AI: ${error instanceof Error ? error.message : String(error)}`);
  }
}