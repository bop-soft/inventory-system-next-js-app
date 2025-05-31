"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  CalendarIcon,
  Filter,
  Eye,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"
import Link from "next/link"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()

  // Sample data for charts
  const salesData = [
    { month: "Jan", sales: 45000, purchases: 32000 },
    { month: "Feb", sales: 52000, purchases: 38000 },
    { month: "Mar", sales: 48000, purchases: 35000 },
    { month: "Apr", sales: 61000, purchases: 42000 },
    { month: "May", sales: 55000, purchases: 39000 },
    { month: "Jun", sales: 67000, purchases: 45000 },
  ]

  const categoryData = [
    { name: "Food & Beverage", value: 35, color: "#3b82f6" },
    { name: "Electronics", value: 25, color: "#10b981" },
    { name: "Hardware", value: 20, color: "#f59e0b" },
    { name: "Clothing", value: 12, color: "#ec4899" },
    { name: "Books", value: 8, color: "#8b5cf6" },
  ]

  const inventoryTrends = [
    { date: "Week 1", inStock: 2847, lowStock: 23, outOfStock: 5 },
    { date: "Week 2", inStock: 2865, lowStock: 18, outOfStock: 3 },
    { date: "Week 3", inStock: 2892, lowStock: 15, outOfStock: 2 },
    { date: "Week 4", inStock: 2915, lowStock: 12, outOfStock: 1 },
  ]

  const topProducts = [
    { name: "Premium Coffee Beans", sales: 1247, revenue: 31175, growth: 12.5 },
    { name: "Wireless Headphones", sales: 892, revenue: 178400, growth: 8.3 },
    { name: "Organic Flour", sales: 756, revenue: 6794, growth: -2.1 },
    { name: "Steel Bolts M8", sales: 2340, revenue: 585, growth: 15.7 },
    { name: "Laptop Computers", sales: 234, revenue: 210598, growth: 22.4 },
  ]

  const branchPerformance = [
    { branch: "Downtown", revenue: 125000, transactions: 1247, efficiency: 92 },
    { branch: "Mall Location", revenue: 98000, transactions: 892, efficiency: 88 },
    { branch: "Bakery Central", revenue: 67000, transactions: 567, efficiency: 95 },
    { branch: "Warehouse A", revenue: 156000, transactions: 2340, efficiency: 85 },
    { branch: "Tech Store", revenue: 234000, transactions: 445, efficiency: 90 },
  ]

  const reportTemplates = [
    {
      name: "Inventory Summary",
      description: "Complete overview of current inventory levels",
      type: "PDF",
      lastGenerated: "2024-01-15",
    },
    {
      name: "Sales Performance",
      description: "Detailed sales analysis by product and branch",
      type: "Excel",
      lastGenerated: "2024-01-14",
    },
    {
      name: "Low Stock Alert",
      description: "Products requiring immediate attention",
      type: "PDF",
      lastGenerated: "2024-01-15",
    },
    {
      name: "Financial Summary",
      description: "Revenue, costs, and profit analysis",
      type: "Excel",
      lastGenerated: "2024-01-13",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
              <p className="text-gray-600">Generate and view comprehensive business reports</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/reports/custom">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Custom Report
                </Button>
              </Link>
              <Link href="/inventory/export">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Filters */}
          <Card className="mb-6 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="downtown">Downtown</SelectItem>
                    <SelectItem value="mall">Mall Location</SelectItem>
                    <SelectItem value="bakery">Bakery Central</SelectItem>
                    <SelectItem value="warehouse">Warehouse A</SelectItem>
                    <SelectItem value="tech">Tech Store</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "From date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "To date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">$680,000</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+12.5%</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Sales</p>
                    <p className="text-2xl font-bold text-gray-900">5,976</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+8.2%</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                    <p className="text-2xl font-bold text-gray-900">$113.75</p>
                    <div className="flex items-center mt-1">
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-sm text-red-600">-2.1%</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-50">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Profit Margin</p>
                    <p className="text-2xl font-bold text-gray-900">24.8%</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+1.3%</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-50">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Sales vs Purchases */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Sales vs Purchases</CardTitle>
                <CardDescription>Monthly comparison of sales and purchase amounts</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
                    <Bar dataKey="purchases" fill="#10b981" name="Purchases" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution of sales across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Inventory Trends */}
          <Card className="mb-6 border-0 shadow-md">
            <CardHeader>
              <CardTitle>Inventory Trends</CardTitle>
              <CardDescription>Weekly inventory status trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={inventoryTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="inStock" stroke="#3b82f6" name="In Stock" />
                  <Line type="monotone" dataKey="lowStock" stroke="#f59e0b" name="Low Stock" />
                  <Line type="monotone" dataKey="outOfStock" stroke="#ef4444" name="Out of Stock" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top Products */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Best selling products by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} units sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
                        <div className="flex items-center">
                          {product.growth > 0 ? (
                            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                          )}
                          <span className={`text-xs ${product.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                            {product.growth > 0 ? "+" : ""}
                            {product.growth}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Branch Performance */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Branch Performance</CardTitle>
                <CardDescription>Revenue and efficiency by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {branchPerformance.map((branch, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{branch.branch}</span>
                        <span className="text-sm font-semibold">${branch.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{branch.transactions} transactions</span>
                        <span>Efficiency: {branch.efficiency}%</span>
                      </div>
                      <Progress value={branch.efficiency} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Report Templates */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Pre-configured reports ready for generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTemplates.map((template, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium">{template.name}</h4>
                      </div>
                      <Badge variant="secondary">{template.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Last: {template.lastGenerated}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Download className="w-3 h-3 mr-1" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
