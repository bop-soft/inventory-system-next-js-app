"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Users,
  Package,
  Clock,
  Edit,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function ViewBranchPage({ params }: { params: { id: string } }) {
  // Mock data - in real app, fetch based on params.id
  const branch = {
    id: "BR001",
    name: "Downtown Store",
    type: "Retail Store",
    address: "123 Main Street",
    city: "Downtown",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    manager: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    email: "downtown@company.com",
    website: "www.company.com/downtown",
    status: "Active",
    openingDate: "2020-03-15",
    totalProducts: 1247,
    totalStaff: 12,
    monthlyRevenue: 125000,
    operatingHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "20:00", closed: false },
      saturday: { open: "10:00", close: "20:00", closed: false },
      sunday: { open: "11:00", close: "17:00", closed: false },
    },
    settings: {
      currency: "USD",
      timezone: "America/New_York",
      inventoryTracking: true,
      onlineOrders: true,
      loyaltyProgram: true,
    },
  }

  const staff = [
    { name: "Sarah Johnson", role: "Manager", email: "sarah@company.com", phone: "+1 (555) 123-4567" },
    { name: "Mike Chen", role: "Assistant Manager", email: "mike@company.com", phone: "+1 (555) 234-5678" },
    { name: "Emma Wilson", role: "Sales Associate", email: "emma@company.com", phone: "+1 (555) 345-6789" },
    { name: "David Rodriguez", role: "Inventory Clerk", email: "david@company.com", phone: "+1 (555) 456-7890" },
  ]

  const recentActivity = [
    { action: "Product Added", details: "Premium Coffee Beans", user: "Sarah Johnson", time: "2 hours ago" },
    { action: "Stock Updated", details: "Wireless Headphones (+25)", user: "Mike Chen", time: "4 hours ago" },
    { action: "Sale Completed", details: "$234.50 transaction", user: "Emma Wilson", time: "6 hours ago" },
    { action: "Staff Added", details: "New employee onboarded", user: "Sarah Johnson", time: "1 day ago" },
  ]

  const performance = [
    { metric: "Daily Sales", value: "$4,250", change: "+12%", trend: "up" },
    { metric: "Customer Traffic", value: "156", change: "+8%", trend: "up" },
    { metric: "Avg Transaction", value: "$27.24", change: "-3%", trend: "down" },
    { metric: "Inventory Turnover", value: "2.4x", change: "+15%", trend: "up" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "Maintenance":
        return <Badge className="bg-orange-100 text-orange-800">Maintenance</Badge>
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
            <div className="flex items-center space-x-4">
              <Link href="/branches">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Branches
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{branch.name}</h1>
                <p className="text-gray-600">
                  {branch.type} • {branch.city}, {branch.state}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {getStatusBadge(branch.status)}
              <Link href={`/branches/${branch.id}/edit`}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Branch
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                      Branch Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                          <div>
                            <p className="text-sm text-gray-600">Address</p>
                            <p className="font-medium">{branch.address}</p>
                            <p className="text-sm text-gray-600">
                              {branch.city}, {branch.state} {branch.zipCode}
                            </p>
                            <p className="text-sm text-gray-600">{branch.country}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="font-medium">{branch.phone}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium">{branch.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Opening Date</p>
                            <p className="font-medium">{branch.openingDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{branch.totalProducts.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total Products</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{branch.totalStaff}</p>
                      <p className="text-sm text-gray-600">Staff Members</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">${branch.monthlyRevenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Operating Hours */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(branch.operatingHours).map(([day, hours]) => (
                      <div key={day} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium capitalize text-gray-900">{day}</p>
                        {hours.closed ? (
                          <p className="text-sm text-red-600">Closed</p>
                        ) : (
                          <p className="text-sm text-gray-600">
                            {hours.open} - {hours.close}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="staff" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Staff Members ({staff.length})</CardTitle>
                  <CardDescription>Team members working at this branch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {staff.map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">{member.email}</p>
                          <p className="text-sm text-gray-600">{member.phone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performance.map((item, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{item.metric}</p>
                          <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                          <div className="flex items-center mt-1">
                            {item.trend === "up" ? (
                              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                            )}
                            <span className={`text-sm ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                              {item.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-blue-600" />
                    Branch Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Currency</span>
                        <Badge variant="secondary">{branch.settings.currency}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Timezone</span>
                        <Badge variant="secondary">{branch.settings.timezone}</Badge>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Inventory Tracking</span>
                        <Badge
                          className={
                            branch.settings.inventoryTracking
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {branch.settings.inventoryTracking ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Online Orders</span>
                        <Badge
                          className={
                            branch.settings.onlineOrders ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }
                        >
                          {branch.settings.onlineOrders ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Loyalty Program</span>
                        <Badge
                          className={
                            branch.settings.loyaltyProgram ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }
                        >
                          {branch.settings.loyaltyProgram ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions and changes at this branch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.details}</p>
                          <p className="text-xs text-gray-500">by {activity.user}</p>
                        </div>
                        <span className="text-sm text-gray-500">{activity.time}</span>
                      </div>
                    ))}
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
