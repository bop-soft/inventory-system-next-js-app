"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  LayoutDashboard,
  Building2,
  TrendingUp,
  Settings,
  Users,
  ShoppingCart,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Tag,
  Brain,
  Truck,
  Moon,
  Sun,
} from "lucide-react"
import { useTheme } from "next-themes"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package, badge: "2,847" },
  { name: "Categories", href: "/categories", icon: Tag, badge: "12" },
  { name: "Suppliers", href: "/suppliers", icon: Truck, badge: "8" },
  { name: "Branches", href: "/branches", icon: Building2, badge: "5" },
  { name: "Transactions", href: "/transactions", icon: ShoppingCart },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
  { name: "AI Assistant", href: "/ai", icon: Brain, badge: "New" },
  { name: "Users", href: "/users", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-blue-900 dark:text-blue-100">InventoryPro</h1>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 text-gray-600 dark:text-gray-300"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Theme Toggle and User Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
        {/* Theme Toggle */}
        {!collapsed ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-full justify-start text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "light" ? (
              <>
                <Moon className="h-4 w-4" />
                <span className="ml-2">Dark mode</span>
              </>
            ) : (
              <>
                <Sun className="h-4 w-4" />
                <span className="ml-2">Light mode</span>
              </>
            )}
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-full p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        )}

        {/* User Section */}
        {!collapsed ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 px-3 py-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Admin</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="w-full p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
