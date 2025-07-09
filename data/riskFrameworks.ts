import { AlertTriangle, XCircle, Circle, CheckCircle2 } from "lucide-react"
import type { Framework } from "../types/assessment"

export const DIRECT_INVESTMENT_RISK_FRAMEWORK: Framework = {
  "Critical Risk": {
    weight: 40,
    icon: AlertTriangle,
    criteria: {
      "Founding Team & Integrity": {
        description: "Claims verification, experience alignment, commitment",
        guide: "1: Misaligned, unverified | 3: Some alignment, minor issues | 5: Fully aligned, verified",
        details: "Team integrity and verification assessment",
        factors: [
          "Claims not verifiable on LinkedIn or public records",
          "Contradictions between LinkedIn profile and pitch materials",
          "Exaggerated team experience or past achievements",
          "Evasive answers during due diligence process",
          "History of misleading statements to previous investors",
          "Unwillingness to provide references from former colleagues",
        ],
      },
      "Financial & Regulatory Compliance": {
        description: "Financial accuracy, regulatory compliance, licensing status, audit transparency",
        guide: "1: Major irregularities, unlicensed | 3: Minor discrepancies | 5: Clean financials, fully compliant",
        details: "Financial and regulatory compliance assessment",
        factors: [
          "Operating without required SAMA/CMA licenses",
          "Financial statements that don't reconcile",
          "No clear regulatory roadmap or compliance strategy",
          "Refusal to share complete financial information",
          "Unexplained debts or accounting irregularities",
          "Previous regulatory violations or sanctions",
        ],
      },
      "Capital Efficiency & Runway": {
        description: "Burn rate vs. revenue, runway, capital raised vs. milestones",
        guide: "1: High burn, short runway | 3: Moderate burn, decent runway | 5: Efficient burn, long runway",
        details: "Capital efficiency and runway assessment",
        factors: [
          "High burn rate with limited revenue generation",
          "Short runway (less than 12 months) post-raise",
          "Inefficient use of previous funding rounds",
          "Unclear path to profitability",
        ],
      },
    },
  },
  "High Risk": {
    weight: 30,
    icon: XCircle,
    criteria: {
      "Team Instability & Composition": {
        description: "Team turnover via LinkedIn analysis, founder disputes, critical role gaps",
        guide: "1: High turnover, active disputes | 3: Some instability | 5: Stable team, low turnover",
        details: "Team stability and composition assessment",
        factors: [
          "High employee turnover (>30% annually) visible on LinkedIn",
          "Frequent co-founder departures within 12 months",
          "Missing critical roles (no CTO for tech startup)",
          "Founder disputes or legal conflicts over equity",
          "Core technology development fully outsourced",
          "Misaligned founder goals or vision statements",
        ],
      },
      "Market & Product Validation": {
        description: "Product claims accuracy, market traction verification, customer feedback",
        guide: "1: False claims, no validation | 3: Exaggerated claims | 5: Accurate claims, strong validation",
        details: "Market and product validation assessment",
        factors: [
          "No working MVP after 12+ months (vaporware)",
          "Product claims not supported by user feedback",
          "No market traction or pilot customers",
          "Negative customer reviews or public sentiment",
          "Critical security/compliance features neglected",
          "Heavy competition with no clear differentiation",
        ],
      },
      "Business Model Viability": {
        description: "Revenue model, pricing, scalability",
        guide: "1: Unclear, unsustainable | 3: Basic, limited scalability | 5: Clear, highly scalable",
        details: "Business model viability assessment",
        factors: [
          "Unproven business model with 'monetize later' approach",
          "Poor unit economics (LTV/CAC < 2) with no improvement path",
          "Non-scalable operations with critical bottlenecks",
          "Over-reliance on continuous funding without progress",
          "Customer concentration risk (>20% single customer)",
        ],
      },
    },
  },
  "Medium Risk": {
    weight: 20,
    icon: Circle,
    criteria: {
      "Market Timing & Competition": {
        description: "Market entry timing, competitive landscape, first-mover advantages, regulatory timing",
        guide: "1: Poor timing, strong competition | 3: Decent timing | 5: Perfect timing, clear advantage",
        details: "Market timing and competition assessment",
        factors: [
          "Market not ready for solution (too early)",
          "Strong competitors already established",
          "Regulatory environment unfavorable or uncertain",
          "Customer adoption patterns not favorable",
          "Economic conditions not supportive",
          "Technology maturity insufficient for execution",
        ],
      },
    },
  },
  "Low Risk": {
    weight: 10,
    icon: CheckCircle2,
    criteria: {
      "Governance & Communication": {
        description: "Cap table health, founder maturity, communication quality, professionalism",
        guide: "1: Poor governance, immature | 3: Adequate structure | 5: Excellent governance, mature",
        details: "Governance and communication assessment",
        factors: [
          "Broken cap table with over-diluted founders (<20% equity)",
          "Founder lacks self-awareness or not coachable",
          "Unwieldy number of shareholders (>25 investors)",
          "Poor communication or unprofessional presentation",
          "Jargon-laden or unclear company descriptions",
          "Poorly maintained LinkedIn profiles",
        ],
      },
    },
  },
}

