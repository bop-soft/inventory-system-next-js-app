"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Send, AlertTriangle, Package } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function ReorderPage() {
  const [selectedSupplier, setSelectedSupplier] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("")
  const [orderNotes, setOrderNotes] = useState("")
  const [urgentOrder, setUrgentOrder] = useState(false)

  const [reorderItems, setReorderItems] = useState([
    {
      id: "PRD001",
      name: "Premium Coffee Beans",
      currentStock: 12,
      minStock: 50,
      suggestedQuantity: 100,
      orderQuantity: 100,
      unitCost: 15.5,
      supplier: "Coffee Suppliers Inc",
      category: "Food & Beverage",
    },
    {
      id: "PRD002",
      name: "Wireless Headphones",
      currentStock: 8,
      minStock: 25,
      suggestedQuantity: 50,
      orderQuantity: 50,
      unitCost: 45.0,
      supplier: "Electronics Direct",
      category: "Electronics",
    },
    {
      id: "PRD003",
      name: "Organic Flour",
      currentStock: 15,
      minStock: 40,
      suggestedQuantity: 80,
      orderQuantity: 80,
      unitCost: 3.2,
      supplier: "Organic Foods Co",
      category: "Food & Beverage",
    },
    {
      id: "PRD004",
      name: "Steel Bolts M8",
      currentStock: 45,
      minStock: 100,
      suggestedQuantity: 200,
      orderQuantity: 200,
      unitCost: 0.25,
      supplier: "Hardware Solutions",
      category: "Hardware",
    },
  ])

  const suppliers = [
    { id: "SUP001", name: "Coffee Suppliers Inc", email: "orders@coffeesuppliers.com" },
    { id: "SUP002", name: "Electronics Direct", email: "sales@electronicsdirect.com" },
    { id: "SUP003", name: "Organic Foods Co", email: "orders@organicfoods.com" },
    { id: "SUP004", name: "Hardware Solutions", email: "purchasing@hardwaresolutions.com" },
  ]

  const branches = [
    { id: "BR001", name: "Downtown Store" },
    { id: "BR002", name: "Mall Location" },
    { id: "BR003", name: "Bakery Central" },
    { id: "BR004", name: "Warehouse A" },
    { id: "BR005", name: "Tech Store" },
  ]

  const updateQuantity = (id: string, newQuantity: number) => {
    setReorderItems((items) =>
      items.map((item) => (item.id === id ? { ...item, orderQuantity: Math.max(0, newQuantity) } : item)),
    )
  }

  const removeItem = (id: string) => {
    setReorderItems((items) => items.filter((item) => item.id !== id))
  }

  const getTotalCost = () => {
    return reorderItems.reduce((total, item) => total + item.orderQuantity * item.unitCost, 0)
  }

  const getTotalItems = () => {
    return reorderItems.reduce((total, item) => total + item.orderQuantity, 0)
  }

  const handleSubmitOrder = () => {
    console.log("Submitting reorder:", {
      items: reorderItems,
      supplier: selectedSupplier,
      branch: selectedBranch,
      notes: orderNotes,
      urgent: urgentOrder,
      total: getTotalCost(),
    })
    // Handle order submission
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Reorder Products</h1>
                <p className="text-gray-600">Create purchase orders for low stock items</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {urgentOrder && (
                <Badge className="bg-red-100 text-red-800">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Urgent Order
                </Badge>
              )}
              <Button onClick={handleSubmitOrder} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Submit Order
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Order Configuration */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
                  Order Configuration
                </CardTitle>
                <CardDescription>Configure the details for your purchase order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier *</Label>
                    <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id}>
                            <div>
                              <div className="font-medium">{supplier.name}</div>
                              <div className="text-sm text-gray-500">{supplier.email}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch">Delivery Branch *</Label>
                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Order Notes</Label>
                  <Textarea
                    id="notes"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Add any special instructions or notes for this order..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="urgent" checked={urgentOrder} onCheckedChange={setUrgentOrder} />
                  <Label htmlFor="urgent" className="font-medium">
                    Mark as urgent order
                  </Label>
                  <span className="text-sm text-gray-500">(Priority processing and delivery)</span>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Items</p>
                      <p className="text-2xl font-bold text-gray-900">{getTotalItems()}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-50">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Cost</p>
                      <p className="text-2xl font-bold text-gray-900">${getTotalCost().toFixed(2)}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-50">
                      <ShoppingCart className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Products</p>
                      <p className="text-2xl font-bold text-gray-900">{reorderItems.length}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-50">
                      <AlertTriangle className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reorder Items */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Items to Reorder ({reorderItems.length})</CardTitle>
                <CardDescription>Review and adjust quantities for low stock items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Min Stock</TableHead>
                        <TableHead>Suggested Qty</TableHead>
                        <TableHead>Order Qty</TableHead>
                        <TableHead>Unit Cost</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reorderItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500">{item.category}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={item.currentStock <= item.minStock ? "destructive" : "secondary"}>
                              {item.currentStock}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.minStock}</TableCell>
                          <TableCell className="text-blue-600 font-medium">{item.suggestedQuantity}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.orderQuantity - 10)}
                                disabled={item.orderQuantity <= 0}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <Input
                                type="number"
                                value={item.orderQuantity}
                                onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 0)}
                                className="w-20 text-center"
                                min="0"
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.orderQuantity + 10)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>${item.unitCost.toFixed(2)}</TableCell>
                          <TableCell className="font-medium">
                            ${(item.orderQuantity * item.unitCost).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {reorderItems.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No items to reorder</h3>
                    <p className="text-gray-600 mb-4">All products are currently well-stocked.</p>
                    <Link href="/inventory">
                      <Button variant="outline">View Inventory</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Total */}
            {reorderItems.length > 0 && (
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-lg font-medium">Order Total</p>
                      <p className="text-sm text-gray-600">
                        {getTotalItems()} items • {reorderItems.length} products
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-900">${getTotalCost().toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Excluding taxes and shipping</p>
                    </div>
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
