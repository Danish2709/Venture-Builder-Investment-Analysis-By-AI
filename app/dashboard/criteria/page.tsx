"use client"

import { useState, useEffect, type ChangeEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save, CheckCircle2, Target, Globe, Settings, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/common/Header"
import { SessionManager } from "@/utils/sessionManager"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"

function formatNumber(value: string): string {
  if (!value) return ""
  const cleanNumber = value.replace(/\D/g, "")
  if (!cleanNumber) return ""
  return cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function stripCommas(value: string): string {
  return value.replace(/,/g, "")
}

interface CriteriaState {
  fundingStages: string[]
  minFunding: string
  maxFunding: string
  targetSectors: string[]
  geographicRegions: string[]
  customCriteria: Array<{
    id: string
    name: string
    value: string
    type: "text" | "number" | "select"
    options?: string[]
  }>
}

export default function InvestmentThesisPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [user, setUser] = useState({
    name: "Admin",
    lastLogin: "2025-01-05T08:30:00Z",
  })

  const [notifications] = useState([
    {
      id: 1,
      type: "assessment",
      message: "New assessment completed for Tamara",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      type: "alert",
      message: "Risk threshold exceeded for Tabby",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "system",
      message: "Weekly portfolio report available",
      time: "2 hours ago",
      unread: false,
    },
  ])

  const [criteria, setCriteria] = useState<CriteriaState>({
    fundingStages: ["seed", "series-a"],
    minFunding: "125000",
    maxFunding: "10000000",
    targetSectors: ["fintech", "proptech"],
    geographicRegions: ["saudi-arabia", "gcc"],
    customCriteria: [],
  })

  const fundingStageOptions = [
    { id: "new-venture-build", label: "New Venture Build" },
    { id: "seed", label: "Seed" },
    { id: "series-a", label: "Series A" },
  ]

  const sectorOptions = [
    { id: "fintech", label: "Fintech" },
    { id: "proptech", label: "PropTech" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "cyber", label: "Cyber" },
    { id: "saas", label: "SaaS" },
    { id: "marketplace", label: "Marketplace" },
    { id: "gaming", label: "Gaming" },
  ]

  const regionOptions = [
    { id: "saudi-arabia", label: "Saudi Arabia" },
    { id: "gcc", label: "GCC" },
    { id: "mena", label: "MENA" },
  ]

  const scoringCategories = [
    {
      id: "team-composition",
      title: "Team Composition",
      sentences: [
        "Founding team has relevant industry experience and complementary skill sets.",
        "Track record of execution demonstrates ability to deliver on milestones.",
        "Advisory board provides strategic guidance and industry connections.",
        "Organizational structure supports scalable growth and decision-making.",
        "Expertise in navigating regional regulatory processes and applications.",
      ],
    },
    {
      id: "market-intelligence",
      title: "Market Intelligence",
      sentences: [
        "TAM size indicates significant growth potential.",
        "Market timing aligns with current trends and technological adoption cycles.",
        "Competitive landscape analysis shows clear differentiation opportunities.",
        "Customer demand validation through early traction and pilot programs.",
        "Market penetration strategy demonstrates clear path to scale.",
      ],
    },
    {
      id: "product-development",
      title: "Product Development",
      sentences: [
        "Technology stack is scalable and defensible against competitors.",
        "Product roadmap aligns with market needs and customer feedback.",
        "Technical team has capability to execute on product vision.",
        "Product-market fit evidenced by strong customer retention and satisfaction.",
        "Intellectual property portfolio provides competitive moats and barriers.",
      ],
    },
    {
      id: "financial-data",
      title: "Financial Data",
      sentences: [
        "Revenue growth demonstrates consistent upward trajectory over the past 3 years.",
        "CAC to LTV ratio demonstrates sustainable unit economics.",
        "Cash flow generation shows the company's ability to self-fund operations.",
        "Burn rate analysis reveals efficient capital allocation and runway management.",
        "Financial projections are realistic and based on solid assumptions.",
      ],
    },
    {
      id: "legal-compliance",
      title: "Legal & Compliance",
      sentences: [
        "Regulatory compliance framework addresses current and future requirements.",
        "Intellectual property rights are properly secured and documented.",
        "Corporate governance structure meets industry standards and best practices.",
        "Data privacy and security protocols comply with relevant regulations.",
        "Legal risk assessment identifies and mitigates potential liabilities.",
      ],
    },
    {
      id: "company-ops",
      title: "Company Ops",
      sentences: [
        "Revenue per employee meet GCC fintech benchmarks.",
        "Employee compensation is competitive within GCC.",
        "Demonstrate retention of key talent through funding rounds.",
        "Policies and systems ensures operational efficiency and regulatory compliance.",
        "Organizational chart demonstrates clear structure for scalable growth.",
      ],
    },
  ]

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set<string>()

      // If the clicked category is already expanded, close it (empty set)
      // If it's not expanded, open only this category
      if (!prev.has(categoryId)) {
        newSet.add(categoryId)
      }

      return newSet
    })
  }

  useEffect(() => {
    const loadCriteriaData = async () => {
      try {
        const validation = SessionManager.validateSession()
        if (!validation.isValid) {
          router.replace("/auth/login")
          return
        }

        if (validation.session) {
          setUser((prev) => ({
            ...prev,
            name: validation.session!.username,
            lastLogin: validation.session!.loginTime,
          }))
        }

        const savedCriteria = localStorage.getItem("investmentCriteria")
        if (savedCriteria) {
          setCriteria(JSON.parse(savedCriteria))
        }

        await new Promise((resolve) => setTimeout(resolve, 800))
        setIsLoading(false)
      } catch (error) {
        console.error("Criteria loading error:", error)
        router.replace("/auth/login")
      }
    }

    loadCriteriaData()
  }, [router])

  const handleSaveCriteria = async () => {
    setIsSaving(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      localStorage.setItem("investmentCriteria", JSON.stringify(criteria))
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error("Save error:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const toggleArrayItem = (array: string[], item: string, setter: (newArray: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter((i) => i !== item))
    } else {
      setter([...array, item])
    }
  }

  const addCustomCriteria = () => {
    const newCriteria = {
      id: Date.now().toString(),
      name: "",
      value: "",
      type: "text" as const,
    }
    setCriteria((prev) => ({
      ...prev,
      customCriteria: [...prev.customCriteria, newCriteria],
    }))
  }

  const updateCustomCriteria = (id: string, field: string, value: string) => {
    setCriteria((prev) => ({
      ...prev,
      customCriteria: prev.customCriteria.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }))
  }

  const removeCustomCriteria = (id: string) => {
    setCriteria((prev) => ({
      ...prev,
      customCriteria: prev.customCriteria.filter((item) => item.id !== id),
    }))
  }

  const handleFundingChange = (e: ChangeEvent<HTMLInputElement>, field: "minFunding" | "maxFunding") => {
    const inputValue = e.target.value
    const cleanValue = stripCommas(inputValue)

    if (cleanValue === "" || /^\d+$/.test(cleanValue)) {
      setCriteria((prev) => ({ ...prev, [field]: cleanValue }))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-8">
              <div className="w-8 h-8 border-2 border-gray-100 border-t-gray-400 rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-light text-gray-900 tracking-tight">Loading Investment Thesis</h3>
          </div>
        </div>
      </div>
    )
  }

  const breadcrumbs = [
    {
      label: "Dashboard",
      href: "/dashboard/main",
      isActive: false,
    },
    {
      label: "Investment Thesis",
      href: "/dashboard/criteria",
      isActive: true,
    },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <Header breadcrumbs={breadcrumbs} user={user} notifications={notifications} />

        <main className="max-w-6xl mx-auto px-8 py-16 scroll-smooth">
          <div className="mb-16">
            <h1 className="text-3xl font-light text-gray-900 mb-2 tracking-tight">Investment Thesis</h1>
            <p className="text-gray-500 font-light">Configure your investment parameters and screening criteria</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border border-gray-100 rounded-2xl shadow-sm bg-white">
              <CardHeader className="px-6 py-5 border-b border-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center">
                    <Target className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
                      Funding Criteria
                    </CardTitle>
                    <p className="text-sm text-blue-600 mt-1 font-light hover:text-blue-800 transition-colors cursor-default">
                      Funding stage &amp; amount requirements
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 py-5">
                <div className="space-y-5">
                  <div>
                    <Label className="text-xs font-medium text-gray-700 mb-3 block">Funding Stages</Label>
                    <div className="flex flex-wrap gap-2">
                      {fundingStageOptions.map((stage) => (
                        <Badge
                          key={stage.id}
                          variant="outline"
                          className={`cursor-pointer transition-all duration-200 px-4 py-2 text-xs font-medium border ${
                            criteria.fundingStages.includes(stage.id)
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            toggleArrayItem(criteria.fundingStages, stage.id, (newStages) =>
                              setCriteria((prev) => ({ ...prev, fundingStages: newStages })),
                            )
                          }
                        >
                          {stage.label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minFunding" className="text-xs font-medium text-gray-700 mb-3 block">
                        Min Funding ($)
                      </Label>
                      <Input
                        id="minFunding"
                        type="text"
                        inputMode="numeric"
                        placeholder="125,000"
                        value={formatNumber(criteria.minFunding)}
                        onChange={(e) => handleFundingChange(e, "minFunding")}
                        className="border-gray-200 focus:border-gray-400 focus:ring-0 rounded-lg py-2 px-3 text-sm font-light"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxFunding" className="text-xs font-medium text-gray-700 mb-3 block">
                        Max Funding ($)
                      </Label>
                      <Input
                        id="maxFunding"
                        type="text"
                        inputMode="numeric"
                        placeholder="10,000,000"
                        value={formatNumber(criteria.maxFunding)}
                        onChange={(e) => handleFundingChange(e, "maxFunding")}
                        className="border-gray-200 focus:border-gray-400 focus:ring-0 rounded-lg py-2 px-3 text-sm font-light"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 rounded-2xl shadow-sm bg-white">
              <CardHeader className="px-6 py-5 border-b border-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center">
                    <Globe className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
                      Market Criteria
                    </CardTitle>
                    <p className="text-sm text-green-600 mt-1 font-light hover:text-green-800 transition-colors cursor-default">
                      Sub-sectors &amp; geography
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-6 py-5">
                <div className="space-y-5">
                  <div>
                    <Label className="text-xs font-medium text-gray-700 mb-3 block">Target Sectors</Label>
                    <div className="flex flex-wrap gap-2">
                      {sectorOptions.map((sector) => (
                        <Badge
                          key={sector.id}
                          variant="outline"
                          className={`cursor-pointer transition-all duration-200 px-4 py-2 text-xs font-medium border ${
                            criteria.targetSectors.includes(sector.id)
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            toggleArrayItem(criteria.targetSectors, sector.id, (newSectors) =>
                              setCriteria((prev) => ({ ...prev, targetSectors: newSectors })),
                            )
                          }
                        >
                          {sector.label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-gray-700 mb-3 block">Geographic Regions</Label>
                    <div className="flex flex-wrap gap-2">
                      {regionOptions.map((region) => (
                        <Badge
                          key={region.id}
                          variant="outline"
                          className={`cursor-pointer transition-all duration-200 px-4 py-2 text-xs font-medium border ${
                            criteria.geographicRegions.includes(region.id)
                              ? "bg-gray-900 text-white border-gray-900"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            toggleArrayItem(criteria.geographicRegions, region.id, (newRegions) =>
                              setCriteria((prev) => ({ ...prev, geographicRegions: newRegions })),
                            )
                          }
                        >
                          {region.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 rounded-2xl shadow-sm bg-white">
              <CardHeader className="px-6 py-5 border-b border-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center">
                      <Settings className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-semibold text-gray-900 tracking-tight">
                        Custom Criteria
                      </CardTitle>
                      <p className="text-sm text-purple-600 mt-1 font-light hover:text-purple-800 transition-colors cursor-default">
                        Qualifying score
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={addCustomCriteria}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 p-1.5 h-auto"
                  ></Button>
                </div>
              </CardHeader>
              <CardContent className="px-6 py-5">
                <div className="space-y-4">
                  {scoringCategories.map((category) => (
                    <div key={category.id} className="border border-gray-100 rounded-xl bg-gray-50 overflow-hidden">
                      <div
                        className="flex items-center justify-between py-3 px-4 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <h4 className="text-xs font-medium text-gray-900">{category.title}</h4>
                        <div className="flex items-center space-x-2">
                          <div className="relative">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="0"
                              className="h-6 w-12 text-xs border-gray-200 focus:border-gray-400 focus:ring-0 rounded-md px-1 pr-3"
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => e.stopPropagation()}
                            />
                            <span className="absolute right-1 top-0 h-6 flex items-center text-xs text-gray-400 pointer-events-none">
                              %
                            </span>
                          </div>
                          <Plus
                            className={`h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out ${
                              expandedCategories.has(category.id) ? "rotate-45" : ""
                            }`}
                          />
                        </div>
                      </div>
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          expandedCategories.has(category.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-4 pb-6 pt-2">
                          <div className="space-y-3">
                            {category.sentences.map((sentence, index) => (
                              <p
                                key={index}
                                className="text-xs text-gray-600 leading-relaxed pl-2 border-l-2 border-gray-200"
                              >
                                {sentence}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {criteria.customCriteria.length === 0 && scoringCategories.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <Button
                        onClick={addCustomCriteria}
                        variant="outline"
                        size="sm"
                        className="w-full text-gray-600 border-gray-200 hover:bg-gray-50 bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Custom Criteria
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              onClick={handleSaveCriteria}
              disabled={isSaving}
              variant="outline"
              className={`px-6 py-2 text-sm font-normal transition-all duration-200 ${
                saveSuccess
                  ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {isSaving ? (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving</span>
                </div>
              ) : saveSuccess ? (
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Saved</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="w-3 h-3" />
                  <span>Save Changes</span>
                </div>
              )}
            </Button>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
