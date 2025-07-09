"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff, AlertCircle, CheckCircle2, ArrowLeft, Wifi, WifiOff } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SessionManager } from "@/utils/sessionManager"

interface LoginStep {
  id: string
  label: string
  status: "pending" | "loading" | "completed" | "error"
  duration?: number
}

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [loginSteps, setLoginSteps] = useState<LoginStep[]>([
    { id: "auth", label: "Verifying credentials", status: "pending", duration: 600 },
    { id: "session", label: "Creating session", status: "pending", duration: 400 },
    { id: "profile", label: "Loading profile", status: "pending", duration: 300 },
    { id: "portfolio", label: "Fetching data", status: "pending", duration: 500 },
    { id: "workspace", label: "Initializing workspace", status: "pending", duration: 200 },
  ])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [overallProgress, setOverallProgress] = useState(0)

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Enhanced form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear field-specific errors
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }

    // Clear general login error
    if (loginError) {
      setLoginError("")
    }
  }

  // Simulate realistic login steps
  const executeLoginSteps = async () => {
    const steps = [...loginSteps]
    let completedSteps = 0

    for (let i = 0; i < steps.length; i++) {
      setCurrentStepIndex(i)

      // Update step to loading
      steps[i].status = "loading"
      setLoginSteps([...steps])

      // Shorter delays for better UX
      await new Promise((resolve) => setTimeout(resolve, steps[i].duration || 800))

      // Mark step as completed
      steps[i].status = "completed"
      completedSteps++
      setLoginSteps([...steps])

      // Update overall progress
      const progress = (completedSteps / steps.length) * 100
      setOverallProgress(progress)

      // Small delay between steps
      await new Promise((resolve) => setTimeout(resolve, 150))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!isOnline) {
      setLoginError("No internet connection. Please check your network and try again.")
      return
    }

    setIsLoading(true)
    setLoginError("")
    setOverallProgress(0)

    try {
      // Reset steps
      const resetSteps = loginSteps.map((step) => ({ ...step, status: "pending" as const }))
      setLoginSteps(resetSteps)
      setCurrentStepIndex(-1)

      // Simple credential validation - any username with 8+ character password
      if (formData.username.length >= 3 && formData.password.length >= 8) {
        await executeLoginSteps()

        setLoginSuccess(true)

        // Store enhanced user session info
        SessionManager.createSession(formData.username, `${formData.username}@hikma.com`)

        sessionStorage.setItem("loginSuccess", "true")

        // Redirect after successful completion - shorter delay
        setTimeout(() => {
          router.push("/dashboard/main")
        }, 800)
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error: any) {
      console.error("Login error:", error)

      if (error.message === "Invalid credentials") {
        setLoginError("Invalid username or password. Please check your credentials and try again.")
      } else {
        setLoginError("Login failed. Please check your connection and try again.")
      }

      // Reset progress
      setOverallProgress(0)
      setCurrentStepIndex(-1)
      const resetSteps = loginSteps.map((step) => ({ ...step, status: "pending" as const }))
      setLoginSteps(resetSteps)
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Enhanced success state with detailed progress
  if (loginSuccess) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/login-background.png)" }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <Card className="relative z-10 w-full max-w-sm border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            {/* Minimalist Success Icon */}
            <div className="w-16 h-16 mx-auto mb-8 relative">
              <div className="w-16 h-16 border-2 border-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <div className="absolute inset-0 border-2 border-green-200 rounded-full animate-ping opacity-75"></div>
            </div>

            {/* Clean Typography */}
            <h2 className="text-xl font-light text-gray-900 mb-3">Welcome to Hikma</h2>
            <p className="text-sm text-gray-600 mb-8">Preparing your workspace</p>

            {/* Minimalist Loading Indicator */}
            <div className="mb-8">
              <div className="w-8 h-8 mx-auto mb-4">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>

              {/* Simple Progress Steps */}
              <div className="space-y-3 text-left max-w-xs mx-auto">
                {loginSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-3 text-sm">
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
            </div>

            {/* Clean Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-gray-100 rounded-full h-1">
                <div
                  className="bg-blue-500 h-1 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">{Math.round(overallProgress)}% complete</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* High-Quality Background Image with Responsive Optimization */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/login-background.png)",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/40"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-200 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span className="text-sm font-medium">Back to home</span>
            </Link>

            {/* Connection Status Indicator */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                {isOnline ? <Wifi className="w-4 h-4 text-green-400" /> : <WifiOff className="w-4 h-4 text-red-400" />}
                <span className="text-xs text-white/60">{isOnline ? "Online" : "Offline"}</span>
              </div>
              <div className="text-xs text-white/60">© 2025 Hikma</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
            {/* Brand Header */}
            <div className="text-center pt-10 pb-8 px-8">
              <div className="inline-flex items-center space-x-3 mb-6">
                <div className="relative">
                  <img src="/1957-logo.png" alt="Hikma" className="h-10 w-auto" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-semibold text-gray-900">Hikma</h1>
                  <div className="text-lg text-blue-600 font-arabic">حكمة</div>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-light text-gray-900">Welcome back</h2>
                <p className="text-sm text-gray-600">Sign in to your investment platform</p>
              </div>
            </div>

            <CardContent className="px-8 pb-8">
              {/* Enhanced Error Display */}
              {loginError && (
                <Alert className="mb-6 border-red-200 bg-red-50/50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700 text-sm">{loginError}</AlertDescription>
                </Alert>
              )}

              {/* Offline Warning */}
              {!isOnline && !loginError && (
                <Alert className="mb-6 border-orange-200 bg-orange-50/50">
                  <WifiOff className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-700 text-sm">
                    Please check your internet connection.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className={`h-12 transition-all duration-200 ${
                      errors.username
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 hover:border-gray-400"
                    }`}
                    disabled={isLoading || !isOnline}
                    autoComplete="username"
                  />
                  {errors.username && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.username}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`pr-12 h-12 transition-all duration-200 ${
                        errors.password
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 hover:border-gray-400"
                      }`}
                      disabled={isLoading || !isOnline}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      disabled={isLoading || !isOnline}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      disabled={isLoading || !isOnline}
                    />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !isOnline}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : !isOnline ? (
                    "Connection Required"
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Attribution */}
          <div className="mt-6 text-center">
            <p className="text-xs text-white/70">Designed by 1957 Ventures</p>
          </div>
        </div>
      </div>
    </div>
  )
}
