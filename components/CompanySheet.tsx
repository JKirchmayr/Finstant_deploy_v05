"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ExternalLink, MapPin, Globe, Calendar, Users, DollarSign } from "lucide-react"
import Link from "next/link"
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
import { Separator } from "@/components/ui/separator"

const dummyCompany = {
  name: "Company Name",
  city: "City, Region, Country",
  countryFlag: "🇮🇹",
  website: "www.companywebsite.com",
  description: "Brief description of the company lorem ipsum lorem ipsum lorem ipsum.",
  industry: "Software",
  foundedYear: "2005",
  employees: "250+",
  revenue: "€50M+",
  ebitda: "€10M+",
  ownership: "Private",
  ceo: "John Doe (Joined 2018)",
  estimatedEV: "€200M",
  headquarters: "Milan, Italy",
  imageUrl: "https://placehold.co/600x400/png",
  ceoYearJoined: "2018",
  tags: ["B2B SaaS", "Fintech", "AI"],
  endMarketAndGeography:
    "Our primary markets include the financial, healthcare, and e-commerce industries, serving enterprise clients across North America, Europe, and Asia. We have a strong presence in key technology hubs such as Silicon Valley, London, and Singapore, with expansion plans targeting emerging markets in Latin America and the Middle East.",
  productsAndServices:
    "We provide a suite of software solutions for financial institutions, healthcare providers, and e-commerce platforms. Our products are designed to streamline operations, improve customer engagement, and drive revenue growth for our clients.",
  projects: [
    {
      title: "Project Alpha",
      industry: "Finance",
      status: "Active",
      website: "#",
      description: "Project description Lorem Ipsum.",
    },
    {
      title: "Project Beta",
      industry: "Healthcare",
      status: "Completed",
      website: "#",
      description: "Project description Lorem Ipsum.",
    },
  ],
  team: [
    {
      name: "John Smith",
      role: "CEO",
      location: "Germany",
      email: "john@example.com",
      description: "Short bio Lorem Ipsum.",
    },
    {
      name: "Alice Johnson",
      role: "CTO",
      location: "Sweden",
      email: "alice@example.com",
      description: "Short bio Lorem Ipsum.",
    },
  ],
}

interface ICompany {
  company_id?: number
  investor_id?: number
  Investor_name?: string
  company_investor_status?: string
  company_investor_entry_year?: string
  company_name?: string
  company_website?: string
  companies_LLM_description?: string
  linkedin_page?: string
  companies_linkedin_last_scraped_at?: string
  companies_linkedin_city?: string
  companies_LLM_country?: string
  companies_linkedin_about?: string
  companies_linkedin_company_size?: number
  companies_linkedin_founded?: number
  companies_linkedin_specialties?: string
  companies_linkedin_logo_url?: string
  companies_linkedin_company_type?: string
  companies_linkedin_employee_range_MIN?: number
  companies_linkedin_employee_range_MAX?: number
  companies_linkedin_industries?: string
  companies_revenue_estimate_meur?: number | null
  companies_EBITDA_estimate_meur?: number | null
  description?: string
  entry_year?: number
  ebitda_in_meur?: number | null
}

const CompanySheet = ({ children, company }: { children: React.ReactNode; company: ICompany }) => {
  const [open, setOpen] = useState(false)

  const [profileData, setProfileData] = useState(null)

  const fetchdata = async () => {
    try {
      const res = await fetch(`/api/profile/company_profile/${company.investor_id}`)
      const resdata = await res.json()
      if (resdata.success) {
        setProfileData(resdata.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (company.investor_id && !profileData && open) {
      fetchdata()
    }
  }, [open, company, profileData])
  // console.log(profileData, "resdata")

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="cursor-pointer text-left whitespace-nowrap h-full " asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="min-w-[900px] p-0 overflow-hidden">
        <SheetTitle hidden />
        <div className="h-full flex flex-col">
          {/* Header Section */}
          <div className="p-8 bg-gradient-to-r from-slate-50 to-gray-50 border-b">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 relative flex-shrink-0">
                <Image
                  src={company.companies_linkedin_logo_url || "/placeholder.svg?height=80&width=80"}
                  alt={`${company.company_name} Logo`}
                  fill
                  className="rounded-xl object-cover border shadow-sm"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{company.company_name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {company.companies_linkedin_city}, {company.companies_LLM_country}
                  </div>
                  {company.company_website && (
                    <a
                      href={company.company_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      Website
                    </a>
                  )}
                </div>
                {company.companies_linkedin_industries && (
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    {company.companies_linkedin_industries}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8 space-y-8">
              {/* Overview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Company Description */}
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-900">About</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {company.description || company.companies_linkedin_about}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-900">Key Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Employees</span>
                      </div>
                      <p className="font-medium">{dummyCompany.employees}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Founded</span>
                      </div>
                      <p className="font-medium">{company.entry_year}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>Revenue</span>
                      </div>
                      <p className="font-medium">{dummyCompany.revenue}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>EBITDA</span>
                      </div>
                      <p className="font-medium">
                        {company.ebitda_in_meur
                          ? `€${company.ebitda_in_meur}M`
                          : dummyCompany.ebitda}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Business Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-900">Products & Services</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {dummyCompany.productsAndServices}
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-900">Markets & Geography</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {dummyCompany.endMarketAndGeography}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Projects Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100/50">
                        <TableHead className="font-medium">Project</TableHead>
                        <TableHead className="font-medium">Industry</TableHead>
                        <TableHead className="font-medium">Status</TableHead>
                        <TableHead className="font-medium">Link</TableHead>
                        <TableHead className="font-medium">Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dummyCompany.projects.map((proj, index) => (
                        <TableRow key={index} className="border-gray-200">
                          <TableCell className="font-medium">{proj.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {proj.industry}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={proj.status === "Active" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {proj.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Link
                              href={proj.website}
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span className="text-sm">Visit</span>
                            </Link>
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm max-w-xs">
                            {proj.description}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Team Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Team</h2>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100/50">
                        <TableHead className="font-medium">Name</TableHead>
                        <TableHead className="font-medium">Role</TableHead>
                        <TableHead className="font-medium">Location</TableHead>
                        <TableHead className="font-medium">Contact</TableHead>
                        <TableHead className="font-medium">Bio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dummyCompany.team.map((member, index) => (
                        <TableRow key={index} className="border-gray-200">
                          <TableCell className="font-medium">{member.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {member.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">{member.location}</TableCell>
                          <TableCell>
                            <a
                              href={`mailto:${member.email}`}
                              className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
                            >
                              {member.email}
                            </a>
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm max-w-xs">
                            {member.description}
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

export default CompanySheet
