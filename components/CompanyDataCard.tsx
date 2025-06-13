"use client"

import { ExternalLink, MapPin, DollarSign, Info } from "lucide-react"
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

interface CompanyCardProps {
  companyLogo: string
  companyName: string
  companyWebsite: string
  companyDescription: string
  companyCountry: string
  companyRevenue: string
}

export function CompanyCard({
  companyLogo,
  companyName,
  companyWebsite,
  companyDescription,
  companyCountry,
  companyRevenue,
}: CompanyCardProps) {
  return (
    <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 max-w-md w-full transition-all hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800 bg-white">
              <Image
                src={companyLogo || "/placeholder.svg"}
                alt={`${companyName} logo`}
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{companyName}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <ExternalLink className="h-3.5 w-3.5 mr-1 text-zinc-500" />
                <a
                  href={companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
                >
                  {companyWebsite.replace(/^https?:\/\//, "")}
                </a>
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">{companyDescription}</p>

        <div className="flex flex-wrap gap-3">
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-2 py-1 text-xs font-normal"
          >
            <MapPin className="h-3 w-3" />
            {companyCountry}
          </Badge>
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-2 py-1 text-xs font-normal"
          >
            <DollarSign className="h-3 w-3" />
            {companyRevenue} Revenue
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-between">
        <Button variant="outline" size="sm" className="text-xs">
          <Info className="h-3.5 w-3.5 mr-1" />
          Company Details
        </Button>
        <Button size="sm" className="text-xs">
          Visit Website
        </Button>
      </CardFooter>
    </Card>
  )
}
