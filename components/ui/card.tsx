"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  showToggle?: boolean
  onToggleChange?: (value: string) => void
  defaultValue?: string
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, showToggle = false, onToggleChange, defaultValue = "recommendation", children, ...props }, ref) => {
    const [selectedOption, setSelectedOption] = React.useState(defaultValue)

    const handleOptionChange = (value: string) => {
      setSelectedOption(value)
      onToggleChange?.(value)
    }

    if (showToggle) {
      return (
        <div ref={ref} className={cn("flex flex-col space-y-1.5 p-4", className)} {...props}>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {["recommendation", "overview", "insights", "risks"].map((option) => (
              <button
                key={option}
                onClick={() => handleOptionChange(option)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 capitalize flex-1",
                  selectedOption === option
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                )}
              >
                {option}
              </button>
            ))}
          </div>
          {children}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn("flex flex-col space-y-1.5 p-4", className)} {...props}>
        {children}
      </div>
    )
  },
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <></>,
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
export type { CardHeaderProps }
