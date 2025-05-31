"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Upload,
  Download,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function ImportInventoryPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [importStatus, setImportStatus] = useState<"idle" | "uploading" | "processing" | "completed" | "error">("idle")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedBranch, setSelectedBranch] = useState("")
  const [importResults, setImportResults] = useState<any>(null)

  // Sample import results
  const sampleResults = {
    total: 150,
    successful: 142,
    failed: 8,
    warnings: 12,
    items: [
      {
        row: 1,
        sku: "CFB-001",
        name: "Premium Coffee Beans",
        status: "success",
        message: "Product imported successfully",
      },
      {
        row: 2,
        sku: "WH-002",
        name: "Wireless Headphones",
        status: "success",
        message: "Product imported successfully",
      },
      {
        row: 3,
        sku: "OF-003",
        name: "Organic Flour",
        status: "warning",
        message: "Product exists, stock updated",
      },
      {
        row: 4,
        sku: "SB-004",
        name: "Steel Bolts M8",
        status: "error",
        message: "Invalid price format",
      },
      {
        row: 5,
        sku: "LC-005",
        name: "Laptop Computers",
        status: "error",
        message: "Missing required category",
      },
    ],
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setImportStatus("idle")
    }
  }

  const handleImport = async () => {
    if (!selectedFile || !selectedBranch) return

    setImportStatus("uploading")
    setUploadProgress(0)

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          setImportStatus("processing")

          // Simulate processing
          setTimeout(() => {
            setImportStatus("completed")
            setImportResults(sampleResults)
          }, 2000)

          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Success
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Warning
          </Badge>
        )
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
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
                <h1 className="text-2xl font-bold text-gray-900">Import Inventory</h1>
                <p className="text-gray-600">Upload and import products from CSV or Excel files</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Import History
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Import Instructions */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Import Instructions
                </CardTitle>
                <CardDescription>Follow these guidelines for successful import</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Supported File Formats</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>CSV files (.csv)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Excel files (.xlsx, .xls)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Maximum file size: 10MB</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Required Columns</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Product Name (required)</li>
                      <li>• SKU (required)</li>
                      <li>• Category (required)</li>
                      <li>• Price (required)</li>
                      <li>• Stock Quantity (required)</li>
                      <li>• Description (optional)</li>
                      <li>• Cost Price (optional)</li>
                      <li>• Minimum Stock (optional)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Upload File</CardTitle>
                <CardDescription>Select your inventory file and configure import settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="branch">Target Branch *</Label>
                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch for import" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="downtown">Downtown</SelectItem>
                        <SelectItem value="mall">Mall Location</SelectItem>
                        <SelectItem value="bakery">Bakery Central</SelectItem>
                        <SelectItem value="warehouse-a">Warehouse A</SelectItem>
                        <SelectItem value="tech-store">Tech Store</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Import File</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      {selectedFile ? (
                        <div className="space-y-4">
                          <FileText className="w-12 h-12 text-blue-600 mx-auto" />
                          <div>
                            <p className="font-medium text-gray-900">{selectedFile.name}</p>
                            <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <Button variant="outline" onClick={() => setSelectedFile(null)}>
                            Remove File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-gray-600 mb-2">Drag and drop your file here, or click to browse</p>
                            <p className="text-sm text-gray-500">CSV, Excel files up to 10MB</p>
                          </div>
                          <Input
                            type="file"
                            accept=".csv,.xlsx,.xls"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="file-upload"
                          />
                          <Label htmlFor="file-upload">
                            <Button variant="outline" className="cursor-pointer">
                              Choose File
                            </Button>
                          </Label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Import Progress */}
                {(importStatus === "uploading" || importStatus === "processing") && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {importStatus === "uploading" ? "Uploading file..." : "Processing data..."}
                      </span>
                      <span className="text-sm text-gray-500">
                        {importStatus === "uploading" ? `${uploadProgress}%` : "Processing..."}
                      </span>
                    </div>
                    <Progress value={importStatus === "uploading" ? uploadProgress : 50} className="h-2" />
                    {importStatus === "processing" && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Validating and importing products...</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" disabled={importStatus !== "idle"}>
                    Preview Data
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleImport}
                    disabled={!selectedFile || !selectedBranch || importStatus !== "idle"}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Start Import
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Import Results */}
            {importStatus === "completed" && importResults && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    Import Results
                  </CardTitle>
                  <CardDescription>Summary of the import process</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="summary" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                      <TabsTrigger value="details">Detailed Results</TabsTrigger>
                    </TabsList>

                    <TabsContent value="summary">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{importResults.total}</p>
                          <p className="text-sm text-gray-600">Total Records</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{importResults.successful}</p>
                          <p className="text-sm text-gray-600">Successful</p>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <p className="text-2xl font-bold text-orange-600">{importResults.warnings}</p>
                          <p className="text-sm text-gray-600">Warnings</p>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <p className="text-2xl font-bold text-red-600">{importResults.failed}</p>
                          <p className="text-sm text-gray-600">Failed</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="details">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Row</TableHead>
                              <TableHead>SKU</TableHead>
                              <TableHead>Product Name</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Message</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {importResults.items.map((item: any, index: number) => (
                              <TableRow key={index}>
                                <TableCell>{item.row}</TableCell>
                                <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    {getStatusIcon(item.status)}
                                    {getStatusBadge(item.status)}
                                  </div>
                                </TableCell>
                                <TableCell className="text-sm text-gray-600">{item.message}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end space-x-4 mt-6">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Link href="/inventory">
                      <Button className="bg-blue-600 hover:bg-blue-700">View Inventory</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
