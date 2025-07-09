"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DollarSign,
  Building,
  BarChart3,
  Users,
  Target,
  Zap,
  Download,
  Eye,
  MapPin,
  Star,
  FileText,
  Settings,
  Flag,
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
    description: string
    founders: Array<{
      name: string
      role: string
      background: string
    }>
    keyMetrics: {
      valuation: string
      lastRound: string
      totalRaised: string
    }
  }
  overallScore: number
  confidence: number
  recommendation: "INVEST" | "CONSIDER" | "PASS"
  scores: {
    teamComposition: number
    marketIntelligence: number
    productDevelopment: number
    financialData: number
    legalCompliance: number
    companyOps: number
  }
  detailedScores: {
    teamComposition: {
      leadership: number
      experience: number
      execution: number
      vision: number
    }
    marketIntelligence: {
      size: number
      growth: number
      competition: number
      timing: number
    }
    productDevelopment: {
      innovation: number
      differentiation: number
      scalability: number
      userExperience: number
    }
    financialData: {
      revenue: number
      profitability: number
      efficiency: number
      sustainability: number
    }
    legalCompliance: {
      customerGrowth: number
      retention: number
      partnerships: number
      marketShare: number
    }
    companyOps: {
      market: number
      execution: number
      financial: number
      competitive: number
    }
  }
  keyInsights: Array<{
    category: "strength" | "opportunity" | "concern"
    title: string
    description: string
    impact: "high" | "medium" | "low"
  }>
  risks: Array<{
    category: "market" | "execution" | "financial" | "competitive"
    title: string
    description: string
    severity: "high" | "medium" | "low"
    mitigation: string
  }>
  financials: {
    revenue: string
    growth: string
    burnRate: string
    runway: string
    customers: number
    arr: string
    grossMargin: string
    ltv: string
    cac: string
  }
  timestamp?: string
  analysisId?: string
}

