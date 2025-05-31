"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, X, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function EditSubcategoryPage({ params }: { params: { id: string } }) {
  // Mock data - in real app, fetch based on params.id
  const [formData, setFormData] = useState({
    name: "Fresh Produce",
    description: "Fresh fruits and vegetables sourced from local farms",
    parentCategory: "CAT001",
    isActive: true,
    sortOrder: 1,
    minStockLevel: 10,
    maxStockLevel: 500,
  })

  const handleSave = () => {
    console.log("Saving subcategory:", formData)
    // In real app, make API call to save changes
  }

  const parentCategories = [
    { id: "CAT001", name: "Food & Beverage", color: "#10b981" },
    { id: "CAT002", name: "Electronics", color: "#3b82f6" },
    { id: "CAT003", name: "Hardware", color: "#f59e0b" },
  ]

  const selectedParent = parentCategories.find((cat) => cat.id === formData.parentCategory)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/subcategories/${params.id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Subcategory
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                {selectedParent && (
                  <div className="w-8 h-8 rounded-full" style={{ backgroundColor: selectedParent.color }} />
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Edit Subcategory</h1>
                  <p className="text-gray-600">Update subcategory information and settings</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href={`/subcategories/${params.id}`}>
                <Button variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </Link>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
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
                <CardDescription>Update the basic details of this subcategory</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Subcategory Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter subcategory name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent">Parent Category *</Label>
                    <Select
                      value={formData.parentCategory}
                      onValueChange={(value) => setFormData({ ...formData, parentCategory: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent category" />
                      </SelectTrigger>
                      <SelectContent>
                        {parentCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                              <span>{category.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter subcategory description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sortOrder">Sort Order</Label>
                    <Input
                      id="sortOrder"
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) => setFormData({ ...formData, sortOrder: Number.parseInt(e.target.value) || 0 })}
                      placeholder="1"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Switch
                      id="active"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label htmlFor="active">Subcategory is active</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Settings */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Inventory Settings</CardTitle>
                <CardDescription>Configure inventory management for this subcategory</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="minStock">Minimum Stock Level</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={formData.minStockLevel}
                      onChange={(e) =>
                        setFormData({ ...formData, minStockLevel: Number.parseInt(e.target.value) || 0 })
                      }
                      placeholder="10"
                    />
                    <p className="text-sm text-gray-600">Alert when products fall below this level</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxStock">Maximum Stock Level</Label>
                    <Input
                      id="maxStock"
                      type="number"
                      value={formData.maxStockLevel}
                      onChange={(e) =>
                        setFormData({ ...formData, maxStockLevel: Number.parseInt(e.target.value) || 0 })
                      }
                      placeholder="500"
                    />
                    <p className="text-sm text-gray-600">Maximum recommended stock level</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Inventory Tracking</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Track Expiry Dates</Label>
                        <p className="text-sm text-gray-600">Monitor product expiration dates</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto Reorder</Label>
                        <p className="text-sm text-gray-600">Automatically create reorder suggestions</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Batch Tracking</Label>
                        <p className="text-sm text-gray-600">Track products by batch numbers</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for this subcategory</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-800">Warning</h4>
                      <p className="text-sm text-orange-700 mt-1">
                        These actions cannot be undone. Please proceed with caution.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Archive Subcategory</h4>
                      <p className="text-sm text-gray-600">Hide this subcategory from active use</p>
                    </div>
                    <Button variant="outline">Archive</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-red-800">Delete Subcategory</h4>
                      <p className="text-sm text-red-600">
                        Permanently delete this subcategory and move products to parent category
                      </p>
                    </div>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
