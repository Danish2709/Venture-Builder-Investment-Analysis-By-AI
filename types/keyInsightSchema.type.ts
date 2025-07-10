import { z } from 'zod';

export const keyInsightSchema = z.object({
	category: z.enum(['strength', 'opportunity']),
	title: z.string(),
	description: z.string(),
	impact: z.enum(['high', 'medium', 'low']),
});

export const keyInsightsSchema = z.object({
	keyInsights: z.array(keyInsightSchema),
});

export type KeyInsights = z.infer<typeof keyInsightsSchema>;
