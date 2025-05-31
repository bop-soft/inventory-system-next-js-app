"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Edit, Package, TrendingUp, TrendingDown, DollarSign, History, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false)
  const [stockAdjustment, setStockAdjustment] = useState({
    type: "add",
    quantity: "",
    reason: "",
    notes: "",
  })

  // Mock product data - in real app, fetch based on params.id
  const product = {
    id: "PRD001",
    name: "Premium Coffee Beans",
    sku: "CFB-001",
    description:
      "High-quality arabica coffee beans sourced from sustainable farms in Colombia. Perfect for espresso and drip coffee brewing methods.",
    category: "Food & Beverage",
    price: 24.99,
    cost: 18.5,
    stock: 245,
    minStock: 50,
    maxStock: 500,
    branch: "Downtown",
    status: "In Stock",
    createdAt: "2024-01-10",
    lastUpdated: "2024-01-15",
    supplier: "Colombian Coffee Co.",
    barcode: "1234567890123",
    weight: "1 kg",
    dimensions: "20cm x 15cm x 8cm",
    image: "/placeholder.svg?height=300&width=300",
  }

  const stockHistory = [
    {
      id: "TXN001",
      type: "add",
      quantity: 50,
      previousStock: 195,
      newStock: 245,
      reason: "Purchase Order",
      user: "John Doe",
      date: "2024-01-15 10:30",
      notes: "Weekly restock from supplier",
    },
    {
      id: "TXN002",
      type: "remove",
      quantity: 25,
      previousStock: 220,
      newStock: 195,
      reason: "Sale",
      user: "Sarah Johnson",
      date: "2024-01-14 15:45",
      notes: "Bulk order for local cafe",
    },
    {
      id: "TXN003",
      type: "add",
      quantity: 100,
      previousStock: 120,
      newStock: 220,
      reason: "Purchase Order",
      user: "Mike Chen",
      date: "2024-01-12 09:15",
      notes: "Monthly inventory replenishment",
    },
    {
      id: "TXN004",
      type: "remove",
      quantity: 5,
      previousStock: 125,
      newStock: 120,
      reason: "Damage",
      user: "Emma Wilson",
      date: "2024-01-11 14:20",
      notes: "Damaged packaging during transport",
    },
  ]

  const handleStockAdjustment = () => {
    console.log("Stock adjustment:", stockAdjustment)
    setIsStockDialogOpen(false)
    setStockAdjustment({
      type: "add",
      quantity: "",
      reason: "",
      notes: "",
    })
  }

  const getStatusBadge = (status: string, stock: number, minStock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (stock <= minStock) {
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          Low Stock
        </Badge>
      )
    } else {
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          In Stock
        </Badge>
      )
    }
  }

  const stockPercentage = (product.stock / product.maxStock) * 100

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
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-gray-600">SKU: {product.sku}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isStockDialogOpen} onOpenChange={setIsStockDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Package className="w-4 h-4 mr-2" />
                    Adjust Stock
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Adjust Stock Level</DialogTitle>
                    <DialogDescription>
                      Current stock: {product.stock} units. Make adjustments to inventory levels.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label>Adjustment Type</Label>
                      <Select
                        value={stockAdjustment.type}
                        onValueChange={(value) => setStockAdjustment({ ...stockAdjustment, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="add">Add Stock</SelectItem>
                          <SelectItem value="remove">Remove Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="Enter quantity"
                        value={stockAdjustment.quantity}
                        onChange={(e) => setStockAdjustment({ ...stockAdjustment, quantity: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Reason</Label>
                      <Select
                        value={stockAdjustment.reason}
                        onValueChange={(value) => setStockAdjustment({ ...stockAdjustment, reason: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="purchase">Purchase Order</SelectItem>
                          <SelectItem value="sale">Sale</SelectItem>
                          <SelectItem value="return">Return</SelectItem>
                          <SelectItem value="damage">Damage/Loss</SelectItem>
                          <SelectItem value="transfer">Branch Transfer</SelectItem>
                          <SelectItem value="adjustment">Manual Adjustment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add any additional notes..."
                        value={stockAdjustment.notes}
                        onChange={(e) => setStockAdjustment({ ...stockAdjustment, notes: e.target.value })}
                        rows={3}
                      />
                    </div>
                    {stockAdjustment.quantity && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          New stock level will be:{" "}
                          <span className="font-semibold">
                            {stockAdjustment.type === "add"
                              ? product.stock + Number.parseInt(stockAdjustment.quantity || "0")
                              : product.stock - Number.parseInt(stockAdjustment.quantity || "0")}
                          </span>{" "}
                          units
                        </p>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsStockDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleStockAdjustment} className="bg-blue-600 hover:bg-blue-700">
                      Apply Adjustment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Link href={`/inventory/${params.id}/edit`}>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Product
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Product Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Product Image and Basic Info */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        {getStatusBadge(product.status, product.stock, product.minStock)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Category</span>
                        <span className="text-sm font-medium">{product.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Branch</span>
                        <span className="text-sm font-medium">{product.branch}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stock Information */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="w-5 h-5 mr-2 text-blue-600" />
                    Stock Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Current Stock</span>
                      <span className="text-2xl font-bold text-gray-900">{product.stock}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Min: {product.minStock}</span>
                      <span>Max: {product.maxStock}</span>
                    </div>
                  </div>

                  {product.stock <= product.minStock && (
                    <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-orange-800">Stock level is below minimum threshold</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Min Stock</p>
                      <p className="text-lg font-semibold">{product.minStock}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Max Stock</p>
                      <p className="text-lg font-semibold">{product.maxStock}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Information */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                    Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Cost Price</span>
                      <span className="text-lg font-semibold">${product.cost}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Selling Price</span>
                      <span className="text-lg font-semibold">${product.price}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-sm text-gray-600">Profit Margin</span>
                      <span className="text-lg font-semibold text-green-600">
                        ${(product.price - product.cost).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Value</span>
                      <span className="text-lg font-semibold text-blue-600">
                        ${(product.stock * product.price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Details */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Comprehensive information about this product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Description</Label>
                      <p className="mt-1 text-sm text-gray-900">{product.description}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Supplier</Label>
                      <p className="mt-1 text-sm text-gray-900">{product.supplier}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Barcode</Label>
                      <p className="mt-1 text-sm font-mono text-gray-900">{product.barcode}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Weight</Label>
                      <p className="mt-1 text-sm text-gray-900">{product.weight}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Dimensions</Label>
                      <p className="mt-1 text-sm text-gray-900">{product.dimensions}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Created</Label>
                      <p className="mt-1 text-sm text-gray-900">{product.createdAt}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stock History */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="w-5 h-5 mr-2 text-purple-600" />
                  Stock Movement History
                </CardTitle>
                <CardDescription>Recent stock adjustments and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Previous</TableHead>
                        <TableHead>New Stock</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stockHistory.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="text-sm">{transaction.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {transaction.type === "add" ? (
                                <TrendingUp className="w-4 h-4 text-green-600" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-red-600" />
                              )}
                              <span className="capitalize">{transaction.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-medium ${
                                transaction.type === "add" ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {transaction.type === "add" ? "+" : "-"}
                              {transaction.quantity}
                            </span>
                          </TableCell>
                          <TableCell>{transaction.previousStock}</TableCell>
                          <TableCell className="font-medium">{transaction.newStock}</TableCell>
                          <TableCell>{transaction.reason}</TableCell>
                          <TableCell>{transaction.user}</TableCell>
                          <TableCell className="max-w-xs">
                            <p className="text-sm text-gray-600 truncate">{transaction.notes}</p>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
