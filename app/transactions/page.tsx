"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Search,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  RefreshCw,
  CalendarIcon,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"
import Link from "next/link"

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()

  const transactions = [
    {
      id: "TXN001",
      type: "Sale",
      product: "Premium Coffee Beans",
      sku: "CFB-001",
      quantity: 25,
      unitPrice: 24.99,
      totalAmount: 624.75,
      branch: "Downtown",
      user: "Sarah Johnson",
      customer: "Local Cafe Co.",
      date: "2024-01-15",
      time: "10:30 AM",
      status: "Completed",
    },
    {
      id: "TXN002",
      type: "Purchase",
      product: "Wireless Headphones",
      sku: "WH-002",
      quantity: 50,
      unitPrice: 150.0,
      totalAmount: 7500.0,
      branch: "Mall Location",
      user: "Mike Chen",
      supplier: "Tech Supplies Inc.",
      date: "2024-01-15",
      time: "09:15 AM",
      status: "Completed",
    },
    {
      id: "TXN003",
      type: "Adjustment",
      product: "Organic Flour",
      sku: "OF-003",
      quantity: -5,
      unitPrice: 8.99,
      totalAmount: -44.95,
      branch: "Bakery Central",
      user: "Emma Wilson",
      reason: "Damaged goods",
      date: "2024-01-14",
      time: "04:45 PM",
      status: "Completed",
    },
    {
      id: "TXN004",
      type: "Transfer",
      product: "Steel Bolts M8",
      sku: "SB-004",
      quantity: 100,
      unitPrice: 0.25,
      totalAmount: 25.0,
      branch: "Warehouse A → Downtown",
      user: "David Rodriguez",
      date: "2024-01-14",
      time: "02:30 PM",
      status: "In Transit",
    },
    {
      id: "TXN005",
      type: "Return",
      product: "Laptop Computers",
      sku: "LC-005",
      quantity: 2,
      unitPrice: 899.99,
      totalAmount: 1799.98,
      branch: "Tech Store",
      user: "Lisa Park",
      customer: "Business Corp",
      date: "2024-01-13",
      time: "11:20 AM",
      status: "Processing",
    },
  ]

  const transactionTypes = [
    { value: "sale", label: "Sale", icon: ShoppingCart, color: "text-green-600" },
    { value: "purchase", label: "Purchase", icon: Package, color: "text-blue-600" },
    { value: "adjustment", label: "Adjustment", icon: RefreshCw, color: "text-orange-600" },
    { value: "transfer", label: "Transfer", icon: TrendingUp, color: "text-purple-600" },
    { value: "return", label: "Return", icon: TrendingDown, color: "text-red-600" },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || transaction.type.toLowerCase() === selectedType
    const matchesBranch = selectedBranch === "all" || transaction.branch.includes(selectedBranch)

    return matchesSearch && matchesType && matchesBranch
  })

  const getTransactionIcon = (type: string) => {
    const transactionType = transactionTypes.find((t) => t.value === type.toLowerCase())
    if (!transactionType) return <Package className="w-4 h-4" />

    const IconComponent = transactionType.icon
    return <IconComponent className={`w-4 h-4 ${transactionType.color}`} />
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "Processing":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Processing
          </Badge>
        )
      case "In Transit":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            In Transit
          </Badge>
        )
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getAmountDisplay = (amount: number, type: string) => {
    const isNegative = amount < 0 || type === "Adjustment"
    return (
      <span className={isNegative ? "text-red-600" : "text-green-600"}>
        {isNegative && amount > 0 ? "-" : ""}${Math.abs(amount).toFixed(2)}
      </span>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
              <p className="text-gray-600">Track all inventory movements and transactions</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/transactions/filters">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </Link>
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
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
                    <p className="text-sm font-medium text-gray-600">Sales Today</p>
                    <p className="text-2xl font-bold text-green-600">$12,450</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Purchases Today</p>
                    <p className="text-2xl font-bold text-blue-600">$8,750</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-orange-600">23</p>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-50">
                    <RefreshCw className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Transaction Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {transactionTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="Downtown">Downtown</SelectItem>
                    <SelectItem value="Mall Location">Mall Location</SelectItem>
                    <SelectItem value="Bakery Central">Bakery Central</SelectItem>
                    <SelectItem value="Warehouse A">Warehouse A</SelectItem>
                    <SelectItem value="Tech Store">Tech Store</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "PPP") : "From date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "PPP") : "To date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
              <CardDescription>Complete history of all inventory transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{transaction.id}</div>
                            <div className="text-sm text-gray-500">{transaction.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{transaction.product}</div>
                            <div className="text-sm text-gray-500">{transaction.sku}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTransactionIcon(transaction.type)}
                            <span>{transaction.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={transaction.quantity < 0 ? "text-red-600" : "text-green-600"}>
                            {transaction.quantity > 0 ? "+" : ""}
                            {transaction.quantity}
                          </span>
                        </TableCell>
                        <TableCell>{getAmountDisplay(transaction.totalAmount, transaction.type)}</TableCell>
                        <TableCell>{transaction.branch}</TableCell>
                        <TableCell>{transaction.user}</TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        <TableCell className="text-sm text-gray-500">{transaction.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
