'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnalysisResult, AnalysisResultContextType } from './AnalysisResultContext.type';
import { analyzeWithGemini, fileToBase64 } from '@/utils/generativeAI';
import { generalParameters } from '@/types/generalParameters.type';
import { recommendationSchema } from '@/types/recommendationSchema.type';
import {
	evaluationScoresPrompt,
	generalParametersPrompt,
	investmentRecommendationPrompt,
	investmentRisksPrompt,
	keyInsightsPrompt,
} from '@/data/prompts';
import { evaluationScores } from '@/types/evaluationScores.type';
import { keyInsightsSchema } from '@/types/keyInsightSchema.type';
import { risksSchema } from '@/types/risksSchema.type';
import { InvestmentSummary, investmentSummarySchema } from '@/types/investmentSummary.type';

const AnalysisResultContext = createContext<AnalysisResultContextType | undefined>(undefined);

export const AnalysisResultProvider = ({ children }: { children: ReactNode }) => {
	const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
	const overallScore = React.useMemo(() => {
		return Math.floor(Object.values(analysisResult?.evaluationScores ?? {}).reduce((acc, val) => acc + val, 0) / 6);
	}, [analysisResult]);

	const getInvestmentRecommendation = React.useCallback(async (file: File, selectedOption: string | null) => {
		const base64 = await fileToBase64(file);
		const mimeType = file.type || 'application/pdf';

		const finalPrompt = investmentRecommendationPrompt
			.replace('{base64}', base64)
			.replace('{mimeType}', mimeType)
			.replace('{investmentType}', selectedOption ?? '')
			.replace(
				'{formatInstructions}',
				JSON.stringify(
					{
						keyRecommendations: 'string[] - top strategic recommendations tailored to the investment stage',
					},
					null,
					2
				)
			);

		const result = await analyzeWithGemini(finalPrompt, recommendationSchema);

		setAnalysisResult((prev) => ({
			...(prev || {}),
			keyRecommendations: result.keyRecommendations,
		}));
	}, []);

	const getGeneralParameters = React.useCallback(async (file: File) => {
		const base64 = await fileToBase64(file);
		const mimeType = file.type || 'application/pdf';

		const finalPrompt = generalParametersPrompt
			.replace('{base64}', base64)
			.replace('{mimeType}', mimeType)
			.replace(
				'{formatInstructions}',
				JSON.stringify(
					{
						companyName: 'string - Full legal or brand name of the company',
						ticket: 'string - The investment ticket size being sought or recommended',
						confidence: 'number - Analyst confidence score as an integer from 0 to 100',
						companyDescription: "string - Description of the company's mission or product",
						companyIndustryType: 'string - Industry or sector the company operates in',
						companyLocation: 'string - Headquarters or primary operating location',
						arr: 'string - Annual Recurring Revenue (ARR)',
						revenueGrowth: 'string - Percentage or trend in revenue growth',
						burnRate: 'string - Current monthly burn rate of the company',
						ltvCac: 'string - Lifetime Value to Customer Acquisition Cost ratio',
						growthStage: 'string - Growth stage of the company (e.g., Seed, Series A)',
					},
					null,
					2
				)
			);

		const result = await analyzeWithGemini(finalPrompt, generalParameters);

		setAnalysisResult((prev) => ({
			...(prev || {}),
			company: {
				confidence: result.confidence,
				description: result.companyDescription,
				growthStage: result.growthStage,
				industry: result.companyIndustryType,
				location: result.companyLocation,
				name: result.companyName,
				financials: {
					arr: result.arr,
					burnRate: result.burnRate,
					ltvToCacRatio: result.ltvCac,
					revenueGrowth: result.revenueGrowth,
					ticket: result.ticket,
				},
			},
		}));
	}, []);

	const getEvaluationScores = React.useCallback(async (file: File) => {
		const base64 = await fileToBase64(file);
		const mimeType = file.type || 'application/pdf';

		const finalPrompt = evaluationScoresPrompt
			.replace('{base64}', base64)
			.replace('{mimeType}', mimeType)
			.replace(
				'{formatInstructions}',
				JSON.stringify(
					{
						teamComposition: 'number - Score from 0 to 100',
						marketIntelligence: 'number - Score from 0 to 100',
						productDevelopment: 'number - Score from 0 to 100',
						financialData: 'number - Score from 0 to 100',
						legalCompliance: 'number - Score from 0 to 100',
						companyOps: 'number - Score from 0 to 100',
					},
					null,
					2
				)
			);

		const result = await analyzeWithGemini(finalPrompt, evaluationScores);

		setAnalysisResult((prev) => ({
			...(prev || {}),
			evaluationScores: {
				teamComposition: result.teamComposition,
				marketIntelligence: result.marketIntelligence,
				productDevelopment: result.productDevelopment,
				financialData: result.financialData,
				legalCompliance: result.legalCompliance,
				companyOps: result.companyOps,
			},
		}));
	}, []);

	const getKeyInsights = React.useCallback(async (file: File) => {
		const base64 = await fileToBase64(file);
		const mimeType = file.type || 'application/pdf';

		const finalPrompt = keyInsightsPrompt
			.replace('{base64}', base64)
			.replace('{mimeType}', mimeType)
			.replace(
				'{formatInstructions}',
				JSON.stringify(
					{
						keyInsights:
							'KeyInsights[] - Array of key insights with category, title, description, and impact',
					},
					null,
					2
				)
			);

		const result = await analyzeWithGemini(finalPrompt, keyInsightsSchema);

		setAnalysisResult((prev) => ({
			...(prev || {}),
			keyInsights: result.keyInsights,
		}));
	}, []);

	const getRiskAnalysis = React.useCallback(async (file: File) => {
		const base64 = await fileToBase64(file);
		const mimeType = file.type || 'application/pdf';

		const finalPrompt = investmentRisksPrompt
			.replace('{base64}', base64)
			.replace('{mimeType}', mimeType)
			.replace(
				'{formatInstructions}',
				JSON.stringify(
					{
						riskAnalysis: 'string - Detailed risk analysis of the investment opportunity',
					},
					null,
					2
				)
			);

		const result = await analyzeWithGemini(finalPrompt, risksSchema);

		setAnalysisResult((prev) => ({
			...(prev || {}),
			riskAnalysis: result.risks,
		}));
	}, []);

	const getInvestmentSummary = React.useCallback(async (file: File) => {
		const base64 = await fileToBase64(file);
		const mimeType = file.type || 'application/pdf';

		const finalPrompt = investmentRecommendationPrompt
			.replace('{base64}', base64)
			.replace('{mimeType}', mimeType)
			.replace(
				'{formatInstructions}',
				JSON.stringify(
					{
						investmentSummary: 'InvestmentSummary - Comprehensive summary of the investment opportunity',
					},
					null,
					2
				)
			);

		const result = await analyzeWithGemini(finalPrompt, investmentSummarySchema);

		setAnalysisResult((prev) => ({
			...(prev || {}),
			investmentSummary: result as InvestmentSummary,
		}));
	}, []);

	const contextValue = React.useMemo(
		() => ({
			overallScore,
			analysisResult,
			setAnalysisResult,
			getInvestmentRecommendation,
			getGeneralParameters,
			getEvaluationScores,
			getKeyInsights,
			getRiskAnalysis,
			getInvestmentSummary,
		}),
		[analysisResult, overallScore]
	);

	return <AnalysisResultContext.Provider value={contextValue}>{children}</AnalysisResultContext.Provider>;
};

export const useAnalysisResult = () => {
	const context = useContext(AnalysisResultContext);
	if (!context) throw new Error('useAnalysisResult must be used within AnalysisResultProvider');
	return context;
};
