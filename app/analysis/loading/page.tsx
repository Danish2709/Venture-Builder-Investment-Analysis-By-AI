"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Building2,
  Users,
  TrendingUp,
  Shield,
  Database,
  Brain,
  Sparkles,
  Globe,
  BarChart3,
  Search,
  Lock,
  Check,
} from "lucide-react"
import { Header } from "@/components/common/Header"

interface AnalysisData {
  company: {
    name: string
    industry: string
    stage: string
    location: string
    founded: string
    employees: string
    website: string
  }
  overallScore: number
  confidence: number
  recommendation: "INVEST" | "CONSIDER" | "PASS"
  scores: {
    team: number
    market: number
    product: number
    financials: number
    traction: number
    risks: number
  }
  keyInsights: string[]
  risks: string[]
  financials: {
    revenue: string
    growth: string
    burnRate: string
    runway: string
    customers: number
  }
  timestamp: string
  analysisId: string
  riskAssessment?: {
    criticalRisks: number
    operationalRisks: number
    marketRisks: number
    financialRisks: number
    overallRiskScore: number
  }
}

export default function AnalysisLoadingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentStage, setCurrentStage] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const [user, setUser] = useState({
    name: "Admin",
  })

  const [notifications] = useState([
    { id: 1, type: "assessment", message: "New assessment completed for Tamara", time: "5 min ago", unread: true },
    { id: 2, type: "alert", message: "Risk threshold exceeded for Tabby", time: "1 hour ago", unread: true },
    { id: 3, type: "system", message: "Weekly portfolio report available", time: "2 hours ago", unread: false },
  ])

  const stages = [
    { id: "collection", title: "Collecting Data", icon: Database },
    { id: "processing", title: "Processing", icon: Brain },
    { id: "insights", title: "Generating Report", icon: Sparkles },
  ]

  const dataSources = [
    {
      id: "team",
      title: "Team Composition",
      description: "Founder background, team composition, grit...",
      icon: Users,
      active: false,
      completed: false,
    },
    {
      id: "market",
      title: "Market Intelligence",
      description: "Opportunity, competition, customer validation...",
      icon: TrendingUp,
      active: false,
      completed: false,
    },
    {
      id: "product",
      title: "Product Development",
      description: "MOAT, XD, technology stack, roadmap, GTM...",
      icon: Globe,
      active: false,
      completed: false,
    },
    {
      id: "financials",
      title: "Financial Data",
      description: "Unit economics, statements, projections, cap table...",
      icon: BarChart3,
      active: false,
      completed: false,
    },
    {
      id: "compliance",
      title: "Legal & Compliance",
      description: "Reg requirements, IP, corporate structure, contracts...",
      icon: Shield,
      active: false,
      completed: false,
    },
    {
      id: "company",
      title: "Company Ops",
      description: "Talent, organigram, policies...",
      icon: Building2,
      active: false,
      completed: false,
    },
  ]

  const [activeSources, setActiveSources] = useState(dataSources)

  // Load existing risk assessment data
  const loadRiskAssessmentData = () => {
    try {
      const storedScores = sessionStorage.getItem("assessmentScores")
      const storedRiskScores = sessionStorage.getItem("riskScores")

      if (storedScores && storedRiskScores) {
        const scores = JSON.parse(storedScores)
        const riskScores = JSON.parse(storedRiskScores)

        return {
          hasRiskData: true,
          criticalRisks: riskScores["Critical Risk"]
            ? Object.values(riskScores["Critical Risk"]).reduce((a: number, b: number) => a + b, 0) /
              Object.keys(riskScores["Critical Risk"]).length
            : 0,
          operationalRisks: riskScores["Operational Risk"]
            ? Object.values(riskScores["Operational Risk"]).reduce((a: number, b: number) => a + b, 0) /
              Object.keys(riskScores["Operational Risk"]).length
            : 0,
          marketRisks: riskScores["Market Risk"]
            ? Object.values(riskScores["Market Risk"]).reduce((a: number, b: number) => a + b, 0) /
              Object.keys(riskScores["Market Risk"]).length
            : 0,
          financialRisks: riskScores["Financial Risk"]
            ? Object.values(riskScores["Financial Risk"]).reduce((a: number, b: number) => a + b, 0) /
              Object.keys(riskScores["Financial Risk"]).length
            : 0,
          assessmentScores: scores,
        }
      }
    } catch (error) {
      console.warn("No existing risk assessment data found")
    }

    return { hasRiskData: false }
  }

  // Generate enhanced analysis data for Stake (Real Estate Platform)
  const generateAnalysisData = (progressValue: number): AnalysisData => {
    const riskData = loadRiskAssessmentData()

    let baseScore = 75 + Math.floor((progressValue / 100) * 20)

    if (riskData.hasRiskData) {
      const avgRisk =
        (riskData.criticalRisks + riskData.operationalRisks + riskData.marketRisks + riskData.financialRisks) / 4
      baseScore = Math.max(50, baseScore - Math.floor(avgRisk * 4))
    }

    const confidence = 85 + Math.floor((progressValue / 100) * 12)

    let recommendation: "INVEST" | "CONSIDER" | "PASS" = "CONSIDER"
    if (baseScore >= 85) recommendation = "INVEST"
    else if (baseScore < 65) recommendation = "PASS"

    return {
      company: {
        name: "Stake",
        industry: "Real Estate Technology (PropTech)",
        stage: "Growth Stage",
        location: "Saudi Arabia",
        founded: "2019",
        employees: "85+",
        website: "getstake.com",
      },
      overallScore: baseScore,
      confidence: confidence,
      recommendation: recommendation,
      scores: {
        team: Math.min(95, baseScore + Math.floor(Math.random() * 10) - 2),
        market: Math.min(95, baseScore + Math.floor(Math.random() * 12) - 1),
        product: Math.min(95, baseScore + Math.floor(Math.random() * 8) - 1),
        financials: Math.min(95, baseScore + Math.floor(Math.random() * 15) - 3),
        traction: Math.min(95, baseScore + Math.floor(Math.random() * 10) - 2),
        risks: Math.min(95, Math.max(55, baseScore - Math.floor(Math.random() * 6))),
      },
      keyInsights: [
        "First-mover advantage in Saudi Arabia's fractional real estate investment market",
        "Strong regulatory backing and Sharia-compliant investment structure",
        "Leveraging Vision 2030 real estate development boom and NEOM projects",
        "Low minimum investment threshold (SAR 500) democratizing real estate access",
        "Strategic partnerships with major Saudi real estate developers and funds",
      ],
      risks: [
        "Heavy dependency on Saudi real estate market performance and regulations",
        "Regulatory changes in PropTech and real estate investment laws",
        "Competition from traditional real estate investment channels",
        "Market volatility affecting real estate fund performance",
      ],
      financials: {
        revenue: "SAR 45M ARR",
        growth: "180% YoY",
        burnRate: "SAR 2.8M/month",
        runway: "18 months",
        customers: 12500,
      },
      timestamp: new Date().toISOString(),
      analysisId: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      riskAssessment: riskData.hasRiskData
        ? {
            criticalRisks: Math.round(riskData.criticalRisks * 20),
            operationalRisks: Math.round(riskData.operationalRisks * 20),
            marketRisks: Math.round(riskData.marketRisks * 20),
            financialRisks: Math.round(riskData.financialRisks * 20),
            overallRiskScore: Math.round(
              ((riskData.criticalRisks + riskData.operationalRisks + riskData.marketRisks + riskData.financialRisks) /
                4) *
                20,
            ),
          }
        : undefined,
    }
  }

  const storeAnalysisData = (data: AnalysisData) => {
    try {
      sessionStorage.setItem("analysisData", JSON.stringify(data))
      const backupData = {
        data: data,
        expiry: Date.now() + 24 * 60 * 60 * 1000,
      }
      localStorage.setItem("analysisDataBackup", JSON.stringify(backupData))
      return true
    } catch (error) {
      console.error("Failed to store analysis data:", error)
      return false
    }
  }

  useEffect(() => {
    try {
      sessionStorage.removeItem("analysisData")
      localStorage.removeItem("analysisDataBackup")
    } catch (error) {
      console.warn("Failed to clear existing data:", error)
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / 600 // 60 seconds total (1 minute)

        // Update current stage
        const stageIndex = Math.floor((newProgress / 100) * stages.length)
        setCurrentStage(stageIndex)

        // Activate and complete data sources progressively
        const activeSourceCount = Math.floor((newProgress / 100) * dataSources.length)
        const completedSourceCount = Math.floor(((newProgress - 10) / 100) * dataSources.length)

        setActiveSources((sources) =>
          sources.map((source, index) => ({
            ...source,
            active: index < activeSourceCount,
            completed: index < Math.max(0, completedSourceCount),
          })),
        )

        if (newProgress >= 100 && !isNavigating) {
          setIsNavigating(true)
          clearInterval(interval)

          const finalAnalysisData = generateAnalysisData(100)
          const stored = storeAnalysisData(finalAnalysisData)

          if (stored) {
            setTimeout(() => {
              router.push("/analysis/results")
            }, 800)
          } else {
            setTimeout(() => {
              if (storeAnalysisData(finalAnalysisData)) {
                router.push("/analysis/results")
              } else {
                const encodedData = encodeURIComponent(JSON.stringify(finalAnalysisData))
                router.push(`/analysis/results?data=${encodedData}`)
              }
            }, 1000)
          }

          return 100
        }

        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [router, isNavigating])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (progress > 0 && progress < 100) {
        e.preventDefault()
        e.returnValue = "Analysis in progress. Are you sure you want to leave?"
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [progress])

  // Define breadcrumbs for analysis loading
  const breadcrumbs = [
    {
      label: "Dashboard",
      href: "/dashboard/main",
    },
    {
      label: "Analysis",
      isActive: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header breadcrumbs={breadcrumbs} user={user} notifications={notifications} />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8 py-6">
        <div className="w-full max-w-6xl">
          {/* Header Section - Repositioned */}
          <div className="mb-8">
            <h1 className="text-2xl font-light text-gray-900 mb-2 tracking-tight">Accelerated Opportunity Analysis</h1>
            <p className="text-gray-600">Turning vast datasets into clear, actionable insights</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Left Column - Progress & Features */}
            <div className="lg:col-span-1 space-y-4">
              {/* Progress Card */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center justify-center mb-6">
                  {/* Ultra-Elegant Minimal Spinning Wheel */}
                  <div className="relative w-8 h-8">
                    {/* Subtle outer ring with minimal presence */}
                    <div className="absolute inset-0 rounded-full border border-gray-100"></div>

                    {/* Primary elegant arc - single sophisticated stroke */}
                    <div
                      className="absolute inset-0 rounded-full animate-spin"
                      style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #1f2937 270deg, #1f2937 360deg)`,
                        WebkitMask:
                          "radial-gradient(farthest-side, transparent calc(100% - 1px), white calc(100% - 1px))",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 1px), white calc(100% - 1px))",
                        animationDuration: "2s",
                        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    ></div>

                    {/* Refined secondary arc for depth */}
                    <div
                      className="absolute inset-0 rounded-full animate-spin"
                      style={{
                        background: `conic-gradient(from 180deg, transparent 0deg, transparent 300deg, #6b7280 300deg, #6b7280 360deg)`,
                        WebkitMask:
                          "radial-gradient(farthest-side, transparent calc(100% - 0.5px), white calc(100% - 0.5px))",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 0.5px), white calc(100% - 0.5px))",
                        animationDuration: "3s",
                        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                        animationDirection: "reverse",
                      }}
                    ></div>

                    {/* Minimal center indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-0.5 h-0.5 bg-gray-800 rounded-full opacity-60"></div>
                    </div>
                  </div>
                </div>

                {/* Current Stage */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {stages.map((stage, index) => {
                    const IconComponent = stage.icon
                    const isActive = index === currentStage
                    const isCompleted = index < currentStage

                    return (
                      <div key={stage.id} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                            isCompleted
                              ? "bg-green-100 text-green-600"
                              : isActive
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        {index < stages.length - 1 && (
                          <div className="w-6 h-0.5 bg-gray-200 mx-1">
                            <div
                              className="h-full bg-blue-500 transition-all duration-500"
                              style={{ width: index < currentStage ? "100%" : "0%" }}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900 mb-1">{stages[currentStage]?.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {currentStage === 0 && "Gathering real estate market data"}
                    {currentStage === 1 && "Analyzing PropTech platform metrics"}
                    {currentStage === 2 && "Creating investment recommendations"}
                  </p>
                </div>
              </div>

              {/* Security Card - Switched icon from Lock to Search */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Search className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-yellow-900">LLM search</p>
                    <p className="text-xs text-yellow-700 leading-relaxed">Powered by AI</p>
                  </div>
                </div>
              </div>

              {/* Multi LLM Card - Switched icon from Search to Lock */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-yellow-900">Data protection</p>
                    <p className="text-xs text-yellow-700 leading-relaxed">Enterprise-grade security</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Assessment Framework */}
            <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Assessment Framework</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                {activeSources.map((source) => {
                  const IconComponent = source.icon
                  return (
                    <div
                      key={source.id}
                      className={`relative flex items-start space-x-3 p-4 rounded-lg border transition-all duration-500 min-h-[80px] ${
                        source.completed
                          ? "border-green-200 bg-green-50 text-green-700"
                          : source.active
                            ? "border-blue-200 bg-blue-50 text-blue-700"
                            : "border-gray-200 bg-gray-50 text-gray-500"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          source.completed ? "bg-green-100" : source.active ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium truncate pr-2">{source.title}</p>
                          {source.completed ? (
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          ) : source.active ? (
                            <div className="flex space-x-1 flex-shrink-0">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                              <div
                                className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"
                                style={{ animationDelay: "0.2s" }}
                              />
                              <div
                                className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"
                                style={{ animationDelay: "0.4s" }}
                              />
                            </div>
                          ) : null}
                        </div>
                        <p className="text-xs leading-relaxed">{source.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
