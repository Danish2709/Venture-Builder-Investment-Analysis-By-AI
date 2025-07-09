"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, CheckCircle2, ArrowLeft, AlertCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""
  const email = searchParams.get("email") || ""

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Hikma Logo Component
  const HikmaLogo = () => (
    <div className="flex flex-col items-center justify-center mb-6">
      <div className="relative mb-4">
        <img src="/1957-logo.png" alt="1957 Ventures" className="h-14 w-auto" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full"></div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-1">
          <h1 className="text-xl font-semibold text-gray-900">Hikma</h1>
          <div className="text-base text-blue-600 font-arabic">حكمة</div>
        </div>
        <p className="text-xs text-gray-600">Designed by 1957 Ventures</p>
      </div>
    </div>
  )

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!token) {
      setErrors({ general: "Invalid reset link. Please request a new password reset." })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSuccess(true)
    } catch {
      setErrors({ general: "Failed to reset password. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/\d/.test(password)) strength += 25
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)

  // Success State
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-3">
                <img src="/1957-logo.png" alt="1957 Ventures" className="h-6 w-auto" />
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-semibold text-gray-900">Hikma</div>
                  <div className="text-xs text-blue-600 font-arabic">حكمة</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center px-4 py-16">
          <Card className="w-full max-w-md border border-gray-200 shadow-lg">
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h2 className="text-2xl font-light text-gray-900 mb-4">Password Updated!</h2>
              <p className="text-gray-600 mb-8">
                Your password has been successfully updated. You can now sign in with your new password.
              </p>
              <Link href="/auth/login">
                <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                  Sign in to your account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Invalid token state
  if (!token) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/auth/forgot-password"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to password reset</span>
              </Link>
              <div className="flex items-center space-x-3">
                <img src="/1957-logo.png" alt="1957 Ventures" className="h-6 w-auto" />
                <div className="flex items-center space-x-2">
                  <div className="text-sm font-semibold text-gray-900">Hikma</div>
                  <div className="text-xs text-blue-600 font-arabic">حكمة</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center px-4 py-16">
          <Card className="w-full max-w-md border border-red-200 shadow-lg">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h2 className="text-2xl font-light text-gray-900 mb-4">Invalid Reset Link</h2>
              <p className="text-gray-600 mb-8">
                This password reset link is invalid or has expired. Please request a new password reset.
              </p>
              <Link href="/auth/forgot-password">
                <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                  Request new reset link
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/auth/login"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to login</span>
            </Link>
            <div className="flex items-center space-x-3">
              <img src="/1957-logo.png" alt="1957 Ventures" className="h-6 w-auto" />
              <div className="flex items-center space-x-2">
                <div className="text-sm font-semibold text-gray-900">Hikma</div>
                <div className="text-xs text-blue-600 font-arabic">حكمة</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="border border-gray-200 shadow-lg">
            <CardHeader className="text-center pb-4">
              <HikmaLogo />
              <div className="space-y-2">
                <h2 className="text-xl font-light text-gray-900">Create new password</h2>
                <p className="text-sm text-gray-600">
                  {email && (
                    <span>
                      for <span className="font-medium text-gray-900">{email}</span>
                    </span>
                  )}
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-0">
              {errors.general && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">{errors.general}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    New password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`pr-10 h-11 transition-all duration-200 ${
                        errors.password
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 hover:border-gray-400"
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              passwordStrength < 50
                                ? "bg-red-500"
                                : passwordStrength < 75
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${passwordStrength}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            passwordStrength < 50
                              ? "text-red-600"
                              : passwordStrength < 75
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {passwordStrength < 50 ? "Weak" : passwordStrength < 75 ? "Good" : "Strong"}
                        </span>
                      </div>
                    </div>
                  )}

                  {errors.password && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm new password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`pr-10 h-11 transition-all duration-200 ${
                        errors.confirmPassword
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 hover:border-gray-400"
                      }`}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Password requirements:</span>
                  </div>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li
                      className={`flex items-center space-x-2 ${formData.password.length >= 8 ? "text-green-600" : ""}`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${formData.password.length >= 8 ? "bg-green-500" : "bg-gray-400"}`}
                      ></span>
                      <span>At least 8 characters long</span>
                    </li>
                    <li
                      className={`flex items-center space-x-2 ${/[A-Z]/.test(formData.password) ? "text-green-600" : ""}`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${/[A-Z]/.test(formData.password) ? "bg-green-500" : "bg-gray-400"}`}
                      ></span>
                      <span>One uppercase letter</span>
                    </li>
                    <li
                      className={`flex items-center space-x-2 ${/[a-z]/.test(formData.password) ? "text-green-600" : ""}`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${/[a-z]/.test(formData.password) ? "bg-green-500" : "bg-gray-400"}`}
                      ></span>
                      <span>One lowercase letter</span>
                    </li>
                    <li
                      className={`flex items-center space-x-2 ${/\d/.test(formData.password) ? "text-green-600" : ""}`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${/\d/.test(formData.password) ? "bg-green-500" : "bg-gray-400"}`}
                      ></span>
                      <span>One number</span>
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                  disabled={isLoading || passwordStrength < 75}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Updating password...</span>
                    </div>
                  ) : (
                    "Update password"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>© 2025 Hikma. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
