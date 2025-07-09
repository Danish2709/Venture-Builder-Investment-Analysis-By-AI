import type { DecisionRecommendation, TotalScore, AssessmentMode, Framework } from "@/types/assessment"
import { DECISION_THRESHOLDS, RISK_IMPACT_THRESHOLD, ICONS } from "@/constants/assessment"
import { calculateCategoryScore } from "./scoreCalculations"

/**
 * Generates a decision recommendation based on the assessment score and risk factors
 * @param totalScore - The calculated total score
 * @param assessmentMode - The current assessment mode
 * @param riskFramework - The risk assessment framework
 * @param riskScores - The risk scores data
 * @returns DecisionRecommendation object
 */
export const getDecisionRecommendation = (
  totalScore: TotalScore,
  assessmentMode: AssessmentMode,
  riskFramework: Framework,
  riskScores: any,
): DecisionRecommendation => {
  const { score, riskImpact } = totalScore

  // Check for critical risk factors that would trigger auto-reject
  const criticalRiskCategory = riskFramework["Critical Risk"]
  if (criticalRiskCategory) {
    const criticalRiskScore = calculateCategoryScore("Critical Risk", criticalRiskCategory, riskScores)
    const hasCriticalRisk = criticalRiskScore.average > 0 && criticalRiskScore.average <= 2.5

    if (hasCriticalRisk) {
      return {
        decision: "AUTO-REJECT",
        color: "text-red-600",
        bgColor: "bg-red-50",
        icon: ICONS.XCircle,
        message: "Critical risk factors detected. Auto-reject recommended.",
      }
    }
  }

  // High risk impact threshold
  if (riskImpact > RISK_IMPACT_THRESHOLD) {
    return {
      decision: "PARTNER REVIEW",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      icon: ICONS.AlertTriangle,
      message: `High risk impact detected (-${riskImpact.toFixed(1)} points). Partner review required.`,
    }
  }

  const thresholds = DECISION_THRESHOLDS[assessmentMode]

  if (score >= thresholds.exceptional) {
    return {
      decision: assessmentMode === "venture-build" ? "BUILD" : "INVEST",
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: ICONS.CheckCircle2,
      message: "Exceptional opportunity. Proceed immediately.",
    }
  } else if (score >= thresholds.promising) {
    return {
      decision: "PROCEED",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      icon: ICONS.ArrowRight,
      message: "Solid opportunity. Proceed with due diligence.",
    }
  } else {
    return {
      decision: "PASS",
      color: "text-red-600",
      bgColor: "bg-red-50",
      icon: ICONS.XCircle,
      message: "Insufficient score. Does not meet criteria.",
    }
  }
}

/**
 * Determines the risk level based on average score
 * @param average - The average risk score
 * @returns Object with risk level and color
 */
export const getRiskLevel = (average: number) => {
  if (average >= 4) {
    return { riskLevel: "Low", riskColor: "text-green-600" }
  } else if (average >= 3) {
    return { riskLevel: "Medium", riskColor: "text-yellow-600" }
  } else if (average >= 2) {
    return { riskLevel: "High", riskColor: "text-orange-600" }
  } else {
    return { riskLevel: "Critical", riskColor: "text-red-600" }
  }
}
