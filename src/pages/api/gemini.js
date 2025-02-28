import { GoogleGenerativeAI } from "@google/generative-ai";
import { getGeminiKey } from "@/components/utils";

// Load environment variables (install dotenv if needed: `npm install dotenv`)
require("dotenv").config(); //optional if next.config.js already has env loading

const geminiApiKey = getGeminiKey();

if (!geminiApiKey) {
  console.error(
    "Gemini API key not found.  Please set the GEMINI_API_KEY environment variable.",
  );
  process.exit(1); // Exit if the API key is missing
}

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Use "gemini-pro-vision" for image input

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      // --- Structure the Output (Example) ---
      // You'll need to adjust this based on what you expect Gemini to return.
      //  For instance, ask Gemini to return JSON.
      let structuredData = {
        raw: responseText,
        summary: "",
        details: [],
      };

      try {
        //Attempt to parse as JSON
        const jsonResponse = JSON.parse(responseText);
        structuredData = jsonResponse;
      } catch (error) {
        //If parsing fails, use raw response and optionally try some regex / string extraction if you know Gemini tends to answer similarly

        //Example of extracting content
        if (responseText.includes("Summary:")) {
          structuredData.summary = responseText
            .substring(responseText.indexOf("Summary:") + "Summary:".length)
            .split("\n")[0];
        }
        structuredData.raw = responseText; //fallback
      }

      return res.status(200).json({ data: structuredData });
    } catch (error) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({ error: "Failed to generate content" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
