"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  LogOut,
} from "lucide-react"

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
}

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<AdminUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    const adminData = localStorage.getItem("admin")
    if (adminData) {
      setAdmin(JSON.parse(adminData))
    } else {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin")
    router.push("/admin/login")
  }

  if (!admin) {
    return <div>Loading...</div>
  }

  const stats = [
    { title: "Total Revenue", value: "$12,847", change: "+12.5%", icon: DollarSign, color: "text-green-600" },
    { title: "Total Orders", value: "1,247", change: "+8.2%", icon: ShoppingCart, color: "text-blue-600" },
    { title: "Active Users", value: "3,456", change: "+15.3%", icon: Users, color: "text-purple-600" },
    { title: "Products", value: "89", change: "+2.1%", icon: Package, color: "text-orange-600" },
  ]

  const recentOrders = [
    {
      id: "ORD-1247",
      customer: "John Doe",
      product: "Custom Sunset Case",
      amount: "$24.99",
      status: "Processing",
      date: "2024-01-20",
    },
    {
      id: "ORD-1246",
      customer: "Jane Smith",
      product: "Minimalist Quote",
      amount: "$19.99",
      status: "Shipped",
      date: "2024-01-20",
    },
    {
      id: "ORD-1245",
      customer: "Mike Johnson",
      product: "Nature Design",
      amount: "$29.99",
      status: "Delivered",
      date: "2024-01-19",
    },
    {
      id: "ORD-1244",
      customer: "Sarah Wilson",
      product: "Geometric Pattern",
      amount: "$22.99",
      status: "Processing",
      date: "2024-01-19",
    },
  ]

  const templates = [
    { id: 1, name: "Sunset Gradient", category: "Abstract", downloads: 1247, status: "Active", created: "2024-01-15" },
    { id: 2, name: "Forest Path", category: "Nature", downloads: 892, status: "Active", created: "2024-01-10" },
    { id: 3, name: "Clean Lines", category: "Minimalist", downloads: 2156, status: "Active", created: "2024-01-08" },
    { id: 4, name: "Bold Quote", category: "Typography", downloads: 634, status: "Draft", created: "2024-01-05" },
  ]

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", orders: 5, joined: "2024-01-15", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", orders: 3, joined: "2024-01-12", status: "Active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", orders: 8, joined: "2024-01-10", status: "Active" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", orders: 2, joined: "2024-01-08", status: "Inactive" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Pimp My Case Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt={admin.name} />
              <AvatarFallback>
                {admin.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{admin.name}</p>
              <p className="text-xs text-muted-foreground">{admin.role}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs ${stat.color} flex items-center gap-1`}>
                      <TrendingUp className="h-3 w-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg bg-muted`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Orders */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.slice(0, 4).map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.amount}</p>
                          <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Templates */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Popular Templates</CardTitle>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {templates.slice(0, 4).map((template) => (
                      <div key={template.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-sm text-muted-foreground">{template.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{template.downloads}</p>
                          <p className="text-sm text-muted-foreground">downloads</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Order Management</h2>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Orders
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4">Order ID</th>
                        <th className="text-left p-4">Customer</th>
                        <th className="text-left p-4">Product</th>
                        <th className="text-left p-4">Amount</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="p-4 font-medium">{order.id}</td>
                          <td className="p-4">{order.customer}</td>
                          <td className="p-4">{order.product}</td>
                          <td className="p-4">{order.amount}</td>
                          <td className="p-4">
                            <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4">{order.date}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Template Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Template
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Downloads</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Created</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {templates.map((template) => (
                        <tr key={template.id} className="border-b">
                          <td className="p-4 font-medium">{template.name}</td>
                          <td className="p-4">{template.category}</td>
                          <td className="p-4">{template.downloads}</td>
                          <td className="p-4">
                            <Badge variant={template.status === "Active" ? "default" : "secondary"}>
                              {template.status}
                            </Badge>
                          </td>
                          <td className="p-4">{template.created}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Users
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Email</th>
                        <th className="text-left p-4">Orders</th>
                        <th className="text-left p-4">Joined</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </td>
                          <td className="p-4">{user.email}</td>
                          <td className="p-4">{user.orders}</td>
                          <td className="p-4">{user.joined}</td>
                          <td className="p-4">
                            <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">System Settings</h2>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Site Maintenance</p>
                      <p className="text-sm text-muted-foreground">Enable maintenance mode</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Manage email settings</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Settings</p>
                      <p className="text-sm text-muted-foreground">Configure payment methods</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Enable 2FA for admin accounts</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-muted-foreground">Configure session duration</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Admin Permissions</p>
                      <p className="text-sm text-muted-foreground">Manage admin roles</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
