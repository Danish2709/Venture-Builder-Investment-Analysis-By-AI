"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
    } catch {
      setError("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-2xl font-light text-gray-900 mb-4">Account created</h1>
          <p className="text-gray-600 mb-8">Welcome to Hikma! You can now sign in.</p>
          <Link href="/auth/login">
            <Button className="w-full h-12 bg-gray-900 hover:bg-gray-800">Continue to login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-12">
          <img src="/1957-logo.png" alt="1957 Ventures" className="h-12 w-auto mx-auto mb-6" />
          <h1 className="text-2xl font-light text-gray-900 mb-1">Hikma</h1>
          <p className="text-sm text-gray-600">Designed by 1957 Ventures</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && <div className="text-sm text-red-600 text-center bg-red-50 py-3 px-4 rounded-lg">{error}</div>}

          {/* Name Input */}
          <div>
            <Input
              type="text"
              placeholder="Full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="h-12 text-base border-gray-200 focus:border-gray-400 focus:ring-0"
              disabled={isLoading}
            />
          </div>

          {/* Email Input */}
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="h-12 text-base border-gray-200 focus:border-gray-400 focus:ring-0"
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min. 8 characters)"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="h-12 text-base border-gray-200 focus:border-gray-400 focus:ring-0 pr-12"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-gray-900 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
