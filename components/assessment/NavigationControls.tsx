"use client"

import type React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationControlsProps {
  onPrevious: () => void
  onContinue: () => void
  canProceed: boolean
  isFirstStep: boolean
  isLastStep: boolean
  buttonText: string
  categoryInfo?: {
    current: number
    total: number
  }
}

/**
 * Navigation controls with enhanced hover effects and visual feedback
 */
export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPrevious,
  onContinue,
  canProceed,
  isFirstStep,
  isLastStep,
  buttonText,
  categoryInfo,
}) => {
  return (
    <div className="flex items-center justify-between mt-8">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStep}
        className="flex items-center space-x-2 bg-transparent border-gray-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
        <span>Previous</span>
      </Button>

      <div className="text-center">
        {categoryInfo && (
          <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full border">
            {categoryInfo.current} of {categoryInfo.total} categories
          </div>
        )}
      </div>

      <Button
        onClick={onContinue}
        disabled={isLastStep || !canProceed}
        className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none group"
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
      </Button>
    </div>
  )
}
