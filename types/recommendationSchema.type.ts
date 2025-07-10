import { z } from "zod";

export const recommendationSchema = z.object({
  keyRecommendations: z.array(z.string()),
});

export type YammRecommendationResult = z.infer<typeof recommendationSchema>;
 