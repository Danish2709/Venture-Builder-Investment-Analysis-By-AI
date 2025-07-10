"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  TrendingUp,
  Shield,
  Target,
  ArrowUpRight,
  Activity,
  Eye,
  Building2,
  Zap,
  ArrowRight,
  CheckCircle2,
  Search,
  PieChart,
  Upload,
  LinkIcon,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/common/Header"
import { SessionManager } from "@/utils/sessionManager"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { analyzeWithGemini, fileToBase64 } from "@/utils/generativeAI"
import { getFile, saveFile } from "@/utils/dbManager"
import { investmentRecommendationPrompt } from "@/data/prompts"
import { recommendationSchema } from "@/types/yamm"

export default function MainDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [linkInput, setLinkInput] = useState("")
  const [searchFilter, setSearchFilter] = useState("")
  // Tracks whether the analysis is currently running
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [user, setUser] = useState({
    name: "Admin",
    lastLogin: "2025-01-05T08:30:00Z",
  })

  const [notifications] = useState([
    { id: 1, type: "assessment", message: "New assessment completed for Tamara", time: "5 min ago", unread: true },
    { id: 2, type: "alert", message: "Risk threshold exceeded for Tabby", time: "1 hour ago", unread: true },
    { id: 3, type: "system", message: "Weekly portfolio report available", time: "2 hours ago", unread: false },
  ])

  const [recentAssessments] = useState([
    {
      id: 1,
      company: "Hala",
      stage: "Seed",
      score: 0,
      risk: "Unknown",
      decision: "DECLINED",
      date: "2025-07-09",
      status: "completed",
      sector: "Fintech",
      fundingAmount: "$1M",
    },
    {
      id: 2,
      company: "Stake",
      stage: "Seed",
      score: 0,
      risk: "Unknown",
      decision: "INVEST",
      date: "2025-07-08",
      status: "completed",
      sector: "Fintech",
      fundingAmount: "$1.25M",
    },
    {
      id: 3,
      company: "Radar",
      stage: "New Build",
      score: 0,
      risk: "Unknown",
      decision: "WATCHLIST",
      date: "2025-07-03",
      status: "watchlist",
      sector: "PropTech",
      fundingAmount: "$500K",
    },
    {
      id: 4,
      company: "Grooshy",
      stage: "New Build",
      score: 0,
      risk: "Unknown",
      decision: "REVIEW",
      date: "2025-06-30",
      status: "in-progress",
      sector: "E-commerce",
      fundingAmount: "$2M",
    },
    {
      id: 5,
      company: "Wahed Invest",
      stage: "Seed",
      score: 0,
      risk: "Unknown",
      decision: "DECLINED",
      date: "2025-06-30",
      status: "completed",
      sector: "Fintech",
      fundingAmount: "$3M",
    },
    {
      id: 6,
      company: "Ziina",
      stage: "Series A",
      score: 0,
      risk: "Unknown",
      decision: "DUE_DILIGENCE",
      date: "2025-06-29",
      status: "due-diligence",
      sector: "Fintech",
      fundingAmount: "$8M",
    },
  ])

  const [portfolioStats] = useState({
    totalAssessments: 127,
    activeAssessments: 8,
    avgScore: 76.3,
    successRate: 84,
    monthlyGrowth: 12.5,
    portfolioValue: "35M",
    activeDeals: 3,
    exitMultiple: "4.2x",
  })

  const investmentOptions = [
    {
      id: "pre-seed",
      title: "Pre-Seed Investment",
      description: "Evaluate very early-stage startup investments",
      icon: Building2,
      color: "slate",
      primaryColor: "#64748b",
      lightColor: "#f1f5f9",
      darkColor: "#475569",
      gradient: "from-slate-50 via-slate-100 to-slate-150",
      hoverGradient: "from-slate-100 via-slate-150 to-slate-200",
      selectedGradient: "from-slate-600 via-slate-700 to-slate-800",
      borderColor: "border-slate-200",
      selectedBorderColor: "border-slate-300",
      bgColor: "bg-slate-50",
      selectedBgColor: "bg-slate-600",
      textColor: "text-slate-800",
      selectedTextColor: "text-slate-700",
      iconColor: "text-slate-600",
      selectedIconColor: "text-slate-600",
      shadowColor: "shadow-slate-100/50",
      glowColor: "shadow-slate-200/30",
    },
    {
      id: "seed-stage",
      title: "Seed Stage Investment",
      description: "Evaluate early-stage startup investments",
      icon: Target,
      color: "blue",
      primaryColor: "#3b82f6",
      lightColor: "#eff6ff",
      darkColor: "#2563eb",
      gradient: "from-blue-50 via-blue-100 to-blue-150",
      hoverGradient: "from-blue-100 via-blue-150 to-blue-200",
      selectedGradient: "from-blue-600 via-blue-700 to-blue-800",
      borderColor: "border-blue-200",
      selectedBorderColor: "border-blue-300",
      bgColor: "bg-blue-50",
      selectedBgColor: "bg-blue-600",
      textColor: "text-blue-800",
      selectedTextColor: "text-blue-700",
      iconColor: "text-blue-600",
      selectedIconColor: "text-blue-600",
      shadowColor: "shadow-blue-100/50",
      glowColor: "shadow-blue-200/30",
    },
    {
      id: "series-a",
      title: "Series A Investment",
      description: "Analyze growth-stage investment opportunities",
      icon: TrendingUp,
      color: "gray",
      primaryColor: "#6b7280",
      lightColor: "#f9fafb",
      darkColor: "#4b5563",
      gradient: "from-gray-50 via-gray-100 to-gray-150",
      hoverGradient: "from-gray-100 via-gray-150 to-gray-200",
      selectedGradient: "from-gray-600 via-gray-700 to-gray-800",
      borderColor: "border-gray-200",
      selectedBorderColor: "border-gray-300",
      bgColor: "bg-gray-50",
      selectedBgColor: "bg-gray-600",
      textColor: "text-gray-800",
      selectedTextColor: "text-gray-700",
      iconColor: "text-gray-600",
      selectedIconColor: "text-gray-600",
      shadowColor: "shadow-gray-100/50",
      glowColor: "shadow-gray-200/30",
    },
  ]

  // Filter assessments based on search
  // ------------------------------------------------------------------
  // Safe filtering ‒ prevents `toLowerCase` from being called on `undefined`
  // ------------------------------------------------------------------
  const normalizedFilter = (searchFilter ?? "").toLowerCase().trim()

  const filteredAssessments = recentAssessments.filter(({ company = "", stage = "" }) => {
    const companyName = company.toLowerCase()
    const stageName = stage.toLowerCase()

    return companyName.includes(normalizedFilter) || stageName.includes(normalizedFilter)
  })

  // Enhanced data loading simulation
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Validate session first
        const validation = SessionManager.validateSession()
        if (!validation.isValid) {
          router.replace("/auth/login")
          return
        }

        // Update user info from session if available
        if (validation.session) {
          setUser((prev) => ({
            ...prev,
            name: validation.session!.username,
            lastLogin: validation.session!.loginTime,
          }))
        }

        // Faster, more realistic data loading
        await new Promise((resolve) => setTimeout(resolve, 1200))

        setIsLoading(false)
      } catch (error) {
        console.error("Dashboard loading error:", error)
        router.replace("/auth/login")
      }
    }

    loadDashboardData()
  }, [router])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const getInvestmentRecommendation = async (file: File) => {
		const base64 = await fileToBase64(file); // Or use directly if already available
		const mimeType = file.type || 'application/pdf';

		const finalPrompt = investmentRecommendationPrompt
			.replace('{base64}', base64)
			.replace('{mimeType}', mimeType)
			.replace('{investmentType}', selectedOption ?? '')
			.replace(
				'{formatInstructions}',
				JSON.stringify(
					{
						keyRecommendations: 'string[] - top strategic recommendations tailored to the investment stage',
					},
					null,
					2
				)
			);

		const result = await analyzeWithGemini(
			finalPrompt,
			recommendationSchema,
    );
    
		console.log(result);
  };

  const handleFileUpload = async (file: File) => {
		setIsFileSelected(true);
    getInvestmentRecommendation(file);
		if (!selectedOption) {
			alert('Please select an investment type first');
			return;
		}

		console.log(`Uploading file:`, file.name);
		setIsAnalyzing(true);

		// Store analysis data in sessionStorage for the analysis page
		const analysisData = {
			type: 'file',
			source: file.name,
			investmentType: selectedOption,
			timestamp: new Date().toISOString(),
		};
		sessionStorage.setItem('analysisData', JSON.stringify(analysisData));

		// Save file to IndexedDB for later retrieval
		try {
			const base64Data = await fileToBase64(file);
			await saveFile(file.name, base64Data);
			console.log(`File ${file.name} saved successfully.`);
		} catch (error) {
			console.error('Error saving file:', error);
			alert('Failed to save file. Please try again.');
			return;
		}

		// Navigate to analysis loading page
		router.push('/analysis/loading');
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleAnalysisClick(e as any)
  }

  const handleAnalysisClick = async (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!selectedOption) {
      alert("Please select an investment type first")
      return
    }

    console.log(`Starting analysis for investment type:`, selectedOption)
    setIsAnalyzing(true)

    // Store analysis data in sessionStorage for the analysis page
    const analysisData = {
      type: linkInput.trim() ? "link" : "general",
      source: linkInput.trim() || `${selectedOption} analysis`,
      investmentType: selectedOption,
      timestamp: new Date().toISOString(),
    }
    sessionStorage.setItem("analysisData", JSON.stringify(analysisData))

    // Navigate to analysis loading page
    router.push("/analysis/loading")
  }

  const handleLinkInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    setLinkInput(e.target.value)
  }

  const handleLinkInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.stopPropagation()
  }

  const handleLinkInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation()
  }

  const handleLinkInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
    if (e.key === "Enter") {
      e.preventDefault()
      handleAnalysisClick(e as any)
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-6">
              <div className="w-12 h-12 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-light text-gray-900 mb-2 tracking-tight">Loading Investment Toolkit</h3>
            <p className="text-sm text-gray-600">Preparing your workspace</p>
          </div>
        </div>
      </div>
    )
  }

  // Define breadcrumbs for dashboard
  const breadcrumbs = [
    {
      label: "Dashboard",
      href: "/dashboard/main",
      isActive: true,
    },
  ]

  const WelcomeSection = () => (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">Welcome back, Nasser</h1>
          <p className="text-gray-600 text-lg">Skip manual research. Find and assess companies 10x faster.</p>
        </div>
      </div>
    </div>
  )

  const StatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      <Card className="hover:shadow-lg transition-all duration-300 border-gray-100 rounded-xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-2 font-medium tracking-wide">Value Assessed</p>
              <p className="text-3xl font-light text-gray-900">${portfolioStats.portfolioValue}</p>
            </div>
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
              <PieChart className="h-7 w-7 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-6 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-green-600 font-medium">+{portfolioStats.monthlyGrowth}%</span>
            <span className="text-gray-500 ml-2">vs last quarter</span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-300 border-gray-100 rounded-xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-2 font-medium tracking-wide">Active Deals</p>
              <p className="text-3xl font-light text-gray-900">{portfolioStats.activeDeals}</p>
            </div>
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center">
              <Activity className="h-7 w-7 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center mt-6 text-sm">
            <span className="text-gray-500">In pipeline</span>
          </div>
        </CardContent>
      </Card>

      <div
        onClick={() => {
          // Navigate to pipeline page or show pipeline modal
          console.log("Navigate to pipeline of opportunities")
          // router.push('/dashboard/pipeline'); // Uncomment when pipeline page is ready
        }}
        className="block"
      >
        <Card className="hover:shadow-xl transition-all duration-300 border-gray-100 rounded-xl cursor-pointer group transform hover:scale-[1.02] hover:border-blue-200">
          <CardContent className="p-8 relative overflow-hidden">
            {/* Background gradient overlay for hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/0 group-hover:from-blue-50/30 group-hover:to-blue-100/20 transition-all duration-300 rounded-xl"></div>

            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm text-gray-500 mb-2 font-medium tracking-wide group-hover:text-blue-600 transition-colors duration-300">
                  Opportunity Signals
                </p>
                <p className="text-3xl font-light text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
                  12
                </p>
              </div>
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                <Target className="h-7 w-7 text-green-600 group-hover:text-blue-600 transition-all duration-300" />
              </div>
            </div>
            <div className="mt-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 group-hover:text-blue-600 transition-colors duration-300 text-sm">
                  News tracking
                </span>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </div>

            {/* Subtle click indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-xl"></div>
          </CardContent>
        </Card>
      </div>

      <div
        onClick={() => {
          // Navigate to investment criteria settings page
          router.push("/dashboard/criteria")
        }}
        className="block"
      >
        <Card className="hover:shadow-lg transition-all duration-300 border-purple-200 rounded-xl cursor-pointer group transform hover:scale-[1.03] hover:border-purple-300 bg-gradient-to-br from-purple-50/50 to-purple-100/30">
          <CardContent className="p-8 relative overflow-hidden">
            {/* Background pattern for visual distinction */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
              <div className="absolute top-3 right-3 w-12 h-12 border border-purple-300 rounded-full"></div>
              <div className="absolute bottom-3 left-3 w-6 h-6 border border-purple-300 rounded-full"></div>
            </div>

            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm text-purple-600 mb-2 font-medium tracking-wide group-hover:text-purple-700 transition-colors duration-300">
                  Investment Thesis
                </p>
                <p className="text-3xl font-light text-purple-900 group-hover:text-purple-800 transition-colors duration-300">
                  Settings
                </p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                <Shield className="h-7 w-7 text-purple-600 group-hover:text-purple-700 transition-all duration-300" />
              </div>
            </div>
            <div className="flex items-center mt-6 text-sm relative z-10">
              <span className="text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
                Customize settings
              </span>
              <ArrowUpRight className="h-4 w-4 text-purple-500 group-hover:text-purple-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ml-auto" />
            </div>

            {/* Subtle click indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-xl"></div>

            {/* Hover glow effect */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: "0 0 20px rgba(147, 51, 234, 0.1)" }}
            ></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const InvestmentToolkitSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Recent Assessments - Minimalistic Redesign */}
      <Card className="border-gray-100 rounded-xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 px-8 py-6 border-b border-gray-50">
          <div>
            <CardTitle className="text-xl font-medium text-gray-900">Recent Assessments</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Latest investment evaluations.</p>
          </div>
          {/* Filter Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Filter by company or stage..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 text-xs border border-gray-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200 bg-white h-9"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-gray-50">
            {filteredAssessments.map((assessment, index) => (
              <div
                key={assessment.id}
                className="group px-8 py-4 hover:bg-gray-25 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  {/* Company Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                        {assessment.company}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`text-xs font-normal px-2 py-0.5 border ${
                          assessment.stage === "New Build"
                            ? "bg-gray-50 text-gray-700 border-gray-200"
                            : assessment.stage === "Seed"
                              ? "bg-gray-50 text-gray-700 border-gray-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        {assessment.stage}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{assessment.fundingAmount}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>
                        {new Date(assessment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Status and View Button */}
                  <div className="flex items-center space-x-4">
                    {/* Status Indicator */}
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          assessment.decision === "INVEST"
                            ? "bg-green-400/60"
                            : assessment.decision === "WATCHLIST"
                              ? "bg-blue-400/60"
                              : assessment.decision === "DUE_DILIGENCE"
                                ? "bg-purple-400/60"
                                : assessment.decision === "REVIEW"
                                  ? "bg-orange-400/60"
                                  : "bg-red-400/60"
                        }`}
                      ></div>
                      <span
                        className={`text-sm font-medium ${
                          assessment.decision === "INVEST"
                            ? "text-green-600/80"
                            : assessment.decision === "WATCHLIST"
                              ? "text-blue-600/80"
                              : assessment.decision === "DUE_DILIGENCE"
                                ? "text-purple-600/80"
                                : assessment.decision === "REVIEW"
                                  ? "text-orange-600/80"
                                  : "text-red-600/80"
                        }`}
                      >
                        {assessment.decision === "INVEST"
                          ? "Invested"
                          : assessment.decision === "WATCHLIST"
                            ? "Watchlist"
                            : assessment.decision === "DUE_DILIGENCE"
                              ? "Due Diligence"
                              : assessment.decision === "REVIEW"
                                ? "Under Review"
                                : "Declined"}
                      </span>
                    </div>

                    {/* View Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 rounded-lg h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button at Bottom - Aligned with Filter */}
          <div className="px-8 py-4 border-t border-gray-50 bg-gray-25">
            <div className="flex justify-end">
              <Link href="/dashboard/assessments">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg px-3 h-9 text-xs"
                >
                  View all assessments
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complete Investment Toolkit */}
      <Card className="border-gray-100 rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 px-8 py-6 border-b border-gray-50">
          <div>
            <CardTitle className="text-xl font-medium text-gray-900">Scoring Engine</CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Select an investment type and drag & drop files or paste links.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-8 pb-8">
          {/* Refined Investment Options */}
          <div className="space-y-3">
            {investmentOptions.map((option) => {
              const IconComponent = option.icon
              const isSelected = selectedOption === option.id

              return (
                <div
                  key={option.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedOption(option.id)
                  }}
                  className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ease-out transform ${
                    isSelected
                      ? "scale-[1.01] shadow-md border-2 border-gray-300 bg-gray-50/80"
                      : "hover:scale-[1.005] hover:shadow-sm border border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  {/* Subtle Background Overlay */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      isSelected ? "opacity-100" : ""
                    }`}
                    style={{
                      background: isSelected
                        ? "linear-gradient(135deg, rgba(148, 163, 184, 0.03), rgba(148, 163, 184, 0.08))"
                        : "linear-gradient(135deg, rgba(148, 163, 184, 0.01), rgba(148, 163, 184, 0.03))",
                    }}
                  />

                  {/* Content */}
                  <div className="relative p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Refined Icon Container */}
                        <div
                          className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform ${
                            isSelected
                              ? "bg-gray-100 scale-105 shadow-sm"
                              : "bg-gray-50 group-hover:bg-gray-100 group-hover:scale-102"
                          }`}
                        >
                          <IconComponent
                            className={`h-6 w-6 transition-all duration-300 ${
                              isSelected ? "text-gray-700" : "text-gray-600 group-hover:text-gray-700"
                            }`}
                          />
                        </div>

                        {/* Text Content */}
                        <div className="flex-1">
                          <h4
                            className={`font-medium text-base transition-all duration-300 ${
                              isSelected ? "text-gray-900" : "text-gray-800 group-hover:text-gray-900"
                            }`}
                          >
                            {option.title}
                          </h4>
                          <p
                            className={`text-sm mt-1 transition-all duration-300 ${
                              isSelected ? "text-gray-600" : "text-gray-500 group-hover:text-gray-600"
                            }`}
                          >
                            {option.description}
                          </p>
                        </div>
                      </div>

                      {/* Refined Selection Indicator */}
                      <div className="relative">
                        <div
                          className={`w-5 h-5 rounded-full border-2 transition-all duration-300 transform flex items-center justify-center ${
                            isSelected
                              ? "border-gray-400 bg-gray-600 scale-110"
                              : "border-gray-300 group-hover:border-gray-400 group-hover:scale-105"
                          }`}
                        >
                          {isSelected && (
                            <CheckCircle2 className="w-3 h-3 text-white transition-transform duration-200" />
                          )}
                        </div>

                        {/* Subtle Selection Pulse */}
                        {isSelected && (
                          <div className="absolute inset-0 rounded-full bg-gray-400 opacity-20 animate-ping" />
                        )}
                      </div>
                    </div>

                    {/* Subtle Bottom Accent */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${
                        isSelected ? "opacity-100 bg-gray-300" : "opacity-0 group-hover:opacity-40 bg-gray-200"
                      }`}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* File Upload & Link Input Area - Always Visible */}
          <div className="mt-6 space-y-4">
            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-4 text-center transition-all duration-300 ${
                dragOver ? "border-blue-400 bg-blue-50 scale-[1.01]" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Upload className={`h-5 w-5 mx-auto mb-2 ${dragOver ? "text-blue-600" : "text-gray-400"}`} />
              <p className={`text-sm font-medium mb-1 ${dragOver ? "text-blue-700" : "text-gray-700"}`}>
                Drag & drop files here
              </p>
              <p className="text-xs text-gray-500 mb-2">Supports PDF, DOC, DOCX files</p>
              <input
                type="file"
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(file)
                }}
              />
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent hover:bg-gray-50"
                disabled={isAnalyzing}
                onClick={(e) => {
                  e.stopPropagation()
                  document.getElementById("file-upload")?.click()
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                {isAnalyzing ? "Processing..." : "Browse Files"}
              </Button>
            </div>

            {/* Link Input with Enhanced Analysis Button */}
            <div className="relative">
              <form onSubmit={handleLinkSubmit} className="flex space-x-3">
                <div className="flex-1 relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" />
                  <input
                    type="url"
                    placeholder="(Optional) Company website or data room link"
                    value={linkInput}
                    onChange={handleLinkInputChange}
                    onFocus={handleLinkInputFocus}
                    onClick={handleLinkInputClick}
                    onKeyDown={handleLinkInputKeyDown}
                    onPaste={(e) => e.stopPropagation()}
                    disabled={isAnalyzing}
                    className="pl-10 pr-4 py-3 w-full text-xs border border-gray-300 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200 bg-white h-12 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
                <Button
                  type="button"
                  disabled={!selectedOption || !isFileSelected || isAnalyzing}
                  onClick={handleAnalysisClick}
                  className={`group relative overflow-hidden rounded-xl px-8 h-12 text-sm font-semibold min-w-[140px] transition-all duration-300 transform ${
                    !selectedOption || !isFileSelected || isAnalyzing
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-lg active:scale-95"
                  }`}
                >
                  {isAnalyzing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 relative z-10">
                      <Zap className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      <span>Analysis</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  )}

                  {/* Enhanced Hover Effects */}
                  {!isAnalyzing && selectedOption && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 group-hover:animate-pulse rounded-xl"></div>
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                      ></div>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header breadcrumbs={breadcrumbs} user={user} notifications={notifications} />

        <main className="max-w-7xl mx-auto px-8 py-10">
          <WelcomeSection />
          <StatsCards />
          <InvestmentToolkitSection />
        </main>
      </div>
    </ProtectedRoute>
  )
}
