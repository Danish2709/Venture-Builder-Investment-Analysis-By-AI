import type React from "react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md", text, className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full`}></div>
        <div
          className={`${sizeClasses[size]} border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0`}
        ></div>
      </div>
      {text && <p className="mt-3 text-sm text-gray-600 animate-pulse">{text}</p>}
    </div>
  )
}
