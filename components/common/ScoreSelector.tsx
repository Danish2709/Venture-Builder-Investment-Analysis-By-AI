"use client"

import type React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { SCORE_OPTIONS } from "@/constants/assessment"

interface ScoreSelectorProps {
  value: number | undefined
  onValueChange: (value: string) => void
  showProgress?: boolean
  className?: string
}

/**
 * Reusable score selector component with enhanced hover effects
 */
export const ScoreSelector: React.FC<ScoreSelectorProps> = ({
  value,
  onValueChange,
  showProgress = true,
  className = "w-20 h-10",
}) => {
  return (
    <div className="flex items-center justify-between group">
      <Select value={value?.toString() || ""} onValueChange={onValueChange}>
        <SelectTrigger
          className={`${className} transition-all duration-200 hover:border-teal-400 hover:shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-200`}
        >
          <SelectValue placeholder="—" />
        </SelectTrigger>
        <SelectContent className="border-gray-200 shadow-lg">
          {SCORE_OPTIONS.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="hover:bg-teal-50 hover:text-teal-900 focus:bg-teal-50 focus:text-teal-900 transition-colors duration-150"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showProgress && value && (
        <div className="flex items-center space-x-2 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
          <Progress value={value * 20} className="w-16 h-1" />
          <span className="text-sm font-medium text-gray-900 w-8">{value}/5</span>
        </div>
      )}
    </div>
  )
}
