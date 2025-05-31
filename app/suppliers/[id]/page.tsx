"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/sidebar"
import {
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  MapPin,
  Globe,
  Star,
  Package,
  ShoppingCart,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  Minus,
} from "lucide-react"

// Mock data for the supplier
const supplier = {
  id: "SUP001",
  name: "TechCorp Solutions",
  contact: "John Smith",
  email: "john@techcorp.com",
  phone: "+1 (555) 123-4567",
  address: "123 Tech Street, New York, NY 10001",
  website: "https://techcorp.com",
  status: "Active",
  rating: 4.8,
  totalProducts: 156,
  totalOrders: 89,
  lastOrder: "2024-01-15",
  paymentTerms: "Net 30",
  leadTime: "7-10 days",
  minOrder: "$1,000",
  currency: "USD",
}

// Mock products data
const supplierProducts = [
  {
    id: "PROD001",
    name: "Wireless Bluetooth Headphones",
    sku: "WBH-001",
    category: "Electronics",
    currentStock: 45,
    reorderLevel: 20,
    unitCost: 25.99,
    lastOrderDate: "2024-01-10",
    status: "In Stock",
    selected: false,
  },
  {
    id: "PROD002",
    name: "USB-C Charging Cable",
    sku: "UCC-002",
    category: "Accessories",
    currentStock: 12,
    reorderLevel: 25,
    unitCost: 8.5,
    lastOrderDate: "2024-01-08",
    status: "Low Stock",
    selected: false,
  },
  {
    id: "PROD003",
    name: "Smartphone Screen Protector",
    sku: "SSP-003",
    category: "Accessories",
    currentStock: 78,
    reorderLevel: 30,
    unitCost: 3.25,
    lastOrderDate: "2024-01-12",
    status: "In Stock",
    selected: false,
  },
  {
    id: "PROD004",
    name: "Portable Power Bank",
    sku: "PPB-004",
    category: "Electronics",
    currentStock: 5,
    reorderLevel: 15,
    unitCost: 18.75,
    lastOrderDate: "2024-01-05",
    status: "Critical",
    selected: false,
  },
  {
    id: "PROD005",
    name: "Wireless Mouse",
    sku: "WM-005",
    category: "Computer Accessories",
    currentStock: 32,
    reorderLevel: 20,
    unitCost: 12.99,
    lastOrderDate: "2024-01-14",
    status: "In Stock",
    selected: false,
  },
]

// Mock order history data
const orderHistory = [
  {
    id: "ORD001",
    orderNumber: "PO-2024-001",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-22",
    status: "Delivered",
    totalItems: 45,
    totalCost: 1250.75,
    products: [
      { name: "Wireless Bluetooth Headphones", quantity: 20, unitCost: 25.99 },
      { name: "USB-C Charging Cable", quantity: 25, unitCost: 8.5 },
    ],
  },
  {
    id: "ORD002",
    orderNumber: "PO-2024-002",
    orderDate: "2024-01-10",
    deliveryDate: "2024-01-18",
    status: "Delivered",
    totalItems: 30,
    totalCost: 890.5,
    products: [
      { name: "Smartphone Screen Protector", quantity: 30, unitCost: 3.25 },
      { name: "Portable Power Bank", quantity: 15, unitCost: 18.75 },
      { name: "Wireless Mouse", quantity: 20, unitCost: 12.99 },
    ],
  },
  {
    id: "ORD003",
    orderNumber: "PO-2024-003",
    orderDate: "2024-01-08",
    deliveryDate: "2024-01-16",
    status: "Delivered",
    totalItems: 50,
    totalCost: 1450.25,
    products: [
      { name: "Wireless Bluetooth Headphones", quantity: 25, unitCost: 25.99 },
      { name: "USB-C Charging Cable", quantity: 25, unitCost: 8.5 },
    ],
  },
  {
    id: "ORD004",
    orderNumber: "PO-2024-004",
    orderDate: "2024-01-05",
    deliveryDate: "2024-01-12",
    status: "Delivered",
    totalItems: 35,
    totalCost: 975.8,
    products: [
      { name: "Portable Power Bank", quantity: 20, unitCost: 18.75 },
      { name: "Wireless Mouse", quantity: 15, unitCost: 12.99 },
    ],
  },
  {
    id: "ORD005",
    orderNumber: "PO-2024-005",
    orderDate: "2024-01-03",
    deliveryDate: "2024-01-10",
    status: "Delivered",
    totalItems: 40,
    totalCost: 1125.6,
    products: [
      { name: "Smartphone Screen Protector", quantity: 40, unitCost: 3.25 },
      { name: "USB-C Charging Cable", quantity: 30, unitCost: 8.5 },
    ],
  },
  {
    id: "ORD006",
    orderNumber: "PO-2024-006",
    orderDate: "2023-12-28",
    deliveryDate: "2024-01-05",
    status: "Delivered",
    totalItems: 25,
    totalCost: 687.25,
    products: [
      { name: "Wireless Bluetooth Headphones", quantity: 15, unitCost: 25.99 },
      { name: "Portable Power Bank", quantity: 10, unitCost: 18.75 },
    ],
  },
]

