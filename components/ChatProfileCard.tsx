"use client"
import { MapPin, Copy, Download, ExternalLink, Calendar, Users, Building2, Globe, Target, Award } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import CompanySheet from "./CompanySheet"
import InvestorSheet from "./InvestorSheet"
import { useState } from "react"

interface CompanyProfile {
  company_id: number
  company_name: string
  company_description: string
  company_logo: string
  company_location: string
}

interface InvestorProfile {
  investor_id: number
  investor_name: string
  investor_description: string
  investor_logo: string
  investor_location: string
}

interface ProfileData {
  type: "company_profile" | "investor_profile"
  companyProfile?: CompanyProfile
  investorProfile?: InvestorProfile
  isLoading?: boolean
}

interface ICompany {
  company_id: number
  company_name: string
  description: string
  companies_linkedin_logo_url: string
  companies_linkedin_city: string
}

interface IInvestor {
  investor_id: number
  investor_name: string
  description: string
  investor_linkedin_logo: string
  investor_linkedin_city: string
}

export function ChatProfileCard({ data }: { data: ProfileData }) {
  const isCompany = data.type === "company_profile"
  const profile = isCompany ? data.companyProfile : data.investorProfile
  const isLoading = data.isLoading || false

  if (!profile) return null

  const name = isCompany ? (profile as CompanyProfile).company_name : (profile as InvestorProfile).investor_name

  const description = isCompany
    ? (profile as CompanyProfile).company_description
    : (profile as InvestorProfile).investor_description

  const logo = isCompany ? (profile as CompanyProfile).company_logo : (profile as InvestorProfile).investor_logo

  const location = isCompany
    ? (profile as CompanyProfile).company_location
    : (profile as InvestorProfile).investor_location

  const mappedProfile: ICompany | IInvestor = isCompany
    ? {
      company_id: (profile as CompanyProfile).company_id,
      company_name: (profile as CompanyProfile).company_name,
      description: (profile as CompanyProfile).company_description,
      companies_linkedin_logo_url: (profile as CompanyProfile).company_logo,
      companies_linkedin_city: (profile as CompanyProfile).company_location,
    }
    : {
      investor_id: (profile as InvestorProfile).investor_id,
      investor_name: (profile as InvestorProfile).investor_name,
      description: (profile as InvestorProfile).investor_description,
      investor_linkedin_logo: (profile as InvestorProfile).investor_logo,
      investor_linkedin_city: (profile as InvestorProfile).investor_location,
    }

  const content = (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden cursor-pointer">
      <CardHeader className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold tracking-tight">{isCompany ? "Company Profile" : "Investor Profile"}</h1>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="gap-1 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm transition-all duration-300 rounded-lg text-sm px-2 py-1"
            >
              <Copy className="w-3 h-3" />
              Copy
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="gap-1 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm transition-all duration-300 rounded-lg text-sm px-2 py-1"
            >
              <Download className="w-3 h-3" />
              Export
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="w-16 h-12 overflow-hidden rounded-xl flex items-center justify-center shadow-lg">
            <Image
              alt={`${name} logo`}
              src={logo ?? "https://placehold.co/50x50.png"}
              width={64}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{name ?? "Not Available"}</h2>
            <p className="text-slate-300 flex items-center gap-1 text-sm">
              <MapPin className="w-3 h-3" />
              {location}
            </p>
          </div>
        </div>
      </CardHeader>
      <div className="bg-white border-b border-slate-200">
        <div className="flex">
          <div className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50">
            <span className="font-semibold text-sm">Overview</span>
          </div>
          <div className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50">
            <span className="font-medium text-sm">Financials</span>
          </div>
          <div className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50">
            <span className="font-medium text-sm">Market</span>
          </div>
          <div className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50">
            <span className="font-medium text-sm">Latest News</span>
          </div>
        </div>
      </div>
      <CardContent className="p-2">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-8">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-2 shadow-sm border border-slate-100 h-full">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-slate-900">Key Facts</h3>
                <Badge className="rounded-full w-6 h-6 p-0 flex items-center justify-center text-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold shadow-lg border-0">
                  1
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {[
                  { label: `${isCompany ? "Company" : "Investor"} Name`, value: name, icon: Building2 },
                  { label: "Website", value: "website.com", isLink: true, icon: Globe },
                  { label: "Location", value: location, icon: MapPin },
                  { label: "Founded", value: "N/A", icon: Calendar },
                  { label: "Size", value: "N/A", icon: Users },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-white/80 rounded-lg hover:bg-white transition-all duration-300 group shadow-sm"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{item.label}</p>
                      {item.isLink ? (
                        <Link
                          href={`https://${item.value}`}
                          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline transition-all duration-300 text-sm"
                        >
                          {item.value}
                          <ExternalLink className="w-2 h-2" />
                        </Link>
                      ) : (
                        <p className="text-slate-900 font-semibold text-sm truncate">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-2">
                <div className="p-2 bg-white/80 rounded-lg shadow-sm">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Target className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">Sector</span>
                  </div>
                  <p className="text-slate-900 font-semibold text-sm leading-tight">
                    {isCompany ? "Technology / Healthcare" : "Venture Capital / Private Equity"}
                  </p>
                </div>
                <div className="p-2 bg-white/80 rounded-lg shadow-sm">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                      {isCompany ? "Business Model" : "Investment Focus"}
                    </span>
                  </div>
                  <p className="text-slate-900 font-semibold text-sm leading-tight">
                    {isCompany ? "B2B SaaS Platform" : "Early Stage Startups"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-3 shadow-sm border border-slate-100 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-bold text-slate-900">Summary</h3>
                <Badge className="rounded-full w-6 h-6 p-0 flex items-center justify-center text-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow-lg border-0">
                  2
                </Badge>
              </div>
              <div className="bg-white/80 rounded-lg p-3 shadow-sm flex-1 overflow-hidden">
                <div className="h-64 overflow-y-scroll overflow-x-hidden">
                  <p className="text-slate-700 leading-relaxed font-medium text-sm break-words whitespace-pre-wrap">
                    {description || "No description available."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent >
    </Card>
  )

  const [open, setOpen] = useState(false)

  return isCompany ? (
    <CompanySheet open={open} onOpenChange={setOpen} company={mappedProfile as ICompany}>
      {content}
    </CompanySheet>
  ) : (
    <InvestorSheet investor={mappedProfile as IInvestor}>{content}</InvestorSheet>
  )
}
