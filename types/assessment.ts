export type AssessmentMode = "direct-investment" | "venture-build"
export type InvestmentStage = "seed" | "seriesA"

export interface ScoreData {
  [category: string]: {
    [criterion: string]: number
  }
}

export interface CategoryData {
  weight: number
  icon: any
  criteria: {
    [key: string]: {
      description: string
      guide: string
      details: string
      factors?: string[]
    }
  }
}

export interface Framework {
  [category: string]: CategoryData
}

export interface TotalScore {
  score: number
  completion: number
  riskImpact: number
}

export interface Recommendation {
  decision: string
  color: string
  bgColor: string
  icon: any
  message: string
}
