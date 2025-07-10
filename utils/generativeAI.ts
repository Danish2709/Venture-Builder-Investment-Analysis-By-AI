import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Convert uploaded File to base64 string
 */
const fileToBase64 = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = "";
  for (let b of bytes) binary += String.fromCharCode(b);
  return btoa(binary);
};

/**
 * Analyze a file using Gemini 1.5 Pro (Gemini 2.5 capable)
 */
export async function analyzeWithGemini(
  file: File,
  prompt: string
): Promise<string> {
  const genAI = new GoogleGenerativeAI("AIzaSyAYF_flfuyGcxorcbda5DJ2cDZpTEyBZ34"); // Replace with your key
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const base64Data = await fileToBase64(file);
  const mimeType = file.type || "application/pdf";

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          {
            inlineData: {
              data: base64Data,
              mimeType,
            },
          },
        ],
      },
    ],
  });

  const response = result.response;
  return response.text();
}
