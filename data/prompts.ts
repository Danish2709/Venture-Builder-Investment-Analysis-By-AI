export const investmentRecommendationPrompt = `
You're an expert venture capital analyst reviewing a pitch deck for a **{investmentType}**.

Your task is to extract the **key business recommendations or strategic insights** that are suitable for this investment stage, focusing on:

- Business model refinement
- Operational maturity
- Product-market fit
- Go-to-market strategy
- Team capability and scaling
- Revenue potential and traction
- Expansion roadmap or future growth

Document Format: {mimeType}
Base64 Content: {base64}

Respond ONLY in JSON format matching this structure:
{formatInstructions}
`;
