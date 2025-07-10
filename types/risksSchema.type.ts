import { z } from 'zod';

export const riskItemSchema = z.object({
  category: z.string(),
  title: z.string(),
  description: z.string(),
  severity: z.string(),
  mitigation: z.string(),
});

export const risksSchema = z.object({
  risks: z.array(riskItemSchema),
});

export type InvestmentRisks = z.infer<typeof risksSchema>;
