import React, { useEffect, useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ChevronLeft, ChevronRight, ExternalLink, Linkedin } from "lucide-react"
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
import { Skeleton } from "@/components/ui/skeleton"

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

interface IInvestorProfile {
  investor_id: number
  investor_name: string
  investor_website: string
  investors_LLM_description: string
  investor_type: string
  investor_asset_classes: string
  investor_strategy: string
  investor_investment_criteria_description: string
  investor_linkedin_logo: string
  investor_linekdin_url: string
  investor_linkedin_employees: number
  investor_LLM_country: string
  investor_linkedin_city: string
  investor_linkedin_founded: number
  investor_linkedin_industry: string
  investor_linkedin_description: string
  strategy?: string
  industry?: string
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

  const [profileData, setProfileData] = useState<IInvestorProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchdata = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`/api/profile/investor_profile/${investor.investor_id}`)
      const resdata = await res.json()
      if (resdata.success) {
        setProfileData(resdata.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (investor.investor_id && !profileData && open) {
      fetchdata()
    }
  }, [open, investor, profileData])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="cursor-pointer text-left whitespace-nowrap" asChild>{children}</SheetTrigger>
      <SheetContent className="min-w-[900px] p-0 overflow-hidden">
        <SheetTitle hidden />

        <div className="h-full flex flex-col">
          {/* Header Section */}
          <div className="p-8 bg-gradient-to-r from-slate-50 to-gray-50 border-b">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 relative flex-shrink-0">
                <Image
                  src={
                    investor.investor_linkedin_logo ||
                    profileData?.investor_linkedin_logo ||
                    "/placeholder.svg?height=80&width=80"
                  }
                  alt={`${investor.investor_name || investor.name} Logo`}
                  fill
                  className="rounded-xl object-cover border shadow-sm"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {profileData?.investor_name || investor.investor_name || investor.name}
                </h1>
                {isLoading ? (
                  <>
                    <Skeleton className="h-4 w-48 mb-3" />
                    <Skeleton className="h-6 w-32" />
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <span>🏢</span>
                        {profileData?.investor_linkedin_city || investor.investor_linkedin_city},
                        {investor.investor_LLM_country}
                      </div>
                      {investor.investor_website && (
                        <Link
                          href={investor.investor_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Website
                        </Link>
                      )}
                      {profileData?.investor_linekdin_url && (
                        <Link
                          href={profileData?.investor_linekdin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                        </Link>
                      )}
                    </div>
                    {(investor.investor_type || investor.investor_asset_classes) && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {investor.investor_type}{" "}
                        {investor.investor_asset_classes && `• ${investor.investor_asset_classes}`}
                      </Badge>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData?.strategy && (
                        <Badge variant="secondary">{profileData?.strategy}</Badge>
                      )}
                      {profileData?.industry && (
                        <Badge variant="secondary">{profileData?.industry}</Badge>
                      )}
                    </div>
                  </>
                )}
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
                  {isLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {investor.investor_linkedin_description ||
                        profileData?.investor_linkedin_description}
                    </p>
                  )}
                </div>
                {/* Key Information */}
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-900">Key Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {isLoading ? (
                      <>
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="space-y-1">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-6 w-24" />
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Founded</span>
                          </div>
                          <p className="font-medium">
                            {investor.investor_linkedin_founded ||
                              profileData?.investor_linkedin_founded ||
                              "-"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Employees</span>
                          </div>
                          <p className="font-medium">
                            {investor.linkedin_employees ||
                              profileData?.investor_linkedin_employees ||
                              "-"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Type</span>
                          </div>
                          <p className="font-medium">
                            {investor.investor_type || profileData?.investor_type || "-"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Asset Classes</span>
                          </div>
                          <p className="font-medium">
                            {investor.investor_asset_classes ||
                              profileData?.investor_asset_classes ||
                              "-"}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Investment Criteria */}
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-900">Investment Criteria</h2>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {profileData?.investor_investment_criteria_description ||
                      "No investment criteria provided."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default InvestorSheet
