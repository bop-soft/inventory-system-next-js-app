"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, TrendingDown, Target, AlertTriangle, BarChart3, Activity, Zap, Package } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  // Sample analytics data
  const revenueData = [
    { date: "Jan 1", revenue: 12000, profit: 3600, orders: 45 },
    { date: "Jan 8", revenue: 15000, profit: 4500, orders: 52 },
    { date: "Jan 15", revenue: 18000, profit: 5400, orders: 61 },
    { date: "Jan 22", revenue: 14000, profit: 4200, orders: 48 },
    { date: "Jan 29", revenue: 22000, profit: 6600, orders: 73 },
    { date: "Feb 5", revenue: 25000, profit: 7500, orders: 82 },
    { date: "Feb 12", revenue: 28000, profit: 8400, orders: 91 },
  ]

  const customerSegments = [
    { segment: "New Customers", value: 35, growth: 12.5 },
    { segment: "Returning Customers", value: 45, growth: 8.3 },
    { segment: "VIP Customers", value: 20, growth: 15.7 },
  ]

  const productPerformance = [
    { category: "Electronics", sales: 85, profit: 78, inventory: 92, satisfaction: 88 },
    { category: "Food & Beverage", sales: 92, profit: 85, inventory: 78, satisfaction: 95 },
    { category: "Hardware", sales: 78, profit: 82, inventory: 88, satisfaction: 85 },
    { category: "Clothing", sales: 65, profit: 70, inventory: 85, satisfaction: 82 },
    { category: "Books", sales: 55, profit: 60, inventory: 90, satisfaction: 88 },
  ]

  const inventoryAnalytics = [
    { month: "Jan", turnover: 4.2, accuracy: 98.5, efficiency: 85 },
    { month: "Feb", turnover: 4.8, accuracy: 97.8, efficiency: 88 },
    { month: "Mar", turnover: 5.1, accuracy: 98.9, efficiency: 92 },
    { month: "Apr", turnover: 4.9, accuracy: 98.2, efficiency: 89 },
    { month: "May", turnover: 5.3, accuracy: 99.1, efficiency: 94 },
    { month: "Jun", turnover: 5.7, accuracy: 98.7, efficiency: 96 },
  ]

  const demandForecast = [
    { week: "Week 1", predicted: 1200, actual: 1150, confidence: 92 },
    { week: "Week 2", predicted: 1350, actual: 1380, confidence: 88 },
    { week: "Week 3", predicted: 1180, actual: 1200, confidence: 94 },
    { week: "Week 4", predicted: 1450, actual: null, confidence: 85 },
    { week: "Week 5", predicted: 1320, actual: null, confidence: 87 },
    { week: "Week 6", predicted: 1280, actual: null, confidence: 89 },
  ]

  const kpiData = [
    {
      title: "Revenue Growth",
      value: "24.8%",
      change: "+3.2%",
      trend: "up",
      target: "25%",
      progress: 99.2,
    },
    {
      title: "Inventory Turnover",
      value: "5.7x",
      change: "+0.4x",
      trend: "up",
      target: "6x",
      progress: 95,
    },
    {
      title: "Order Accuracy",
      value: "98.7%",
      change: "-0.3%",
      trend: "down",
      target: "99%",
      progress: 99.7,
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      trend: "up",
      target: "4.9/5",
      progress: 98,
    },
  ]

  const alerts = [
    {
      type: "warning",
      title: "Low Stock Alert",
      message: "23 products are below minimum threshold",
      time: "2 hours ago",
    },
    {
      type: "info",
      title: "Demand Spike",
      message: "Electronics category showing 35% increase",
      time: "4 hours ago",
    },
    {
      type: "success",
      title: "Target Achieved",
      message: "Monthly revenue target exceeded by 12%",
      time: "1 day ago",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600">Advanced insights and performance analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Activity className="w-4 h-4 mr-2" />
                Real-time View
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {kpiData.map((kpi, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-50">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Target: {kpi.target}</span>
                      <div className="flex items-center">
                        {kpi.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                        )}
                        <span className={`text-xs ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {kpi.change}
                        </span>
                      </div>
                    </div>
                    <Progress value={kpi.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                        Revenue & Profit Trends
                      </CardTitle>
                      <CardDescription>Weekly performance overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="revenue"
                            stackId="1"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.6}
                          />
                          <Area
                            type="monotone"
                            dataKey="profit"
                            stackId="2"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.6}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Alerts */}
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                        Smart Alerts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {alerts.map((alert, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg border-l-4 ${
                              alert.type === "warning"
                                ? "bg-orange-50 border-orange-400"
                                : alert.type === "info"
                                  ? "bg-blue-50 border-blue-400"
                                  : "bg-green-50 border-green-400"
                            }`}
                          >
                            <h4 className="font-medium text-sm">{alert.title}</h4>
                            <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Customer Segments */}
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Customer Segments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {customerSegments.map((segment, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{segment.segment}</span>
                              <div className="flex items-center">
                                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                                <span className="text-xs text-green-600">+{segment.growth}%</span>
                              </div>
                            </div>
                            <Progress value={segment.value} className="h-2" />
                            <p className="text-xs text-gray-500">{segment.value}% of total customers</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Sales Tab */}
            <TabsContent value="sales">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Sales Performance by Category</CardTitle>
                    <CardDescription>Multi-dimensional analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={productPerformance}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="category" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="Sales" dataKey="sales" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                        <Radar name="Profit" dataKey="profit" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Order Volume vs Revenue</CardTitle>
                    <CardDescription>Correlation analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <ScatterChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="orders" name="Orders" />
                        <YAxis dataKey="revenue" name="Revenue" />
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                        <Scatter name="Revenue vs Orders" data={revenueData} fill="#3b82f6" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2 text-green-600" />
                    Inventory Analytics
                  </CardTitle>
                  <CardDescription>Turnover, accuracy, and efficiency metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={inventoryAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="turnover" fill="#3b82f6" name="Turnover Rate" />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#10b981"
                        name="Accuracy %"
                        strokeWidth={3}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="efficiency"
                        stroke="#f59e0b"
                        name="Efficiency %"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customers Tab */}
            <TabsContent value="customers">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Customer Acquisition</CardTitle>
                    <CardDescription>New vs returning customer trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="orders" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Customer Lifetime Value</CardTitle>
                    <CardDescription>Segmentation and value analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {customerSegments.map((segment, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{segment.segment}</h4>
                            <Badge variant="secondary">+{segment.growth}%</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Avg. Order Value</p>
                              <p className="font-semibold">${(segment.value * 10).toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Frequency</p>
                              <p className="font-semibold">{segment.value / 10} orders/month</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Forecasting Tab */}
            <TabsContent value="forecasting">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-purple-600" />
                    Demand Forecasting
                  </CardTitle>
                  <CardDescription>AI-powered predictions with confidence intervals</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={demandForecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        name="Predicted Demand"
                      />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Actual Demand"
                        connectNulls={false}
                      />
                      <Bar dataKey="confidence" fill="#f59e0b" fillOpacity={0.3} name="Confidence %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
