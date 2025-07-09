"use client"

import { cn } from "@/lib/utils"

interface HikmaLogoProps {
  className?: string
}

export function HikmaLogo({ className }: HikmaLogoProps) {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className="relative">
        <img
          src="/1957-logo.png"
          alt="1957 Ventures"
          className="h-8 w-auto transition-transform duration-200 hover:scale-105"
        />
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-600 rounded-full"></div>
      </div>
      <div className="border-l border-gray-200 pl-3">
        <div className="flex items-center space-x-2">
          <div className="text-base font-semibold text-gray-900">Hikma</div>
          <div className="text-sm text-blue-600 font-arabic">حكمة</div>
        </div>
        <div className="text-xs text-gray-500">Designed by 1957 Ventures</div>
      </div>
    </div>
  )
}
