import { z } from 'zod';

export const evaluationScores = z.object({
  teamComposition: z.number(),
  marketIntelligence: z.number(),
  productDevelopment: z.number(),
  financialData: z.number(),
  legalCompliance: z.number(),
  companyOps: z.number(),
});

export type EvaluationScores = z.infer<typeof evaluationScores>;
