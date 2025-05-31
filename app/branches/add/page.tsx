"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, MapPin, Building2, Phone, Upload } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function AddBranchPage() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    email: "",
    manager: "",
    description: "",
    timezone: "",
    currency: "USD",
    isActive: true,
    allowOnlineOrders: true,
    trackInventory: true,
    operatingHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "10:00", close: "16:00", closed: false },
      sunday: { open: "12:00", close: "16:00", closed: true },
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Branch data:", formData)
    // Handle form submission
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleOperatingHoursChange = (day: string, field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day as keyof typeof prev.operatingHours],
          [field]: value,
        },
      },
    }))
  }

  const branchTypes = [
    { value: "retail", label: "Retail Store", description: "Customer-facing retail location" },
    { value: "warehouse", label: "Warehouse", description: "Storage and distribution center" },
    { value: "office", label: "Office", description: "Administrative office location" },
    { value: "factory", label: "Factory", description: "Manufacturing facility" },
    { value: "outlet", label: "Outlet", description: "Discount retail outlet" },
    { value: "kiosk", label: "Kiosk", description: "Small retail kiosk or stand" },
  ]

  const daysOfWeek = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/branches">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Branches
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add New Branch</h1>
                <p className="text-gray-600">Create a new branch location for your business</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Save as Draft</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
                <Save className="w-4 h-4 mr-2" />
                Create Branch
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Basic Information */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                  Basic Information
                </CardTitle>
                <CardDescription>Enter the basic details for your new branch</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Branch Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter branch name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Branch Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch type" />
                      </SelectTrigger>
                      <SelectContent>
                        {branchTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-sm text-gray-500">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter branch description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location Information */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  Location Information
                </CardTitle>
                <CardDescription>Specify the physical location of the branch</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    placeholder="Enter street address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province *</Label>
                    <Input
                      id="state"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                    <Input
                      id="zipCode"
                      placeholder="Enter ZIP code"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={formData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
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

            {/* Contact Information */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-purple-600" />
                  Contact Information
                </CardTitle>
                <CardDescription>Contact details and management information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="branch@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manager">Branch Manager</Label>
                  <Input
                    id="manager"
                    placeholder="Enter manager name"
                    value={formData.manager}
                    onChange={(e) => handleInputChange("manager", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Operating Hours */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Operating Hours</CardTitle>
                <CardDescription>Set the operating hours for this branch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {daysOfWeek.map((day) => (
                    <div key={day.key} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-24">
                        <Label className="font-medium">{day.label}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={!formData.operatingHours[day.key as keyof typeof formData.operatingHours].closed}
                          onCheckedChange={(checked) => handleOperatingHoursChange(day.key, "closed", !checked)}
                        />
                        <span className="text-sm text-gray-600">Open</span>
                      </div>
                      {!formData.operatingHours[day.key as keyof typeof formData.operatingHours].closed && (
                        <>
                          <div className="flex items-center space-x-2">
                            <Label className="text-sm">From:</Label>
                            <Input
                              type="time"
                              value={formData.operatingHours[day.key as keyof typeof formData.operatingHours].open}
                              onChange={(e) => handleOperatingHoursChange(day.key, "open", e.target.value)}
                              className="w-32"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label className="text-sm">To:</Label>
                            <Input
                              type="time"
                              value={formData.operatingHours[day.key as keyof typeof formData.operatingHours].close}
                              onChange={(e) => handleOperatingHoursChange(day.key, "close", e.target.value)}
                              className="w-32"
                            />
                          </div>
                        </>
                      )}
                      {formData.operatingHours[day.key as keyof typeof formData.operatingHours].closed && (
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          Closed
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Branch Settings</CardTitle>
                <CardDescription>Configure branch-specific settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Active Branch</Label>
                      <p className="text-sm text-gray-500">Enable this branch for operations</p>
                    </div>
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Track Inventory</Label>
                      <p className="text-sm text-gray-500">Enable inventory tracking for this branch</p>
                    </div>
                    <Switch
                      checked={formData.trackInventory}
                      onCheckedChange={(checked) => handleInputChange("trackInventory", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Online Orders</Label>
                      <p className="text-sm text-gray-500">Accept online orders for this location</p>
                    </div>
                    <Switch
                      checked={formData.allowOnlineOrders}
                      onCheckedChange={(checked) => handleInputChange("allowOnlineOrders", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Branch Image */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Branch Image</CardTitle>
                <CardDescription>Upload an image for this branch location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop an image here, or click to browse</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  <Button variant="outline" className="mt-4">
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
