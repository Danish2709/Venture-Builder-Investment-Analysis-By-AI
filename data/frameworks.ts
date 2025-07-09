import { Users, TrendingUp, Code, DollarSign, Target, Globe, Settings, Shield } from "lucide-react"
import type { Framework } from "../types/assessment"

export const createDirectInvestmentFramework = (stage: string): Framework => ({
  "Founder & Team Excellence": {
    weight: stage === "seed" ? 40 : 30,
    icon: Users,
    criteria: {
      "Founder Track Record & Domain Expertise": {
        description:
          "Previous exits, P&L ownership, fintech domain expertise, entrepreneurial resilience, LinkedIn verification",
        guide:
          "1: First-time founder, no relevant experience | 3: 1 exit or 5+ years domain experience | 5: Multiple exits, proven fintech success",
        details:
          "LINKEDIN VERIFICATION: Cross-reference all claims with LinkedIn profiles. Previous venture success increases odds from 22% to 34%. Verify successful exits (>$50M) or senior roles at fintech unicorns. P&L responsibility >$10M ARR. Technical founders: 10+ years engineering, led teams >20. Business founders: Top-tier consulting experience. RED FLAG: Claims not verifiable on LinkedIn/public records.",
      },
      "Founder-Market Fit & Authenticity": {
        description:
          "Personal experience with problem, 'hair-on-fire' validation, LinkedIn history alignment, thought leadership",
        guide:
          "1: No personal connection to problem | 3: Some domain exposure, clear communicator | 5: Lived the pain, established thought leader",
        details:
          "AUTHENTICITY CHECK: LinkedIn history must show founder personally experienced the problem. Look for career progression that led to this pain point. Analyze LinkedIn content for thought leadership depth. Communication must be jargon-free and compelling.",
      },
      "Team Composition & Network Strength": {
        description:
          "Founding team completeness, LinkedIn network analysis, customer access, investor relationships, talent pipeline",
        guide:
          "1: Solo founder, weak network | 3: 2-3 founders, moderate network | 5: Complete team, exceptional network access",
        details:
          "TEAM MAPPING: Use LinkedIn to verify key roles covered (tech, product, sales, finance). RED FLAG: No technical co-founder or outsourced core tech. NETWORK INTELLIGENCE: AI-powered analysis of LinkedIn connections to customers, strategic partners, investors.",
      },
      "Execution Velocity & Communication": {
        description:
          "Milestone delivery consistency, LinkedIn activity quality, professional presentation, attention to detail",
        guide:
          "1: Poor execution, unprofessional communication | 3: Adequate execution, clear communication | 5: Exceptional execution, thought leadership",
        details:
          "EXECUTION TRACK RECORD: 90%+ on-time milestone delivery. Weekly shipping cadence. MVP to market <6 months. LinkedIn content analysis for industry knowledge depth. Professional profile maintenance signals commitment.",
      },
    },
  },
  "Market Opportunity & Validation": {
    weight: stage === "seed" ? 35 : 25,
    icon: TrendingUp,
    criteria: {
      "Market Size & Growth Dynamics": {
        description: "TAM/SAM/SOM bottom-up validation, CAGR trajectory, Vision 2030 alignment, regulatory tailwinds",
        guide:
          "1: TAM <$500M, declining market | 3: TAM $1-5B, 15-25% CAGR | 5: TAM >$5B, >30% CAGR, regulatory support",
        details:
          "MARKET VALIDATION: Bottom-up TAM model required, not top-down estimates. SAM >$200M addressable in 3 years. Saudi fintech TAM growing 25%+ annually. Vision 2030 alignment = automatic +1 boost.",
      },
      "Problem Urgency & Timing": {
        description: "Pain point severity, convergence catalysts, behavioral shift momentum, 'why now' factors",
        guide:
          "1: Nice-to-have, no catalysts | 3: Clear pain, 1-2 drivers | 5: Hair-on-fire problem, 3+ convergent catalysts",
        details:
          "CONVERGENCE ANALYSIS: Minimum 3 'why now' factors required. Saudi catalysts: SAMA Open Banking (2024), 70% smartphone penetration, 67% under-35 population, $25B+ government digitization.",
      },
      "Customer Validation & Traction": {
        description:
          "Pilot customers, user engagement metrics, retention rates, product-market fit signals, LinkedIn growth signals",
        guide:
          "1: No customers, low engagement | 3: Some customers, moderate engagement | 5: Strong customer base, high engagement",
        details:
          "TRACTION SIGNALS: Day 30 retention >70%. 15%+ MoM user growth. NPS >70. LinkedIn headcount growth tracking (5 to 25 employees signals growth). Customer concentration: No single customer >20% revenue.",
      },
      "Competitive Positioning": {
        description:
          "Differentiation depth, competitive moat strength, customer acquisition efficiency, market positioning",
        guide:
          "1: Me-too product, high CAC | 3: Clear differentiation, moderate CAC | 5: Category defining, low CAC, viral growth",
        details:
          "MOAT REQUIREMENTS: 10x better on primary dimension. Network effects measurable (viral coefficient >0.7). Data moats: >1M transactions for ML advantage. CAC benchmarks: Consumer $50-150, SME $200-800, Enterprise $2K-10K.",
      },
    },
  },
  "Product & Technology": {
    weight: 15,
    icon: Code,
    criteria: {
      "Product Excellence & User Experience": {
        description:
          "UX quality, product-market fit signals, customer satisfaction, engagement depth, technical architecture",
        guide: "1: Basic MVP, poor UX | 3: Good product, decent UX | 5: Exceptional UX, strong PMF signals",
        details:
          "PRODUCT METRICS: NPS >70. Daily active users >20% of monthly. App store ratings >4.7/5. Session frequency >3x/week. Technical architecture: Microservices, cloud-native, enterprise security.",
      },
      "Innovation & IP Portfolio": {
        description:
          "Intellectual property strength, technical differentiation, innovation pipeline, competitive barriers",
        guide: "1: No IP, easily replicated | 3: Some patents, 12-month lead | 5: Strong IP portfolio, 3+ year moat",
        details:
          "IP STRATEGY: 5+ patent applications filed. Proprietary ML models. Technical moat with 18+ month lead. Trade secrets documented. Core technology developed in-house, not outsourced.",
      },
      "Regulatory Compliance & Security": {
        description:
          "Regulatory compliance readiness, security infrastructure, data protection, licensing status, audit preparedness",
        guide:
          "1: Non-compliant, major security gaps | 3: Basic compliance, adequate security | 5: Fully compliant, enterprise-grade security",
        details:
          "COMPLIANCE REQUIREMENTS: SAMA/CMA licensing status and roadmap. GDPR/data protection compliance. PCI DSS for payments. SOC 2 Type II certification. Cybersecurity framework implementation. Regular security audits and penetration testing. Incident response procedures documented.",
      },
    },
  },
  "Financial Performance & Metrics": {
    weight: stage === "seed" ? 10 : 30,
    icon: DollarSign,
    criteria: {
      "Revenue Growth & Quality": {
        description: "MRR growth trajectory, revenue quality, customer concentration, churn dynamics",
        guide: "1: <15% MoM growth, high churn | 3: 20-35% MoM, moderate churn | 5: >40% MoM growth, <3% churn",
        details:
          "GROWTH EXCELLENCE: >40% MoM MRR growth for 6+ months. ARR >$1M run rate. Net revenue retention >120%. No customer >20% of revenue. Churn <5% monthly (consumer), <3% (SME).",
      },
      "Unit Economics & Capital Efficiency": {
        description: "LTV/CAC ratios, payback periods, burn rate efficiency, path to profitability",
        guide:
          "1: Poor unit economics, high burn | 3: Decent economics, moderate burn | 5: Excellent economics, efficient burn",
        details:
          "UNIT ECONOMICS: LTV/CAC ratio >6:1. Payback period <8 months. Burn multiple <1.5. Contribution margin >70%. 80% of customers profitable by month 12.",
      },
      "Funding History & Cap Table": {
        description: "Previous rounds, valuation progression, investor quality, cap table structure",
        guide:
          "1: Down rounds, weak investors | 3: Flat rounds, decent investors | 5: Strong up rounds, tier-1 investors",
        details:
          "FUNDING EXCELLENCE: Valuation progression 3-5x per round. Tier-1 VCs with fintech/MENA expertise. Clean cap table <25 shareholders. Founder equity retention >20% post-Series A.",
      },
    },
  },
})

