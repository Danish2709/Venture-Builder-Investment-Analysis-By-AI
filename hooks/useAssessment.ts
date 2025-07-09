"use client"

import { useState, useMemo } from "react"
import { CheckCircle2, XCircle, ArrowRight, AlertTriangle } from "lucide-react"
import type { AssessmentMode, InvestmentStage, ScoreData, TotalScore, Recommendation } from "../types/assessment"
import { createDirectInvestmentFramework, VENTURE_BUILD_FRAMEWORK } from "../data/frameworks"
import { DIRECT_INVESTMENT_RISK_FRAMEWORK, VENTURE_BUILD_RISK_FRAMEWORK } from "../data/riskFrameworks"
import { calculateCategoryScore } from "../utils/scoreCalculations"

export const useAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [assessmentMode, setAssessmentMode] = useState<AssessmentMode>("direct-investment")
  const [stage, setStage] = useState<InvestmentStage>("seed")
  const [scores, setScores] = useState<ScoreData>({})
  const [riskScores, setRiskScores] = useState<ScoreData>({})
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)

  // Get current frameworks
  const currentFramework = useMemo(() => {
    return assessmentMode === "direct-investment"
      ? createDirectInvestmentFramework(stage)
      : VENTURE_BUILD_FRAMEWORK
  }, [assessmentMode, stage])

  const currentRiskFramework = useMemo(() => {
    return assessmentMode === "direct-investment"
      ? DIRECT_INVESTMENT_RISK_FRAMEWORK
      : VENTURE_BUILD_RISK_FRAMEWORK
  }, [assessmentMode])

  const allCategories = useMemo(() => {
    return Object.entries(currentFramework)
  }, [currentFramework])

  // Calculate total score
  const totalScore: TotalScore = useMemo(() => {
    let totalWeighted = 0
    let totalCompletion = 0
    let categoryCount = 0

    // Calculate main framework scores
    Object.entries(currentFramework).forEach(([category, categoryData]) => {
      const { weighted, completion } = calculateCategoryScore(category, categoryData, scores)
      totalWeighted += weighted * 20
      totalCompletion += completion
      categoryCount++
    })

    // Calculate risk scores (inverted)
    let riskWeighted = 0
    let riskCompletion = 0
    let riskCategoryCount = 0

    Object.entries(currentRiskFramework).forEach(([category, categoryData]) => {
      const { average, completion } = calculateCategoryScore(category, categoryData, riskScores)
      const weight = categoryData.weight
      const invertedAverage = average > 0 ? 6 - average : 0
      riskWeighted += ((invertedAverage * weight) / 100) * 8
      riskCompletion += completion
      riskCategoryCount++
    })

    const avgRiskCompletion = riskCategoryCount > 0 ? riskCompletion / riskCategoryCount : 0
    totalCompletion = (totalCompletion + avgRiskCompletion) / (categoryCount > 0 ? 2 : 1)

    const finalScore = Math.max(0, Math.min(100, totalWeighted - riskWeighted))

    return {
      score: finalScore,
      completion: totalCompletion,
      riskImpact: riskWeighted,
    }
  }, [currentFramework, currentRiskFramework, scores, riskScores])

  // Get decision recommendation
  const recommendation: Recommendation = useMemo(() => {
    const { score, riskImpact } = totalScore
    const thresholds = assessmentMode === "direct-investment" ? { exceptional: 80, promising: 60 } : { exceptional: 85, promising: 70 }

    // Check for critical risk
    const criticalRiskCategory = currentRiskFramework["Critical Risk"]
    if (criticalRiskCategory) {
      const criticalRiskScore = calculateCategoryScore("Critical Risk", criticalRiskCategory, riskScores)
      const hasCriticalRisk = criticalRiskScore.average > 0 && criticalRiskScore.average <= 2.5

      if (hasCriticalRisk) {
        return {
          decision: "AUTO-REJECT",
          color: "text-red-600",
          bgColor: "bg-red-50",
          icon: XCircle,
          message: "Critical risk factors detected. Auto-reject recommended.",
        }
      }
    }

    if (riskImpact > 25) {
      return {
        decision: "PARTNER REVIEW",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        icon: AlertTriangle,
        message: `High risk impact detected (-${riskImpact.toFixed(1)} points). Partner review required.`,
      }
    }

    if (score >= thresholds.exceptional) {
      return {
        decision: assessmentMode === "venture-build" ? "BUILD" : "INVEST",
        color: "text-green-600",
        bgColor: "bg-green-50",
        icon: CheckCircle2,
        message: "Exceptional opportunity. Proceed immediately.",
      }
    } else if (score >= thresholds.promising) {
      return {
        decision: "PROCEED",
        color: "text-teal-600",
        bgColor: "bg-teal-50",
        icon: ArrowRight,
        message: "Solid opportunity. Proceed with due diligence.",
      }
    } else {
      return {
        decision: "PASS",
        color: "text-red-600",
        bgColor: "bg-red-50",
        icon: XCircle,
        message: "Insufficient score. Does not meet criteria.",
      }
    }
  }, [totalScore, assessmentMode, currentRiskFramework, riskScores])

  // Update functions
  const updateAssessmentMode = (mode: AssessmentMode) => {
    setAssessmentMode(mode)
    setScores({})
    setRiskScores({})
    setCurrentCategoryIndex(0)
  }

  const updateStage = (newStage: InvestmentStage) => {
    setStage(newStage)
    setScores({})
    setRiskScores({})
    setCurrentCategoryIndex(0)
  }

  const updateScore = (category: string, criterion: string, value: number | null) => {
    const newScores = { ...scores }

    if (!newScores[category]) {
      newScores[category] = {}
    }

    if (value === null) {
      delete newScores[category][criterion]
      if (Object.keys(newScores[category]).length === 0) {
        delete newScores[category]
      }
    } else {
      newScores[category][criterion] = value
    }

    setScores(newScores)
  }
