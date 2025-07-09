"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Email is required")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-2xl font-light text-gray-900 mb-4">Check your email</h2>
            <p className="text-gray-600 mb-8">
              We've sent password reset instructions to <span className="font-medium text-gray-900">{email}</span>
            </p>
            <Link href="/auth/login">
              <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                Back to login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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

      {/* Main content */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="border border-gray-200 shadow-lg">
            <CardHeader className="text-center pb-4">
              <HikmaLogo />
              <div className="space-y-2">
                <h2 className="text-xl font-light text-gray-900">Reset your password</h2>
                <p className="text-sm text-gray-600">
                  Enter your email address and we'll send you instructions to reset your password
                </p>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-0">
              {error && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError("")
                    }}
                    className={`h-11 transition-all duration-200 ${
                      error
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 hover:border-gray-400"
                    }`}
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending instructions...</span>
                    </div>
                  ) : (
                    "Send reset instructions"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <Link
                    href="/auth/login"
                    className="text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
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
