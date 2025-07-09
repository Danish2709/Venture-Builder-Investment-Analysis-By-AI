import type React from "react"
import { Check } from "lucide-react"
import { ASSESSMENT_STEPS } from "@/constants/assessment"
import type { AssessmentStep } from "@/types/assessment"

interface StepIndicatorProps {
  currentStep: AssessmentStep
}

/**
 * Visual indicator showing the current step in the assessment process
 */
export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-2">
        {ASSESSMENT_STEPS.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  index < currentStep
                    ? "bg-teal-600 text-white"
                    : index === currentStep
                      ? "bg-white border-2 border-teal-600 text-teal-600"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <div className="text-left">
                <div className={`text-sm font-medium ${index <= currentStep ? "text-gray-900" : "text-gray-400"}`}>
                  {step.title}
                </div>
                <div className={`text-xs ${index <= currentStep ? "text-gray-500" : "text-gray-400"}`}>
                  {step.description}
                </div>
              </div>
            </div>
            {index < ASSESSMENT_STEPS.length - 1 && (
              <div className={`w-8 h-px mx-4 ${index < currentStep ? "bg-teal-600" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
