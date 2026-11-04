
import ai from "../config/gemini.js";
import { buildResumePrompt } from "../prompts/resumePrompt.js";
import { resumeSchema } from "../schemas/resumeSchema.js";
import { validateResumeResponse } from "../validators/responseValidator.js";

export const analyzeResume = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    // Validate input
    if (!resume?.trim() || !jobDescription?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Resume and job description are required."
      });
    }

    // Generate prompt
    const prompt = buildResumePrompt(resume, jobDescription);

    // Send prompt to Gemini
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: resumeSchema,
        temperature: 0.2
      }
    });

    // Convert JSON string into JavaScript object
    const result = JSON.parse(response.text);

    // Validate AI response
    if (!validateResumeResponse(result)) {
      return res.status(502).json({
        success: false,
        message: "AI returned an invalid response."
      });
    }

    console.log("Resume analyzed successfully.")

    // Send result to frontend
    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      analysis: result
    });

  } catch (error) {
    console.error("Resume Analysis Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze resume. Please try again."
    });
  }
};
