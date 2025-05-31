"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, X, Plus, Trash2, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  // Mock data - in real app, fetch based on params.id
  const [formData, setFormData] = useState({
    name: "Food & Beverage",
    description: "All food and beverage items including fresh produce, packaged goods, and drinks",
    color: "#10b981",
    isActive: true,
    parentCategory: "retail", // Updated default value to be a non-empty string
    sortOrder: 1,
    taxRate: 8.5,
    commissionRate: 2.5,
  })

  const [subcategories, setSubcategories] = useState([
    { id: "SUB001", name: "Fresh Produce", description: "Fresh fruits and vegetables" },
    { id: "SUB002", name: "Packaged Foods", description: "Canned and packaged food items" },
    { id: "SUB003", name: "Beverages", description: "Drinks and liquid refreshments" },
    { id: "SUB004", name: "Dairy Products", description: "Milk, cheese, and dairy items" },
  ])

  const [newSubcategory, setNewSubcategory] = useState({ name: "", description: "" })

  const handleSave = () => {
    console.log("Saving category:", formData)
    // In real app, make API call to save changes
  }

  const addSubcategory = () => {
    if (newSubcategory.name.trim()) {
      const newSub = {
        id: `SUB${String(subcategories.length + 1).padStart(3, "0")}`,
        ...newSubcategory,
      }
      setSubcategories([...subcategories, newSub])
      setNewSubcategory({ name: "", description: "" })
    }
  }

  const removeSubcategory = (id: string) => {
    setSubcategories(subcategories.filter((sub) => sub.id !== id))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/categories/${params.id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Category
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: formData.color }} />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Edit Category</h1>
                  <p className="text-gray-600">Update category information and settings</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href={`/categories/${params.id}`}>
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
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="subcategories">Subcategories</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Category Details</CardTitle>
                  <CardDescription>Basic information about this category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Category Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter category name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent">Parent Category</Label>
                      <Select
                        value={formData.parentCategory}
                        onValueChange={(value) => setFormData({ ...formData, parentCategory: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select parent category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="wholesale">Wholesale</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
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
                      placeholder="Enter category description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="color">Category Color</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="color"
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          className="w-12 h-10 rounded border border-gray-300"
                        />
                        <Input
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          placeholder="#10b981"
                        />
                      </div>
                    </div>
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
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                    <Label htmlFor="active">Category is active</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subcategories" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Manage Subcategories</CardTitle>
                  <CardDescription>Add and manage subcategories for better organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Subcategory */}
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-medium mb-3">Add New Subcategory</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="subName">Subcategory Name</Label>
                        <Input
                          id="subName"
                          value={newSubcategory.name}
                          onChange={(e) => setNewSubcategory({ ...newSubcategory, name: e.target.value })}
                          placeholder="Enter subcategory name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subDescription">Description</Label>
                        <Input
                          id="subDescription"
                          value={newSubcategory.description}
                          onChange={(e) => setNewSubcategory({ ...newSubcategory, description: e.target.value })}
                          placeholder="Enter description"
                        />
                      </div>
                    </div>
                    <Button onClick={addSubcategory} className="mt-3 bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Subcategory
                    </Button>
                  </div>

                  {/* Existing Subcategories */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Existing Subcategories ({subcategories.length})</h4>
                    {subcategories.map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <h5 className="font-medium">{sub.name}</h5>
                          <p className="text-sm text-gray-600">{sub.description}</p>
                          <p className="text-xs text-gray-500 mt-1">ID: {sub.id}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeSubcategory(sub.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Category Settings</CardTitle>
                  <CardDescription>Configure category-specific settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <Input
                        id="taxRate"
                        type="number"
                        step="0.1"
                        value={formData.taxRate}
                        onChange={(e) => setFormData({ ...formData, taxRate: Number.parseFloat(e.target.value) || 0 })}
                        placeholder="8.5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                      <Input
                        id="commissionRate"
                        type="number"
                        step="0.1"
                        value={formData.commissionRate}
                        onChange={(e) =>
                          setFormData({ ...formData, commissionRate: Number.parseFloat(e.target.value) || 0 })
                        }
                        placeholder="2.5"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Category Permissions</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Allow Product Creation</Label>
                          <p className="text-sm text-gray-600">Users can create new products in this category</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Require Approval</Label>
                          <p className="text-sm text-gray-600">New products require manager approval</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Track Inventory</Label>
                          <p className="text-sm text-gray-600">Enable inventory tracking for products</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Advanced configuration options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-orange-800">Danger Zone</h4>
                        <p className="text-sm text-orange-700 mt-1">
                          These actions are irreversible. Please proceed with caution.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Archive Category</h4>
                        <p className="text-sm text-gray-600">Hide this category from active use</p>
                      </div>
                      <Button variant="outline">Archive</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-red-800">Delete Category</h4>
                        <p className="text-sm text-red-600">Permanently delete this category and all its data</p>
                      </div>
                      <Button variant="destructive">Delete</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
