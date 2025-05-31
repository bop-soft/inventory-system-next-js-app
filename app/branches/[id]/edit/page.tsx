"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Building2, MapPin, Settings, Clock } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function EditBranchPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    name: "Downtown Store",
    type: "retail",
    address: "123 Main Street",
    city: "Downtown",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    manager: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    email: "downtown@company.com",
    website: "www.company.com/downtown",
    description: "Our flagship downtown location serving the city center.",
    status: "active",
    currency: "USD",
    timezone: "America/New_York",
    inventoryTracking: true,
    onlineOrders: true,
    loyaltyProgram: true,
    operatingHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "20:00", closed: false },
      saturday: { open: "10:00", close: "20:00", closed: false },
      sunday: { open: "11:00", close: "17:00", closed: false },
    },
  })

  const handleSave = () => {
    console.log("Saving branch:", formData)
    // Handle save logic here
  }

  const updateOperatingHours = (day: string, field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      operatingHours: {
        ...formData.operatingHours,
        [day]: {
          ...formData.operatingHours[day as keyof typeof formData.operatingHours],
          [field]: value,
        },
      },
    })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/branches/${params.id}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Branch
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Branch</h1>
                <p className="text-gray-600">Update branch information and settings</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="hours">Hours</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>Update the basic details of your branch</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Branch Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter branch name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Branch Type *</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select branch type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Retail Store</SelectItem>
                          <SelectItem value="warehouse">Warehouse</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="factory">Factory</SelectItem>
                          <SelectItem value="bakery">Bakery</SelectItem>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="electronics">Electronics Store</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of this branch"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    Location & Contact
                  </CardTitle>
                  <CardDescription>Update address and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Enter street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="Enter state"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        placeholder="Enter ZIP code"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData({ ...formData, country: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="Enter website URL"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager">Manager *</Label>
                      <Input
                        id="manager"
                        value={formData.manager}
                        onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                        placeholder="Enter manager name"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hours" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    Operating Hours
                  </CardTitle>
                  <CardDescription>Set the operating hours for each day of the week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(formData.operatingHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-24">
                        <Label className="capitalize font-medium">{day}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={!hours.closed}
                          onCheckedChange={(checked) => updateOperatingHours(day, "closed", !checked)}
                        />
                        <span className="text-sm text-gray-600">Open</span>
                      </div>
                      {!hours.closed && (
                        <>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor={`${day}-open`} className="text-sm">
                              From:
                            </Label>
                            <Input
                              id={`${day}-open`}
                              type="time"
                              value={hours.open}
                              onChange={(e) => updateOperatingHours(day, "open", e.target.value)}
                              className="w-32"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor={`${day}-close`} className="text-sm">
                              To:
                            </Label>
                            <Input
                              id={`${day}-close`}
                              type="time"
                              value={hours.close}
                              onChange={(e) => updateOperatingHours(day, "close", e.target.value)}
                              className="w-32"
                            />
                          </div>
                        </>
                      )}
                      {hours.closed && <span className="text-sm text-red-600 ml-4">Closed</span>}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-blue-600" />
                    Branch Settings
                  </CardTitle>
                  <CardDescription>Configure branch-specific settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={formData.currency}
                        onValueChange={(value) => setFormData({ ...formData, currency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={formData.timezone}
                        onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="inventory-tracking" className="font-medium">
                          Inventory Tracking
                        </Label>
                        <p className="text-sm text-gray-600">Enable real-time inventory tracking for this branch</p>
                      </div>
                      <Switch
                        id="inventory-tracking"
                        checked={formData.inventoryTracking}
                        onCheckedChange={(checked) => setFormData({ ...formData, inventoryTracking: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="online-orders" className="font-medium">
                          Online Orders
                        </Label>
                        <p className="text-sm text-gray-600">Allow customers to place orders online for this branch</p>
                      </div>
                      <Switch
                        id="online-orders"
                        checked={formData.onlineOrders}
                        onCheckedChange={(checked) => setFormData({ ...formData, onlineOrders: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="loyalty-program" className="font-medium">
                          Loyalty Program
                        </Label>
                        <p className="text-sm text-gray-600">Enable customer loyalty program for this branch</p>
                      </div>
                      <Switch
                        id="loyalty-program"
                        checked={formData.loyaltyProgram}
                        onCheckedChange={(checked) => setFormData({ ...formData, loyaltyProgram: checked })}
                      />
                    </div>
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
