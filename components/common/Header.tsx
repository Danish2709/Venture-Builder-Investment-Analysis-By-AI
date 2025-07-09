"use client"

import { Bell, ChevronDown, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href: string
  isActive?: boolean
}

interface Notification {
  id: number
  type: string
  message: string
  time: string
  unread: boolean
}

interface HeaderProps {
  breadcrumbs: BreadcrumbItem[]
  user: any
  notifications: Notification[]
}

export function Header({ breadcrumbs, user, notifications }: HeaderProps) {
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Breadcrumbs */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
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
                <div className="text-xs text-gray-500">Investment Intelligence</div>
              </div>
            </div>

            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {index > 0 && <span className="text-gray-400">/</span>}
                  <Link
                    href={item.href}
                    className={`px-2 py-1 rounded-md transition-all duration-200 hover:scale-105 hover:bg-gray-100 ${
                      item.isActive ? "text-gray-900 font-medium bg-gray-50" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-100 rounded-lg">
                  <Bell className="h-5 w-5 text-gray-600" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="px-3 py-2 border-b border-gray-100">
                  <h3 className="font-medium text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-500">{unreadCount} unread</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="px-3 py-3 cursor-pointer">
                      <div className="flex items-start space-x-3 w-full">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? "bg-blue-500" : "bg-gray-300"}`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu - Simplified */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                </div>
                <DropdownMenuItem className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600">Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
