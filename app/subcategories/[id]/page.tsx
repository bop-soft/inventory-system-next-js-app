"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Package,
  Edit,
  ArrowLeft,
  Search,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Plus,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function ViewSubcategoryPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - in real app, fetch based on params.id
  const subcategory = {
    id: "SUB001",
    name: "Fresh Produce",
    description: "Fresh fruits and vegetables sourced from local farms",
    parentCategory: {
      id: "CAT001",
      name: "Food & Beverage",
      color: "#10b981",
    },
    productCount: 234,
    totalValue: 45600,
    avgPrice: 4.25,
    createdAt: "2024-01-10",
    isActive: true,
  }

  const products = [
    {
      id: "PRD001",
      name: "Fresh Apples",
      sku: "APL-001",
      price: 3.49,
      cost: 2.1,
      quantity: 234,
      branch: "Downtown",
      status: "In Stock",
      lastUpdated: "2024-01-15",
    },
    {
      id: "PRD002",
      name: "Organic Bananas",
      sku: "BAN-002",
      price: 2.99,
      cost: 1.8,
      quantity: 156,
      branch: "Mall Location",
      status: "In Stock",
      lastUpdated: "2024-01-14",
    },
    {
      id: "PRD003",
      name: "Fresh Carrots",
      sku: "CAR-003",
      price: 1.99,
      cost: 1.2,
      quantity: 89,
      branch: "Downtown",
      status: "Low Stock",
      lastUpdated: "2024-01-15",
    },
    {
      id: "PRD004",
      name: "Organic Spinach",
      sku: "SPN-004",
      price: 4.99,
      cost: 3.2,
      quantity: 0,
      branch: "Bakery Central",
      status: "Out of Stock",
      lastUpdated: "2024-01-13",
    },
  ]

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>
      case "Low Stock":
        return <Badge className="bg-orange-100 text-orange-800">Low Stock</Badge>
      case "Out of Stock":
        return <Badge variant="destructive">Out of Stock</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const stats = [
    {
      title: "Total Products",
      value: subcategory.productCount.toLocaleString(),
      change: "+8%",
      trend: "up",
      icon: Package,
    },
    {
      title: "Total Value",
      value: `$${subcategory.totalValue.toLocaleString()}`,
      change: "+12.2%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Average Price",
      value: `$${subcategory.avgPrice}`,
      change: "-1.5%",
      trend: "down",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/categories/${subcategory.parentCategory.id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to {subcategory.parentCategory.name}
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: subcategory.parentCategory.color }} />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{subcategory.name}</h1>
                  <p className="text-gray-600">{subcategory.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {subcategory.isActive ? (
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              ) : (
                <Badge variant="secondary">Inactive</Badge>
              )}
              <Link href={`/subcategories/${params.id}/edit`}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Subcategory
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <div className="flex items-center mt-1">
                            {stat.trend === "up" ? (
                              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                            )}
                            <span className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                              {stat.change}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-50">
                          <stat.icon className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Subcategory Information */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Subcategory Details</CardTitle>
                  <CardDescription>Information about this subcategory</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Subcategory ID</Label>
                        <p className="font-medium">{subcategory.id}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Parent Category</Label>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: subcategory.parentCategory.color }}
                          />
                          <p className="font-medium">{subcategory.parentCategory.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Created Date</Label>
                        <p className="font-medium">{subcategory.createdAt}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Status</Label>
                        <p className="font-medium">{subcategory.isActive ? "Active" : "Inactive"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              {/* Search */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Products Table */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>
                    Products in {subcategory.name} ({filteredProducts.length})
                  </CardTitle>
                  <CardDescription>All products in this subcategory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>SKU</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Branch</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Updated</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.id}</div>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">${product.price}</div>
                                <div className="text-sm text-gray-500">Cost: ${product.cost}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">{product.quantity}</span>
                            </TableCell>
                            <TableCell>{product.branch}</TableCell>
                            <TableCell>{getStatusBadge(product.status)}</TableCell>
                            <TableCell className="text-sm text-gray-500">{product.lastUpdated}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Product
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Product
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Remove from Subcategory
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
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Subcategory Analytics</CardTitle>
                  <CardDescription>Performance metrics and trends for this subcategory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
                    <p className="text-gray-600">
                      Detailed analytics and performance metrics for this subcategory will be available soon.
                    </p>
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
