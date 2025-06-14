"use client"

import { MapPin, Info } from "lucide-react"
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

  // console.log(name, description, logo, location)

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
    <Card className="overflow-hidden p-2 border gap-2 max-w-md transition-all hover:shadow-md cursor-pointer">
      <CardHeader className="px-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800 bg-white">
              <Image
                src={logo || "/placeholder.svg"}
                alt={`${name} logo`}
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{name ?? "Not Available"}</CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4 whitespace-normal break-words">
          {description}
        </p>

        <div className="flex flex-wrap gap-3">
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-2 py-1 text-xs font-normal"
          >
            <MapPin className="h-3 w-3" />
            {location}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )

  return isCompany ? (
    <CompanySheet company={mappedProfile as ICompany}>{content}</CompanySheet>
  ) : (
    <InvestorSheet investor={mappedProfile as IInvestor}>{content}</InvestorSheet>
  )
}
