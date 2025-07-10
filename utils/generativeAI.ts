import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { ZodSchema } from 'zod';

/**
 * Convert uploaded File to base64 string
 */
export const fileToBase64 = async (file: File): Promise<string> => {
	const arrayBuffer = await file.arrayBuffer();
	const bytes = new Uint8Array(arrayBuffer);
	let binary = '';
	for (let b of bytes) binary += String.fromCharCode(b);
	return btoa(binary);
};

const google = createGoogleGenerativeAI({
	apiKey: 'AIzaSyAYF_flfuyGcxorcbda5DJ2cDZpTEyBZ34', // Replace with env var if needed
});

const model = google('gemini-2.0-flash');

/**
 * Generic Gemini analysis function for base64 input (instead of file).
 */
export async function analyzeWithGemini<T>(
	finalPrompt: string,
  schema: ZodSchema<T>,
	temperature = 0.7
): Promise<T> {
	const { object } = await generateObject({
		model,
		prompt: finalPrompt,
    schema,
		temperature,
	});

	return object;
}
