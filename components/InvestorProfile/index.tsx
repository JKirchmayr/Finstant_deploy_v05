import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users } from "lucide-react"
import Image from "next/image"
import { InvestmentData } from "./investment-data"

interface CompanyData {
  "Company Name": string
  Description: string
  Sector: string
  Revenue: number
}

export default function InvestorProfile({ data }: { data: any }) {
  console.log(data)
  return (
    <div className="w-full h-full border-none pt-4">
      <div className="flex flex-col gap-4">
        {/* Top section: Logo and Company Info */}
        <div className="flex gap-4 items-start">
          {/* Logo */}
          <div className="w-20 h-20 border border-foreground rounded-md flex items-center justify-center">
            <span className="text-sm">logo</span>
          </div>

          {/* Company Details */}
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">
              {data.investor_name || "Company Name"}
            </h2>
            <div className="text-sm text-gray-700 flex items-center gap-1">
              <p>United States, New York</p>
            </div>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              www.investor.com
            </a>
          </div>
        </div>

        {/* Industry */}
        <div className="text-sm space-y-2 flex">
          <span className="font-medium shrink-0">Investor Type:</span>
          <div className="flex flex-wrap gap-1">
            {[
              "Direct ",
              "Co-Invest",
              "FoF ",
              "Institutional",
              "Secondary ",
              "Individual ",
              "Corporate",
            ].map(inv => (
              <Badge
                key={inv}
                className="ml-2 bg-muted-foreground/20 backdrop-blur-md text-foreground">
                {inv}
              </Badge>
            ))}
          </div>
        </div>
        {/* Asset Classes: */}
        <div className="text-sm space-y-2 flex">
          <span className="font-medium shrink-0">Asset Classes:</span>
          <div className="flex flex-wrap gap-1">
            {[
              "Private Equity",
              "Venture Capital",
              "Angel Investors",
              "Real Estate",
              "Infrastructure",
            ].map(as => (
              <Badge
                key={as}
                className="ml-2 bg-muted-foreground/20 backdrop-blur-md text-foreground">
                {as}
              </Badge>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="text-sm">
          <span className="font-medium">Description:</span>
          <p className="mt-1 ">{data.company_description}</p>
          <p className="mt-1 text-foreground/80">
            One of Silicon Valley’s most legendary VC firms, Sequoia has made
            significant investments in AI, including Nvidia, OpenAI, DeepMind,
            and RunwayML. They support companies from seed to IPO, and their
            influence has shaped many of the biggest names in tech.
          </p>
        </div>

        <div className="text-sm flex flex-col gap-2">
          <span className="font-medium pb-2">Investments:</span>
          <InvestmentData />
        </div>
      </div>
    </div>
  )
}
