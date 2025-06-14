import React, { useEffect, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useInvestorStore } from "@/store/useInvestorStore"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface IInvestor {
  id?: number
  investor_id?: number
  name?: string
  website?: string
  investor_website?: string
  description?: string
  type?: string
  asset_classes?: string
  strategy?: string
  investment_criteria_description?: string
  investor_linkedin_logo?: string
  linkedin_url?: string
  linkedin_employees?: number
  country?: string
  hq_city?: string
  founded_year?: number
  industry?: string
  linkedin_description?: string
  investment_focus?: string[]
  investor_name?: string
  investor_linkedin_city?: string
  investor_LLM_country?: string
  investor_linkedin_founded?: number
  investor_type?: string
  investor_asset_classes?: string
  investor_industry?: string
  investor_linkedin_description?: string
}

interface IDeal {
  company: string
  city: string
  industry: string
  website: string
  description: string
}

interface IPerson {
  name: string
  location: string
  position: string
  email: string
  description: string
}

const dummyInvestor = {
  deals: [
    {
      company: "Example Company",
      city: "Berlin",
      industry: "Technology",
      website: "https://example.com",
      description: "A sample deal description",
    },
  ],
  people: [
    {
      name: "John Doe",
      location: "Berlin",
      position: "Investment Manager",
      email: "john@example.com",
      description: "Team member description",
    },
  ],
}

const InvestorSheet = ({
  children,
  investor,
}: {
  children: React.ReactNode
  investor: IInvestor
}) => {
  const [open, setOpen] = useState(false)

  const [profileData, setProfileData] = useState(null)

  const fetchdata = async () => {
    try {
      const res = await fetch(`/api/profile/investor_profile/${investor.investor_id}`)
      const resdata = await res.json()
      if (resdata.success) {
        setProfileData(resdata.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (investor.investor_id && !profileData && open) {
      fetchdata()
    }
  }, [open, investor, profileData])
  // console.log(profileData, "resdata")

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="cursor-pointer text-left whitespace-nowrap">{children}</SheetTrigger>
      <SheetContent className="min-w-[900px] p-0 overflow-hidden">
        <SheetTitle hidden />

        <div className="h-full flex flex-col">
          {/* Header Section */}
          <div className="p-8 bg-gradient-to-r from-slate-50 to-gray-50 border-b">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 relative flex-shrink-0">
                <Image
                  src={investor.investor_linkedin_logo || "/placeholder.svg?height=80&width=80"}
                  alt={`${investor.investor_name || investor.name} Logo`}
                  fill
                  className="rounded-xl object-cover border shadow-sm"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {investor.investor_name || investor.name}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <span>🏢</span>
                    {investor.investor_linkedin_city}, {investor.investor_LLM_country}
                  </div>
                  {investor.investor_website && (
                    <a
                      href={investor.investor_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Website
                    </a>
                  )}
                </div>
                {(investor.investor_type || investor.investor_asset_classes) && (
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    {investor.investor_type}{" "}
                    {investor.investor_asset_classes && `• ${investor.investor_asset_classes}`}
                  </Badge>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {investor.strategy && <Badge variant="secondary">{investor.strategy}</Badge>}
                  {investor.industry && <Badge variant="secondary">{investor.industry}</Badge>}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8 space-y-8">
              {/* Overview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Description */}
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-900">About</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {investor.investor_linkedin_description || investor.description}
                  </p>
                </div>
                {/* Key Information */}
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-900">Key Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Founded</span>
                      </div>
                      <p className="font-medium">{investor.investor_linkedin_founded || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Employees</span>
                      </div>
                      <p className="font-medium">{investor.linkedin_employees || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Type</span>
                      </div>
                      <p className="font-medium">{investor.investor_type || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Asset Classes</span>
                      </div>
                      <p className="font-medium">{investor.investor_asset_classes || "-"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Investment Criteria */}
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900">Investment Criteria</h2>
                <p className="text-gray-700 leading-relaxed">
                  {investor.investment_criteria_description || "No investment criteria provided."}
                </p>
              </div>

              <Separator />

              {/* Deal History Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Deal History</h2>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100/50">
                        <TableHead className="font-medium">Company</TableHead>
                        <TableHead className="font-medium">City</TableHead>
                        <TableHead className="font-medium">Industry</TableHead>
                        <TableHead className="font-medium">Website</TableHead>
                        <TableHead className="font-medium">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dummyInvestor.deals.map((deal, index) => (
                        <TableRow key={index} className="border-gray-200">
                          <TableCell className="font-medium">{deal.company}</TableCell>
                          <TableCell>{deal.city}</TableCell>
                          <TableCell>{deal.industry}</TableCell>
                          <TableCell>
                            <Link
                              href={deal.website}
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span className="text-sm">Visit</span>
                            </Link>
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm max-w-xs">
                            {deal.description}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* People Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">People</h2>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100/50">
                        <TableHead className="font-medium">Name</TableHead>
                        <TableHead className="font-medium">Location</TableHead>
                        <TableHead className="font-medium">Position</TableHead>
                        <TableHead className="font-medium">Email</TableHead>
                        <TableHead className="font-medium">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dummyInvestor.people.map((person, index) => (
                        <TableRow key={index} className="border-gray-200">
                          <TableCell className="font-medium">{person.name}</TableCell>
                          <TableCell>{person.location}</TableCell>
                          <TableCell>{person.position}</TableCell>
                          <TableCell>
                            <a
                              href={`mailto:${person.email}`}
                              className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
                            >
                              {person.email}
                            </a>
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm max-w-xs">
                            {person.description}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default InvestorSheet