export default function ViewSupplierPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [products, setProducts] = useState(supplierProducts)
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const [orderSearchTerm, setOrderSearchTerm] = useState("")
  const [orderStatusFilter, setOrderStatusFilter] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status.toLowerCase().replace(" ", "-") === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleProductSelect = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
      // Set default quantity to reorder level
      const product = products.find((p) => p.id === productId)
      if (product) {
        setQuantities((prev) => ({ ...prev, [productId]: product.reorderLevel }))
      }
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
      setQuantities((prev) => {
        const newQuantities = { ...prev }
        delete newQuantities[productId]
        return newQuantities
      })
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allProductIds = filteredProducts.map((p) => p.id)
      setSelectedProducts(allProductIds)
      const newQuantities: { [key: string]: number } = {}
      filteredProducts.forEach((product) => {
        newQuantities[product.id] = product.reorderLevel
      })
      setQuantities(newQuantities)
    } else {
      setSelectedProducts([])
      setQuantities({})
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(1, quantity) }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return (
          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-900">
            In Stock
          </Badge>
        )
      case "Low Stock":
        return (
          <Badge className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 hover:bg-yellow-100 dark:hover:bg-yellow-900">
            Low Stock
          </Badge>
        )
      case "Critical":
        return (
          <Badge className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-900">
            Critical
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
          />
        ))}
        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{rating}</span>
      </div>
    )
  }

  const calculateTotalCost = () => {
    return selectedProducts.reduce((total, productId) => {
      const product = products.find((p) => p.id === productId)
      const quantity = quantities[productId] || 0
      return total + (product ? product.unitCost * quantity : 0)
    }, 0)
  }

  const handleBulkReorder = () => {
    if (selectedProducts.length === 0) return

    // Here you would typically send the order to your backend
    console.log(
      "Bulk reorder:",
      selectedProducts.map((id) => ({
        productId: id,
        quantity: quantities[id],
        product: products.find((p) => p.id === id),
      })),
    )

    // Show success message or redirect to order confirmation
    alert(
      `Bulk reorder created for ${selectedProducts.length} products. Total cost: $${calculateTotalCost().toFixed(2)}`,
    )
  }

  const filteredOrders = orderHistory.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
      order.products.some((product) => product.name.toLowerCase().includes(orderSearchTerm.toLowerCase()))
    const matchesStatus = orderStatusFilter === "all" || order.status.toLowerCase() === orderStatusFilter

    let matchesDate = true
    if (selectedDateRange !== "all") {
      const orderDate = new Date(order.orderDate)
      const now = new Date()
      switch (selectedDateRange) {
        case "7days":
          matchesDate = now.getTime() - orderDate.getTime() <= 7 * 24 * 60 * 60 * 1000
          break
        case "30days":
          matchesDate = now.getTime() - orderDate.getTime() <= 30 * 24 * 60 * 60 * 1000
          break
        case "90days":
          matchesDate = now.getTime() - orderDate.getTime() <= 90 * 24 * 60 * 60 * 1000
          break
      }
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return (
          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-900">
            Delivered
          </Badge>
        )
      case "In Transit":
        return (
          <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-blue-900">
            In Transit
          </Badge>
        )
      case "Processing":
        return (
          <Badge className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 hover:bg-yellow-100 dark:hover:bg-yellow-900">
            Processing
          </Badge>
        )
      case "Cancelled":
        return (
          <Badge className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-900">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/suppliers">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Suppliers
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{supplier.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">Supplier ID: {supplier.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Link href={`/suppliers/${supplier.id}/edit`}>
                <Button size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Supplier
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-100"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-100"
              >
                Products ({supplier.totalProducts})
              </TabsTrigger>
              <TabsTrigger
                value="orders"
                className="data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-100"
              >
                Order History
              </TabsTrigger>
              <TabsTrigger
                value="performance"
                className="data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-100"
              >
                Performance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Supplier Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <span className="text-sm text-gray-900 dark:text-gray-100">{supplier.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <span className="text-sm text-gray-900 dark:text-gray-100">{supplier.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <span className="text-sm text-gray-900 dark:text-gray-100">{supplier.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <a href={supplier.website} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                        {supplier.website}
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Business Terms</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Payment Terms:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {supplier.paymentTerms}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Lead Time:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{supplier.leadTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Min Order:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{supplier.minOrder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Currency:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{supplier.currency}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
                      {renderStars(supplier.rating)}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Products:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {supplier.totalProducts}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Orders:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {supplier.totalOrders}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Last Order:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{supplier.lastOrder}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Products</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">142</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Orders</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">23</p>
                    </div>
                    <ShoppingCart className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Order Value</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$2,450</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">On-Time Delivery</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">94%</p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              {/* Bulk Reorder Section */}
              {selectedProducts.length > 0 && (
                <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-900 dark:text-blue-100">
                      Bulk Reorder ({selectedProducts.length} products selected)
                    </CardTitle>
                    <CardDescription className="text-blue-700 dark:text-blue-200">
                      Total estimated cost: ${calculateTotalCost().toFixed(2)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-blue-800 dark:text-blue-200">
                        Review quantities below and click "Create Bulk Order" when ready
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedProducts([])
                            setQuantities({})
                          }}
                          className="border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300"
                        >
                          Clear Selection
                        </Button>
                        <Button onClick={handleBulkReorder}>Create Bulk Order</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Filters */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                        <Input
                          placeholder="Search products..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                        <SelectItem value="all" className="text-gray-900 dark:text-gray-100">
                          All Status
                        </SelectItem>
                        <SelectItem value="in-stock" className="text-gray-900 dark:text-gray-100">
                          In Stock
                        </SelectItem>
                        <SelectItem value="low-stock" className="text-gray-900 dark:text-gray-100">
                          Low Stock
                        </SelectItem>
                        <SelectItem value="critical" className="text-gray-900 dark:text-gray-100">
                          Critical
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Products Table */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">Product</TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">Current Stock</TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">Reorder Level</TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">Unit Cost</TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">Status</TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">Quantity</TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => {
                      const isSelected = selectedProducts.includes(product.id)
                      const quantity = quantities[product.id] || 0
                      const subtotal = isSelected ? product.unitCost * quantity : 0

                      return (
                        <TableRow
                          key={product.id}
                          className={`border-gray-200 dark:border-gray-700 ${isSelected ? "bg-blue-50 dark:bg-blue-950" : "hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                        >
                          <TableCell>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => handleProductSelect(product.id, checked as boolean)}
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-gray-100">{product.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">SKU: {product.sku}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-medium ${
                                product.currentStock <= product.reorderLevel
                                  ? "text-red-600 dark:text-red-400"
                                  : "text-gray-900 dark:text-gray-100"
                              }`}
                            >
                              {product.currentStock}
                            </span>
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-100">{product.reorderLevel}</TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-100">
                            ${product.unitCost.toFixed(2)}
                          </TableCell>
                          <TableCell>{getStatusBadge(product.status)}</TableCell>
                          <TableCell>
                            {isSelected && (
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(product.id, quantity - 1)}
                                  disabled={quantity <= 1}
                                  className="border-gray-300 dark:border-gray-600"
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <Input
                                  type="number"
                                  value={quantity}
                                  onChange={(e) => updateQuantity(product.id, Number.parseInt(e.target.value) || 1)}
                                  className="w-20 text-center bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                                  min="1"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(product.id, quantity + 1)}
                                  className="border-gray-300 dark:border-gray-600"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {isSelected && (
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                ${subtotal.toFixed(2)}
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              {/* Order Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{orderHistory.length}</p>
                    </div>
                    <ShoppingCart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        ${orderHistory.reduce((sum, order) => sum + order.totalCost, 0).toFixed(2)}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Order Value</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        $
                        {(orderHistory.reduce((sum, order) => sum + order.totalCost, 0) / orderHistory.length).toFixed(
                          2,
                        )}
                      </p>
                    </div>
                    <Package className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">On-Time Delivery</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">94%</p>
                    </div>
                    <Calendar className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </div>

              {/* Filters */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                        <Input
                          placeholder="Search orders or products..."
                          value={orderSearchTerm}
                          onChange={(e) => setOrderSearchTerm(e.target.value)}
                          className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>
                    <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
                      <SelectTrigger className="w-40 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                        <SelectItem value="all" className="text-gray-900 dark:text-gray-100">
                          All Status
                        </SelectItem>
                        <SelectItem value="delivered" className="text-gray-900 dark:text-gray-100">
                          Delivered
                        </SelectItem>
                        <SelectItem value="in transit" className="text-gray-900 dark:text-gray-100">
                          In Transit
                        </SelectItem>
                        <SelectItem value="processing" className="text-gray-900 dark:text-gray-100">
                          Processing
                        </SelectItem>
                        <SelectItem value="cancelled" className="text-gray-900 dark:text-gray-100">
                          Cancelled
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                      <SelectTrigger className="w-40 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                        <SelectValue placeholder="Date Range" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                        <SelectItem value="all" className="text-gray-900 dark:text-gray-100">
                          All Time
                        </SelectItem>
                        <SelectItem value="7days" className="text-gray-900 dark:text-gray-100">
                          Last 7 Days
                        </SelectItem>
                        <SelectItem value="30days" className="text-gray-900 dark:text-gray-100">
                          Last 30 Days
                        </SelectItem>
                        <SelectItem value="90days" className="text-gray-900 dark:text-gray-100">
                          Last 90 Days
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Orders Table */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableHead className="text-gray-900 dark:text-gray-100">Order Number</TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">Order Date</TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">Delivery Date</TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">Products</TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">Total Items</TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">Total Cost</TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">Status</TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-100">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow
                        key={order.id}
                        className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <TableCell>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{order.orderNumber}</div>
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100">
                          {new Date(order.deliveryDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {order.products.slice(0, 2).map((product, index) => (
                              <div key={index} className="text-sm text-gray-900 dark:text-gray-100">
                                {product.name} (×{product.quantity})
                              </div>
                            ))}
                            {order.products.length > 2 && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                +{order.products.length - 2} more items
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100">{order.totalItems}</TableCell>
                        <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                          ${order.totalCost.toFixed(2)}
                        </TableCell>
                        <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Link href={`/suppliers/${supplier.id}/orders/${order.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                              >
                                View Details
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                            >
                              Reorder
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredOrders.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p>No orders found matching your criteria</p>
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">Performance Analytics</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Supplier performance metrics and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p>Performance analytics coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
