"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CalendarIcon, Filter, Save, RotateCcw, Download, X, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"
import Link from "next/link"

export default function TransactionFiltersPage() {
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [timeFrom, setTimeFrom] = useState("")
  const [timeTo, setTimeTo] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
  const [selectedBranches, setSelectedBranches] = useState<string[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [amountRange, setAmountRange] = useState({ min: "", max: "" })
  const [quantityRange, setQuantityRange] = useState({ min: "", max: "" })
  const [searchTerms, setSearchTerms] = useState<string[]>([])
  const [newSearchTerm, setNewSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [groupBy, setGroupBy] = useState("none")

  const transactionTypes = [
    { id: "sale", label: "Sale", count: 1247 },
    { id: "purchase", label: "Purchase", count: 892 },
    { id: "adjustment", label: "Adjustment", count: 156 },
    { id: "transfer", label: "Transfer", count: 234 },
    { id: "return", label: "Return", count: 89 },
  ]

  const statuses = [
    { id: "completed", label: "Completed", count: 2156 },
    { id: "processing", label: "Processing", count: 234 },
    { id: "in-transit", label: "In Transit", count: 156 },
    { id: "cancelled", label: "Cancelled", count: 72 },
  ]

  const branches = [
    { id: "downtown", label: "Downtown", count: 892 },
    { id: "mall", label: "Mall Location", count: 756 },
    { id: "bakery", label: "Bakery Central", count: 445 },
    { id: "warehouse", label: "Warehouse A", count: 523 },
    { id: "tech", label: "Tech Store", count: 302 },
  ]

  const users = [
    { id: "sarah", label: "Sarah Johnson", count: 445 },
    { id: "mike", label: "Mike Chen", count: 389 },
    { id: "emma", label: "Emma Wilson", count: 356 },
    { id: "david", label: "David Rodriguez", count: 298 },
    { id: "lisa", label: "Lisa Park", count: 234 },
  ]

  const categories = [
    { id: "food", label: "Food & Beverage", count: 1247 },
    { id: "electronics", label: "Electronics", count: 453 },
    { id: "hardware", label: "Hardware", count: 892 },
    { id: "clothing", label: "Clothing", count: 156 },
    { id: "books", label: "Books", count: 89 },
  ]

  const handleCheckboxChange = (
    value: string,
    selectedItems: string[],
    setSelectedItems: (items: string[]) => void,
  ) => {
    if (selectedItems.includes(value)) {
      setSelectedItems(selectedItems.filter((item) => item !== value))
    } else {
      setSelectedItems([...selectedItems, value])
    }
  }

  const addSearchTerm = () => {
    if (newSearchTerm.trim() && !searchTerms.includes(newSearchTerm.trim())) {
      setSearchTerms([...searchTerms, newSearchTerm.trim()])
      setNewSearchTerm("")
    }
  }

  const removeSearchTerm = (term: string) => {
    setSearchTerms(searchTerms.filter((t) => t !== term))
  }

  const clearAllFilters = () => {
    setDateFrom(undefined)
    setDateTo(undefined)
    setTimeFrom("")
    setTimeTo("")
    setSelectedTypes([])
    setSelectedStatuses([])
    setSelectedBranches([])
    setSelectedUsers([])
    setSelectedCategories([])
    setAmountRange({ min: "", max: "" })
    setQuantityRange({ min: "", max: "" })
    setSearchTerms([])
    setNewSearchTerm("")
    setSortBy("date")
    setSortOrder("desc")
    setGroupBy("none")
  }

  const applyFilters = () => {
    console.log("Applying filters...")
    // Here you would apply the filters and redirect back to transactions page
  }

  const saveFilterPreset = () => {
    console.log("Saving filter preset...")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/transactions">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Transactions
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Advanced Filters</h1>
                <p className="text-gray-600">Create detailed filters for transaction analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={clearAllFilters}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear All
              </Button>
              <Button variant="outline" onClick={saveFilterPreset}>
                <Save className="w-4 h-4 mr-2" />
                Save Preset
              </Button>
              <Button onClick={applyFilters} className="bg-blue-600 hover:bg-blue-700">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Filters</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="search">Search & Keywords</TabsTrigger>
                <TabsTrigger value="display">Display Options</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Date & Time Filters */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Date & Time Range</CardTitle>
                      <CardDescription>Filter transactions by date and time</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>From Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !dateFrom && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateFrom ? format(dateFrom, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label>To Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !dateTo && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateTo ? format(dateTo, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="time-from">From Time</Label>
                          <Input
                            id="time-from"
                            type="time"
                            value={timeFrom}
                            onChange={(e) => setTimeFrom(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time-to">To Time</Label>
                          <Input id="time-to" type="time" value={timeTo} onChange={(e) => setTimeTo(e.target.value)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Transaction Types */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Transaction Types</CardTitle>
                      <CardDescription>Select which transaction types to include</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {transactionTypes.map((type) => (
                          <div key={type.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={type.id}
                                checked={selectedTypes.includes(type.id)}
                                onCheckedChange={() => handleCheckboxChange(type.id, selectedTypes, setSelectedTypes)}
                              />
                              <Label htmlFor={type.id} className="font-medium">
                                {type.label}
                              </Label>
                            </div>
                            <Badge variant="secondary">{type.count}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Status Filters */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Transaction Status</CardTitle>
                      <CardDescription>Filter by transaction status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {statuses.map((status) => (
                          <div key={status.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={status.id}
                                checked={selectedStatuses.includes(status.id)}
                                onCheckedChange={() =>
                                  handleCheckboxChange(status.id, selectedStatuses, setSelectedStatuses)
                                }
                              />
                              <Label htmlFor={status.id} className="font-medium">
                                {status.label}
                              </Label>
                            </div>
                            <Badge variant="secondary">{status.count}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Branch Filters */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Branches</CardTitle>
                      <CardDescription>Select specific branches</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {branches.map((branch) => (
                          <div key={branch.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={branch.id}
                                checked={selectedBranches.includes(branch.id)}
                                onCheckedChange={() =>
                                  handleCheckboxChange(branch.id, selectedBranches, setSelectedBranches)
                                }
                              />
                              <Label htmlFor={branch.id} className="font-medium">
                                {branch.label}
                              </Label>
                            </div>
                            <Badge variant="secondary">{branch.count}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Amount Range */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Amount Range</CardTitle>
                      <CardDescription>Filter by transaction amount</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount-min">Minimum Amount</Label>
                          <Input
                            id="amount-min"
                            type="number"
                            placeholder="0.00"
                            value={amountRange.min}
                            onChange={(e) => setAmountRange({ ...amountRange, min: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="amount-max">Maximum Amount</Label>
                          <Input
                            id="amount-max"
                            type="number"
                            placeholder="10000.00"
                            value={amountRange.max}
                            onChange={(e) => setAmountRange({ ...amountRange, max: e.target.value })}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quantity Range */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quantity Range</CardTitle>
                      <CardDescription>Filter by item quantity</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="quantity-min">Minimum Quantity</Label>
                          <Input
                            id="quantity-min"
                            type="number"
                            placeholder="1"
                            value={quantityRange.min}
                            onChange={(e) => setQuantityRange({ ...quantityRange, min: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quantity-max">Maximum Quantity</Label>
                          <Input
                            id="quantity-max"
                            type="number"
                            placeholder="1000"
                            value={quantityRange.max}
                            onChange={(e) => setQuantityRange({ ...quantityRange, max: e.target.value })}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Users */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Users</CardTitle>
                      <CardDescription>Filter by user who performed the transaction</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {users.map((user) => (
                          <div key={user.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={user.id}
                                checked={selectedUsers.includes(user.id)}
                                onCheckedChange={() => handleCheckboxChange(user.id, selectedUsers, setSelectedUsers)}
                              />
                              <Label htmlFor={user.id} className="font-medium">
                                {user.label}
                              </Label>
                            </div>
                            <Badge variant="secondary">{user.count}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Categories */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Categories</CardTitle>
                      <CardDescription>Filter by product categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={category.id}
                                checked={selectedCategories.includes(category.id)}
                                onCheckedChange={() =>
                                  handleCheckboxChange(category.id, selectedCategories, setSelectedCategories)
                                }
                              />
                              <Label htmlFor={category.id} className="font-medium">
                                {category.label}
                              </Label>
                            </div>
                            <Badge variant="secondary">{category.count}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="search" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Search Terms & Keywords</CardTitle>
                    <CardDescription>Add specific search terms to filter transactions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter search term (product name, SKU, transaction ID, etc.)"
                        value={newSearchTerm}
                        onChange={(e) => setNewSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSearchTerm()}
                      />
                      <Button onClick={addSearchTerm}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add
                      </Button>
                    </div>

                    {searchTerms.length > 0 && (
                      <div className="space-y-2">
                        <Label>Active Search Terms:</Label>
                        <div className="flex flex-wrap gap-2">
                          {searchTerms.map((term, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                              <span>{term}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 hover:bg-transparent"
                                onClick={() => removeSearchTerm(term)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="space-y-4">
                      <Label>Search Options</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="case-sensitive" />
                          <Label htmlFor="case-sensitive">Case sensitive search</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="exact-match" />
                          <Label htmlFor="exact-match">Exact match only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="search-notes" />
                          <Label htmlFor="search-notes">Include transaction notes</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="display" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sorting Options */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Sorting</CardTitle>
                      <CardDescription>Configure how results are sorted</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Sort By</Label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="amount">Amount</SelectItem>
                            <SelectItem value="quantity">Quantity</SelectItem>
                            <SelectItem value="product">Product Name</SelectItem>
                            <SelectItem value="type">Transaction Type</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                            <SelectItem value="branch">Branch</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Sort Order</Label>
                        <RadioGroup value={sortOrder} onValueChange={setSortOrder}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="asc" id="asc" />
                            <Label htmlFor="asc">Ascending</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="desc" id="desc" />
                            <Label htmlFor="desc">Descending</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Grouping Options */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Grouping</CardTitle>
                      <CardDescription>Group results for better analysis</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Group By</Label>
                        <Select value={groupBy} onValueChange={setGroupBy}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Grouping</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="type">Transaction Type</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                            <SelectItem value="branch">Branch</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="category">Category</SelectItem>
                            <SelectItem value="product">Product</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Export Options */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Export Options</CardTitle>
                      <CardDescription>Configure export settings for filtered results</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" className="h-20 flex-col">
                          <Download className="w-6 h-6 mb-2" />
                          Export CSV
                        </Button>
                        <Button variant="outline" className="h-20 flex-col">
                          <Download className="w-6 h-6 mb-2" />
                          Export Excel
                        </Button>
                        <Button variant="outline" className="h-20 flex-col">
                          <Download className="w-6 h-6 mb-2" />
                          Export PDF
                        </Button>
                        <Button variant="outline" className="h-20 flex-col">
                          <Download className="w-6 h-6 mb-2" />
                          Export JSON
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
