"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ExternalLink, MapPin, Globe, Calendar, Users, DollarSign, Linkedin } from "lucide-react"
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
import { Skeleton } from "./ui/skeleton"

interface ICompany {
  company_id?: number
  company_name?: string
  companies_linkedin_city?: string
  companies_LLM_country?: string
  company_website?: string
  linkedin_page?: string
  companies_linkedin_logo_url?: string
}

interface ICompanyProfile {
  company_name: string
  companies_linkedin_city: string
  companies_LLM_country: string
  company_website: string
  linkedin_page?: string
  companies_linkedin_about: string
  companies_linkedin_company_size: number
  companies_linkedin_founded: number
  companies_linkedin_specialties: string
  companies_linkedin_logo_url: string
  companies_linkedin_company_type: string
  companies_linkedin_employee_range_MIN: number
  companies_linkedin_employee_range_MAX: number
  companies_linkedin_industries: string
  companies_revenue_estimate_meur: number
  companies_revenue_estimate_mEUR: number
  companies_EBITDA_estimate_meur: number
  companies_EBITDA_estimate_mEUR: number
  companies_linkedin_last_scraped_at?: string
  companies_LLM_description?: string
  company_description_vector_embedding?: string
}

const CompanySheet = ({
  children,
  company,
  open,
  onOpenChange,
}: {
  children: React.ReactNode
  company: ICompany
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState<ICompanyProfile | null>(null)

  const fetchdata = useCallback(async () => {
    if (!company.company_id) return
    
    try {
      setIsLoading(true)
      const res = await fetch(`/api/profile/company_profile/${company.company_id}`)
      const resdata = await res.json()
      if (resdata.success) {
        setProfileData(resdata.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [company.company_id])

  // Clear profileData when company changes
  useEffect(() => {
    setProfileData(null)
  }, [company.company_id])

  useEffect(() => {
    if (open && !profileData && company.company_id) {
      fetchdata()
    }
  }, [open, company.company_id, fetchdata, profileData])

  // Rest of the component remains the same...
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
                  src={company.companies_linkedin_logo_url || "https://placehold.co/50x50.png"}
                  alt={`${company.company_name} Logo`}
                  fill
                  className="rounded-xl object-cover border shadow-sm"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {company.company_name ?? profileData?.company_name ?? (
                    <Skeleton className="h-7 w-3/4 mb-2" />
                  )}
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  {isLoading ? (
                    <Skeleton className="h-5 w-20" />
                  ) : (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profileData?.companies_linkedin_city ?? "-"},{" "}
                      {profileData?.companies_LLM_country ?? "-"}
                    </div>
                  )}
                  {isLoading ? (
                    <Skeleton className="h-5 w-20" />
                  ) : (
                    profileData?.company_website && (
                      <Link
                        href={profileData.company_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                      </Link>
                    )
                  )}
                  {isLoading ? (
                    <Skeleton className="h-5 w-20" />
                  ) : (
                    profileData?.linkedin_page && (
                      <Link
                        href={profileData?.linkedin_page}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </Link>
                    )
                  )}
                </div>
                <div className="flex space-x-2">
                  {isLoading ? (
                    <Skeleton className="h-6 w-40" />
                  ) : (
                    profileData?.companies_linkedin_industries && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {profileData?.companies_linkedin_industries}
                      </Badge>
                    )
                  )}

                  {isLoading ? (
                    <Skeleton className="h-6 w-40" />
                  ) : (
                    profileData?.companies_linkedin_company_type && (
                      <Badge
                        variant="secondary"
                        className="bg-purple-50 text-purple-700 border-purple-200"
                      >
                        {profileData?.companies_linkedin_company_type}
                      </Badge>
                    )
                  )}
                </div>
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
                  {isLoading ? (
                    <Skeleton className="h-24 w-full" />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {profileData?.companies_linkedin_about ||
                        profileData?.companies_LLM_description}
                    </p>
                  )}
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
                      {isLoading ? (
                        <Skeleton className="h-5 w-3/4" />
                      ) : (
                        <p className="font-medium">
                          {profileData?.companies_linkedin_company_size ?? "Not Available"}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Founded</span>
                      </div>
                      {isLoading ? (
                        <Skeleton className="h-5 w-3/4" />
                      ) : (
                        <p className="font-medium">
                          {profileData?.companies_linkedin_founded ?? "Not Available"}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>Revenue</span>
                      </div>
                      {isLoading ? (
                        <Skeleton className="h-5 w-3/4" />
                      ) : (
                        <p className="font-medium">
                          €{profileData?.companies_revenue_estimate_mEUR ? profileData.companies_revenue_estimate_mEUR + "M" : "Not Available"}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>EBITDA</span>
                      </div>
                      {isLoading ? (
                        <Skeleton className="h-5 w-3/4" />
                      ) : (
                        <p className="font-medium">
                          {profileData?.companies_EBITDA_estimate_mEUR
                            ? `€${profileData?.companies_EBITDA_estimate_mEUR}M`
                            : '-'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Details */}
              {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
              </div> */}

              {/* Projects Section */}
              {/* <div className="space-y-4">
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
              </div> */}

              {/* Team Section */}
              {/* <div className="space-y-4">
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
              </div> */}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CompanySheet
