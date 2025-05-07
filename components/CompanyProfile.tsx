import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users } from "lucide-react"
import Image from "next/image"

interface CompanyData {
  "Company Name": string
  Description: string
  Sector: string
  Revenue: number
}

export default function CompanyProfile({ data }: { data: any }) {
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
              {data.company_name || "Company Name"}
            </h2>
            <div className="text-sm text-gray-700 flex items-center gap-1">
              <p>United States, New York</p>
            </div>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              www.companyA.com
            </a>
          </div>
        </div>

        {/* Industry */}
        <div className="text-sm space-y-2">
          <span className="font-medium">Industry:</span>
          {[
            "Healthcare",
            "Technology",
            "Finance",
            "Manufacturing",
            "Retail",
          ].map(industry => (
            <Badge
              key={industry}
              className="ml-2 bg-muted-foreground/20 backdrop-blur-md text-foreground">
              {industry}
            </Badge>
          ))}
        </div>

        {/* Description */}
        <div className="text-sm">
          <span className="font-medium">Description:</span>
          <p className="mt-1 ">{data.company_description}</p>
          {!data.company_description && (
            <p>
              Our AI-led Custom IT Solutions transform tech services. We excel
              in seamless SaaS implementation, transforming legacy systems, and
              optimizing IT infrastructure with smart-infra management. By
              integrating AI, we enhance operational efficiency, strengthen
              cybersecurity, and boost performance, driving innovation and
              sustainable growth for your business.
            </p>
          )}
        </div>

        {/* Bottom Metrics */}
        <div className="flex gap-4 mt-2 max-w-md">
          <Card className="flex-1 p-3 flex flex-col items-center gap-1  rounded-md shadow-sm hover:border-gray-400 hover:shadow-lg transition-all duration-200">
            <Users className="h-5 w-5 text-gray-500" />
            <div className="text-lg text-gray-800">Employees</div>
            <div className="text-lg font-semibold">50-100</div>
          </Card>

          <Card className="flex-1 p-3 flex flex-col items-center gap-1  rounded-md shadow-sm hover:border-gray-400 hover:shadow-lg transition-all duration-200">
            <Building2 className="h-5 w-5 text-gray-500" />
            <div className="text-lg text-gray-800">Est. Revenue</div>
            <div className="text-lg font-semibold">
              ${data.Revenue || "500"}M
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
