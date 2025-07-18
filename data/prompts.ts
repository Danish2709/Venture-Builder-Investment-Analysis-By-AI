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

export const generalParametersPrompt = `
You're an expert venture capital analyst reviewing a startup's pitch deck.

Your task is to extract the following **key financial and strategic data points** from the document. These are used to evaluate the business health and investment potential of the startup.

Document Format: {mimeType}
Base64 Content: {base64}

Extract the following fields:
- companyName: Full legal or brand name of the company
- ticket: The investment ticket size being sought or recommended
- confidence: Analyst's confidence score or qualitative measure
- companyDescription: A concise description of the company's mission, offering, or purpose
- companyIndustryType: Industry or sector (e.g., Fintech, HealthTech, SaaS)
- companyLocation: Headquarters or primary location of the company
- arr: Annual Recurring Revenue
- revenueGrowth: Percentage or statement of recent revenue growth
- burnRate: Current monthly cash burn
- ltvCac: Lifetime Value to Customer Acquisition Cost ratio

Respond ONLY in JSON format matching this exact structure:
{formatInstructions}
`;

export const evaluationScoresPrompt = `
You're a seasoned venture capital analyst reviewing a startup's pitch deck.

Your task is to **evaluate** the company across key dimensions by analyzing the deck and assigning each a **score from 0 to 100** (where 100 is the best possible score).

Focus on the following six categories:

- teamComposition: Evaluate the strength, experience, and complementarity of the founding and leadership team.
- marketIntelligence: Assess how well the company understands its market size, competitors, and customer segments.
- productDevelopment: Judge the maturity and innovation of the product or service, including roadmap.
- financialData: Evaluate the clarity and strength of financials (ARR, burn rate, revenue growth, etc.).
- legalCompliance: Consider presence of legal risks, IP protections, and regulatory preparedness.
- companyOps: Score the company's operational capabilities and scaling readiness.

Document Format: {mimeType}
Base64 Content: {base64}

Respond ONLY in JSON format matching this structure:
{formatInstructions}
`;

export const keyInsightsPrompt = `
You're a senior venture capital analyst reviewing a startup's pitch deck.

Your task is to extract **key strategic insights** that would impact investment decisions. These insights should be categorized as either **"strength"** or **"opportunity"**, and must include a clear **title**, a concise but impactful **description**, and an **impact level** of either "high", "medium", or "low".

Focus on themes such as:
- Competitive advantage
- Market positioning
- Regulatory compliance
- Scalability
- Product differentiation
- Growth potential
- Emerging trends
- Vision alignment

Document Format: {mimeType}  
Base64 Content: {base64}

Respond ONLY in JSON format matching this structure:

{formatInstructions}
`;

export const investmentRisksPrompt = `
You're a senior venture capital analyst reviewing a startup's pitch deck.

Your task is to extract **key investment risks** associated with the startup. For each risk, include the **category**, a **short title**, a **clear description**, the **severity level**, and the **mitigation strategy** being employed (if any).

Focus on common risk types:
- Market risk
- Financial risk
- Competitive risk
- Execution/operational risk
- Regulatory/legal risk

Each risk must follow this structure:
- category: One of "market", "financial", "competitive", "execution", or "regulatory"
- title: A short heading summarizing the risk
- description: A concise explanation of the risk
- severity: One of "low", "medium", or "high"
- mitigation: The action(s) being taken to reduce or address the risk

Document Format: {mimeType}  
Base64 Content: {base64}

Respond ONLY in JSON format matching this structure:

{formatInstructions}
`;

export const investmentSummaryPdfPrompt = `
You are an expert venture capital analyst. Your task is to generate a comprehensive and professional PDF report that summarizes the investment opportunity based on the provided data.

The PDF should include the following sections, each clearly titled and well-formatted:

1. **Executive Summary**
   - A concise overview of the investment opportunity, company, and key highlights.

2. **Company Overview**
   - Name, location, industry, and a brief description of the company’s mission and offering.

3. **Investment Details**
   - Investment type/stage, ticket size, and analyst confidence level.

4. **Key Financials**
   - Annual Recurring Revenue (ARR), revenue growth, burn rate, LTV/CAC ratio, and other relevant financial metrics.

5. **Strategic Insights**
   - List of key strengths and opportunities, each with a title, description, and impact level.

6. **Evaluation Scores**
   - Table or list of scores (0–100) for team composition, market intelligence, product development, financial data, legal compliance, and company operations.

7. **Investment Risks**
   - Table or list of risks, each with category, title, description, severity, and mitigation strategy.

8. **Recommendations**
   - Actionable recommendations or next steps for investors.

**Formatting Instructions:**
- Use clear section headings.
- Use bullet points, tables, or bold text where appropriate for readability.
- Ensure the report is suitable for sharing with investors and stakeholders.

Document Format: PDF

Respond ONLY in JSON format matching this structure:

{
  "executiveSummary": "string",
  "companyOverview": {
    "name": "string",
    "location": "string",
    "industry": "string",
    "description": "string"
  },
  "investmentDetails": {
    "type": "string",
    "ticket": "string",
    "confidence": "string"
  },
  "keyFinancials": {
    "arr": "string",
    "revenueGrowth": "string",
    "burnRate": "string",
    "ltvCac": "string"
  },
  "strategicInsights": [
    {
      "category": "strength | opportunity",
      "title": "string",
      "description": "string",
      "impactLevel": "high | medium | low"
    }
  ],
  "evaluationScores": {
    "teamComposition": "number",
    "marketIntelligence": "number",
    "productDevelopment": "number",
    "financialData": "number",
    "legalCompliance": "number",
    "companyOps": "number"
  },
  "investmentRisks": [
    {
      "category": "market | financial | competitive | execution | regulatory",
      "title": "string",
      "description": "string",
      "severity": "low | medium | high",
      "mitigation": "string"
    }
  ],
  "recommendations": [
    "string"
  ]
}
`;
