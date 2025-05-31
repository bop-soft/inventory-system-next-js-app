"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  FileText,
  FileSpreadsheet,
  Database,
  Filter,
  CalendarIcon,
  ArrowLeft,
  CheckCircle,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function ExportPage() {
  const [selectedFormat, setSelectedFormat] = useState("excel")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportComplete, setExportComplete] = useState(false)

  const [selectedFields, setSelectedFields] = useState({
    productId: true,
    name: true,
    description: true,
    category: true,
    branch: true,
    quantity: true,
    price: true,
    cost: true,
    supplier: true,
    lastUpdated: true,
    status: false,
    barcode: false,
    weight: false,
    dimensions: false,
  })

  const exportFormats = [
    {
      id: "excel",
      name: "Excel (.xlsx)",
      description: "Spreadsheet format with multiple sheets",
      icon: FileSpreadsheet,
      color: "text-green-600",
    },
    {
      id: "csv",
      name: "CSV (.csv)",
      description: "Comma-separated values for data analysis",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      id: "pdf",
      name: "PDF (.pdf)",
      description: "Formatted report for printing and sharing",
      icon: FileText,
      color: "text-red-600",
    },
    {
      id: "json",
      name: "JSON (.json)",
      description: "Structured data format for developers",
      icon: Database,
      color: "text-purple-600",
    },
  ]

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsExporting(false)
          setExportComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const toggleField = (field: string) => {
    setSelectedFields({
      ...selectedFields,
      [field]: !selectedFields[field as keyof typeof selectedFields],
    })
  }

  const fieldLabels = {
    productId: "Product ID",
    name: "Product Name",
    description: "Description",
    category: "Category",
    branch: "Branch",
    quantity: "Quantity",
    price: "Price",
    cost: "Cost",
    supplier: "Supplier",
    lastUpdated: "Last Updated",
    status: "Status",
    barcode: "Barcode",
    weight: "Weight",
    dimensions: "Dimensions",
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/inventory">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Inventory
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Export Inventory</h1>
                <p className="text-gray-600">Configure and download your inventory data</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Export Format Selection */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Export Format</CardTitle>
                <CardDescription>Choose the format for your exported data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exportFormats.map((format) => (
                    <div
                      key={format.id}
                      className={cn(
                        "p-4 border rounded-lg cursor-pointer transition-colors",
                        selectedFormat === format.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300",
                      )}
                      onClick={() => setSelectedFormat(format.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <format.icon className={cn("w-6 h-6", format.color)} />
                        <div>
                          <p className="font-medium">{format.name}</p>
                          <p className="text-sm text-gray-600">{format.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-blue-600" />
                  Filters
                </CardTitle>
                <CardDescription>Filter the data to export specific records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Branch</Label>
                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Branches</SelectItem>
                        <SelectItem value="downtown">Downtown Store</SelectItem>
                        <SelectItem value="mall">Mall Location</SelectItem>
                        <SelectItem value="bakery">Bakery Central</SelectItem>
                        <SelectItem value="warehouse">Warehouse A</SelectItem>
                        <SelectItem value="tech">Tech Store</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="food">Food & Beverage</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="hardware">Hardware</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>From Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateFrom ? format(dateFrom, "PPP") : "Select start date"}
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
                          className={cn("justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateTo ? format(dateTo, "PPP") : "Select end date"}
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

            {/* Field Selection */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Fields to Export</CardTitle>
                <CardDescription>Select which fields to include in your export</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(fieldLabels).map(([field, label]) => (
                    <div key={field} className="flex items-center space-x-2">
                      <Checkbox
                        id={field}
                        checked={selectedFields[field as keyof typeof selectedFields]}
                        onCheckedChange={() => toggleField(field)}
                      />
                      <Label htmlFor={field} className="text-sm font-medium">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>{Object.values(selectedFields).filter(Boolean).length}</strong> fields selected for export
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Export Summary */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Export Summary</CardTitle>
                <CardDescription>Review your export configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Format:</Label>
                    <Badge variant="secondary">{exportFormats.find((f) => f.id === selectedFormat)?.name}</Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Branch:</Label>
                    <Badge variant="secondary">{selectedBranch === "all" ? "All Branches" : selectedBranch}</Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Category:</Label>
                    <Badge variant="secondary">
                      {selectedCategory === "all" ? "All Categories" : selectedCategory}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Date Range:</Label>
                    <Badge variant="secondary">
                      {dateFrom && dateTo ? `${format(dateFrom, "MMM dd")} - ${format(dateTo, "MMM dd")}` : "All Dates"}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-4">
                    Estimated records: <strong>2,847 products</strong>
                  </p>

                  {!isExporting && !exportComplete && (
                    <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
                      <Download className="w-4 h-4 mr-2" />
                      Start Export
                    </Button>
                  )}

                  {isExporting && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-sm">Exporting data...</span>
                      </div>
                      <Progress value={exportProgress} className="w-full" />
                      <p className="text-xs text-gray-500">{exportProgress}% complete</p>
                    </div>
                  )}

                  {exportComplete && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Export completed successfully!</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button className="bg-green-600 hover:bg-green-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download File
                        </Button>
                        <Button variant="outline" onClick={() => setExportComplete(false)}>
                          Export Again
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Export History */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Recent Exports</CardTitle>
                <CardDescription>Your recent export history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      file: "inventory_export_2024_01_15.xlsx",
                      date: "Jan 15, 2024",
                      size: "2.4 MB",
                      status: "completed",
                    },
                    {
                      file: "inventory_export_2024_01_10.csv",
                      date: "Jan 10, 2024",
                      size: "1.8 MB",
                      status: "completed",
                    },
                    {
                      file: "inventory_export_2024_01_05.pdf",
                      date: "Jan 5, 2024",
                      size: "3.1 MB",
                      status: "completed",
                    },
                  ].map((export_, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-sm">{export_.file}</p>
                          <p className="text-xs text-gray-500">
                            {export_.date} • {export_.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
