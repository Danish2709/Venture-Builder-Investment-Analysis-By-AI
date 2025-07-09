import type { ScoreData, CategoryData, TotalScore, Framework } from "@/types/assessment"

/**
 * Calculates the score for a specific category
 * @param category - The category name
 * @param categoryData - The category configuration data
 * @param scoreData - The current scores data
 * @returns CategoryScore object with average, weighted, and completion scores
 */
export const calculateCategoryScore = (category: string, categoryData: CategoryData, scoreData: ScoreData) => {
  const categoryScores = scoreData[category] || {}
  const criteria = categoryData.criteria
  const criteriaCount = Object.keys(criteria).length
  const scoredCount = Object.keys(categoryScores).length

  if (criteriaCount === 0) {
    return { average: 0, weighted: 0, completion: 0 }
  }

  const sum = Object.values(categoryScores).reduce((acc: number, score: number) => acc + (score || 0), 0)
  const average = scoredCount > 0 ? sum / criteriaCount : 0
  const weighted = (average * categoryData.weight) / 100
  const completion = (scoredCount / criteriaCount) * 100

  return { average, weighted, completion }
}

/**
 * Calculates the total assessment score including risk impact
 * @param framework - The main assessment framework
 * @param riskFramework - The risk assessment framework
 * @param scores - The main scores data
 * @param riskScores - The risk scores data
 * @returns TotalScore object with final score, completion, and risk impact
 */
export const calculateTotalScore = (
  framework: Framework,
  riskFramework: Framework,
  scores: ScoreData,
  riskScores: ScoreData,
): TotalScore => {
  try {
    let totalWeighted = 0
    let totalCompletion = 0
    let categoryCount = 0

    // Calculate main framework scores
    Object.entries(framework).forEach(([category, categoryData]) => {
      const { weighted, completion } = calculateCategoryScore(category, categoryData, scores)
      totalWeighted += weighted * 20
      totalCompletion += completion
      categoryCount++
    })

    // Calculate risk scores (inverted - higher risk score means lower overall score)
    let riskWeighted = 0
    let riskCompletion = 0
    let riskCategoryCount = 0

    Object.entries(riskFramework).forEach(([category, categoryData]) => {
      const { average, completion } = calculateCategoryScore(category, categoryData, riskScores)
      const weight = categoryData.weight
      // Invert risk score: 5 becomes 1, 4 becomes 2, etc.
      const invertedAverage = average > 0 ? 6 - average : 0
      riskWeighted += ((invertedAverage * weight) / 100) * 8
      riskCompletion += completion
      riskCategoryCount++
    })

    const avgRiskCompletion = riskCategoryCount > 0 ? riskCompletion / riskCategoryCount : 0
    totalCompletion = (totalCompletion + avgRiskCompletion) / (categoryCount > 0 ? 2 : 1)

    // Subtract risk impact from total score
    const finalScore = Math.max(0, Math.min(100, totalWeighted - riskWeighted))

    return {
      score: finalScore,
      completion: totalCompletion,
      riskImpact: riskWeighted,
    }
  } catch (error) {
    console.error("Error calculating total score:", error)
    return { score: 0, completion: 0, riskImpact: 0 }
  }
}

/**
 * Updates a score value for a specific category and criterion
 * @param scores - Current scores state
 * @param category - Category name
 * @param criterion - Criterion name
 * @param value - New score value (string)
 * @returns Updated scores object
 */
export const updateScoreValue = (scores: ScoreData, category: string, criterion: string, value: string): ScoreData => {
  const numericValue = value === "" || value === "0" ? null : Number.parseInt(value, 10)
  const newScores = { ...scores }

  if (!newScores[category]) {
    newScores[category] = {}
  }

  if (numericValue === null) {
    delete newScores[category][criterion]
    if (Object.keys(newScores[category]).length === 0) {
      delete newScores[category]
    }
  } else {
    newScores[category][criterion] = numericValue
  }

  return newScores
}