const DEFAULT_DATA: AnalysisData = {
  company: {
    name: "Stake",
    industry: "Real Estate Technology (PropTech)",
    stage: "Growth Stage",
    location: "Saudi Arabia",
    founded: "2019",
    employees: "85+",
    website: "getstake.com",
    description:
      "Stake is a pioneering PropTech platform in Saudi Arabia that democratizes real estate investment by enabling fractional ownership of premium real estate funds. Starting from just SAR 500, investors can access exclusive income-generating real estate opportunities across the Kingdom.",
    founders: [
      {
        name: "Ahmed Al-Rashid",
        role: "CEO & Co-founder",
        background: "Former real estate investment director at Saudi Aramco, MBA from INSEAD",
      },
      {
        name: "Sarah Al-Mansouri",
        role: "CTO & Co-founder",
        background: "Ex-fintech lead at STC Pay, computer science background from KAUST",
      },
    ],
    keyMetrics: {
      valuation: "SAR 180M",
      lastRound: "SAR 45M Series B",
      totalRaised: "SAR 75M",
    },
  },
  overallScore: 82,
  confidence: 88,
  recommendation: "INVEST",
  scores: {
    teamComposition: 85,
    marketIntelligence: 92,
    productDevelopment: 78,
    financialData: 75,
    legalCompliance: 88,
    companyOps: 72,
  },
  detailedScores: {
    teamComposition: {
      leadership: 88,
      experience: 85,
      execution: 82,
      vision: 85,
    },
    marketIntelligence: {
      size: 95,
      growth: 92,
      competition: 88,
      timing: 94,
    },
    productDevelopment: {
      innovation: 82,
      differentiation: 85,
      scalability: 75,
      userExperience: 72,
    },
    financialData: {
      revenue: 78,
      profitability: 68,
      efficiency: 82,
      sustainability: 72,
    },
    legalCompliance: {
      customerGrowth: 92,
      retention: 85,
      partnerships: 88,
      marketShare: 85,
    },
    companyOps: {
      market: 75,
      execution: 72,
      financial: 70,
      competitive: 72,
    },
  },
  keyInsights: [
    {
      category: "strength",
      title: "Vision 2030 Alignment",
      description:
        "Perfectly positioned to benefit from Saudi Arabia's Vision 2030 real estate development boom, including NEOM, Red Sea Project, and Qiddiya megaprojects.",
      impact: "high",
    },
    {
      category: "strength",
      title: "First-Mover Advantage",
      description:
        "First platform in Saudi Arabia to offer fractional real estate investment with SAR 500 minimum, capturing underserved retail investor segment.",
      impact: "high",
    },
    {
      category: "opportunity",
      title: "Massive Addressable Market",
      description:
        "Saudi real estate market valued at $300B+ with only 2% currently accessible to retail investors through fractional ownership platforms.",
      impact: "high",
    },
    {
      category: "strength",
      title: "Regulatory Compliance",
      description:
        "Full SAMA compliance and Sharia certification providing trust and legitimacy in conservative Saudi market.",
      impact: "high",
    },
    {
      category: "strength",
      title: "Strong Unit Economics",
      description:
        "Impressive LTV/CAC ratio of 11.4x demonstrates efficient customer acquisition and high lifetime value, indicating sustainable growth model.",
      impact: "high",
    },
    {
      category: "opportunity",
      title: "Digital-First Generation",
      description:
        "Growing young population in Saudi Arabia increasingly comfortable with digital investment platforms, creating expanding user base for PropTech solutions.",
      impact: "medium",
    },
  ],
  risks: [
    {
      category: "market",
      title: "Real Estate Market Volatility",
      description:
        "Saudi real estate market subject to oil price fluctuations and economic cycles affecting property values and rental yields.",
      severity: "medium",
      mitigation: "Diversified portfolio across different property types and geographic regions within Saudi Arabia",
    },
    {
      category: "competitive",
      title: "Traditional Investment Channels",
      description: "Competition from established real estate investment trusts (REITs) and direct property investment.",
      severity: "medium",
      mitigation: "Focus on accessibility, lower minimums, and superior user experience through mobile-first platform",
    },
    {
      category: "financial",
      title: "Regulatory Changes",
      description: "Potential changes in SAMA regulations or Sharia compliance requirements affecting business model.",
      severity: "medium",
      mitigation: "Strong regulatory relationships and proactive compliance team monitoring regulatory developments",
    },
    {
      category: "execution",
      title: "Technology Scalability",
      description: "Platform scalability challenges as user base grows and transaction volumes increase.",
      severity: "low",
      mitigation: "Investment in cloud infrastructure and experienced technology team with fintech background",
    },
    {
      category: "market",
      title: "Economic Dependency Risk",
      description:
        "Heavy reliance on Saudi Arabia's economic stability and oil revenues which could impact real estate investment appetite during downturns.",
      severity: "high",
      mitigation:
        "Monitor economic indicators and maintain flexible business model to adapt to changing market conditions",
    },
    {
      category: "competitive",
      title: "International Competition",
      description:
        "Risk of established global PropTech platforms entering the Saudi market with superior technology and deeper pockets.",
      severity: "high",
      mitigation:
        "Strengthen local partnerships and regulatory advantages while accelerating product development and market penetration",
    },
  ],
  financials: {
    revenue: "SAR 45M ARR",
    growth: "180% YoY",
    burnRate: "SAR 2.8M/month",
    runway: "18 months",
    customers: 12500,
    arr: "SAR 45M",
    grossMargin: "85%",
    ltv: "SAR 3,200",
    cac: "SAR 280",
  },
}

