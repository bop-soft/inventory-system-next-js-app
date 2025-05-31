"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sidebar } from "@/components/sidebar"
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Star,
  Package,
} from "lucide-react"

const suppliers = [
  {
    id: "SUP001",
    name: "TechCorp Solutions",
    contact: "John Smith",
    email: "john@techcorp.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    status: "Active",
    rating: 4.8,
    products: 156,
    totalOrders: 89,
    lastOrder: "2024-01-15",
    paymentTerms: "Net 30",
  },
  {
    id: "SUP002",
    name: "Global Electronics Ltd",
    contact: "Sarah Johnson",
    email: "sarah@globalelec.com",
    phone: "+1 (555) 234-5678",
    location: "Los Angeles, CA",
    status: "Active",
    rating: 4.6,
    products: 203,
    totalOrders: 124,
    lastOrder: "2024-01-12",
    paymentTerms: "Net 15",
  },
  {
    id: "SUP003",
    name: "Premium Parts Co",
    contact: "Mike Wilson",
    email: "mike@premiumparts.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    status: "Active",
    rating: 4.9,
    products: 87,
    totalOrders: 67,
    lastOrder: "2024-01-10",
    paymentTerms: "Net 30",
  },
  {
    id: "SUP004",
    name: "Industrial Supply Inc",
    contact: "Lisa Brown",
    email: "lisa@industrial.com",
    phone: "+1 (555) 456-7890",
    location: "Houston, TX",
    status: "Inactive",
    rating: 4.2,
    products: 45,
    totalOrders: 23,
    lastOrder: "2023-12-20",
    paymentTerms: "Net 45",
  },
  {
    id: "SUP005",
    name: "Quality Components",
    contact: "David Lee",
    email: "david@qualitycomp.com",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    status: "Active",
    rating: 4.7,
    products: 134,
    totalOrders: 98,
    lastOrder: "2024-01-14",
    paymentTerms: "Net 30",
  },
]

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || supplier.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-900">
            Active
          </Badge>
        )
      case "Inactive":
        return (
          <Badge className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-900">
            Inactive
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

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Suppliers</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your supplier relationships and partnerships
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Link href="/suppliers/add">
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Supplier
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Suppliers</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">8</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Suppliers</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">6</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">825</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Rating</p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4.6</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                  <Input
                    placeholder="Search suppliers..."
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
                  <SelectItem value="active" className="text-gray-900 dark:text-gray-100">
                    Active
                  </SelectItem>
                  <SelectItem value="inactive" className="text-gray-900 dark:text-gray-100">
                    Inactive
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
          </div>

          {/* Suppliers Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 dark:border-gray-700">
                  <TableHead className="text-gray-900 dark:text-gray-100">Supplier</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Contact</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Location</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Status</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Rating</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Products</TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">Last Order</TableHead>
                  <TableHead className="text-right text-gray-900 dark:text-gray-100">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow
                    key={supplier.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                  >
                    <TableCell>
                      <Link href={`/suppliers/${supplier.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{supplier.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{supplier.id}</div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1 text-gray-400 dark:text-gray-500" />
                          <span className="text-gray-900 dark:text-gray-100">{supplier.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1 text-gray-400 dark:text-gray-500" />
                          <span className="text-gray-900 dark:text-gray-100">{supplier.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-3 h-3 mr-1 text-gray-400 dark:text-gray-500" />
                        <span className="text-gray-900 dark:text-gray-100">{supplier.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(supplier.status)}</TableCell>
                    <TableCell>{renderStars(supplier.rating)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900 dark:text-gray-100">{supplier.products} products</div>
                        <div className="text-gray-500 dark:text-gray-400">{supplier.totalOrders} orders</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900 dark:text-gray-100">{supplier.lastOrder}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                        >
                          <DropdownMenuItem asChild>
                            <Link href={`/suppliers/${supplier.id}`} className="text-gray-900 dark:text-gray-100">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/suppliers/${supplier.id}/edit`} className="text-gray-900 dark:text-gray-100">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Supplier
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 dark:text-red-400">
                            <Trash2 className="w-4 h-4 mr-2" />
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
        </div>
      </div>
    </div>
  )
}
