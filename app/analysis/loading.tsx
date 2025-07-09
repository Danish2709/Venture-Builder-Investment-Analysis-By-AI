"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  FileText,
  Globe,
  Users,
  DollarSign,
  TrendingUp,
  Shield,
  CheckCircle,
  BarChart3,
  Target,
  Zap,
  Activity,
  Brain,
  Database,
  ChevronRight,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface AnalysisStep {
  id: string
  title: string
  description: string
  icon: any
  duration: number
  status: "pending" | "processing" | "completed"
}

interface AnalysisCategory {
  id: string
  title: string
  icon: any
  color: string
  progress: number
  status: "pending" | "processing" | "completed"
  steps: AnalysisStep[]
}

export default function AnalysisLoadingPage() {
  const router = useRouter()
  const [overallProgress, setOverallProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [categories, setCategories] = useState<AnalysisCategory[]>([
    {
      id: "data-collection",
      title: "Data Collection",
      icon: Database,
      color: "blue",
      progress: 0,
      status: "pending",
      steps: [
        {
          id: "web-scraping",
          title: "Web Data Extraction",
          description: "Analyzing company website and public information",
          icon: Globe,
          duration: 3,
          status: "pending",
        },
        {
          id: "financial-data",
          title: "Financial Data Gathering",
          description: "Collecting revenue, funding, and growth metrics",
          icon: DollarSign,
          duration: 4,
          status: "pending",
        },
        {
          id: "market-research",
          title: "Market Intelligence",
          description: "Researching industry trends and competitive landscape",
          icon: BarChart3,
          duration: 5,
          status: "pending",
        },
      ],
    },
    {
      id: "company-analysis",
      title: "Company Analysis",
      icon: Building2,
      color: "green",
      progress: 0,
      status: "pending",
      steps: [
        {
          id: "team-evaluation",
          title: "Team Assessment",
          description: "Evaluating founding team and key personnel",
          icon: Users,
          duration: 4,
          status: "pending",
        },
        {
          id: "product-analysis",
          title: "Product Evaluation",
          description: "Analyzing product-market fit and differentiation",
          icon: Zap,
          duration: 3,
          status: "pending",
        },
        {
          id: "business-model",
          title: "Business Model Review",
          description: "Assessing revenue streams and scalability",
          icon: Target,
          duration: 4,
          status: "pending",
        },
      ],
    },
    {
      id: "risk-assessment",
      title: "Risk Assessment",
      icon: Shield,
      color: "orange",
      progress: 0,
      status: "pending",
      steps: [
        {
          id: "market-risks",
          title: "Market Risk Analysis",
          description: "Identifying market and competitive threats",
          icon: TrendingUp,
          duration: 3,
          status: "pending",
        },
        {
          id: "operational-risks",
          title: "Operational Risk Review",
          description: "Evaluating execution and operational challenges",
          icon: Activity,
          duration: 4,
          status: "pending",
        },
        {
          id: "financial-risks",
          title: "Financial Risk Assessment",
          description: "Analyzing burn rate, runway, and funding needs",
          icon: DollarSign,
          duration: 3,
          status: "pending",
        },
      ],
    },
    {
      id: "ai-scoring",
      title: "AI Scoring",
      icon: Brain,
      color: "purple",
      progress: 0,
      status: "pending",
      steps: [
        {
          id: "data-processing",
          title: "Data Processing",
          description: "Processing collected data through AI models",
          icon: Database,
          duration: 2,
          status: "pending",
        },
        {
          id: "score-calculation",
          title: "Score Calculation",
          description: "Calculating investment scores across all dimensions",
          icon: BarChart3,
          duration: 3,
          status: "pending",
        },
        {
          id: "recommendation",
          title: "Recommendation Generation",
          description: "Generating final investment recommendation",
          icon: CheckCircle,
          duration: 2,
          status: "pending",
        },
      ],
    },
  ])

  const [dataStats, setDataStats] = useState({
    documentsProcessed: 0,
    dataPointsAnalyzed: 0,
    competitorsResearched: 0,
    marketInsights: 0,
  })

  const Header = () => (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div>
                <span className="text-xl font-semibold text-gray-900">Hikma Analytics</span>
                <div className="text-xs text-gray-500">AI-Powered Investment Analysis</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900">Analysis in Progress</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Analysis Progress</div>
              <div className="text-xs text-gray-500">{overallProgress}% Complete</div>
            </div>
            <div className="w-16 h-16 relative">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="35"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 35}`}
                  strokeDashoffset={`${2 * Math.PI * 35 * (1 - overallProgress / 100)}`}
                  className="text-blue-500 transition-all duration-500 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-900">{overallProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )

  // Simulation logic
  useEffect(() => {
    const totalDuration = 30000 // 30 seconds
    const updateInterval = 100 // Update every 100ms
    const totalSteps = categories.reduce((acc, cat) => acc + cat.steps.length, 0)
    let currentStepIndex = 0
    let elapsedTime = 0

    const interval = setInterval(() => {
      elapsedTime += updateInterval
      const progress = Math.min((elapsedTime / totalDuration) * 100, 100)
      setOverallProgress(Math.floor(progress))

      // Update data stats with realistic increments
      setDataStats((prev) => ({
        documentsProcessed: Math.min(prev.documentsProcessed + Math.random() * 2, 247),
        dataPointsAnalyzed: Math.min(prev.dataPointsAnalyzed + Math.random() * 15, 1847),
        competitorsResearched: Math.min(prev.competitorsResearched + Math.random() * 0.3, 23),
        marketInsights: Math.min(prev.marketInsights + Math.random() * 1, 156),
      }))

      // Update categories and steps
      const stepProgress = (elapsedTime / totalDuration) * totalSteps
      const currentStepFloat = Math.min(stepProgress, totalSteps)
      const newCurrentStep = Math.floor(currentStepFloat)

      if (newCurrentStep !== currentStepIndex) {
        setCurrentStep(newCurrentStep)
        currentStepIndex = newCurrentStep
      }

      // Update category statuses
      setCategories((prevCategories) => {
        return prevCategories.map((category, catIndex) => {
          const categoryStartStep = prevCategories.slice(0, catIndex).reduce((acc, cat) => acc + cat.steps.length, 0)
          const categoryEndStep = categoryStartStep + category.steps.length

          let categoryProgress = 0
          let categoryStatus: "pending" | "processing" | "completed" = "pending"

          if (currentStepFloat > categoryStartStep) {
            if (currentStepFloat >= categoryEndStep) {
              categoryProgress = 100
              categoryStatus = "completed"
            } else {
              categoryProgress = ((currentStepFloat - categoryStartStep) / category.steps.length) * 100
              categoryStatus = "processing"
            }
          }

          const updatedSteps = category.steps.map((step, stepIndex) => {
            const absoluteStepIndex = categoryStartStep + stepIndex
            let stepStatus: "pending" | "processing" | "completed" = "pending"

            if (currentStepFloat > absoluteStepIndex) {
              if (currentStepFloat >= absoluteStepIndex + 1) {
                stepStatus = "completed"
              } else {
                stepStatus = "processing"
              }
            }

            return { ...step, status: stepStatus }
          })

          return {
            ...category,
            progress: Math.floor(categoryProgress),
            status: categoryStatus,
            steps: updatedSteps,
          }
        })
      })

      // Redirect when complete
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          router.push("/analysis/results")
        }, 1000)
      }
    }, updateInterval)

    return () => clearInterval(interval)
  }, [router])

  const CategoryCard = ({ category }: { category: AnalysisCategory }) => {
    const IconComponent = category.icon
    const colorClasses = {
      blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: "text-blue-600" },
      green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: "text-green-600" },
      orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", icon: "text-orange-600" },
      purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", icon: "text-purple-600" },
    }
    const colors = colorClasses[category.color as keyof typeof colorClasses]

    return (
      <Card
        className={`border-gray-100 rounded-xl transition-all duration-500 ${
          category.status === "processing" ? `${colors.bg} ${colors.border}` : ""
        }`}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center transition-all duration-300 ${
                  category.status === "processing" ? "scale-110" : ""
                }`}
              >
                <IconComponent className={`h-5 w-5 ${colors.icon}`} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{category.title}</h3>
                <Badge
                  variant="outline"
                  className={`mt-1 text-xs ${
                    category.status === "completed"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : category.status === "processing"
                        ? `${colors.bg} ${colors.text} ${colors.border}`
                        : "bg-gray-50 text-gray-500 border-gray-200"
                  }`}
                >
                  {category.status === "completed"
                    ? "Completed"
                    : category.status === "processing"
                      ? "Processing"
                      : "Pending"}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-medium text-gray-900">{category.progress}%</div>
            </div>
          </div>

          <Progress value={category.progress} className="h-2 mb-4" />

          <div className="space-y-2">
            {category.steps.map((step) => {
              const StepIcon = step.icon
              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
                    step.status === "processing"
                      ? "bg-blue-50"
                      : step.status === "completed"
                        ? "bg-green-50"
                        : "bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      step.status === "completed"
                        ? "bg-green-100"
                        : step.status === "processing"
                          ? "bg-blue-100"
                          : "bg-gray-100"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    ) : step.status === "processing" ? (
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    ) : (
                      <StepIcon className="h-3 w-3 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm font-medium ${
                        step.status === "completed"
                          ? "text-green-900"
                          : step.status === "processing"
                            ? "text-blue-900"
                            : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{step.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-8 py-10">
        {/* Main Progress Section */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallProgress / 100)}`}
                className="text-blue-500 transition-all duration-500 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-light text-gray-900">{overallProgress}%</div>
                <div className="text-xs text-gray-500">Complete</div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-light text-gray-900 mb-3">Analyzing Investment Opportunity</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI is conducting a comprehensive analysis of the investment opportunity. This process typically takes 30
            seconds to complete.
          </p>
        </div>

        {/* Data Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-gray-100 rounded-xl">
            <CardContent className="p-6 text-center">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-light text-gray-900 mb-1">{Math.floor(dataStats.documentsProcessed)}</div>
              <div className="text-sm text-gray-500">Documents Processed</div>
            </CardContent>
          </Card>

          <Card className="border-gray-100 rounded-xl">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-light text-gray-900 mb-1">{Math.floor(dataStats.dataPointsAnalyzed)}</div>
              <div className="text-sm text-gray-500">Data Points Analyzed</div>
            </CardContent>
          </Card>

          <Card className="border-gray-100 rounded-xl">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-2xl font-light text-gray-900 mb-1">
                {Math.floor(dataStats.competitorsResearched)}
              </div>
              <div className="text-sm text-gray-500">Competitors Researched</div>
            </CardContent>
          </Card>

          <Card className="border-gray-100 rounded-xl">
            <CardContent className="p-6 text-center">
              <Brain className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-light text-gray-900 mb-1">{Math.floor(dataStats.marketInsights)}</div>
              <div className="text-sm text-gray-500">Market Insights</div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Process Methodology */}
        <Card className="border-gray-100 rounded-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-gray-900 mb-3">Analysis Methodology</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our proprietary AI system evaluates investments across multiple dimensions using advanced machine
                learning algorithms and comprehensive market data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Data Collection</h3>
                <p className="text-sm text-gray-600">
                  Comprehensive data gathering from multiple sources including financial records, market research, and
                  competitive intelligence.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">AI Analysis</h3>
                <p className="text-sm text-gray-600">
                  Advanced machine learning models process and analyze data to identify patterns, risks, and
                  opportunities across all investment dimensions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Scoring & Recommendation</h3>
                <p className="text-sm text-gray-600">
                  Proprietary scoring algorithms generate comprehensive investment scores and actionable recommendations
                  based on your investment criteria.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
