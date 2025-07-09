import type React from "react"

interface DataLoadingSpinnerProps {
  title?: string
  subtitle?: string
  steps?: Array<{
    label: string
    status: "completed" | "loading" | "pending"
  }>
  progress?: number
  className?: string
}

export const DataLoadingSpinner: React.FC<DataLoadingSpinnerProps> = ({
  title = "Loading...",
  subtitle = "Please wait while we prepare your data",
  steps = [],
  progress = 0,
  className = "",
}) => {
  const defaultSteps = [
    { label: "Authenticating user", status: "completed" as const },
    { label: "Loading portfolio data", status: "loading" as const },
    { label: "Initializing workspace", status: "pending" as const },
  ]

  const loadingSteps = steps.length > 0 ? steps : defaultSteps

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      {/* Minimal Spinner */}
      <div className="w-12 h-12 mb-8">
        <div className="w-12 h-12 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>

      {/* Clean Typography */}
      <div className="text-center mb-8">
        <h3 className="text-lg font-light text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      {/* Minimal Loading Steps */}
      {loadingSteps.length > 0 && (
        <div className="w-full max-w-xs space-y-3 mb-8">
          {loadingSteps.map((step, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm">
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  step.status === "completed"
                    ? "bg-green-500"
                    : step.status === "loading"
                      ? "bg-blue-500 animate-pulse"
                      : "bg-gray-300"
                }`}
              ></div>
              <span
                className={`transition-colors duration-300 ${
                  step.status === "completed"
                    ? "text-gray-700"
                    : step.status === "loading"
                      ? "text-gray-900"
                      : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Clean Progress Bar */}
      {progress > 0 && (
        <div className="w-full max-w-xs space-y-2">
          <div className="w-full bg-gray-100 rounded-full h-1">
            <div
              className="bg-blue-500 h-1 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Loading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      )}
    </div>
  )
}