export default function AnalysisResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [data, setData] = useState<AnalysisData>(DEFAULT_DATA)
  const [isLoading, setIsLoading] = useState(true)
  const [dataSource, setDataSource] = useState<"sessionStorage" | "localStorage" | "urlParams" | "default">("default")
  const [showDetailedScores, setShowDetailedScores] = useState(false)
  const [expandedInsights, setExpandedInsights] = useState<Set<number>>(new Set())
  const [expandedRisks, setExpandedRisks] = useState<Set<number>>(new Set())
  const [isDownloading, setIsDownloading] = useState(false)

  const [user, setUser] = useState({
    name: "Admin",
  })

  const [notifications] = useState([
    { id: 1, type: "assessment", message: "New assessment completed for Tamara", time: "5 min ago", unread: true },
    { id: 2, type: "alert", message: "Risk threshold exceeded for Tabby", time: "1 hour ago", unread: true },
    { id: 3, type: "system", message: "Weekly portfolio report available", time: "2 hours ago", unread: false },
  ])

  const [activeToggle, setActiveToggle] = useState("recommendation")

  const toggleInsightExpansion = (index: number) => {
    const newExpanded = new Set(expandedInsights)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedInsights(newExpanded)
  }

  const toggleRiskExpansion = (index: number) => {
    const newExpanded = new Set(expandedRisks)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedRisks(newExpanded)
  }

  const handleDownloadReport = async () => {
    setIsDownloading(true)

    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create a mock PDF download
    const element = document.createElement("a")
    element.href =
      "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKFN0YWtlIFJlYWwgRXN0YXRlIEludmVzdG1lbnQgQW5hbHlzaXMpCi9DcmVhdG9yICgxOTU3IFZlbnR1cmVzKQovUHJvZHVjZXIgKDE5NTcgVmVudHVyZXMpCi9DcmVhdGlvbkRhdGUgKEQ6MjAyNDAxMDExMjAwMDBaKQo+PgplbmRvYmoKeHJlZgowIDEKMDAwMDAwMDAwMCA2NTUzNSBmIAp0cmFpbGVyCjw8Ci9TaXplIDEKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjE3MwolJUVPRg=="
    element.download = `Stake_Real_Estate_Investment_Analysis_${new Date().toISOString().split("T")[0]}.pdf`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    setIsDownloading(false)
  }

  // Load analysis data with multiple fallback methods
  const loadAnalysisData = (): AnalysisData | null => {
    try {
      const sessionData = sessionStorage.getItem("analysisData")
      if (sessionData) {
        const parsedData = JSON.parse(sessionData)
        setDataSource("sessionStorage")
        return parsedData
      }

      const localData = localStorage.getItem("analysisDataBackup")
      if (localData) {
        const backupData = JSON.parse(localData)
        if (backupData.expiry && Date.now() < backupData.expiry) {
          setDataSource("localStorage")
          return backupData.data
        } else {
          localStorage.removeItem("analysisDataBackup")
        }
      }

      const urlData = searchParams.get("data")
      if (urlData) {
        const decodedData = JSON.parse(decodeURIComponent(urlData))
        setDataSource("urlParams")
        return decodedData
      }

      return null
    } catch (error) {
      console.error("Error loading analysis data:", error)
      return null
    }
  }

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      const loadedData = loadAnalysisData()

      if (loadedData) {
        setData(loadedData)
      } else {
        console.warn("No analysis data found, using default data")
        setDataSource("default")
      }

      setIsLoading(false)
    }, 100)

    return () => clearTimeout(loadTimer)
  }, [searchParams])

  // Minimal zen color system
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-slate-700"
    if (score >= 70) return "text-slate-600"
    if (score >= 60) return "text-slate-500"
    if (score >= 50) return "text-slate-400"
    return "text-slate-400"
  }

  const getScoreIndicator = (score: number) => {
    if (score >= 80) return "bg-slate-700"
    if (score >= 70) return "bg-slate-600"
    if (score >= 60) return "bg-slate-500"
    if (score >= 50) return "bg-slate-400"
    return "bg-slate-300"
  }

  const getRecommendationStyle = (recommendation: string) => {
    switch (recommendation) {
      case "INVEST":
        return {
          bg: "bg-slate-800",
          text: "text-white",
          ring: "ring-slate-200",
        }
      case "CONSIDER":
        return {
          bg: "bg-slate-600",
          text: "text-white",
          ring: "ring-slate-200",
        }
      case "PASS":
        return {
          bg: "bg-slate-400",
          text: "text-white",
          ring: "ring-slate-200",
        }
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-900",
          ring: "ring-gray-100",
        }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-8 h-8 mx-auto">
            <div className="absolute inset-0 rounded-full border border-gray-200"></div>
            <div
              className="absolute inset-0 rounded-full animate-spin"
              style={{
                background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #64748b 270deg, #64748b 360deg)`,
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 1px), white calc(100% - 1px))",
                mask: "radial-gradient(farthest-side, transparent calc(100% - 1px), white calc(100% - 1px))",
                animationDuration: "2s",
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            ></div>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-gray-900">Loading Analysis</h3>
            <p className="text-sm text-gray-500">Preparing your real estate investment evaluation</p>
          </div>
        </div>
      </div>
    )
  }

  const recommendationStyle = getRecommendationStyle(data.recommendation)

  // Define breadcrumbs for analysis results
  const breadcrumbs = [
    {
      label: "Dashboard",
      href: "/dashboard/main",
    },
    {
      label: "Analysis",
      href: "/analysis/loading",
    },
    {
      label: "Results",
      isActive: true,
    },
  ]

  const handleToggleChange = (value: string) => {
    setActiveToggle(value)

    // Hide all content sections
    const sections = ["recommendation", "overview", "insights", "risks"]
    sections.forEach((section) => {
      const element = document.querySelector(`.${section}-content`) as HTMLElement
      if (element) {
        element.style.display = "none"
      }
    })

    // Show selected content section
    const selectedElement = document.querySelector(`.${value}-content`) as HTMLElement
    if (selectedElement) {
      selectedElement.style.display = "block"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header breadcrumbs={breadcrumbs} user={user} notifications={notifications} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        {/* Hero Section - Compact */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1 max-w-4xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-medium text-gray-900 tracking-tight">{data.company.name}</h1>
                  <p className="text-sm text-gray-600">Real Estate Investment Platform</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Building className="h-3 w-3" />
                  <span className="text-xs">{data.company.industry}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="h-3 w-3" />
                  <span className="text-xs">{data.company.stage}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs">{data.company.location}</span>
                </div>
              </div>

              <div className="text-sm text-gray-600 leading-relaxed max-w-4xl">
                <p>
                  Stake is a pioneering PropTech platform in Saudi Arabia that democratizes real estate investment by
                  enabling fractional ownership of premium real estate funds. Starting from just SAR 500, investors can
                  access exclusive income-generating real estate opportunities across the Kingdom.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-6">
              <Button
                onClick={handleDownloadReport}
                disabled={isDownloading}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md shadow-sm transition-all duration-200 text-sm"
              >
                {isDownloading ? (
                  <>
                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-3 w-3 mr-2" />
                    Export Investment Memo
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Two Column Layout: Investment Score Left, Tabs Right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Investment Score */}
            <div className="lg:col-span-1">
              <Card className="border border-gray-200 hover:shadow-sm transition-all duration-300 group sticky top-20">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <h3 className="text-base font-medium text-gray-900 mb-1">Investment Score</h3>
                    <p className="text-xs text-gray-500">PropTech assessment</p>
                  </div>

                  <div className="relative w-28 h-28 mx-auto mb-4">
                    <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${data.overallScore}, 100`}
                        strokeLinecap="round"
                        className={`${getScoreColor(data.overallScore)} transition-all duration-500`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-3xl font-medium ${getScoreColor(data.overallScore)} tracking-tight`}>
                        {data.overallScore}
                      </span>
                      <span className="text-xs text-gray-400 mt-0.5 font-medium">/ 100</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg border">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span className="text-xs font-medium text-gray-600">Confidence</span>
                      <span className={`text-sm font-medium ${getScoreColor(data.confidence)}`}>
                        {data.confidence}%
                      </span>
                    </div>

                    <div className="flex items-center justify-center space-x-3">
                      <div
                        className={`inline-flex items-center px-3 py-2 rounded-full ${recommendationStyle.bg} ${recommendationStyle.ring} ring-2`}
                      >
                        <span className={`text-sm font-medium ${recommendationStyle.text}`}>{data.recommendation}</span>
                      </div>
                      <div className="bg-gray-50 rounded-md px-2 py-1 border">
                        <span className="text-xs font-medium text-gray-700">ticket: 1M USD</span>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="pt-4 border-t border-gray-100 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">ARR</span>
                        <span className="font-medium text-gray-900">{data.financials.arr}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Revenue Growth</span>
                        <span className="font-medium text-gray-900">{data.financials.growth}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Burn Rate</span>
                        <span className="font-medium text-gray-900">{data.financials.burnRate}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">LTV/CAC</span>
                        <span className="font-medium text-gray-900">11.4x</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Tabs */}
            <div className="lg:col-span-2">
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardHeader showToggle={true} defaultValue="recommendation" onToggleChange={handleToggleChange} />
                <CardContent className="p-4">
                  {/* Recommendation Content */}
                  <div className="recommendation-content">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-700">
                          Stake presents a compelling investment opportunity in the Saudi Arabian PropTech sector.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Key Rationale</h4>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-600">
                              Positioned to capitalize on the rapidly growing Saudi real estate market, driven by Vision
                              2030 and increasing retail investor participation.
                            </p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-600">
                              First platform in Saudi Arabia to offer fractional real estate investment, providing
                              significant advantage in capturing the underserved retail investor segment.
                            </p>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-600">
                              Demonstrates strong financial performance with impressive revenue growth, high gross
                              margins, and favorable LTV/CAC ratio.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Overview Content */}
                  <div className="overview-content" style={{ display: "none" }}>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(data.scores).map(([key, score]) => {
                        const icons = {
                          teamComposition: Users,
                          marketIntelligence: Target,
                          productDevelopment: Zap,
                          financialData: DollarSign,
                          legalCompliance: FileText,
                          companyOps: Settings,
                        }
                        const labels = {
                          teamComposition: "Team Composition",
                          marketIntelligence: "Market Intelligence",
                          productDevelopment: "Product Development",
                          financialData: "Financial Data",
                          legalCompliance: "Legal & Compliance",
                          companyOps: "Company Ops",
                        }
                        const IconComponent = icons[key as keyof typeof icons] || BarChart3
                        const label = labels[key as keyof typeof labels] || key

                        return (
                          <div
                            key={key}
                            className="space-y-2 p-3 bg-gray-50 rounded-lg border hover:shadow-sm transition-all duration-200"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center shadow-sm">
                                  <IconComponent className="h-3 w-3 text-gray-600" />
                                </div>
                                <span className="text-xs font-medium text-gray-800">{label}</span>
                              </div>
                              <span className={`text-lg font-medium ${getScoreColor(score)}`}>{score}</span>
                            </div>
                            <div className="relative">
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${getScoreIndicator(score)} transition-all duration-1000`}
                                  style={{ width: `${score}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Detailed Scores */}
                    {showDetailedScores && (
                      <div className="mt-6 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Detailed Breakdown</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(data.detailedScores).map(([category, scores]) => {
                            const categoryLabels = {
                              teamComposition: "Team Composition",
                              marketIntelligence: "Market Intelligence",
                              productDevelopment: "Product Development",
                              financialData: "Financial Data",
                              legalCompliance: "Legal & Compliance",
                              companyOps: "Company Ops",
                            }
                            const categoryLabel = categoryLabels[category as keyof typeof categoryLabels] || category

                            return (
                              <div key={category} className="space-y-3">
                                <h5 className="font-medium text-gray-800 flex items-center space-x-2 text-xs">
                                  <div
                                    className={`w-2 h-2 rounded-full ${getScoreIndicator(data.scores[category as keyof typeof data.scores])}`}
                                  ></div>
                                  <span>{categoryLabel}</span>
                                </h5>
                                <div className="space-y-2">
                                  {Object.entries(scores).map(([subCategory, score]) => (
                                    <div key={subCategory} className="flex items-center justify-between">
                                      <span className="text-xs text-gray-600 capitalize font-medium">
                                        {subCategory.replace(/([A-Z])/g, " $1").trim()}
                                      </span>
                                      <div className="flex items-center space-x-2">
                                        <div className="w-12 bg-gray-200 rounded-full h-1">
                                          <div
                                            className={`h-1 rounded-full ${getScoreIndicator(score as number)}`}
                                            style={{ width: `${score}%` }}
                                          />
                                        </div>
                                        <span
                                          className={`text-xs font-medium ${getScoreColor(score as number)} w-5 text-right`}
                                        >
                                          {score}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Insights Content */}
                  <div className="insights-content" style={{ display: "none" }}>
                    <div className="space-y-3">
                      {data.keyInsights.map((insight, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Star className="h-3 w-3 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm mb-1">{insight.title}</h4>
                              <p className="text-xs text-gray-600 leading-relaxed">{insight.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risks Content */}
                  <div className="risks-content" style={{ display: "none" }}>
                    <div className="space-y-3">
                      {data.risks.map((risk, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <div className="flex items-start space-x-2">
                            <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Flag className="h-3 w-3 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm mb-1">{risk.title}</h4>
                              <p className="text-xs text-gray-600 leading-relaxed mb-2">{risk.description}</p>
                              <div className="bg-gray-50 rounded-md p-2">
                                <p className="text-xs text-gray-600">
                                  <span className="font-medium text-gray-700">Mitigation:</span> {risk.mitigation}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
