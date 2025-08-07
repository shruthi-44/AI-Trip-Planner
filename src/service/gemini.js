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
  // Remove markdown formatting or code blocks (```json ... ```)
  const cleaned = text
    .replace(/```json|```/g, "")
    .replace(/^\s*[\r\n]/gm, "")
    .trim();

  return cleaned;
}

export const generateTripPlan = async (prompt) => {
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const raw = await result.response.text();
    const responseText = cleanGeminiResponse(raw);

    console.log("🧠 Gemini Cleaned Response:", responseText);

    // Try parsing full response
    try {
      return JSON.parse(responseText);
    } catch (err) {
      console.warn("⚠️ Full parse failed, trying regex fallback...");

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (nestedErr) {
          throw new Error("❌ JSON fallback also failed.");
        }
      } else {
        throw new Error("❌ No JSON block found in Gemini response.");
      }
    }
  } catch (error) {
    console.error("🔥 Error generating trip plan:", error);
    throw error;
  }
};
