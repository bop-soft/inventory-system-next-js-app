"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Building2,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function Dashboard() {
  const [selectedBranch, setSelectedBranch] = useState("all")

  const stats = [
    {
      title: "Total Products",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Total Value",
      value: "$284,750",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Low Stock Items",
      value: "23",
      change: "-5",
      trend: "down",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Active Branches",
      value: "5",
      change: "+1",
      trend: "up",
      icon: Building2,
      color: "text-purple-600",
    },
  ]

  const lowStockItems = [
    { name: "Premium Coffee Beans", stock: 12, minimum: 50, branch: "Downtown" },
    { name: "Wireless Headphones", stock: 8, minimum: 25, branch: "Mall Location" },
    { name: "Organic Flour", stock: 15, minimum: 40, branch: "Bakery Central" },
    { name: "Steel Bolts M8", stock: 45, minimum: 100, branch: "Warehouse A" },
  ]

  const recentMovements = [
    { type: "in", item: "Laptop Computers", quantity: 25, branch: "Tech Store", time: "2 hours ago" },
    { type: "out", item: "Coffee Mugs", quantity: 15, branch: "Downtown", time: "4 hours ago" },
    { type: "in", item: "Raw Materials", quantity: 100, branch: "Factory", time: "6 hours ago" },
    { type: "out", item: "Finished Goods", quantity: 50, branch: "Warehouse B", time: "8 hours ago" },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your inventory.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/inventory/add">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Quick Add Item
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center mt-1">
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg bg-gray-50`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Low Stock Alert */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-600">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Low Stock Alerts
                </CardTitle>
                <CardDescription>Items that need immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.branch}</p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>Stock: {item.stock}</span>
                            <span>Min: {item.minimum}</span>
                          </div>
                          <Progress value={(item.stock / item.minimum) * 100} className="h-2" />
                        </div>
                      </div>
                      <Link href="/inventory/reorder">
                        <Button size="sm" variant="outline" className="ml-4">
                          Reorder
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Movements */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Recent Movements
                </CardTitle>
                <CardDescription>Latest inventory transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMovements.map((movement, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${movement.type === "in" ? "bg-green-100" : "bg-red-100"}`}>
                          {movement.type === "in" ? (
                            <ArrowUpRight className="w-4 h-4 text-green-600" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{movement.item}</p>
                          <p className="text-sm text-gray-600">{movement.branch}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {movement.type === "in" ? "+" : "-"}
                          {movement.quantity}
                        </p>
                        <p className="text-xs text-gray-500">{movement.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks to manage your inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/inventory">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <Package className="w-6 h-6 text-blue-600" />
                    <span>View Inventory</span>
                  </Button>
                </Link>
                <Link href="/inventory/add">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <Plus className="w-6 h-6 text-green-600" />
                    <span>Add Product</span>
                  </Button>
                </Link>
                <Link href="/branches">
                  <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                    <Building2 className="w-6 h-6 text-purple-600" />
                    <span>Manage Branches</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