export const VENTURE_BUILD_FRAMEWORK: Framework = {
  "Strategic Fit & Opportunity": {
    weight: 30,
    icon: Target,
    criteria: {
      "Portfolio Synergy & Value Creation": {
        description:
          "Cross-selling opportunities, shared infrastructure leverage, brand enhancement, strategic partnerships",
        guide:
          "1: No synergies, potential brand risk | 3: Some synergies, neutral impact | 5: Strong synergies, significant value creation",
        details:
          "SYNERGY MAPPING: Cross-selling opportunities with 5+ portfolio companies. Shared customer base leverage. Technology platform reuse. Regulatory license sharing.",
      },
      "Market Timing & Competitive Advantage": {
        description: "Market entry timing, competitive landscape analysis, first-mover advantages, regulatory timing",
        guide:
          "1: Late to market, strong competition | 3: Good timing, moderate competition | 5: Perfect timing, clear advantage window",
        details:
          "TIMING ANALYSIS: 18-month window before major competitors enter. Regulatory timing alignment (SAMA Open Banking 2024). Market readiness indicators: 70% smartphone penetration.",
      },
      "Revenue & Profitability Potential": {
        description: "Revenue projections, margin potential, scalability assessment, ROI timeline",
        guide:
          "1: Unclear revenue model, low margins | 3: Decent model, moderate margins | 5: Exceptional model, high margins",
        details:
          "FINANCIAL PROJECTIONS: 5-10x ROI within 5 years. Risk-adjusted NPV >$50M at 15% discount rate. Target 85%+ gross margins. Path to $50M+ ARR within 3 years.",
      },
      "Regulatory & Compliance Alignment": {
        description: "Licensing requirements, regulatory relationships, compliance readiness, sandbox participation",
        guide:
          "1: Complex regulatory path, no relationships | 3: Clear path, some relationships | 5: Streamlined path, strong relationships",
        details:
          "REGULATORY ADVANTAGE: Existing SAMA/CMA relationships. Current licenses applicable or easily extendable. Regulatory sandbox participation capability.",
      },
    },
  },
  "Internal Capability & Resources": {
    weight: 35,
    icon: Settings,
    criteria: {
      "Technical Capability & Infrastructure": {
        description:
          "In-house expertise depth, technology stack alignment, development capacity, infrastructure readiness",
        guide:
          "1: Need to hire 80%+ team, major gaps | 3: Have 60% capabilities, 6mo ramp | 5: 90%+ in-house, immediate execution",
        details:
          "CAPABILITY AUDIT: Current team skills matrix vs required stack. Fintech expertise: Payments processing, blockchain, ML/AI, cybersecurity, mobile development.",
      },
      "Resource Allocation & Investment": {
        description: "Capital requirements, team allocation, opportunity cost analysis, resource reallocation impact",
        guide: "1: >$3M investment, >24mo timeline | 3: $1-2M investment, 12-18mo | 5: <$1M investment, <9mo execution",
        details:
          "RESOURCE ANALYSIS: Total investment including opportunity cost. Team allocation: 15-25 FTEs for 12-18 months. Capital requirements: Development $500K-1.5M.",
      },
      "Execution Track Record & Leadership": {
        description:
          "Previous venture build success, leadership bandwidth, project management capability, risk mitigation",
        guide:
          "1: No venture build experience, limited bandwidth | 3: Some experience, adequate bandwidth | 5: Proven track record, strong leadership",
        details:
          "EXECUTION CAPABILITY: Track record of 3+ successful venture builds with >$100M exits. Proven team with clear milestones and risk mitigation plans.",
      },
      "Talent & Hiring Capability": {
        description: "Access to key talent, hiring pipeline, retention capability, team scaling ability",
        guide:
          "1: Limited talent access, poor retention | 3: Moderate access, decent retention | 5: Exceptional access, high retention",
        details:
          "TALENT STRATEGY: Access to fintech talent pipeline. Existing relationships with key hires. Retention rate >90% for critical roles.",
      },
    },
  },
  "Market & Business Model": {
    weight: 25,
    icon: Globe,
    criteria: {
      "Market Opportunity & Sizing": {
        description: "TAM analysis for internal build, market entry strategy, customer acquisition plan",
        guide:
          "1: Small market, unclear entry | 3: Decent market, basic strategy | 5: Large market, clear entry strategy",
        details:
          "MARKET ENTRY: TAM >$5B with clear entry strategy. Customer acquisition plan leveraging existing relationships.",
      },
      "Business Model Innovation": {
        description: "Revenue model design, monetization strategy, pricing power, scalability assessment",
        guide:
          "1: Basic model, limited scalability | 3: Good model, moderate scalability | 5: Innovative model, high scalability",
        details:
          "BUSINESS MODEL: Multiple monetization streams designed from start. Pricing power through differentiation. Network effects built into model.",
      },
      "Customer Validation & Pre-commitments": {
        description: "Customer discovery completion, pre-launch commitments, pilot program readiness",
        guide:
          "1: No customer validation, no commitments | 3: Some validation, few commitments | 5: Strong validation, multiple commitments",
        details:
          "CUSTOMER VALIDATION: Customer discovery with 100+ potential users. Pre-launch commitments from 10+ enterprise customers.",
      },
    },
  },
  "Risk & Success Probability": {
    weight: 10,
    icon: Shield,
    criteria: {
      "Execution Risk Assessment": {
        description: "Technical risk, market risk, competitive risk, regulatory risk evaluation",
        guide: "1: High risk across multiple areas | 3: Moderate risk, manageable | 5: Low risk, high probability",
        details:
          "RISK MITIGATION: Technical risk minimal with proven technology stack. Market risk low with validated demand.",
      },
      "Success Probability & Metrics": {
        description: "Overall success probability, key success metrics, milestone tracking, exit potential",
        guide: "1: <30% success probability | 3: 50-70% success chance | 5: >80% success probability",
        details:
          "SUCCESS METRICS: >80% probability of achieving $50M+ valuation within 3 years. Clear milestone tracking with monthly reviews.",
      },
    },
  },
}
