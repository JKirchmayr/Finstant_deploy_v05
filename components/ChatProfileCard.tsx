"use client"

import { MapPin, Info, ChevronRight } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import CompanySheet from "./CompanySheet"
import InvestorSheet from "./InvestorSheet"
import { useEffect, useState } from "react"

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
  comapanyProfile?: CompanyProfile
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
  const profile = isCompany ? data.comapanyProfile : data.investorProfile
  const isLoading = data.isLoading || false

  if (!profile) return null

  const name = isCompany
    ? (profile as CompanyProfile).company_name
    : (profile as InvestorProfile).investor_name
  const description = isCompany
    ? (profile as CompanyProfile).company_description
    : (profile as InvestorProfile).investor_description
  const logo = isCompany
    ? (profile as CompanyProfile).company_logo
    : (profile as InvestorProfile).investor_logo
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
    <Card className="overflow-hidden p-4 border-border gap-2 min-w-80 rounded-lg max-w-md transition-all shadow-sm hover:shadow-lg cursor-pointer">
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3 shrink-0">
          <div className="shrink-0">
            <Image
              alt="Logo"
              src={logo ?? "htttps:placehold.co/50x50.png"}
              width={50}
              height={50}
              className="rounded-md border "
            />
          </div>
          <div className="shrink-0">
            <h1 className="text-xl font-bold truncate mb-1">{name ?? "Not Available"}</h1>
            <p className="flex items-center truncate text-xs text-accent-foreground/60 font-medium">
              <MapPin className="h-3.5 w-3.5 mr-0.5 shrink-0" />
              {location}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <ChevronRight className="h-6 w-6 text-accent-foreground/80" />
        </div>
      </div>
      <CardContent hidden />
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
