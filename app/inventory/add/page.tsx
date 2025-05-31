"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Upload } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    description: "",
    price: "",
    cost: "",
    stock: "",
    minStock: "",
    branch: "",
    trackInventory: true,
    isActive: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Product data:", formData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
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
                <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                <p className="text-gray-600">Create a new product in your inventory</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
                <Save className="w-4 h-4 mr-2" />
                Save Product
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Basic Information */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details for your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      placeholder="Enter SKU"
                      value={formData.sku}
                      onChange={(e) => handleInputChange("sku", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>Set the pricing information for this product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost Price</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.cost}
                      onChange={(e) => handleInputChange("cost", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Selling Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
                <CardDescription>Configure inventory settings for this product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Track Inventory</Label>
                    <p className="text-sm text-gray-500">Enable inventory tracking for this product</p>
                  </div>
                  <Switch
                    checked={formData.trackInventory}
                    onCheckedChange={(checked) => handleInputChange("trackInventory", checked)}
                  />
                </div>

                {formData.trackInventory && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="stock">Initial Stock *</Label>
                      <Input
                        id="stock"
                        type="number"
                        placeholder="0"
                        value={formData.stock}
                        onChange={(e) => handleInputChange("stock", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minStock">Minimum Stock</Label>
                      <Input
                        id="minStock"
                        type="number"
                        placeholder="0"
                        value={formData.minStock}
                        onChange={(e) => handleInputChange("minStock", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch *</Label>
                      <Select value={formData.branch} onValueChange={(value) => handleInputChange("branch", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select branch" />
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
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Image */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
                <CardDescription>Upload an image for this product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop an image here, or click to browse</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  <Button variant="outline" className="mt-4">
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Status</CardTitle>
                <CardDescription>Set the status of this product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Active Product</Label>
                    <p className="text-sm text-gray-500">Make this product available for sale</p>
                  </div>
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
