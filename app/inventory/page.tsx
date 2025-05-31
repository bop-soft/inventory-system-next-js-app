"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  FileSpreadsheet,
  FileText,
  FileIcon as FilePdf,
  Database,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function InventoryPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState("excel")
  const [exportProgress, setExportProgress] = useState(0)
  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)
  const [selectedFields, setSelectedFields] = useState({
    id: true,
    name: true,
    category: true,
    sku: true,
    stock: true,
    minStock: true,
    price: true,
    branch: true,
    status: true,
    lastUpdated: true,
  })

  const products = [
    {
      id: "PRD001",
      name: "Premium Coffee Beans",
      category: "Food & Beverage",
      sku: "CFB-001",
      stock: 245,
      minStock: 50,
      price: 24.99,
      branch: "Downtown",
      status: "In Stock",
      lastUpdated: "2024-01-15",
    },
    {
      id: "PRD002",
      name: "Wireless Headphones",
      category: "Electronics",
      sku: "WH-002",
      stock: 8,
      minStock: 25,
      price: 199.99,
      branch: "Mall Location",
      status: "Low Stock",
      lastUpdated: "2024-01-14",
    },
    {
      id: "PRD003",
      name: "Organic Flour",
      category: "Food & Beverage",
      sku: "OF-003",
      stock: 15,
      minStock: 40,
      price: 8.99,
      branch: "Bakery Central",
      status: "Low Stock",
      lastUpdated: "2024-01-13",
    },
    {
      id: "PRD004",
      name: "Steel Bolts M8",
      category: "Hardware",
      sku: "SB-004",
      stock: 450,
      minStock: 100,
      price: 0.25,
      branch: "Warehouse A",
      status: "In Stock",
      lastUpdated: "2024-01-12",
    },
    {
      id: "PRD005",
      name: "Laptop Computers",
      category: "Electronics",
      sku: "LC-005",
      stock: 0,
      minStock: 10,
      price: 899.99,
      branch: "Tech Store",
      status: "Out of Stock",
      lastUpdated: "2024-01-11",
    },
  ]

  const getStatusBadge = (status: string, stock: number, minStock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (stock <= minStock) {
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
          Low Stock
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
          In Stock
        </Badge>
      )
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesBranch = selectedBranch === "all" || product.branch === selectedBranch

    return matchesSearch && matchesCategory && matchesBranch
  })

  const toggleField = (field: string) => {
    setSelectedFields({
      ...selectedFields,
      [field]: !selectedFields[field as keyof typeof selectedFields],
    })
  }

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)
    setExportComplete(false)

    // Prepare data for export based on selected fields
    const exportData = filteredProducts.map((product) => {
      const exportProduct: Record<string, any> = {}
      Object.keys(selectedFields).forEach((field) => {
        if (selectedFields[field as keyof typeof selectedFields]) {
          exportProduct[field] = product[field as keyof typeof product]
        }
      })
      return exportProduct
    })

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 100)

    try {
      // Simulate export process
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate export based on selected format
      if (exportFormat === "excel") {
        await generateExcel(exportData)
      } else if (exportFormat === "csv") {
        generateCSV(exportData)
      } else if (exportFormat === "pdf") {
        await generatePDF(exportData)
      } else if (exportFormat === "json") {
        generateJSON(exportData)
      }

      clearInterval(interval)
      setExportProgress(100)
      setIsExporting(false)
      setExportComplete(true)

      toast({
        title: "Export Successful",
        description: `${filteredProducts.length} products exported as ${exportFormat.toUpperCase()}`,
        variant: "default",
      })
    } catch (error) {
      clearInterval(interval)
      setIsExporting(false)
      console.error("Export failed:", error)

      toast({
        title: "Export Failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive",
      })
    }
  }

  const generateExcel = async (data: any[]) => {
    try {
      // Dynamically import xlsx to avoid SSR issues
      const XLSX = await import("xlsx")

      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory")

      // Generate file name with date
      const fileName = `inventory_export_${new Date().toISOString().split("T")[0]}.xlsx`

      // Write and download
      XLSX.writeFile(workbook, fileName)
      return true
    } catch (error) {
      console.error("Excel generation failed:", error)
      throw error
    }
  }

  const generateCSV = (data: any[]) => {
    try {
      // Convert JSON to CSV
      const headers = Object.keys(data[0]).join(",")
      const rows = data.map((row) =>
        Object.values(row)
          .map((value) => (typeof value === "string" && value.includes(",") ? `"${value}"` : value))
          .join(","),
      )
      const csv = [headers, ...rows].join("\n")

      // Create download link
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `inventory_export_${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("CSV generation failed:", error)
      throw error
    }
  }

  const generatePDF = async (data: any[]) => {
    try {
      // Dynamically import jsPDF to avoid SSR issues
      const { jsPDF } = await import("jspdf")
      const { autoTable } = await import("jspdf-autotable")

      const doc = new jsPDF()

      // Add title
      doc.setFontSize(18)
      doc.text("Inventory Export", 14, 22)

      // Add metadata
      doc.setFontSize(10)
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30)
      doc.text(`Total Products: ${data.length}`, 14, 35)
      doc.text(
        `Filters: ${selectedCategory !== "all" ? selectedCategory : "All Categories"}, ${selectedBranch !== "all" ? selectedBranch : "All Branches"}`,
        14,
        40,
      )

      // Prepare columns and rows for the table
      const columns = Object.keys(data[0]).map((key) => ({
        header: key.charAt(0).toUpperCase() + key.slice(1),
        dataKey: key,
      }))

      // Generate table
      autoTable(doc, {
        startY: 45,
        head: [columns.map((col) => col.header)],
        body: data.map((item) => columns.map((col) => item[col.dataKey])),
        theme: "striped",
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        margin: { top: 45 },
      })

      // Save PDF
      doc.save(`inventory_export_${new Date().toISOString().split("T")[0]}.pdf`)
    } catch (error) {
      console.error("PDF generation failed:", error)
      throw error
    }
  }

  const generateJSON = (data: any[]) => {
    try {
      const jsonString = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonString], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `inventory_export_${new Date().toISOString().split("T")[0]}.json`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("JSON generation failed:", error)
      throw error
    }
  }

  const exportFormats = [
    {
      id: "excel",
      name: "Excel (.xlsx)",
      description: "Spreadsheet format with multiple sheets",
      icon: FileSpreadsheet,
      color: "text-green-600 dark:text-green-400",
    },
    {
      id: "csv",
      name: "CSV (.csv)",
      description: "Comma-separated values for data analysis",
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "pdf",
      name: "PDF (.pdf)",
      description: "Formatted report for printing and sharing",
      icon: FilePdf,
      color: "text-red-600 dark:text-red-400",
    },
    {
      id: "json",
      name: "JSON (.json)",
      description: "Structured data format for developers",
      icon: Database,
      color: "text-purple-600 dark:text-purple-400",
    },
  ]

  const fieldLabels: Record<string, string> = {
    id: "Product ID",
    name: "Product Name",
    category: "Category",
    sku: "SKU",
    stock: "Stock",
    minStock: "Min Stock",
    price: "Price",
    branch: "Branch",
    status: "Status",
    lastUpdated: "Last Updated",
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Inventory Management</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your products across all branches</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/inventory/import">
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </Link>
              <Button variant="outline" onClick={() => setExportDialogOpen(true)}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Link href="/inventory/add">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Filters */}
          <Card className="mb-6 border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search products by name or SKU..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Hardware">Hardware</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger className="w-full md:w-48 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="Downtown">Downtown</SelectItem>
                    <SelectItem value="Mall Location">Mall Location</SelectItem>
                    <SelectItem value="Bakery Central">Bakery Central</SelectItem>
                    <SelectItem value="Warehouse A">Warehouse A</SelectItem>
                    <SelectItem value="Tech Store">Tech Store</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card className="border-0 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Products ({filteredProducts.length})</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Manage your inventory items and track stock levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border dark:border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow className="dark:border-gray-700 dark:bg-gray-800">
                      <TableHead className="dark:text-gray-300">Product</TableHead>
                      <TableHead className="dark:text-gray-300">SKU</TableHead>
                      <TableHead className="dark:text-gray-300">Category</TableHead>
                      <TableHead className="dark:text-gray-300">Branch</TableHead>
                      <TableHead className="dark:text-gray-300">Stock</TableHead>
                      <TableHead className="dark:text-gray-300">Price</TableHead>
                      <TableHead className="dark:text-gray-300">Status</TableHead>
                      <TableHead className="dark:text-gray-300">Last Updated</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id} className="dark:border-gray-700">
                        <TableCell className="dark:text-gray-300">
                          <Link
                            href={`/inventory/${product.id}`}
                            className="hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <div>
                              <div className="font-medium hover:underline">{product.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{product.id}</div>
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell className="font-mono text-sm dark:text-gray-300">{product.sku}</TableCell>
                        <TableCell className="dark:text-gray-300">{product.category}</TableCell>
                        <TableCell className="dark:text-gray-300">{product.branch}</TableCell>
                        <TableCell className="dark:text-gray-300">
                          <div>
                            <div className="font-medium">{product.stock}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Min: {product.minStock}</div>
                          </div>
                        </TableCell>
                        <TableCell className="dark:text-gray-300">${product.price}</TableCell>
                        <TableCell>{getStatusBadge(product.status, product.stock, product.minStock)}</TableCell>
                        <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                          {product.lastUpdated}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
                              <DropdownMenuLabel className="dark:text-gray-300">Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/inventory/${product.id}`}
                                  className="dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/inventory/${product.id}/edit`}
                                  className="dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Product
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="dark:border-gray-700" />
                              <DropdownMenuItem className="text-red-600 dark:text-red-400 dark:hover:bg-gray-700">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-[600px] dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="dark:text-gray-100">Export Inventory</DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              Configure your export options and download your inventory data
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="format" className="mt-4">
            <TabsList className="grid grid-cols-3 mb-4 dark:bg-gray-700">
              <TabsTrigger value="format">Format</TabsTrigger>
              <TabsTrigger value="fields">Fields</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="format" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exportFormats.map((format) => (
                  <div
                    key={format.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors dark:border-gray-700 ${
                      exportFormat === format.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => setExportFormat(format.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <format.icon className={`w-6 h-6 ${format.color}`} />
                      <div>
                        <p className="font-medium dark:text-gray-100">{format.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{format.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>{filteredProducts.length}</strong> products will be exported
                </p>
              </div>
            </TabsContent>

            <TabsContent value="fields" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(fieldLabels).map(([field, label]) => (
                  <div key={field} className="flex items-center space-x-2">
                    <Checkbox
                      id={`export-${field}`}
                      checked={selectedFields[field as keyof typeof selectedFields]}
                      onCheckedChange={() => toggleField(field)}
                    />
                    <Label htmlFor={`export-${field}`} className="text-sm font-medium dark:text-gray-300">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <strong>{Object.values(selectedFields).filter(Boolean).length}</strong> fields selected for export
                </p>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <div className="border rounded-lg p-4 dark:border-gray-700">
                <h4 className="font-medium mb-2 dark:text-gray-100">Export Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Format:</span>
                    <span className="text-sm font-medium dark:text-gray-300">
                      {exportFormats.find((f) => f.id === exportFormat)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Products:</span>
                    <span className="text-sm font-medium dark:text-gray-300">{filteredProducts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Fields:</span>
                    <span className="text-sm font-medium dark:text-gray-300">
                      {Object.values(selectedFields).filter(Boolean).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Filters:</span>
                    <span className="text-sm font-medium dark:text-gray-300">
                      {selectedCategory !== "all" ? selectedCategory : "All Categories"},
                      {selectedBranch !== "all" ? selectedBranch : "All Branches"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4 dark:border-gray-700">
                <h4 className="font-medium mb-2 dark:text-gray-100">Selected Fields</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedFields).map(
                    ([field, selected]) =>
                      selected && (
                        <Badge key={field} variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                          {fieldLabels[field]}
                        </Badge>
                      ),
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {isExporting && (
            <div className="space-y-3 py-2">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 dark:border-blue-400"></div>
                <span className="text-sm dark:text-gray-300">Exporting data...</span>
              </div>
              <Progress value={exportProgress} className="w-full" />
              <p className="text-xs text-gray-500 dark:text-gray-400">{exportProgress}% complete</p>
            </div>
          )}

          {exportComplete && (
            <div className="space-y-3 py-2">
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Export completed successfully!</span>
              </div>
            </div>
          )}

          <DialogFooter>
            {!isExporting && !exportComplete && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setExportDialogOpen(false)}
                  className="dark:border-gray-600 dark:text-gray-300"
                >
                  Cancel
                </Button>
                <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export Now
                </Button>
              </>
            )}

            {exportComplete && (
              <Button onClick={() => setExportDialogOpen(false)} className="bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Done
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
