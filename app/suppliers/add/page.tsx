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
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"

export default function AddSupplierPage() {
  const [paymentTerms, setPaymentTerms] = useState<string[]>([])
  const [certifications, setCertifications] = useState<string[]>([])

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
        <Link href="/suppliers">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Suppliers
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Supplier</h1>
          <p className="text-gray-600">Create a new supplier profile and configure their settings</p>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="contact">Contact Details</TabsTrigger>
          <TabsTrigger value="business">Business Terms</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details about the supplier</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplierName">Supplier Name *</Label>
                  <Input id="supplierName" placeholder="Enter supplier name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplierCode">Supplier Code</Label>
                  <Input id="supplierCode" placeholder="Auto-generated" disabled />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                  <Select defaultValue="active">
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
                <Textarea
                  id="description"
                  placeholder="Brief description of the supplier and their services"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://supplier-website.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                  <Input id="taxId" placeholder="Enter tax identification number" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Primary contact details and address information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Primary Contact Name *</Label>
                  <Input id="contactName" placeholder="Enter contact person name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactTitle">Title/Position</Label>
                  <Input id="contactTitle" placeholder="e.g., Sales Manager" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="contact@supplier.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="altEmail">Alternative Email</Label>
                  <Input id="altEmail" type="email" placeholder="backup@supplier.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="altPhone">Alternative Phone</Label>
                  <Input id="altPhone" placeholder="+1 (555) 987-6543" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input id="address" placeholder="Enter street address" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" placeholder="Enter city" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input id="state" placeholder="Enter state" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                  <Input id="zipCode" placeholder="Enter ZIP code" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
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
              <CardDescription>Configure payment terms, delivery options, and business agreements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Default Payment Terms</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment terms" />
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
                  <Select defaultValue="usd">
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
                  <Input id="leadTime" type="number" placeholder="e.g., 7" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minOrder">Minimum Order Value</Label>
                  <Input id="minOrder" type="number" placeholder="e.g., 1000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Delivery Methods</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="standard" />
                    <Label htmlFor="standard">Standard Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="express" />
                    <Label htmlFor="express">Express Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pickup" />
                    <Label htmlFor="pickup">Pickup Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="dropship" />
                    <Label htmlFor="dropship">Drop Shipping</Label>
                  </div>
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

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional terms, conditions, or notes about this supplier"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents & Attachments</CardTitle>
              <CardDescription>Upload contracts, certificates, and other important documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h3>
                <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
                </p>
              </div>

              <div className="space-y-2">
                <Label>Document Categories</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="contract" />
                    <Label htmlFor="contract">Supplier Agreement/Contract</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="insurance" />
                    <Label htmlFor="insurance">Insurance Certificate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="tax-cert" />
                    <Label htmlFor="tax-cert">Tax Certificate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="quality-cert" />
                    <Label htmlFor="quality-cert">Quality Certifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bank-details" />
                    <Label htmlFor="bank-details">Banking Information</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="other" />
                    <Label htmlFor="other">Other Documents</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <Link href="/suppliers">
          <Button variant="outline">Cancel</Button>
        </Link>
        <div className="flex items-center space-x-3">
          <Button variant="outline">Save as Draft</Button>
          <Button>Create Supplier</Button>
        </div>
      </div>
    </div>
  )
}
