"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, Edit, Trash2, UserPlus, Shield, Eye } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import Link from "next/link"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    branch: "",
  })

  const users = [
    {
      id: "USR001",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@company.com",
      role: "Admin",
      branch: "All Branches",
      status: "Active",
      lastLogin: "2024-01-15 10:30 AM",
      createdAt: "2024-01-01",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "USR002",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@company.com",
      role: "Manager",
      branch: "Downtown",
      status: "Active",
      lastLogin: "2024-01-15 09:15 AM",
      createdAt: "2024-01-02",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "USR003",
      firstName: "Mike",
      lastName: "Chen",
      email: "mike.chen@company.com",
      role: "Staff",
      branch: "Mall Location",
      status: "Active",
      lastLogin: "2024-01-14 04:45 PM",
      createdAt: "2024-01-03",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "USR004",
      firstName: "Emma",
      lastName: "Wilson",
      email: "emma.wilson@company.com",
      role: "Manager",
      branch: "Bakery Central",
      status: "Active",
      lastLogin: "2024-01-15 08:20 AM",
      createdAt: "2024-01-04",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "USR005",
      firstName: "David",
      lastName: "Rodriguez",
      email: "david.rodriguez@company.com",
      role: "Staff",
      branch: "Warehouse A",
      status: "Inactive",
      lastLogin: "2024-01-10 02:30 PM",
      createdAt: "2024-01-05",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const roles = [
    { value: "admin", label: "Admin", description: "Full system access" },
    { value: "manager", label: "Manager", description: "Branch management access" },
    { value: "staff", label: "Staff", description: "Basic inventory access" },
    { value: "viewer", label: "Viewer", description: "Read-only access" },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role.toLowerCase() === selectedRole

    return matchesSearch && matchesRole
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "Inactive":
        return <Badge variant="destructive">Inactive</Badge>
      case "Pending":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <Shield className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        )
      case "Manager":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Manager
          </Badge>
        )
      case "Staff":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Staff
          </Badge>
        )
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const handleAddUser = () => {
    console.log("Adding user:", formData)
    setIsAddDialogOpen(false)
    setFormData({ firstName: "", lastName: "", email: "", role: "", branch: "" })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Create a new user account with appropriate permissions.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={formData.role}
                        onValueChange={(value) => setFormData({ ...formData, role: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              <div>
                                <div className="font-medium">{role.label}</div>
                                <div className="text-sm text-gray-500">{role.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Select
                        value={formData.branch}
                        onValueChange={(value) => setFormData({ ...formData, branch: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Branches</SelectItem>
                          <SelectItem value="downtown">Downtown</SelectItem>
                          <SelectItem value="mall">Mall Location</SelectItem>
                          <SelectItem value="bakery">Bakery Central</SelectItem>
                          <SelectItem value="warehouse-a">Warehouse A</SelectItem>
                          <SelectItem value="tech-store">Tech Store</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700">
                      Add User
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Filters */}
          <Card className="mb-6 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
              <CardDescription>Manage user accounts and their access permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={user.avatar || "/placeholder.svg"}
                                alt={`${user.firstName} ${user.lastName}`}
                              />
                              <AvatarFallback>
                                {user.firstName.charAt(0)}
                                {user.lastName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{user.branch}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-sm text-gray-500">{user.lastLogin}</TableCell>
                        <TableCell className="text-sm text-gray-500">{user.createdAt}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem asChild>
                                <Link href={`/users/${user.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Profile
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/users/${user.id}/edit`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit User
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Deactivate
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
        </main>
      </div>
    </div>
  )
}
