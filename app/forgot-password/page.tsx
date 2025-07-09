"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Email is required")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email")
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
          <h1 className="text-2xl font-light text-gray-900 mb-4">Check your email</h1>
          <p className="text-gray-600 mb-8">
            We've sent password reset instructions to <strong>{email}</strong>
          </p>
          <Link href="/login">
            <Button className="w-full h-12 bg-gray-900 hover:bg-gray-800">Back to login</Button>
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
          <p className="text-sm text-gray-600 mb-4">Designed by 1957 Ventures</p>
          <h2 className="text-xl font-light text-gray-900">Reset password</h2>
          <p className="text-gray-600 text-sm">Enter your email to receive reset instructions</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && <div className="text-sm text-red-600 text-center bg-red-50 py-3 px-4 rounded-lg">{error}</div>}

          {/* Email Input */}
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-base border-gray-200 focus:border-gray-400 focus:ring-0"
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send instructions"}
          </Button>
        </form>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to login</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
