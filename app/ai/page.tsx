"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Brain,
  Zap,
  TrendingUp,
  AlertTriangle,
  Target,
  MessageSquare,
  BarChart3,
  Settings,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  Clock,
  Send,
  Lightbulb,
  Package,
  DollarSign,
} from "lucide-react"
import { Sidebar } from "@/components/sidebar"

export default function AIAssistantPage() {
  const [chatMessage, setChatMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [workflows, setWorkflows] = useState([
    { id: 1, name: "Auto Reorder", status: "active", lastRun: "2 hours ago", nextRun: "4 hours" },
    { id: 2, name: "Demand Forecasting", status: "active", lastRun: "1 day ago", nextRun: "1 day" },
    { id: 3, name: "Anomaly Detection", status: "paused", lastRun: "3 days ago", nextRun: "Manual" },
    { id: 4, name: "Price Optimization", status: "active", lastRun: "6 hours ago", nextRun: "12 hours" },
  ])

  const [activeTab, setActiveTab] = useState("insights")

  const insights = [
    {
      type: "warning",
      title: "Low Stock Alert",
      description: "15 products are predicted to run out within 7 days",
      action: "Review Reorder List",
      confidence: 92,
    },
    {
      type: "opportunity",
      title: "Demand Surge Detected",
      description: "Coffee products showing 35% increase in demand",
      action: "Increase Stock Levels",
      confidence: 87,
    },
    {
      type: "optimization",
      title: "Price Adjustment Recommended",
      description: "3 products could increase profit by 12% with price changes",
      action: "Review Pricing",
      confidence: 78,
    },
    {
      type: "efficiency",
      title: "Branch Performance Gap",
      description: "Downtown branch underperforming by 18%",
      action: "Analyze Operations",
      confidence: 85,
    },
  ]

  const chatHistory = [
    {
      type: "user",
      message: "What are my top selling products this month?",
      timestamp: "10:30 AM",
    },
    {
      type: "ai",
      message:
        "Based on your sales data, here are your top 5 products this month:\n\n1. Premium Coffee Beans - 1,247 units ($31,175)\n2. Wireless Headphones - 892 units ($178,400)\n3. Steel Bolts M8 - 2,340 units ($585)\n4. Organic Flour - 756 units ($6,794)\n5. Laptop Computers - 234 units ($210,598)\n\nWould you like me to analyze trends or suggest optimizations?",
      timestamp: "10:30 AM",
    },
    {
      type: "user",
      message: "Show me inventory optimization suggestions",
      timestamp: "10:32 AM",
    },
    {
      type: "ai",
      message:
        "Here are my optimization recommendations:\n\n🎯 **Immediate Actions:**\n• Reorder 50 units of Wireless Headphones (current: 8, optimal: 45)\n• Reduce Organic Flour order by 30% (slow-moving inventory)\n\n📈 **Growth Opportunities:**\n• Increase Coffee Beans stock by 25% (high demand trend)\n• Consider bulk pricing for Steel Bolts (volume discount opportunity)\n\n💡 **Cost Savings:**\n• Switch to alternative supplier for Electronics (12% cost reduction)\n\nImplement these changes? I can create purchase orders automatically.",
      timestamp: "10:32 AM",
    },
  ]

  const predictions = [
    { product: "Premium Coffee Beans", currentStock: 245, predictedDemand: 180, daysLeft: 8, trend: "up" },
    { product: "Wireless Headphones", currentStock: 8, predictedDemand: 45, daysLeft: 1, trend: "up" },
    { product: "Organic Flour", currentStock: 15, predictedDemand: 12, daysLeft: 7, trend: "down" },
    { product: "Steel Bolts M8", currentStock: 450, predictedDemand: 85, daysLeft: 32, trend: "stable" },
  ]

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return
    setIsProcessing(true)
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false)
      setChatMessage("")
    }, 2000)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case "opportunity":
        return <TrendingUp className="w-5 h-5 text-green-500" />
      case "optimization":
        return <Target className="w-5 h-5 text-blue-500" />
      case "efficiency":
        return <Zap className="w-5 h-5 text-purple-500" />
      default:
        return <Lightbulb className="w-5 h-5 text-yellow-500" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "warning":
        return "border-orange-200 bg-orange-50"
      case "opportunity":
        return "border-green-200 bg-green-50"
      case "optimization":
        return "border-blue-200 bg-blue-50"
      case "efficiency":
        return "border-purple-200 bg-purple-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Brain className="w-8 h-8 mr-3 text-blue-600" />
                AI Assistant
              </h1>
              <p className="text-gray-600">Intelligent insights and automation for your inventory</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                AI Active
              </Badge>
              <Button variant="outline" onClick={() => setActiveTab("automation")}>
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
              <TabsTrigger value="chat">AI Chat</TabsTrigger>
              <TabsTrigger value="workflows">Workflows</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
            </TabsList>

            {/* AI Insights */}
            <TabsContent value="insights">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Key Metrics */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                      AI Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Prediction Accuracy</span>
                      <span className="text-sm font-bold">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Cost Savings (This Month)</span>
                      <span className="text-sm font-bold text-green-600">$12,450</span>
                    </div>
                    <Progress value={78} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Automation Rate</span>
                      <span className="text-sm font-bold">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                      Quick AI Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Package className="w-4 h-4 mr-2" />
                      Generate Reorder Suggestions
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Analyze Demand Patterns
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Optimize Pricing Strategy
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Detect Anomalies
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* AI Insights Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {insights.map((insight, index) => (
                  <Card key={index} className={`border-0 shadow-md ${getInsightColor(insight.type)}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getInsightIcon(insight.type)}
                          <div>
                            <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {insight.confidence}% confident
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          {insight.action}
                        </Button>
                        <span className="text-xs text-gray-500">AI Recommendation</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* AI Chat */}
            <TabsContent value="chat">
              <Card className="border-0 shadow-md h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
                    Chat with AI Assistant
                  </CardTitle>
                  <CardDescription>
                    Ask questions about your inventory, get insights, and automate tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    {chatHistory.map((message, index) => (
                      <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-white border border-gray-200 text-gray-900"
                          }`}
                        >
                          <div className="whitespace-pre-wrap text-sm">{message.message}</div>
                          <div
                            className={`text-xs mt-1 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}
                          >
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-gray-200 text-gray-900 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span className="text-sm">AI is thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Ask me anything about your inventory..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1 min-h-[60px]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={isProcessing}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Workflows */}
            <TabsContent value="workflows">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Workflows</p>
                        <p className="text-2xl font-bold text-gray-900">3</p>
                      </div>
                      <div className="p-3 rounded-lg bg-green-50">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Tasks Automated</p>
                        <p className="text-2xl font-bold text-gray-900">247</p>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-50">
                        <Zap className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Time Saved</p>
                        <p className="text-2xl font-bold text-gray-900">24h</p>
                      </div>
                      <div className="p-3 rounded-lg bg-purple-50">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>AI Workflows</CardTitle>
                  <CardDescription>Automated processes powered by artificial intelligence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workflows.map((workflow) => (
                      <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-lg bg-blue-50">
                            <Brain className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{workflow.name}</h4>
                            <p className="text-sm text-gray-600">
                              Last run: {workflow.lastRun} • Next: {workflow.nextRun}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant="secondary"
                            className={
                              workflow.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }
                          >
                            {workflow.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            {workflow.status === "active" ? (
                              <Pause className="w-3 h-3" />
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Predictions */}
            <TabsContent value="predictions">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Demand Predictions
                  </CardTitle>
                  <CardDescription>AI-powered forecasting for the next 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {predictions.map((prediction, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{prediction.product}</h4>
                          <Badge
                            variant="secondary"
                            className={
                              prediction.daysLeft <= 3
                                ? "bg-red-100 text-red-800"
                                : prediction.daysLeft <= 7
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-green-100 text-green-800"
                            }
                          >
                            {prediction.daysLeft} days left
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Current Stock:</span>
                            <p className="font-medium">{prediction.currentStock} units</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Predicted Demand:</span>
                            <p className="font-medium">{prediction.predictedDemand} units/month</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Trend:</span>
                            <p className="font-medium capitalize flex items-center">
                              {prediction.trend}
                              {prediction.trend === "up" && <TrendingUp className="w-3 h-3 ml-1 text-green-500" />}
                              {prediction.trend === "down" && (
                                <TrendingUp className="w-3 h-3 ml-1 text-red-500 rotate-180" />
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>Stock Level</span>
                            <span>
                              {Math.round((prediction.currentStock / (prediction.predictedDemand * 2)) * 100)}% of
                              optimal
                            </span>
                          </div>
                          <Progress
                            value={(prediction.currentStock / (prediction.predictedDemand * 2)) * 100}
                            className="h-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Automation */}
            <TabsContent value="automation">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Automation Settings</CardTitle>
                    <CardDescription>Configure AI-powered automation rules</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto Reorder</Label>
                        <p className="text-sm text-gray-500">Automatically create purchase orders when stock is low</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Price Optimization</Label>
                        <p className="text-sm text-gray-500">
                          Automatically adjust prices based on demand and competition
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Anomaly Alerts</Label>
                        <p className="text-sm text-gray-500">Get notified when AI detects unusual patterns</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Smart Categorization</Label>
                        <p className="text-sm text-gray-500">Automatically categorize new products using AI</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Demand Forecasting</Label>
                        <p className="text-sm text-gray-500">Generate weekly demand predictions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>AI Model Performance</CardTitle>
                    <CardDescription>Monitor and improve AI accuracy</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Demand Forecasting</span>
                        <span className="text-sm font-bold">94.2%</span>
                      </div>
                      <Progress value={94.2} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Last updated: 2 hours ago</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Price Optimization</span>
                        <span className="text-sm font-bold">87.8%</span>
                      </div>
                      <Progress value={87.8} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Last updated: 6 hours ago</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Anomaly Detection</span>
                        <span className="text-sm font-bold">91.5%</span>
                      </div>
                      <Progress value={91.5} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">Last updated: 1 day ago</p>
                    </div>

                    <div className="pt-4 border-t">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retrain Models
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
