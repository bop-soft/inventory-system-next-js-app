"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Package, Eye } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import Link from "next/link"

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#3b82f6",
  })

  const categories = [
    {
      id: "CAT001",
      name: "Food & Beverage",
      description: "All food and beverage items including fresh produce, packaged goods, and drinks",
      productCount: 1247,
      color: "#10b981",
      createdAt: "2024-01-10",
      isActive: true,
    },
    {
      id: "CAT002",
      name: "Electronics",
      description: "Electronic devices, gadgets, and accessories",
      productCount: 453,
      color: "#3b82f6",
      createdAt: "2024-01-08",
      isActive: true,
    },
    {
      id: "CAT003",
      name: "Hardware",
      description: "Tools, building materials, and hardware supplies",
      productCount: 892,
      color: "#f59e0b",
      createdAt: "2024-01-05",
      isActive: true,
    },
    {
      id: "CAT004",
      name: "Clothing",
      description: "Apparel, accessories, and fashion items",
      productCount: 156,
      color: "#ec4899",
      createdAt: "2024-01-03",
      isActive: true,
    },
    {
      id: "CAT005",
      name: "Books",
      description: "Books, magazines, and educational materials",
      productCount: 89,
      color: "#8b5cf6",
      createdAt: "2024-01-01",
      isActive: false,
    },
    {
      id: "CAT006",
      name: "Home & Garden",
      description: "Home improvement, gardening, and household items",
      productCount: 234,
      color: "#06b6d4",
      createdAt: "2023-12-28",
      isActive: true,
    },
  ]

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCategory = () => {
    console.log("Adding category:", formData)
    setIsAddDialogOpen(false)
    setFormData({ name: "", description: "", color: "#3b82f6" })
  }

  const handleEditCategory = () => {
    console.log("Editing category:", selectedCategory?.id, formData)
    setIsEditDialogOpen(false)
    setSelectedCategory(null)
    setFormData({ name: "", description: "", color: "#3b82f6" })
  }

  const openEditDialog = (category: any) => {
    setSelectedCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
    })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
              <p className="text-gray-600">Organize your products with custom categories</p>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>Create a new category to organize your products.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Category Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter category name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter category description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color">Color</Label>
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
                          placeholder="#3b82f6"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCategory} className="bg-blue-600 hover:bg-blue-700">
                      Add Category
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Search */}
          <Card className="mb-6 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search categories by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Categories Table */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Categories ({filteredCategories.length})</CardTitle>
              <CardDescription>Manage your product categories and their properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                      <TableRow key={category.id} className="cursor-pointer hover:bg-gray-50">
                        <TableCell>
                          <Link href={`/categories/${category.id}`} className="block">
                            <div className="flex items-center space-x-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                              <div>
                                <div className="font-medium">{category.name}</div>
                                <div className="text-sm text-gray-500">{category.id}</div>
                              </div>
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/categories/${category.id}`} className="block">
                            <p className="text-sm text-gray-600 truncate">{category.description}</p>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/categories/${category.id}`} className="block">
                            <div className="flex items-center space-x-1">
                              <Package className="w-4 h-4 text-gray-400" />
                              <span className="font-medium">{category.productCount.toLocaleString()}</span>
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/categories/${category.id}`} className="block">
                            {category.isActive ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                Inactive
                              </Badge>
                            )}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link href={`/categories/${category.id}`} className="block text-sm text-gray-500">
                            {category.createdAt}
                          </Link>
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`/categories/${category.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Category
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEditDialog(category)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Category
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
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

          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogDescription>Update the category information.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Category Name</Label>
                  <Input
                    id="edit-name"
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    placeholder="Enter category description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-color">Color</Label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="edit-color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <Input
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditCategory} className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}
