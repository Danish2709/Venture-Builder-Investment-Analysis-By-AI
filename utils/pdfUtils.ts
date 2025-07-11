import jsPDF from 'jspdf';

export function createInvestmentSummaryPdf(summary: any): jsPDF {
	const doc = new jsPDF();
	let y = 15;
	const pageHeight = 297; // A4 page height in mm
	const margin = 15;
	const maxWidth = 180;
	const lineHeight = 6;

	const addTextBlock = (text: string, x: number, yStart: number, fontSize = 11) => {
		doc.setFontSize(fontSize);
		const lines = doc.splitTextToSize(text, maxWidth);
		lines.forEach((line: string) => {
			if (y >= pageHeight - margin) {
				doc.addPage();
				y = margin;
			}
			doc.text(line, x, y);
			y += lineHeight;
		});
		return y;
	};

	// Title
	doc.setFontSize(20);
	doc.text('Investment Summary Report', 105, y, { align: 'center' });
	y += 10;
	doc.setLineWidth(0.5);
	doc.line(margin, y, 195, y);
	y += 8;

	// Executive Summary
	doc.setFontSize(14);
	doc.text('Executive Summary', margin, y);
	y += 7;
	y = addTextBlock(summary.executiveSummary, margin, y);
	y += 2;
	doc.line(margin, y, 195, y);
	y += 8;

	// Company Overview
	doc.setFontSize(14);
	doc.text('Company Overview', margin, y);
	y += 7;
	y = addTextBlock(`Name: ${summary.companyOverview.name}`, margin, y);
	y = addTextBlock(`Location: ${summary.companyOverview.location}`, margin, y);
	y = addTextBlock(`Industry: ${summary.companyOverview.industry}`, margin, y);
	y = addTextBlock('Description:', margin, y);
	y = addTextBlock(summary.companyOverview.description, margin + 5, y);
	y += 2;
	doc.line(margin, y, 195, y);
	y += 8;

	// Investment Details
	doc.setFontSize(14);
	doc.text('Investment Details', margin, y);
	y += 7;
	y = addTextBlock(`Type: ${summary.investmentDetails.type}`, margin, y);
	y = addTextBlock(`Ticket: ${summary.investmentDetails.ticket}`, margin, y);
	y = addTextBlock(`Confidence: ${summary.investmentDetails.confidence}`, margin, y);
	y += 2;
	doc.line(margin, y, 195, y);
	y += 8;

	// Key Financials
	doc.setFontSize(14);
	doc.text('Key Financials', margin, y);
	y += 7;
	y = addTextBlock(`ARR: ${summary.keyFinancials.arr}`, margin, y);
	y = addTextBlock(`Revenue Growth: ${summary.keyFinancials.revenueGrowth}`, margin, y);
	y = addTextBlock(`Burn Rate: ${summary.keyFinancials.burnRate}`, margin, y);
	y = addTextBlock(`LTV/CAC: ${summary.keyFinancials.ltvCac}`, margin, y);
	y += 2;
	doc.line(margin, y, 195, y);
	y += 8;

	// Strategic Insights
	doc.setFontSize(14);
	doc.text('Strategic Insights', margin, y);
	y += 7;
	doc.setFontSize(11);
	summary.strategicInsights.forEach((insight: any) => {
		y = addTextBlock(
			`• [${insight.category.toUpperCase()}] ${insight.title} (${insight.impactLevel} impact)`,
			margin,
			y
		);
		y = addTextBlock(insight.description, margin + 5, y);
		y += 1;
	});
	doc.line(margin, y, 195, y);
	y += 8;

	// Evaluation Scores
	doc.setFontSize(14);
	doc.text('Evaluation Scores', margin, y);
	y += 7;
	doc.setFontSize(11);
	const evalScores = summary.evaluationScores;
	y = addTextBlock(
		`Team: ${evalScores.teamComposition}   Market: ${evalScores.marketIntelligence}   Product: ${evalScores.productDevelopment}`,
		margin,
		y
	);
	y = addTextBlock(
		`Financial: ${evalScores.financialData}   Legal: ${evalScores.legalCompliance}   Ops: ${evalScores.companyOps}`,
		margin,
		y
	);
	y += 2;
	doc.line(margin, y, 195, y);
	y += 8;

	// Investment Risks
	doc.setFontSize(14);
	doc.text('Investment Risks', margin, y);
	y += 7;
	doc.setFontSize(11);
	summary.investmentRisks.forEach((risk: any) => {
		y = addTextBlock(`• [${risk.category.toUpperCase()}] ${risk.title} (${risk.severity} risk)`, margin, y);
		y = addTextBlock(risk.description, margin + 5, y);
		y = addTextBlock(`Mitigation: ${risk.mitigation}`, margin + 5, y);
		y += 1;
	});
	doc.line(margin, y, 195, y);
	y += 8;

	// Recommendations
	doc.setFontSize(14);
	doc.text('Recommendations', margin, y);
	y += 7;
	doc.setFontSize(11);
	summary.recommendations.forEach((rec: string) => {
		y = addTextBlock(`• ${rec}`, margin, y);
	});
	return doc;
}
