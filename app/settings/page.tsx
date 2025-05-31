"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, Building, Bell, Shield, Database, Save, RefreshCw, Download, Upload } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    companyName: "InventoryPro Corp",
    companyEmail: "admin@inventorypro.com",
    companyPhone: "+1 (555) 123-4567",
    companyAddress: "123 Business Ave, Suite 100, New York, NY 10001",
    timezone: "America/New_York",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",

    // Inventory Settings
    lowStockThreshold: 10,
    autoReorderEnabled: true,
    autoReorderQuantity: 50,
    stockUnit: "units",
    trackSerialNumbers: false,
    allowNegativeStock: false,

    // Notifications
    emailNotifications: true,
    lowStockAlerts: true,
    dailyReports: false,
    weeklyReports: true,
    monthlyReports: true,

    // Security
    sessionTimeout: 30,
    passwordExpiry: 90,
    twoFactorAuth: false,
    loginAttempts: 5,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    console.log("Saving settings:", settings)
    // Handle save logic
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Configure your inventory management system</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="w-5 h-5 mr-2 text-blue-600" />
                      Company Information
                    </CardTitle>
                    <CardDescription>Basic company details and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          value={settings.companyName}
                          onChange={(e) => handleSettingChange("companyName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyEmail">Company Email</Label>
                        <Input
                          id="companyEmail"
                          type="email"
                          value={settings.companyEmail}
                          onChange={(e) => handleSettingChange("companyEmail", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyPhone">Phone Number</Label>
                        <Input
                          id="companyPhone"
                          value={settings.companyPhone}
                          onChange={(e) => handleSettingChange("companyPhone", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          value={settings.timezone}
                          onValueChange={(value) => handleSettingChange("timezone", value)}
                        >
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

                    <div className="space-y-2">
                      <Label htmlFor="companyAddress">Company Address</Label>
                      <Textarea
                        id="companyAddress"
                        value={settings.companyAddress}
                        onChange={(e) => handleSettingChange("companyAddress", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Default Currency</Label>
                        <Select
                          value={settings.currency}
                          onValueChange={(value) => handleSettingChange("currency", value)}
                        >
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
                      <div className="space-y-2">
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <Select
                          value={settings.dateFormat}
                          onValueChange={(value) => handleSettingChange("dateFormat", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Inventory Settings */}
              <TabsContent value="inventory">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Database className="w-5 h-5 mr-2 text-green-600" />
                      Inventory Configuration
                    </CardTitle>
                    <CardDescription>Configure inventory tracking and automation settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="lowStockThreshold">Default Low Stock Threshold</Label>
                        <Input
                          id="lowStockThreshold"
                          type="number"
                          value={settings.lowStockThreshold}
                          onChange={(e) => handleSettingChange("lowStockThreshold", Number.parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stockUnit">Default Stock Unit</Label>
                        <Select
                          value={settings.stockUnit}
                          onValueChange={(value) => handleSettingChange("stockUnit", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="units">Units</SelectItem>
                            <SelectItem value="pieces">Pieces</SelectItem>
                            <SelectItem value="boxes">Boxes</SelectItem>
                            <SelectItem value="kg">Kilograms</SelectItem>
                            <SelectItem value="lbs">Pounds</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Auto-Reorder System</Label>
                          <p className="text-sm text-gray-500">
                            Automatically create purchase orders when stock is low
                          </p>
                        </div>
                        <Switch
                          checked={settings.autoReorderEnabled}
                          onCheckedChange={(checked) => handleSettingChange("autoReorderEnabled", checked)}
                        />
                      </div>

                      {settings.autoReorderEnabled && (
                        <div className="space-y-2">
                          <Label htmlFor="autoReorderQuantity">Auto-Reorder Quantity</Label>
                          <Input
                            id="autoReorderQuantity"
                            type="number"
                            value={settings.autoReorderQuantity}
                            onChange={(e) =>
                              handleSettingChange("autoReorderQuantity", Number.parseInt(e.target.value))
                            }
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Track Serial Numbers</Label>
                          <p className="text-sm text-gray-500">Enable serial number tracking for products</p>
                        </div>
                        <Switch
                          checked={settings.trackSerialNumbers}
                          onCheckedChange={(checked) => handleSettingChange("trackSerialNumbers", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Allow Negative Stock</Label>
                          <p className="text-sm text-gray-500">Allow stock levels to go below zero</p>
                        </div>
                        <Switch
                          checked={settings.allowNegativeStock}
                          onCheckedChange={(checked) => handleSettingChange("allowNegativeStock", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications */}
              <TabsContent value="notifications">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-orange-600" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>Configure alerts and reporting preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Low Stock Alerts</Label>
                          <p className="text-sm text-gray-500">Get notified when items are running low</p>
                        </div>
                        <Switch
                          checked={settings.lowStockAlerts}
                          onCheckedChange={(checked) => handleSettingChange("lowStockAlerts", checked)}
                        />
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-4">Automated Reports</h4>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Daily Reports</Label>
                              <p className="text-sm text-gray-500">Daily inventory summary</p>
                            </div>
                            <Switch
                              checked={settings.dailyReports}
                              onCheckedChange={(checked) => handleSettingChange("dailyReports", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Weekly Reports</Label>
                              <p className="text-sm text-gray-500">Weekly inventory analysis</p>
                            </div>
                            <Switch
                              checked={settings.weeklyReports}
                              onCheckedChange={(checked) => handleSettingChange("weeklyReports", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Monthly Reports</Label>
                              <p className="text-sm text-gray-500">Comprehensive monthly reports</p>
                            </div>
                            <Switch
                              checked={settings.monthlyReports}
                              onCheckedChange={(checked) => handleSettingChange("monthlyReports", checked)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security */}
              <TabsContent value="security">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-red-600" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>Configure security and access control settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={settings.sessionTimeout}
                          onChange={(e) => handleSettingChange("sessionTimeout", Number.parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                        <Input
                          id="passwordExpiry"
                          type="number"
                          value={settings.passwordExpiry}
                          onChange={(e) => handleSettingChange("passwordExpiry", Number.parseInt(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-gray-500">Require 2FA for all user accounts</p>
                        </div>
                        <Switch
                          checked={settings.twoFactorAuth}
                          onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="loginAttempts">Maximum Login Attempts</Label>
                        <Input
                          id="loginAttempts"
                          type="number"
                          value={settings.loginAttempts}
                          onChange={(e) => handleSettingChange("loginAttempts", Number.parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Integrations */}
              <TabsContent value="integrations">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-purple-600" />
                      Integrations & Backup
                    </CardTitle>
                    <CardDescription>Manage external integrations and data backup</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Data Backup</h4>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Automatic daily backups to secure cloud storage</p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download Backup
                          </Button>
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Restore Backup
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">API Access</h4>
                          <Badge variant="secondary">Available</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">REST API for third-party integrations</p>
                        <Button variant="outline" size="sm">
                          Generate API Key
                        </Button>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Webhook Notifications</h4>
                          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                            Inactive
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Send real-time notifications to external systems</p>
                        <Button variant="outline" size="sm">
                          Configure Webhooks
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
