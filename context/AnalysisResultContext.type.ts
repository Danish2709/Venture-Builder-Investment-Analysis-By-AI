type CompanyFinancials = Partial<{
	arr: string;
	burnRate: string;
	ltvToCacRatio: string;
	revenueGrowth: string;
	ticket: string;
}>;

type CompanyInfo = Partial<{
	confidence: string;
	description: string;
	growthStage: string;
	industry: string;
	location: string;
	name: string;
	financials: CompanyFinancials;
}>;

interface EvaluationScores {
	teamComposition: number;
	marketIntelligence: number;
	productDevelopment: number;
	financialData: number;
	legalCompliance: number;
	companyOps: number;
}

interface KeyInsight {
	category: string;
	title: string;
	description: string;
	impact: string;
}

interface RiskAnalysis {
	category: string;
	title: string;
	description: string;
	severity: string;
	mitigation: string;
}

export type AnalysisResult = Partial<{
	keyRecommendations: string[];
	company: CompanyInfo;
	evaluationScores: EvaluationScores;
	keyInsights: KeyInsight[];
	riskAnalysis: RiskAnalysis[];
}>;

export interface AnalysisResultContextType {
	overallScore: number;
	analysisResult: AnalysisResult | null;
	setAnalysisResult: (result: AnalysisResult) => void;
	getInvestmentRecommendation: (file: File, selectedOption: string | null) => Promise<void>;
	getGeneralParameters: (file: File) => Promise<void>;
	getEvaluationScores: (file: File) => Promise<void>;
	getKeyInsights: (file: File) => Promise<void>;
	getRiskAnalysis: (file: File) => Promise<void>;
}
