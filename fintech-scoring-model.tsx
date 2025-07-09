"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowRight, Check, XCircle } from "lucide-react"

import { HikmaLogo } from "@/components/common/Logo"
import { ScoreSelector } from "@/components/common/ScoreSelector"
import { StepIndicator } from "@/components/assessment/StepIndicator"
import { NavigationControls } from "@/components/assessment/NavigationControls"
import { useAssessment } from "@/hooks/useAssessment"
import { calculateCategoryScore } from "@/utils/scoreCalculations"
import { getRiskLevel } from "@/utils/decisionEngine"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { SessionManager } from "@/utils/sessionManager"

/**
 * Main Hikma Investment Scoring Engine Component with enhanced interactivity
 */
const EnhancedScoringModel: React.FC = () => {
  const {
    currentStep,
    assessmentMode,
    stage,
    scores,
    riskScores,
    currentCategoryIndex,
    currentFramework,
    currentRiskFramework,
    totalScore,
    recommendation,
    allCategories,
    updateAssessmentMode,
    updateStage,
    updateScore,
    updateRiskScore,
    canProceed,
    handleContinue,
    handlePrevious,
    getButtonText,
  } = useAssessment()

  const handleLogout = () => {
    SessionManager.clearSession()
    window.location.href = "/auth/login"
  }

  /**
   * Renders the setup step with enhanced interactive elements
   */
  const renderSetupStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-light text-gray-900 mb-6">Assessment Configuration</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">Assessment Mode</label>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => updateAssessmentMode("direct-investment")}
                className={`p-4 rounded-lg border text-left transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                  assessmentMode === "direct-investment"
                    ? "border-teal-600 bg-teal-50 shadow-sm"
                    : "border-gray-200 hover:border-teal-300 hover:bg-teal-25"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 text-gray-600 transition-transform duration-200 hover:scale-110">🛡️</div>
                  <div>
                    <div className="font-medium text-gray-900">Direct Investment</div>
                    <div className="text-sm text-gray-600">Evaluate external startups for investment</div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => updateAssessmentMode("venture-build")}
                className={`p-4 rounded-lg border text-left transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                  assessmentMode === "venture-build"
                    ? "border-teal-600 bg-teal-50 shadow-sm"
                    : "border-gray-200 hover:border-teal-300 hover:bg-teal-25"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 text-gray-600 transition-transform duration-200 hover:scale-110">🚀</div>
                  <div>
                    <div className="font-medium text-gray-900">Venture Build</div>
                    <div className="text-sm text-gray-600">Assess internal development opportunities</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {assessmentMode === "direct-investment" && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">Investment Stage</label>
              <select
                value={stage}
                onChange={(e) => updateStage(e.target.value as any)}
                className="w-full h-12 px-3 border border-gray-300 rounded-md focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 hover:border-teal-400 transition-all duration-200"
              >
                <option value="seed">Pre-seed / Seed</option>
                <option value="seriesA">Series A</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="lg:pl-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Assessment Overview</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-transparent hover:border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Categories to Evaluate</div>
            <div className="text-2xl font-light text-gray-900">
              {allCategories.length + Object.keys(currentRiskFramework).length}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-transparent hover:border-gray-200">
            <div className="text-sm text-gray-600 mb-1">
              {assessmentMode === "direct-investment" ? "Investment" : "Build"} Threshold
            </div>
            <div className="text-2xl font-light text-gray-900">
              {assessmentMode === "direct-investment" ? "80+" : "85+"}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 border border-transparent hover:border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Focus Areas</div>
            <div className="text-sm text-gray-700">
              {assessmentMode === "direct-investment"
                ? "Founder assessment, market validation, external team evaluation"
                : "Internal capabilities, strategic fit, resource allocation, execution risk"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  /**
   * Renders the scoring step with enhanced card interactions
   */
  const renderScoringStep = () => {
    const currentCategory = allCategories[currentCategoryIndex]
    if (!currentCategory) return null

    const [categoryName, categoryData] = currentCategory
    const { average, completion } = calculateCategoryScore(categoryName, categoryData, scores)
    const IconComponent = categoryData.icon

    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-teal-100 rounded-lg hover:bg-teal-200 transition-colors duration-200">
              <IconComponent className="w-6 h-6 text-teal-700" />
            </div>
            <div>
              <h2 className="text-2xl font-light text-gray-900">{categoryName}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Weight: {categoryData.weight}%</span>
                <span>•</span>
                <span>
                  {currentCategoryIndex + 1} of {allCategories.length}
                </span>
                <span>•</span>
                <span className="capitalize">{assessmentMode.replace("-", " ")}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-light text-gray-900">{average > 0 ? average.toFixed(1) : "—"}</div>
            <div className="text-sm text-gray-600">Category Score</div>
            <Progress value={completion} className="w-24 h-1 mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(categoryData.criteria).map(([criterion, details]) => (
            <Card
              key={criterion}
              className="border-0 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 group"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2 group-hover:text-teal-700 transition-colors duration-200">
                      {criterion}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{details.description}</p>
                    <div className="bg-gray-50 rounded p-3 group-hover:bg-teal-50 transition-colors duration-200">
                      <p className="text-xs text-gray-700">{details.guide}</p>
                    </div>
                  </div>
                  <ScoreSelector
                    value={scores[categoryName]?.[criterion]}
                    onValueChange={(value) => updateScore(categoryName, criterion, value)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  /**
   * Renders the risk assessment step with enhanced visual feedback
   */
  const renderRiskStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-light text-gray-900 mb-2">Risk Assessment</h2>
        <p className="text-gray-600">
          Evaluate {assessmentMode === "direct-investment" ? "investment" : "venture build"} risk factors using weighted
          scoring (1=High Risk, 5=Low Risk)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(currentRiskFramework).map(([categoryName, categoryData]) => {
          const { average } = calculateCategoryScore(categoryName, categoryData, riskScores)
          const IconComponent = categoryData.icon

          return (
            <Card
              key={categoryName}
              className="border-0 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 group"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg transition-all duration-200 group-hover:scale-110 ${
                        categoryName.includes("Critical")
                          ? "bg-red-100 group-hover:bg-red-200"
                          : categoryName.includes("High")
                            ? "bg-orange-100 group-hover:bg-orange-200"
                            : categoryName.includes("Medium")
                              ? "bg-yellow-100 group-hover:bg-yellow-200"
                              : "bg-green-100 group-hover:bg-green-200"
                      }`}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${
                          categoryName.includes("Critical")
                            ? "text-red-600"
                            : categoryName.includes("High")
                              ? "text-orange-600"
                              : categoryName.includes("Medium")
                                ? "text-yellow-600"
                                : "text-green-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-200">
                        {categoryName}
                      </h3>
                      <div className="text-sm text-gray-600">Weight: {categoryData.weight}%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-light text-gray-900">{average > 0 ? average.toFixed(1) : "—"}</div>
                    <div className="text-xs text-gray-600">Risk Score</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(categoryData.criteria).map(([criterion, details]) => (
                    <div
                      key={criterion}
                      className="border-t border-gray-100 pt-4 first:border-t-0 first:pt-0 hover:bg-gray-25 -mx-2 px-2 py-2 rounded transition-colors duration-200"
                    >
                      <div className="mb-3">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{criterion}</h4>
                        <p className="text-xs text-gray-600 mb-2">{details.description}</p>
                        <div className="bg-gray-50 rounded p-2 mb-2 hover:bg-gray-100 transition-colors duration-200">
                          <p className="text-xs text-gray-700">{details.guide}</p>
                        </div>
                        {details.factors && (
                          <div className="bg-red-50 rounded p-2 hover:bg-red-100 transition-colors duration-200">
                            <p className="text-xs font-medium text-red-800 mb-1">Key Risk Factors:</p>
                            <ul className="text-xs text-red-700 space-y-0.5">
                              {details.factors.map((factor, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-red-600 mr-1">•</span>
                                  <span>{factor}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <ScoreSelector
                        value={riskScores[categoryName]?.[criterion]}
                        onValueChange={(value) => updateRiskScore(categoryName, criterion, value)}
                        className="w-20 h-8"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="mt-6 border-teal-200 bg-teal-50 hover:bg-teal-100 transition-colors duration-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-teal-600" />
              <span className="font-medium text-teal-900">Risk Impact Analysis</span>
            </div>
            <Badge
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-colors duration-200"
            >
              -{totalScore.riskImpact.toFixed(1)} points
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(currentRiskFramework).map(([categoryName, categoryData]) => {
              const { average } = calculateCategoryScore(categoryName, categoryData, riskScores)
              const { riskLevel, riskColor } = getRiskLevel(average)

              return (
                <div
                  key={categoryName}
                  className="text-center p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
                >
                  <div className={`text-lg font-medium ${riskColor}`}>{riskLevel}</div>
                  <div className="text-xs text-gray-600">{categoryName.replace(" Risk", "")}</div>
                  <div className="text-sm text-gray-700">{average > 0 ? average.toFixed(1) : "—"}/5</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  /**
   * Renders the results step with minimalistic design matching the rest of the application
   */
  const renderResultsStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Decision & Score */}
        <div>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <recommendation.icon
                className={`w-12 h-12 ${recommendation.color} hover:scale-110 transition-transform duration-200`}
              />
            </div>
            <h2 className={`text-3xl font-light mb-2 ${recommendation.color}`}>{recommendation.decision}</h2>
            <p className="text-gray-600">{recommendation.message}</p>
            <div className="text-sm text-gray-500 mt-2 capitalize">{assessmentMode.replace("-", " ")} Assessment</div>
          </div>

          <Card
            className={`border-0 shadow-sm hover:shadow-md transition-shadow duration-200 ${recommendation.bgColor}`}
          >
            <CardContent className="p-8">
              <div className="text-center">
                <div className="text-5xl font-light text-gray-900 mb-2">{totalScore.score.toFixed(1)}</div>
                <div className="text-gray-600 mb-4">
                  {assessmentMode === "direct-investment" ? "Investment" : "Build"} Score
                </div>
                <Progress value={totalScore.score} className="w-full h-2" />
                <div className="grid grid-cols-4 gap-4 mt-6 text-center">
                  <div className="hover:bg-white hover:rounded-lg hover:shadow-sm transition-all duration-200 p-2">
                    <div className="text-xl font-light text-gray-900">{totalScore.completion.toFixed(0)}%</div>
                    <div className="text-xs text-gray-600">Complete</div>
                  </div>
                  <div className="hover:bg-white hover:rounded-lg hover:shadow-sm transition-all duration-200 p-2">
                    <div className="text-xl font-light text-gray-900">-{totalScore.riskImpact.toFixed(1)}</div>
                    <div className="text-xs text-gray-600">Risk Impact</div>
                  </div>
                  <div className="hover:bg-white hover:rounded-lg hover:shadow-sm transition-all duration-200 p-2">
                    <div className="text-xl font-light text-gray-900">
                      {assessmentMode === "direct-investment" ? "80+" : "85+"}
                    </div>
                    <div className="text-xs text-gray-600">Threshold</div>
                  </div>
                  <div className="hover:bg-white hover:rounded-lg hover:shadow-sm transition-all duration-200 p-2">
                    <div className="text-xl font-light text-gray-900">
                      {(totalScore.score + totalScore.riskImpact).toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-600">Pre-Risk</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Category Breakdown & Next Steps */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <h3 className="font-medium text-gray-900 mb-4">Category Breakdown</h3>
              <div className="space-y-3">
                {[...allCategories, ...Object.entries(currentRiskFramework)].map(([categoryName, categoryData]) => {
                  const { average } = calculateCategoryScore(
                    categoryName,
                    categoryData,
                    categoryName in currentRiskFramework ? riskScores : scores,
                  )
                  const IconComponent = categoryData.icon
                  return (
                    <div
                      key={categoryName}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-4 h-4 text-gray-600 group-hover:text-teal-600 transition-colors duration-200" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                          {categoryName}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={average * 20} className="w-12 h-1" />
                        <span className="text-sm font-medium text-gray-900 w-6">
                          {average > 0 ? average.toFixed(1) : "—"}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <h3 className="font-medium text-gray-900 mb-4">Next Steps</h3>
              <div className="space-y-3">
                {recommendation.decision === "INVEST" || recommendation.decision === "BUILD" ? (
                  <>
                    <div className="flex items-center space-x-2 text-sm p-2 rounded-lg hover:bg-green-50 transition-colors duration-200">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">
                        {assessmentMode === "direct-investment"
                          ? "Proceed to investment committee"
                          : "Proceed to venture build committee"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm p-2 rounded-lg hover:bg-green-50 transition-colors duration-200">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">
                        {assessmentMode === "direct-investment"
                          ? "Conduct final due diligence"
                          : "Finalize resource allocation plan"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm p-2 rounded-lg hover:bg-green-50 transition-colors duration-200">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">
                        {assessmentMode === "direct-investment"
                          ? "Prepare term sheet"
                          : "Initiate venture build process"}
                      </span>
                    </div>
                  </>
                ) : recommendation.decision === "PROCEED" ? (
                  <>
                    <div className="flex items-center space-x-2 text-sm p-2 rounded-lg hover:bg-teal-50 transition-colors duration-200">
                      <ArrowRight className="w-4 h-4 text-teal-600" />
                      <span className="text-gray-700">Extended evaluation required</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm p-2 rounded-lg hover:bg-teal-50 transition-colors duration-200">
                      <ArrowRight className="w-4 h-4 text-teal-600" />
                      <span className="text-gray-700">Address identified concerns</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm p-2 rounded-lg hover:bg-teal-50 transition-colors duration-200">
                      <ArrowRight className="w-4 h-4 text-teal-600" />
                      <span className="text-gray-700">Re-evaluate after improvements</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2 text-sm p-2 rounded-lg hover:bg-red-50 transition-colors duration-200">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-gray-700">
                        {assessmentMode === "direct-investment"
                          ? "Do not proceed with investment"
                          : "Do not proceed with venture build"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm p-2 rounded-lg hover:bg-red-50 transition-colors duration-200">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-gray-700">Document decision rationale</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm p-2 rounded-lg hover:bg-red-50 transition-colors duration-200">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-gray-700">Consider future re-evaluation</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  /**
   * Renders the current step based on the assessment state
   */
  const renderCurrentStep = () => {
    try {
      switch (currentStep) {
        case 0:
          return renderSetupStep()
        case 1:
          return renderScoringStep()
        case 2:
          return renderRiskStep()
        case 3:
          return renderResultsStep()
        default:
          return renderSetupStep()
      }
    } catch (error) {
      console.error("Error rendering step:", error)
      return (
        <div className="text-center py-8">
          <p className="text-red-600">An error occurred. Please refresh the page.</p>
        </div>
      )
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        {/* Enhanced Header with Hikma branding */}
        <div className="border-b border-gray-100 hover:border-gray-200 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <HikmaLogo className="h-10 w-auto" />

              {/* Enhanced live score display */}
              <div className="flex items-center space-x-6">
                <div className="text-right group">
                  <div className="text-xl font-light text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
                    {totalScore.score.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-600">Score</div>
                </div>
                <div className="text-right group">
                  <div className="text-xl font-light text-gray-900 group-hover:text-teal-600 transition-colors duration-200">
                    {totalScore.completion.toFixed(0)}%
                  </div>
                  <div className="text-xs text-gray-600">Complete</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <StepIndicator currentStep={currentStep} />
          {renderCurrentStep()}

          {/* Enhanced Navigation */}
          <NavigationControls
            onPrevious={handlePrevious}
            onContinue={handleContinue}
            canProceed={canProceed()}
            isFirstStep={currentStep === 0 && currentCategoryIndex === 0}
            isLastStep={currentStep === 3}
            buttonText={getButtonText()}
            categoryInfo={
              currentStep === 1
                ? {
                    current: currentCategoryIndex + 1,
                    total: allCategories.length,
                  }
                : undefined
            }
          />
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default EnhancedScoringModel
