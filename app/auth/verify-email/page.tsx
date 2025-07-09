"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Mail, ArrowLeft, AlertCircle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const token = searchParams.get("token") || ""

  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verifying" | "success" | "error">("pending")
  const [errorMessage, setErrorMessage] = useState("")
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

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

  // Auto-verify if token is present
  useEffect(() => {
    if (token) {
      handleVerification(token)
    }
  }, [token])

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleVerification = async (verificationToken: string) => {
    setVerificationStatus("verifying")
    setErrorMessage("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock verification logic
      if (verificationToken.length > 10) {
        setVerificationStatus("success")
      } else {
        throw new Error("Invalid verification token")
      }
    } catch (error) {
      setVerificationStatus("error")
      setErrorMessage("Verification failed. The link may be expired or invalid.")
    }
  }

  const handleResendVerification = async () => {
    if (resendCooldown > 0) return

    setIsResending(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setResendCooldown(60) // 60 second cooldown
    } catch (error) {
      setErrorMessage("Failed to resend verification email. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  // Success State
  if (verificationStatus === "success") {
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
              <h2 className="text-2xl font-light text-gray-900 mb-4">Email Verified!</h2>
              <p className="text-gray-600 mb-8">
                Your email has been successfully verified. You can now access all features of Hikma.
              </p>
              <Link href="/auth/login">
                <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 transition-all duration-200">
                  Continue to login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Verifying State
  if (verificationStatus === "verifying") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md border border-gray-200 shadow-lg">
          <CardHeader className="text-center pb-4">
            <HikmaLogo />
          </CardHeader>
          <CardContent className="p-6 pt-0 text-center">
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <h2 className="text-xl font-light text-gray-900 mb-4">Verifying your email</h2>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main verification page
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/auth/register"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to registration</span>
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
                <h2 className="text-xl font-light text-gray-900">Verify your email</h2>
                <p className="text-sm text-gray-600">We've sent a verification link to your email address</p>
              </div>
            </CardHeader>

            <CardContent className="p-6 pt-0">
              {verificationStatus === "error" && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">{errorMessage}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-6">
                {/* Email Display */}
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Mail className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                  <div className="text-sm font-medium text-gray-900 mb-1">Check your email</div>
                  <div className="text-sm text-gray-600">
                    {email ? (
                      <>
                        We sent a verification link to <span className="font-medium text-gray-900">{email}</span>
                      </>
                    ) : (
                      "Check your inbox for a verification email"
                    )}
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">1</span>
                    </div>
                    <span>Open the email we sent to your inbox</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">2</span>
                    </div>
                    <span>Click the "Verify Email" button in the email</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-blue-600">3</span>
                    </div>
                    <span>You'll be redirected back here automatically</span>
                  </div>
                </div>

                {/* Resend Button */}
                <div className="pt-4 border-t border-gray-100">
                  <Button
                    onClick={handleResendVerification}
                    disabled={isResending || resendCooldown > 0}
                    variant="outline"
                    className="w-full h-11 border-gray-300 hover:border-gray-400 transition-all duration-200"
                  >
                    {isResending ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : resendCooldown > 0 ? (
                      <>Resend in {resendCooldown}s</>
                    ) : (
                      <>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Resend verification email
                      </>
                    )}
                  </Button>
                </div>

                {/* Help Text */}
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Didn't receive the email? Check your spam folder or{" "}
                    <Link href="/support" className="text-blue-600 hover:text-blue-700 transition-colors">
                      contact support
                    </Link>
                  </p>
                </div>
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
