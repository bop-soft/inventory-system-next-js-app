"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Shield, Clock, Activity, MapPin, Mail, Phone, Calendar } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function UserProfilePage({ params }: { params: { id: string } }) {
  // Mock user data - in real app, fetch based on params.id
  const user = {
    id: "USR001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    role: "Admin",
    branch: "All Branches",
    status: "Active",
    lastLogin: "2024-01-15 10:30 AM",
    createdAt: "2024-01-01",
    avatar: "/placeholder.svg?height=120&width=120",
    department: "Operations",
    manager: "Sarah Johnson",
    location: "New York, NY",
    timezone: "EST",
    permissions: [
      "Inventory Management",
      "User Management",
      "Reports & Analytics",
      "System Settings",
      "Branch Management",
    ],
  }

  const activityLog = [
    {
      action: "Updated product",
      details: "Modified stock levels for Premium Coffee Beans",
      timestamp: "2024-01-15 10:30 AM",
      type: "inventory",
    },
    {
      action: "Generated report",
      details: "Downloaded monthly sales report",
      timestamp: "2024-01-15 09:15 AM",
      type: "report",
    },
    {
      action: "Added user",
      details: "Created new user account for Mike Chen",
      timestamp: "2024-01-14 04:45 PM",
      type: "user",
    },
    {
      action: "Stock adjustment",
      details: "Adjusted inventory for Wireless Headphones",
      timestamp: "2024-01-14 02:30 PM",
      type: "inventory",
    },
    {
      action: "Login",
      details: "Successful login from 192.168.1.100",
      timestamp: "2024-01-14 08:00 AM",
      type: "auth",
    },
  ]

  const sessions = [
    {
      device: "Chrome on Windows",
      location: "New York, NY",
      ip: "192.168.1.100",
      lastActive: "2024-01-15 10:30 AM",
      status: "Active",
    },
    {
      device: "Safari on iPhone",
      location: "New York, NY",
      ip: "192.168.1.101",
      lastActive: "2024-01-14 06:45 PM",
      status: "Inactive",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "inventory":
        return <Activity className="w-4 h-4 text-blue-600" />
      case "report":
        return <Shield className="w-4 h-4 text-green-600" />
      case "user":
        return <Edit className="w-4 h-4 text-purple-600" />
      case "auth":
        return <Clock className="w-4 h-4 text-orange-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
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
              <Link href="/users">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Users
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
                <p className="text-gray-600">View and manage user information</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href={`/users/${params.id}/edit`}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit User
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* User Overview */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.firstName} ${user.lastName}`} />
                    <AvatarFallback className="text-2xl">
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {user.firstName} {user.lastName}
                      </h2>
                      {getRoleBadge(user.role)}
                      {getStatusBadge(user.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Joined {user.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="details" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Basic user details and contact information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">First Name</label>
                          <p className="text-sm text-gray-900">{user.firstName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Last Name</label>
                          <p className="text-sm text-gray-900">{user.lastName}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email Address</label>
                        <p className="text-sm text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Phone Number</label>
                        <p className="text-sm text-gray-900">{user.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Department</label>
                        <p className="text-sm text-gray-900">{user.department}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Manager</label>
                        <p className="text-sm text-gray-900">{user.manager}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Work Information</CardTitle>
                      <CardDescription>Role and access details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Role</label>
                        <div className="mt-1">{getRoleBadge(user.role)}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Branch Access</label>
                        <p className="text-sm text-gray-900">{user.branch}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Status</label>
                        <div className="mt-1">{getStatusBadge(user.status)}</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Last Login</label>
                        <p className="text-sm text-gray-900">{user.lastLogin}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Account Created</label>
                        <p className="text-sm text-gray-900">{user.createdAt}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Timezone</label>
                        <p className="text-sm text-gray-900">{user.timezone}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Permissions Tab */}
              <TabsContent value="permissions">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>User Permissions</CardTitle>
                    <CardDescription>Access rights and system permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-green-600" />
                            <span className="font-medium text-gray-900">{permission}</span>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Granted
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>User actions and system interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityLog.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="p-2 rounded-full bg-white">{getActivityIcon(activity.type)}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{activity.action}</h4>
                            <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                            <p className="text-xs text-gray-500 mt-2">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Sessions Tab */}
              <TabsContent value="sessions">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>Current and recent login sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Device</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>IP Address</TableHead>
                            <TableHead>Last Active</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sessions.map((session, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{session.device}</TableCell>
                              <TableCell>{session.location}</TableCell>
                              <TableCell className="font-mono text-sm">{session.ip}</TableCell>
                              <TableCell>{session.lastActive}</TableCell>
                              <TableCell>
                                {session.status === "Active" ? (
                                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                                    Active
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                    Inactive
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                {session.status === "Active" && (
                                  <Button variant="outline" size="sm" className="text-red-600">
                                    Terminate
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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