export const VENTURE_BUILD_RISK_FRAMEWORK: Framework = {
  "Critical Risk": {
    weight: 40,
    icon: AlertTriangle,
    criteria: {
      "Resource & Capability Gaps": {
        description: "Critical capability gaps, resource constraints, execution capacity limitations",
        guide:
          "1: Major gaps, insufficient resources | 3: Some gaps, adequate resources | 5: Complete capabilities, ample resources",
        details: "Resource and capability gap assessment",
        factors: [
          "Missing 50%+ of required technical capabilities",
          "Insufficient development team capacity (<10 engineers)",
          "No fintech domain expertise in leadership team",
          "Critical infrastructure components not available",
          "Regulatory compliance capabilities completely absent",
          "No proven track record of venture building",
        ],
      },
      "Strategic Misalignment": {
        description: "Portfolio fit, strategic conflicts, brand risks, competitive conflicts",
        guide: "1: Major misalignment, conflicts | 3: Some misalignment | 5: Perfect alignment, strong synergies",
        details: "Strategic alignment assessment",
        factors: [
          "Direct competition with existing portfolio companies",
          "Brand risk or reputation conflicts",
          "No synergies with existing business lines",
          "Regulatory conflicts with current operations",
          "Customer base conflicts or cannibalization risk",
          "Management attention conflicts with core business",
        ],
      },
    },
  },
  "High Risk": {
    weight: 30,
    icon: XCircle,
    criteria: {
      "Market & Timing Risk": {
        description: "Market timing, competitive landscape, regulatory timing, customer readiness",
        guide: "1: Poor timing, strong competition | 3: Decent timing | 5: Perfect timing, clear advantage",
        details: "Market and timing risk assessment",
        factors: [
          "Market not ready for solution (too early)",
          "Strong competitors already established",
          "Regulatory environment unfavorable or uncertain",
          "Customer adoption patterns not favorable",
        ],
      },
      "Execution & Leadership Risk": {
        description: "Leadership bandwidth, project management, execution track record",
        guide:
          "1: Limited bandwidth, poor track record | 3: Adequate capacity | 5: Strong leadership, proven execution",
        details: "Execution and leadership risk assessment",
        factors: [
          "Senior leadership bandwidth insufficient (<30% time)",
          "No dedicated project leadership assigned",
          "Poor track record of internal project execution",
          "Inadequate project management systems",
          "Key personnel retention risk during build phase",
          "Unclear success metrics or milestone definitions",
        ],
      },
    },
  },
  "Medium Risk": {
    weight: 20,
    icon: Circle,
    criteria: {
      "Financial & ROI Risk": {
        description: "Investment requirements, ROI projections, opportunity cost assessment",
        guide: "1: High investment, unclear ROI | 3: Moderate investment | 5: Low investment, clear ROI",
        details: "Financial and ROI risk assessment",
        factors: [
          "Investment requirements >$3M with unclear returns",
          "ROI projections unrealistic or unsubstantiated",
          "High opportunity cost from resource reallocation",
          "Long payback period (>36 months)",
          "Unclear path to profitability or exit",
          "Financial projections not stress-tested",
        ],
      },
    },
  },
  "Low Risk": {
    weight: 10,
    icon: CheckCircle2,
    criteria: {
      "Operational & Support Risk": {
        description: "Operational support, infrastructure readiness, vendor dependencies",
        guide: "1: Poor operational support | 3: Adequate support | 5: Excellent operational foundation",
        details: "Operational and support risk assessment",
        factors: [
          "Inadequate operational support systems",
          "High dependency on external vendors",
          "Infrastructure not scalable for growth",
          "Insufficient customer support capabilities",
          "Weak vendor management and partnerships",
          "Inadequate business continuity planning",
        ],
      },
    },
  },
}
