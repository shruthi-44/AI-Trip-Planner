import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API key
const apiKey = import.meta.env.VITE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Set model
const model = genAI.getGenerativeModel({
  model: "models/gemini-1.5-flash", // ✅ latest version
});

// Config
const generationConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

function cleanGeminiResponse(text) {
  let cleaned = text
    .replace(/```(?:json)?/g, "") // remove code block markers
    .replace(/```/g, "")
    .trim();

  // Remove any leading/trailing text outside JSON
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (match) cleaned = match[0];

  // Fix common JSON-breaking issues
  cleaned = cleaned
    .replace(/\bNaN\b/g, "null") // replace NaN
    .replace(/\bundefined\b/g, "null") // replace undefined
    .replace(/,(\s*[}\]])/g, "$1"); // remove trailing commas

  return cleaned.trim();
}

export const generateTripPlan = async (prompt) => {
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const raw = await result.response.text();
    console.log("🛠 Raw Gemini Output:", raw);

    const cleanedResponse = cleanGeminiResponse(raw);
    console.log("🧠 Gemini Cleaned Response:", cleanedResponse);

    try {
      return JSON.parse(cleanedResponse);
    } catch (err) {
      throw new Error("❌ Could not parse Gemini JSON after cleanup.");
    }
  } catch (error) {
    console.error("🔥 Error generating trip plan:", error);
    throw error;
  }
};

