export const getGeminiKey = (key) => {
    let geminiApiKey;
    if (key) {
        process.env.GEMINI_API_KEY = key;
    } else {
        geminiApiKey = process.env.GEMINI_API_KEY || key; // Ensure GEMINI_API_KEY is set in .env.local
    }
    return geminiApiKey;
};