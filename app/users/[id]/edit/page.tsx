"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Upload, Trash2, Shield, User } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function EditUserPage({ params }: { params: { id: string } }) {
  // Mock existing user data - in real app, fetch based on params.id
  const existingUser = {
    id: "USR001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    role: "admin",
    branch: "all",
    department: "Operations",
    manager: "Sarah Johnson",
    location: "New York, NY",
    timezone: "America/New_York",
    isActive: true,
    avatar: "/placeholder.svg?height=120&width=120",
    permissions: {
      inventoryManagement: true,
      userManagement: true,
      reportsAnalytics: true,
      systemSettings: true,
      branchManagement: true,
    },
  }

  const [formData, setFormData] = useState({
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    email: existingUser.email,
    phone: existingUser.phone,
    role: existingUser.role,
    branch: existingUser.branch,
    department: existingUser.department,
    manager: existingUser.manager,
    location: existingUser.location,
    timezone: existingUser.timezone,
    isActive: existingUser.isActive,
    permissions: existingUser.permissions,
  })

  const [hasChanges, setHasChanges] = useState(false)

  const roles = [
    { value: "admin", label: "Admin", description: "Full system access" },
    { value: "manager", label: "Manager", description: "Branch management access" },
    { value: "staff", label: "Staff", description: "Basic inventory access" },
    { value: "viewer", label: "Viewer", description: "Read-only access" },
  ]

  const permissionsList = [
    { key: "inventoryManagement", label: "Inventory Management", description: "Add, edit, and manage products" },
    { key: "userManagement", label: "User Management", description: "Create and manage user accounts" },
    { key: "reportsAnalytics", label: "Reports & Analytics", description: "View and generate reports" },
    { key: "systemSettings", label: "System Settings", description: "Configure system preferences" },
    { key: "branchManagement", label: "Branch Management", description: "Manage branch locations" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated user data:", formData)
    // Handle form submission
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setHasChanges(true)
  }

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: checked,
      },
    }))
    setHasChanges(true)
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      console.log("Deleting user:", params.id)
      // Handle user deletion
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <Shield className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        )
      case "manager":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Manager
          </Badge>
        )
      case "staff":
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Staff
          </Badge>
        )
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/users/${params.id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Profile
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
                <p className="text-gray-600">Update user information and permissions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {hasChanges && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  Unsaved Changes
                </Badge>
              )}
              <Button variant="outline" className="text-red-600 hover:text-red-700" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete User
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* User Status */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  User Status
                </CardTitle>
                <CardDescription>Current user information and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={existingUser.avatar || "/placeholder.svg"}
                      alt={`${existingUser.firstName} ${existingUser.lastName}`}
                    />
                    <AvatarFallback className="text-lg">
                      {existingUser.firstName.charAt(0)}
                      {existingUser.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-xl font-semibold">
                        {existingUser.firstName} {existingUser.lastName}
                      </h3>
                      {getRoleBadge(existingUser.role)}
                    </div>
                    <p className="text-gray-600">{existingUser.email}</p>
                    <p className="text-sm text-gray-500">User ID: {existingUser.id}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update basic user details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Role and Access */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Role and Access</CardTitle>
                <CardDescription>Configure user role and branch access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="role">User Role *</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                      <SelectTrigger>
                        <SelectValue />
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
                    <Label htmlFor="branch">Branch Access</Label>
                    <Select value={formData.branch} onValueChange={(value) => handleInputChange("branch", value)}>
                      <SelectTrigger>
                        <SelectValue />
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="manager">Manager</Label>
                    <Input
                      id="manager"
                      value={formData.manager}
                      onChange={(e) => handleInputChange("manager", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={formData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-purple-600" />
                  Permissions
                </CardTitle>
                <CardDescription>Configure specific system permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {permissionsList.map((permission) => (
                    <div key={permission.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id={permission.key}
                          checked={formData.permissions[permission.key as keyof typeof formData.permissions]}
                          onCheckedChange={(checked) => handlePermissionChange(permission.key, checked as boolean)}
                        />
                        <div>
                          <Label htmlFor={permission.key} className="font-medium cursor-pointer">
                            {permission.label}
                          </Label>
                          <p className="text-sm text-gray-500">{permission.description}</p>
                        </div>
                      </div>
                      {formData.permissions[permission.key as keyof typeof formData.permissions] && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Granted
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account Status */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
                <CardDescription>Control user account activation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Active Account</Label>
                    <p className="text-sm text-gray-500">Enable or disable user access to the system</p>
                  </div>
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
