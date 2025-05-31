"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Users, Package, Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sidebar } from "@/components/sidebar"
import Link from "next/link"

export default function BranchesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const branches = [
    {
      id: "BR001",
      name: "Downtown Store",
      address: "123 Main Street, Downtown, NY 10001",
      manager: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "downtown@company.com",
      products: 1247,
      staff: 12,
      status: "Active",
      type: "Retail Store",
    },
    {
      id: "BR002",
      name: "Mall Location",
      address: "456 Shopping Center, Mall Plaza, NY 10002",
      manager: "Mike Chen",
      phone: "+1 (555) 234-5678",
      email: "mall@company.com",
      products: 892,
      staff: 8,
      status: "Active",
      type: "Retail Store",
    },
    {
      id: "BR003",
      name: "Bakery Central",
      address: "789 Baker Street, Central, NY 10003",
      manager: "Emma Wilson",
      phone: "+1 (555) 345-6789",
      email: "bakery@company.com",
      products: 156,
      staff: 6,
      status: "Active",
      type: "Bakery",
    },
    {
      id: "BR004",
      name: "Warehouse A",
      address: "321 Industrial Blvd, Warehouse District, NY 10004",
      manager: "David Rodriguez",
      phone: "+1 (555) 456-7890",
      email: "warehouse-a@company.com",
      products: 2847,
      staff: 15,
      status: "Active",
      type: "Warehouse",
    },
    {
      id: "BR005",
      name: "Tech Store",
      address: "654 Technology Ave, Tech Hub, NY 10005",
      manager: "Lisa Park",
      phone: "+1 (555) 567-8901",
      email: "tech@company.com",
      products: 445,
      staff: 10,
      status: "Maintenance",
      type: "Electronics Store",
    },
  ]

  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "Maintenance":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Maintenance
          </Badge>
        )
      case "Inactive":
        return <Badge variant="destructive">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Branch Management</h1>
              <p className="text-gray-600">Manage your business locations and their details</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/branches/add">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Branch
                </Button>
              </Link>
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
                  placeholder="Search branches by name, manager, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Branches Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBranches.map((branch) => (
              <Card key={branch.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{branch.name}</CardTitle>
                        <CardDescription>{branch.type}</CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/branches/${branch.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/branches/${branch.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Branch
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    {getStatusBadge(branch.status)}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{branch.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{branch.manager}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Package className="w-4 h-4 text-blue-600" />
                        <span className="text-lg font-semibold text-gray-900">{branch.products.toLocaleString()}</span>
                      </div>
                      <span className="text-xs text-gray-500">Products</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Users className="w-4 h-4 text-green-600" />
                        <span className="text-lg font-semibold text-gray-900">{branch.staff}</span>
                      </div>
                      <span className="text-xs text-gray-500">Staff</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>📞 {branch.phone}</div>
                      <div>✉️ {branch.email}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBranches.length === 0 && (
            <Card className="border-0 shadow-md">
              <CardContent className="p-12 text-center">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No branches found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first branch"}
                </p>
                <Link href="/branches/add">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Branch
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
