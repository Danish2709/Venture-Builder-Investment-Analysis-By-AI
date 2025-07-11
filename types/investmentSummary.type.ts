import { z } from "zod"

export const investmentSummarySchema = z.object({
  executiveSummary: z.string(),
  companyOverview: z.object({
    name: z.string(),
    location: z.string(),
    industry: z.string(),
    description: z.string(),
  }),
  investmentDetails: z.object({
    type: z.string(),
    ticket: z.string(),
    confidence: z.string(),
  }),
  keyFinancials: z.object({
    arr: z.string(),
    revenueGrowth: z.string(),
    burnRate: z.string(),
    ltvCac: z.string(),
  }),
  strategicInsights: z.array(
    z.object({
      category: z.enum(["strength", "opportunity"]),
      title: z.string(),
      description: z.string(),
      impactLevel: z.enum(["high", "medium", "low"]),
    })
  ),
  evaluationScores: z.object({
    teamComposition: z.number(),
    marketIntelligence: z.number(),
    productDevelopment: z.number(),
    financialData: z.number(),
    legalCompliance: z.number(),
    companyOps: z.number(),
  }),
  investmentRisks: z.array(
    z.object({
      category: z.enum(["market", "financial", "competitive", "execution", "regulatory"]),
      title: z.string(),
      description: z.string(),
      severity: z.enum(["low", "medium", "high"]),
      mitigation: z.string(),
    })
  ),
  recommendations: z.array(z.string()),
})

export type InvestmentSummary = z.infer<typeof investmentSummarySchema>