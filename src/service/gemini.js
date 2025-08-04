// src/service/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
// import { SaveAiTrip } from "./firestoreService"; // adjust path if needed

const apiKey = import.meta.env.VITE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const generateTripPlan = async (prompt) => {
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const responseText = result.response.text();
    console.log("-- AI Response (raw text) --", responseText);

    return JSON.parse(responseText); // return parsed JSON if needed elsewhere

  } catch (error) {
    console.error("Error generating trip plan:", error);
    throw error;
  }
};

