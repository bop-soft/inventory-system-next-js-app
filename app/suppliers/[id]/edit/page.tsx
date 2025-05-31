"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, Plus, X, Trash2 } from "lucide-react"

export default function EditSupplierPage({ params }: { params: { id: string } }) {
  const [paymentTerms, setPaymentTerms] = useState<string[]>(["Net 30", "COD"])
  const [certifications, setCertifications] = useState<string[]>(["ISO 9001", "CE Certified"])

  // Mock supplier data
  const supplier = {
    id: "SUP001",
    name: "TechCorp Solutions",
    contact: "John Smith",
    email: "john@techcorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "us",
    website: "https://techcorp.com",
    taxId: "12-3456789",
    status: "active",
    category: "electronics",
    description: "Leading supplier of electronic components and accessories",
    paymentTerms: "net30",
    currency: "usd",
    leadTime: "7",
    minOrder: "1000",
  }

  const addPaymentTerm = (term: string) => {
    if (term && !paymentTerms.includes(term)) {
      setPaymentTerms([...paymentTerms, term])
    }
  }

  const removePaymentTerm = (term: string) => {
    setPaymentTerms(paymentTerms.filter((t) => t !== term))
  }

  const addCertification = (cert: string) => {
    if (cert && !certifications.includes(cert)) {
      setCertifications([...certifications, cert])
    }
  }

  const removeCertification = (cert: string) => {
    setCertifications(certifications.filter((c) => c !== cert))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Link href={`/suppliers/${params.id}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Supplier
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Supplier</h1>
          <p className="text-gray-600">Update supplier information and settings</p>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update the basic details about the supplier</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplierName">Supplier Name *</Label>
                  <Input id="supplierName" defaultValue={supplier.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplierCode">Supplier Code</Label>
                  <Input id="supplierCode" defaultValue={supplier.id} disabled />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue={supplier.category}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="raw-materials">Raw Materials</SelectItem>
                      <SelectItem value="packaging">Packaging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select defaultValue={supplier.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending Approval</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={supplier.description} rows={3} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue={supplier.website} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                  <Input id="taxId" defaultValue={supplier.taxId} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update contact details and address information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Primary Contact Name *</Label>
                  <Input id="contactName" defaultValue={supplier.contact} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactTitle">Title/Position</Label>
                  <Input id="contactTitle" placeholder="e.g., Sales Manager" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" defaultValue={supplier.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" defaultValue={supplier.phone} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input id="address" defaultValue={supplier.address} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" defaultValue={supplier.city} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input id="state" defaultValue={supplier.state} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                  <Input id="zipCode" defaultValue={supplier.zipCode} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select defaultValue={supplier.country}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Terms & Conditions</CardTitle>
              <CardDescription>Update payment terms, delivery options, and business agreements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Default Payment Terms</Label>
                  <Select defaultValue={supplier.paymentTerms}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="net15">Net 15</SelectItem>
                      <SelectItem value="net30">Net 30</SelectItem>
                      <SelectItem value="net45">Net 45</SelectItem>
                      <SelectItem value="net60">Net 60</SelectItem>
                      <SelectItem value="cod">Cash on Delivery</SelectItem>
                      <SelectItem value="prepaid">Prepaid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue={supplier.currency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                      <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leadTime">Lead Time (Days)</Label>
                  <Input id="leadTime" type="number" defaultValue={supplier.leadTime} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minOrder">Minimum Order Value</Label>
                  <Input id="minOrder" type="number" defaultValue={supplier.minOrder} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Quality Certifications</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
                    >
                      {cert}
                      <button
                        onClick={() => removeCertification(cert)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add certification (e.g., ISO 9001)"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addCertification(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      addCertification(input.value)
                      input.value = ""
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents & Attachments</CardTitle>
              <CardDescription>Manage contracts, certificates, and other important documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload New Documents</h3>
                <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </div>

              {/* Existing Documents */}
              <div className="space-y-3">
                <Label>Existing Documents</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium">Supplier Agreement 2024.pdf</p>
                      <p className="text-sm text-gray-500">Uploaded on Jan 15, 2024 • 2.4 MB</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium">ISO 9001 Certificate.pdf</p>
                      <p className="text-sm text-gray-500">Uploaded on Dec 10, 2023 • 1.8 MB</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="danger" className="space-y-6">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-900">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-red-900">Archive Supplier</h3>
                  <p className="text-sm text-red-700">Archive this supplier and all associated data</p>
                </div>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                  Archive Supplier
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-red-900">Delete Supplier</h3>
                  <p className="text-sm text-red-700">Permanently delete this supplier and all data</p>
                </div>
                <Button variant="destructive">Delete Supplier</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <Link href={`/suppliers/${params.id}`}>
          <Button variant="outline">Cancel</Button>
        </Link>
        <div className="flex items-center space-x-3">
          <Button variant="outline">Save as Draft</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
