import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: "YOUR_GEMINI_API_KEY", // 👉 Use env var in production
});

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
 * Analyze a file using Gemini 2.5 Pro with a custom prompt
 */
export async function analyzeWithGemini(
  file: File,
  prompt: string
): Promise<string> {
  const base64Data = await fileToBase64(file);
  const mimeType = file.type || "application/pdf"; // fallback

  const result = await google.generateContent({
    model: "gemini-1.5-pro", // Gemini 2.5 Pro is available via this name
    messages: [
      {
        role: "user",
        content: [
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

  return result.text;
}
