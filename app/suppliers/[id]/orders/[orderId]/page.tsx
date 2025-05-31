"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Sidebar } from "@/components/sidebar"
import {
  ArrowLeft,
  Download,
  Package,
  Truck,
  Phone,
  Mail,
  FileText,
  RotateCcw,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

// Mock order data - in real app, this would be fetched based on orderId
const orderDetails = {
  id: "ORD001",
  orderNumber: "PO-2024-001",
  orderDate: "2024-01-15",
  deliveryDate: "2024-01-22",
  expectedDelivery: "2024-01-20",
  status: "Delivered",
  totalItems: 45,
  subtotal: 1167.75,
  tax: 83.0,
  shipping: 0.0,
  totalCost: 1250.75,
  paymentMethod: "Net 30",
  paymentStatus: "Pending",
  shippingAddress: {
    name: "Main Warehouse",
    address: "456 Storage Ave",
    city: "New York",
    state: "NY",
    zip: "10002",
    phone: "+1 (555) 987-6543",
  },
  supplier: {
    id: "SUP001",
    name: "TechCorp Solutions",
    contact: "John Smith",
    email: "john@techcorp.com",
    phone: "+1 (555) 123-4567",
  },
  products: [
    {
      id: "PROD001",
      name: "Wireless Bluetooth Headphones",
      sku: "WBH-001",
      quantity: 20,
      unitCost: 25.99,
      subtotal: 519.8,
      category: "Electronics",
    },
    {
      id: "PROD002",
      name: "USB-C Charging Cable",
      sku: "UCC-002",
      quantity: 25,
      unitCost: 8.5,
      subtotal: 212.5,
      category: "Accessories",
    },
    {
      id: "PROD003",
      name: "Smartphone Screen Protector",
      sku: "SSP-003",
      quantity: 30,
      unitCost: 3.25,
      subtotal: 97.5,
      category: "Accessories",
    },
    {
      id: "PROD004",
      name: "Portable Power Bank",
      sku: "PPB-004",
      quantity: 15,
      unitCost: 18.75,
      subtotal: 281.25,
      category: "Electronics",
    },
    {
      id: "PROD005",
      name: "Wireless Mouse",
      sku: "WM-005",
      quantity: 10,
      unitCost: 12.99,
      subtotal: 129.9,
      category: "Computer Accessories",
    },
  ],
  timeline: [
    {
      date: "2024-01-15",
      time: "09:30 AM",
      status: "Order Placed",
      description: "Purchase order submitted to supplier",
      icon: FileText,
      completed: true,
    },
    {
      date: "2024-01-15",
      time: "02:15 PM",
      status: "Order Confirmed",
      description: "Supplier confirmed order and estimated delivery",
      icon: CheckCircle,
      completed: true,
    },
    {
      date: "2024-01-17",
      time: "11:00 AM",
      status: "In Production",
      description: "Items being prepared for shipment",
      icon: Package,
      completed: true,
    },
    {
      date: "2024-01-19",
      time: "03:45 PM",
      status: "Shipped",
      description: "Order shipped via FedEx - Tracking: 1234567890",
      icon: Truck,
      completed: true,
    },
    {
      date: "2024-01-22",
      time: "10:20 AM",
      status: "Delivered",
      description: "Order delivered to Main Warehouse",
      icon: CheckCircle,
      completed: true,
    },
  ],
}

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string; orderId: string }
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return (
          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-900">
            <CheckCircle className="w-3 h-3 mr-1" />
            Delivered
          </Badge>
        )
      case "In Transit":
        return (
          <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-blue-900">
            <Truck className="w-3 h-3 mr-1" />
            In Transit
          </Badge>
        )
      case "Processing":
        return (
          <Badge className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 hover:bg-yellow-100 dark:hover:bg-yellow-900">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </Badge>
        )
      case "Cancelled":
        return (
          <Badge className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-900">
            <AlertCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-900">
            Paid
          </Badge>
        )
      case "Pending":
        return (
          <Badge className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 hover:bg-yellow-100 dark:hover:bg-yellow-900">
            Pending
          </Badge>
        )
      case "Overdue":
        return (
          <Badge className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 hover:bg-red-100 dark:hover:bg-red-900">
            Overdue
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleReorder = () => {
    // Here you would implement reorder functionality
    alert("Reorder functionality would be implemented here")
  }

  const handleDownloadPurchaseOrder = () => {
    // Dynamic import to avoid SSR issues
    import("jspdf")
      .then(({ default: jsPDF }) => {
        const doc = new jsPDF()

        // Company Header (Buyer Information)
        doc.setFontSize(20)
        doc.setFont("helvetica", "bold")
        doc.text("INVENTORY MANAGEMENT SYSTEM", 20, 25)

        doc.setFontSize(12)
        doc.setFont("helvetica", "normal")
        doc.text("123 Business Street", 20, 35)
        doc.text("New York, NY 10001", 20, 42)
        doc.text("Phone: (555) 123-4567", 20, 49)
        doc.text("Email: info@inventoryms.com", 20, 56)

        // Purchase Order Title
        doc.setFontSize(24)
        doc.setFont("helvetica", "bold")
        doc.text("PURCHASE ORDER", 20, 80)

        // Purchase Order Details
        doc.setFontSize(12)
        doc.setFont("helvetica", "normal")
        doc.text(`PO Number: ${orderDetails.orderNumber}`, 20, 95)
        doc.text(`PO Date: ${new Date(orderDetails.orderDate).toLocaleDateString()}`, 20, 105)
        doc.text(`Required Date: ${new Date(orderDetails.expectedDelivery).toLocaleDateString()}`, 20, 115)
        doc.text(`Status: ${orderDetails.status}`, 20, 125)

        // Vendor Information
        doc.setFont("helvetica", "bold")
        doc.text("VENDOR:", 120, 95)
        doc.setFont("helvetica", "normal")
        doc.text(orderDetails.supplier.name, 120, 105)
        doc.text(orderDetails.supplier.contact, 120, 115)
        doc.text(orderDetails.supplier.phone, 120, 125)
        doc.text(orderDetails.supplier.email, 120, 135)

        // Ship To Address
        doc.setFont("helvetica", "bold")
        doc.text("SHIP TO:", 20, 150)
        doc.setFont("helvetica", "normal")
        doc.text(orderDetails.shippingAddress.name, 20, 160)
        doc.text(orderDetails.shippingAddress.address, 20, 170)
        doc.text(
          `${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${orderDetails.shippingAddress.zip}`,
          20,
          180,
        )
        doc.text(orderDetails.shippingAddress.phone, 20, 190)

        // Bill To Address (same as company)
        doc.setFont("helvetica", "bold")
        doc.text("BILL TO:", 120, 150)
        doc.setFont("helvetica", "normal")
        doc.text("Inventory Management System", 120, 160)
        doc.text("123 Business Street", 120, 170)
        doc.text("New York, NY 10001", 120, 180)
        doc.text("(555) 123-4567", 120, 190)

        // Table Header
        const tableStartY = 210
        doc.setFont("helvetica", "bold")
        doc.setFillColor(240, 240, 240)
        doc.rect(20, tableStartY, 170, 10, "F")

        doc.text("Item Description", 25, tableStartY + 7)
        doc.text("SKU", 80, tableStartY + 7)
        doc.text("Qty", 110, tableStartY + 7)
        doc.text("Unit Price", 130, tableStartY + 7)
        doc.text("Total", 165, tableStartY + 7)

        // Table Content
        doc.setFont("helvetica", "normal")
        let currentY = tableStartY + 15

        orderDetails.products.forEach((product, index) => {
          // Add new page if needed
          if (currentY > 250) {
            doc.addPage()
            currentY = 30
          }

          // Alternate row colors
          if (index % 2 === 0) {
            doc.setFillColor(250, 250, 250)
            doc.rect(20, currentY - 5, 170, 10, "F")
          }

          // Product name (truncate if too long)
          const productName = product.name.length > 25 ? product.name.substring(0, 25) + "..." : product.name
          doc.text(productName, 25, currentY + 2)
          doc.text(product.sku, 80, currentY + 2)
          doc.text(product.quantity.toString(), 110, currentY + 2)
          doc.text(`$${product.unitCost.toFixed(2)}`, 130, currentY + 2)
          doc.text(`$${product.subtotal.toFixed(2)}`, 165, currentY + 2)

          currentY += 10
        })

        // Totals Section
        currentY += 10
        const totalsStartY = Math.max(currentY, 220)

        // Subtotal
        doc.setFont("helvetica", "normal")
        doc.text("Subtotal:", 130, totalsStartY)
        doc.text(`$${orderDetails.subtotal.toFixed(2)}`, 165, totalsStartY)

        // Tax
        doc.text("Tax:", 130, totalsStartY + 10)
        doc.text(`$${orderDetails.tax.toFixed(2)}`, 165, totalsStartY + 10)

        // Shipping
        doc.text("Shipping:", 130, totalsStartY + 20)
        doc.text(orderDetails.shipping === 0 ? "Free" : `$${orderDetails.shipping.toFixed(2)}`, 165, totalsStartY + 20)

        // Total
        doc.setFont("helvetica", "bold")
        doc.setFontSize(14)
        doc.text("TOTAL:", 130, totalsStartY + 35)
        doc.text(`$${orderDetails.totalCost.toFixed(2)}`, 165, totalsStartY + 35)

        // Terms and Conditions
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.text("TERMS & CONDITIONS:", 20, totalsStartY + 55)

        doc.setFont("helvetica", "normal")
        doc.setFontSize(10)
        doc.text(`• Payment Terms: ${orderDetails.paymentMethod}`, 20, totalsStartY + 65)
        doc.text("• Delivery must be made to the address specified above", 20, totalsStartY + 72)
        doc.text("• All items must be in good condition and match specifications", 20, totalsStartY + 79)
        doc.text("• Please include this PO number on all correspondence and invoices", 20, totalsStartY + 86)

        // Authorization
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.text("AUTHORIZED BY:", 20, totalsStartY + 100)

        doc.setFont("helvetica", "normal")
        doc.text("_________________________", 20, totalsStartY + 115)
        doc.text("Purchasing Manager", 20, totalsStartY + 122)
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, totalsStartY + 129)

        // Footer
        const footerY = Math.max(totalsStartY + 140, 270)
        doc.setFontSize(10)
        doc.setFont("helvetica", "italic")
        doc.text("This Purchase Order constitutes our offer to purchase the above items.", 20, footerY)
        doc.text("Please confirm acceptance and provide delivery schedule.", 20, footerY + 7)

        // Save the PDF
        doc.save(`PurchaseOrder-${orderDetails.orderNumber}.pdf`)
      })
      .catch((error) => {
        console.error("Error generating PDF:", error)
        alert("Error generating Purchase Order. Please try again.")
      })
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/suppliers/${params.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Supplier
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Order {orderDetails.orderNumber}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Placed on {new Date(orderDetails.orderDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadPurchaseOrder}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Purchase Order
              </Button>
              <Button size="sm" onClick={handleReorder}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reorder
              </Button>
            </div>
          </div>

          {/* Order Status and Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Information */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Order Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Order Number</p>
                      <p className="text-gray-900 dark:text-gray-100">{orderDetails.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
                      <div className="mt-1">{getStatusBadge(orderDetails.status)}</div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Order Date</p>
                      <p className="text-gray-900 dark:text-gray-100">
                        {new Date(orderDetails.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Delivery Date</p>
                      <p className="text-gray-900 dark:text-gray-100">
                        {new Date(orderDetails.deliveryDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items</p>
                      <p className="text-gray-900 dark:text-gray-100">{orderDetails.totalItems}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Cost</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        ${orderDetails.totalCost.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Products Ordered */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Products Ordered</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {orderDetails.products.length} items in this order
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-200 dark:border-gray-700">
                        <TableHead className="text-gray-900 dark:text-gray-100">Product</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100">SKU</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100">Quantity</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100">Unit Price</TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderDetails.products.map((product) => (
                        <TableRow
                          key={product.id}
                          className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-gray-100">{product.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{product.category}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-100">{product.sku}</TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-100">{product.quantity}</TableCell>
                          <TableCell className="text-gray-900 dark:text-gray-100">
                            ${product.unitCost.toFixed(2)}
                          </TableCell>
                          <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                            ${product.subtotal.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Order Timeline */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Order Timeline</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Track the progress of your order
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderDetails.timeline.map((event, index) => {
                      const Icon = event.icon
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              event.completed
                                ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{event.status}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(event.date).toLocaleDateString()} at {event.time}
                              </p>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="text-gray-900 dark:text-gray-100">${orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax:</span>
                    <span className="text-gray-900 dark:text-gray-100">${orderDetails.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      {orderDetails.shipping === 0 ? "Free" : `$${orderDetails.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <Separator className="bg-gray-200 dark:bg-gray-700" />
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-900 dark:text-gray-100">Total:</span>
                    <span className="text-gray-900 dark:text-gray-100">${orderDetails.totalCost.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                    <span className="text-gray-900 dark:text-gray-100">{orderDetails.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Payment Status:</span>
                    {getPaymentStatusBadge(orderDetails.paymentStatus)}
                  </div>
                </CardContent>
              </Card>

              {/* Supplier Information */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Supplier</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{orderDetails.supplier.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Contact: {orderDetails.supplier.contact}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-sm text-gray-900 dark:text-gray-100">{orderDetails.supplier.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-sm text-gray-900 dark:text-gray-100">{orderDetails.supplier.email}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{orderDetails.shippingAddress.name}</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{orderDetails.shippingAddress.address}</p>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}{" "}
                    {orderDetails.shippingAddress.zip}
                  </p>
                  <div className="flex items-center space-x-2 pt-2">
                    <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      {orderDetails.shippingAddress.phone}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
