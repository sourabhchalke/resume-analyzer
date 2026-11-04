import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function testGemini() {
  try {
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: "Say Hello. You are connected to my AI Resume Analyzer project.",
    });

    console.log("Gemini API Connected Successfully!");
    console.log(response.text);

  } catch (error) {
    console.error("Gemini API Error:", error.message);
  }
}

testGemini();