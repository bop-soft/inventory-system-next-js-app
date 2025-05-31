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
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Upload, Trash2, Package } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function EditProductPage({ params }: { params: { id: string } }) {
  // Mock product data - in real app, fetch based on params.id
  const existingProduct = {
    id: "PRD001",
    name: "Premium Coffee Beans",
    sku: "CFB-001",
    description:
      "High-quality arabica coffee beans sourced from sustainable farms in Colombia. Perfect for espresso and drip coffee brewing methods.",
    category: "food-beverage",
    price: "24.99",
    cost: "18.50",
    stock: "245",
    minStock: "50",
    maxStock: "500",
    branch: "downtown",
    supplier: "Colombian Coffee Co.",
    barcode: "1234567890123",
    weight: "1 kg",
    dimensions: "20cm x 15cm x 8cm",
    trackInventory: true,
    isActive: true,
  }

  const [formData, setFormData] = useState({
    name: existingProduct.name,
    sku: existingProduct.sku,
    description: existingProduct.description,
    category: existingProduct.category,
    price: existingProduct.price,
    cost: existingProduct.cost,
    stock: existingProduct.stock,
    minStock: existingProduct.minStock,
    maxStock: existingProduct.maxStock,
    branch: existingProduct.branch,
    supplier: existingProduct.supplier,
    barcode: existingProduct.barcode,
    weight: existingProduct.weight,
    dimensions: existingProduct.dimensions,
    trackInventory: existingProduct.trackInventory,
    isActive: existingProduct.isActive,
  })

  const [hasChanges, setHasChanges] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated product data:", formData)
    // Handle form submission
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setHasChanges(true)
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      console.log("Deleting product:", params.id)
      // Handle product deletion
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/inventory/${params.id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Product
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
                <p className="text-gray-600">Update product information and settings</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {hasChanges && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  Unsaved Changes
                </Badge>
              )}
              <Button variant="outline" className="text-red-600 hover:text-red-700" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Product
              </Button>
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Product Status */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  Product Status
                </CardTitle>
                <CardDescription>Current product information and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Product ID</Label>
                    <p className="text-sm font-mono bg-gray-100 px-3 py-2 rounded">{existingProduct.id}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Current Stock</Label>
                    <p className="text-lg font-semibold text-blue-600">{existingProduct.stock} units</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Last Updated</Label>
                    <p className="text-sm text-gray-600">2024-01-15 10:30 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update the basic details for your product</CardDescription>
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
                      <SelectItem value="home-garden">Home & Garden</SelectItem>
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
                <CardDescription>Update the pricing information for this product</CardDescription>
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
                {formData.cost && formData.price && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Profit Margin:{" "}
                      <span className="font-semibold">
                        ${(Number.parseFloat(formData.price) - Number.parseFloat(formData.cost)).toFixed(2)}
                      </span>{" "}
                      (
                      {(
                        ((Number.parseFloat(formData.price) - Number.parseFloat(formData.cost)) /
                          Number.parseFloat(formData.price)) *
                        100
                      ).toFixed(1)}
                      %)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Inventory Settings */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Inventory Settings</CardTitle>
                <CardDescription>Configure inventory tracking and stock levels</CardDescription>
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
                      <Label htmlFor="maxStock">Maximum Stock</Label>
                      <Input
                        id="maxStock"
                        type="number"
                        placeholder="0"
                        value={formData.maxStock}
                        onChange={(e) => handleInputChange("maxStock", e.target.value)}
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

            {/* Product Details */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Additional product specifications and information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Input
                      id="supplier"
                      placeholder="Enter supplier name"
                      value={formData.supplier}
                      onChange={(e) => handleInputChange("supplier", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input
                      id="barcode"
                      placeholder="Enter barcode"
                      value={formData.barcode}
                      onChange={(e) => handleInputChange("barcode", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      placeholder="e.g., 1 kg, 500g"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input
                      id="dimensions"
                      placeholder="e.g., 20cm x 15cm x 8cm"
                      value={formData.dimensions}
                      onChange={(e) => handleInputChange("dimensions", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Image */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
                <CardDescription>Update the product image</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-600 mb-2 block">Current Image</Label>
                    <img
                      src="/placeholder.svg?height=200&width=200"
                      alt="Current product"
                      className="w-full h-48 object-cover rounded-lg bg-gray-100 border"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600 mb-2 block">Upload New Image</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-48 flex flex-col justify-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-2">Drag and drop an image here</p>
                      <p className="text-sm text-gray-500 mb-3">PNG, JPG, GIF up to 10MB</p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
                <CardDescription>Control the availability of this product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Active Product</Label>
                    <p className="text-sm text-gray-500">Make this product available for sale and inventory tracking</p>
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
