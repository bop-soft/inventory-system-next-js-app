"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CalendarIcon, Download, Eye, Save, FileText, BarChart3, PieChart, TrendingUp } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function CustomReportPage() {
  const [reportName, setReportName] = useState("")
  const [reportDescription, setReportDescription] = useState("")
  const [selectedFormat, setSelectedFormat] = useState("pdf")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [selectedBranches, setSelectedBranches] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeImages, setIncludeImages] = useState(false)
  const [autoSchedule, setAutoSchedule] = useState(false)

  const [selectedFields, setSelectedFields] = useState({
    productInfo: {
      name: true,
      sku: true,
      category: true,
      price: true,
      cost: false,
      margin: false,
    },
    inventory: {
      currentStock: true,
      lowStockAlert: true,
      stockValue: true,
      lastRestocked: false,
      turnoverRate: false,
    },
    sales: {
      unitsSold: true,
      revenue: true,
      profit: false,
      topSellingProducts: true,
      salesTrends: false,
    },
    branches: {
      branchName: true,
      branchPerformance: false,
      staffInfo: false,
      operatingHours: false,
    },
  })

  const branches = [
    { id: "BR001", name: "Downtown" },
    { id: "BR002", name: "Mall Location" },
    { id: "BR003", name: "Bakery Central" },
    { id: "BR004", name: "Warehouse A" },
    { id: "BR005", name: "Tech Store" },
  ]

  const categories = [
    { id: "CAT001", name: "Food & Beverage" },
    { id: "CAT002", name: "Electronics" },
    { id: "CAT003", name: "Hardware" },
    { id: "CAT004", name: "Clothing" },
    { id: "CAT005", name: "Books" },
  ]

  const reportTemplates = [
    {
      name: "Inventory Overview",
      description: "Complete inventory status across all branches",
      icon: BarChart3,
    },
    {
      name: "Sales Performance",
      description: "Sales analysis with trends and top products",
      icon: TrendingUp,
    },
    {
      name: "Category Analysis",
      description: "Performance breakdown by product categories",
      icon: PieChart,
    },
    {
      name: "Branch Comparison",
      description: "Compare performance across different branches",
      icon: BarChart3,
    },
  ]

  const handleFieldChange = (section: string, field: string, checked: boolean) => {
    setSelectedFields((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: checked,
      },
    }))
  }

  const handleBranchToggle = (branchId: string) => {
    setSelectedBranches((prev) =>
      prev.includes(branchId) ? prev.filter((id) => id !== branchId) : [...prev, branchId],
    )
  }

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const generateReport = () => {
    console.log("Generating custom report with:", {
      reportName,
      reportDescription,
      selectedFormat,
      dateFrom,
      dateTo,
      selectedBranches,
      selectedCategories,
      selectedFields,
      includeCharts,
      includeImages,
      autoSchedule,
    })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/reports">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Reports
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Custom Report Builder</h1>
                <p className="text-gray-600">Create a customized report with your specific requirements</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save Template
              </Button>
              <Button onClick={generateReport} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="filters">Filters</TabsTrigger>
                <TabsTrigger value="fields">Data Fields</TabsTrigger>
                <TabsTrigger value="format">Format</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Report Details */}
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Report Details</CardTitle>
                      <CardDescription>Basic information about your custom report</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reportName">Report Name *</Label>
                        <Input
                          id="reportName"
                          value={reportName}
                          onChange={(e) => setReportName(e.target.value)}
                          placeholder="Enter report name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reportDescription">Description</Label>
                        <Textarea
                          id="reportDescription"
                          value={reportDescription}
                          onChange={(e) => setReportDescription(e.target.value)}
                          placeholder="Describe what this report will contain"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Templates */}
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Quick Templates</CardTitle>
                      <CardDescription>Start with a pre-configured template</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {reportTemplates.map((template, index) => (
                          <div
                            key={index}
                            className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-lg bg-blue-50">
                                <template.icon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{template.name}</h4>
                                <p className="text-sm text-gray-600">{template.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="filters" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Date Range */}
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Date Range</CardTitle>
                      <CardDescription>Select the time period for your report</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>From Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !dateFrom && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label>To Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !dateTo && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateTo ? format(dateTo, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Branches */}
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Branches</CardTitle>
                      <CardDescription>Select which branches to include</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="all-branches"
                            checked={selectedBranches.length === branches.length}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedBranches(branches.map((b) => b.id))
                              } else {
                                setSelectedBranches([])
                              }
                            }}
                          />
                          <Label htmlFor="all-branches" className="font-medium">
                            All Branches
                          </Label>
                        </div>
                        {branches.map((branch) => (
                          <div key={branch.id} className="flex items-center space-x-2 ml-6">
                            <Checkbox
                              id={branch.id}
                              checked={selectedBranches.includes(branch.id)}
                              onCheckedChange={() => handleBranchToggle(branch.id)}
                            />
                            <Label htmlFor={branch.id}>{branch.name}</Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Categories */}
                  <Card className="border-0 shadow-md lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Categories</CardTitle>
                      <CardDescription>Select which product categories to include</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="all-categories"
                            checked={selectedCategories.length === categories.length}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories(categories.map((c) => c.id))
                              } else {
                                setSelectedCategories([])
                              }
                            }}
                          />
                          <Label htmlFor="all-categories" className="font-medium">
                            All Categories
                          </Label>
                        </div>
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={category.id}
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => handleCategoryToggle(category.id)}
                            />
                            <Label htmlFor={category.id}>{category.name}</Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="fields" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Product Information */}
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Product Information</CardTitle>
                      <CardDescription>Select product-related fields to include</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(selectedFields.productInfo).map(([field, checked]) => (
                          <div key={field} className="flex items-center space-x-2">
                            <Checkbox
                              id={`product-${field}`}
                              checked={checked}
                              onCheckedChange={(checked) => handleFieldChange("productInfo", field, checked as boolean)}
                            />
                            <Label htmlFor={`product-${field}`} className="capitalize">
                              {field.replace(/([A-Z])/g, " $1").trim()}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Inventory Data */}
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Inventory Data</CardTitle>
                      <CardDescription>Select inventory-related fields to include</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(selectedFields.inventory).map(([field, checked]) => (
                          <div key={field} className="flex items-center space-x-2">
                            <Checkbox
                              id={`inventory-${field}`}
                              checked={checked}
                              onCheckedChange={(checked) => handleFieldChange("inventory", field, checked as boolean)}
                            />
                            <Label htmlFor={`inventory-${field}`} className="capitalize">
                              {field.replace(/([A-Z])/g, " $1").trim()}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sales Data */}
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Sales Data</CardTitle>
                      <CardDescription>Select sales-related fields to include</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(selectedFields.sales).map(([field, checked]) => (
                          <div key={field} className="flex items-center space-x-2">
                            <Checkbox
                              id={`sales-${field}`}
                              checked={checked}
                              onCheckedChange={(checked) => handleFieldChange("sales", field, checked as boolean)}
                            />
                            <Label htmlFor={`sales-${field}`} className="capitalize">
                              {field.replace(/([A-Z])/g, " $1").trim()}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Branch Data */}
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Branch Data</CardTitle>
                      <CardDescription>Select branch-related fields to include</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(selectedFields.branches).map(([field, checked]) => (
                          <div key={field} className="flex items-center space-x-2">
                            <Checkbox
                              id={`branch-${field}`}
                              checked={checked}
                              onCheckedChange={(checked) => handleFieldChange("branches", field, checked as boolean)}
                            />
                            <Label htmlFor={`branch-${field}`} className="capitalize">
                              {field.replace(/([A-Z])/g, " $1").trim()}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="format" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Output Format */}
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Output Format</CardTitle>
                      <CardDescription>Choose how you want to receive your report</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>File Format</Label>
                        <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4" />
                                <span>PDF - Portable Document Format</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="excel">
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4" />
                                <span>Excel - Spreadsheet Format</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="csv">
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4" />
                                <span>CSV - Comma Separated Values</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="json">
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4" />
                                <span>JSON - JavaScript Object Notation</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Include Charts</Label>
                            <p className="text-sm text-gray-600">Add visual charts and graphs</p>
                          </div>
                          <Switch checked={includeCharts} onCheckedChange={setIncludeCharts} />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Include Images</Label>
                            <p className="text-sm text-gray-600">Add product images and logos</p>
                          </div>
                          <Switch checked={includeImages} onCheckedChange={setIncludeImages} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Scheduling */}
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Report Scheduling</CardTitle>
                      <CardDescription>Set up automatic report generation</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Auto Schedule</Label>
                          <p className="text-sm text-gray-600">Generate this report automatically</p>
                        </div>
                        <Switch checked={autoSchedule} onCheckedChange={setAutoSchedule} />
                      </div>

                      {autoSchedule && (
                        <div className="space-y-4 pt-4 border-t">
                          <div className="space-y-2">
                            <Label>Frequency</Label>
                            <Select defaultValue="weekly">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Email Recipients</Label>
                            <Input placeholder="Enter email addresses separated by commas" />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Report Preview</CardTitle>
                    <CardDescription>Review your custom report configuration before generating</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Report Name</h4>
                          <p className="text-gray-600">{reportName || "Untitled Report"}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Description</h4>
                          <p className="text-gray-600">{reportDescription || "No description provided"}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Date Range</h4>
                          <p className="text-gray-600">
                            {dateFrom && dateTo
                              ? `${format(dateFrom, "PPP")} - ${format(dateTo, "PPP")}`
                              : "No date range selected"}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Format</h4>
                          <p className="text-gray-600 capitalize">{selectedFormat}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Selected Branches ({selectedBranches.length})</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedBranches.length > 0 ? (
                              selectedBranches.map((branchId) => {
                                const branch = branches.find((b) => b.id === branchId)
                                return branch ? (
                                  <span key={branchId} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                    {branch.name}
                                  </span>
                                ) : null
                              })
                            ) : (
                              <span className="text-gray-500 text-sm">No branches selected</span>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900">
                            Selected Categories ({selectedCategories.length})
                          </h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedCategories.length > 0 ? (
                              selectedCategories.map((categoryId) => {
                                const category = categories.find((c) => c.id === categoryId)
                                return category ? (
                                  <span
                                    key={categoryId}
                                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                                  >
                                    {category.name}
                                  </span>
                                ) : null
                              })
                            ) : (
                              <span className="text-gray-500 text-sm">No categories selected</span>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900">Options</h4>
                          <div className="space-y-1 text-sm">
                            <p className="text-gray-600">Charts: {includeCharts ? "Included" : "Not included"}</p>
                            <p className="text-gray-600">Images: {includeImages ? "Included" : "Not included"}</p>
                            <p className="text-gray-600">Auto Schedule: {autoSchedule ? "Enabled" : "Disabled"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-4 pt-6 border-t">
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Sample
                      </Button>
                      <Button onClick={generateReport} className="bg-blue-600 hover:bg-blue-700">
                        <Download className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
