import { z } from 'zod';

export const generalParameters = z.object({
	arr: z.string(),
	burnRate: z.string(),
	ltvCac: z.string(),
	revenueGrowth: z.string(),
    companyDescription: z.string(),
    companyIndustryType: z.string(),
    companyLocation: z.string(),
    companyName: z.string(),
    confidence: z.string(),
    growthStage: z.string(),
    ticket: z.string(),
});

export type YammRecommendationResult = z.infer<typeof generalParameters>;
