import React, { useState } from "react"
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

interface IInvestor {
  id?: number
  name?: string
  website?: string
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
  // console.log(investor)
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="cursor-pointer text-left whitespace-nowrap">{children}</SheetTrigger>
      <SheetContent className="min-w-[900px] rounded-tl-2xl rounded-bl-2xl">
        {/* Modal Header */}
        {/* <div className="flex space-x-2 ml-auto px-4 py-3 md:fixed right-0">
          <Button variant="outline" className="cursor-pointer">
            <ChevronLeft size={20} />
          </Button>
          <Button variant="outline" className="cursor-pointer">
            <ChevronRight size={20} />
          </Button>
          <Button variant="outline" className="cursor-pointer" onClick={() => setOpen(false)}>
            ✕
          </Button>
        </div> */}

        {/* Modal Content */}
        <div className="p-6 border-b flex flex-col justify-between text-center md:text-left">
          <div className="border-b flex flex-col items-center md:flex-row md:items-start md:gap-3 pb-4">
            <div className="w-24 h-24 relative mb-4 md:mb-0 flex items-center justify-center">
              <img
                src={investor.investor_linkedin_logo ?? "https://placehold.co/600x400/png"}
                alt={`${investor.name} Logo`}
                className="rounded-md object-contain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">{investor.investor_name}</h2>
              <div className="flex flex-col gap-1 text-sm">
                <p className="text-gray-500">
                  {investor.investor_linkedin_city}, {investor.investor_LLM_country}
                </p>
                <p className="text-gray-500">Founded: {investor.investor_linkedin_founded}</p>
                <p className="text-gray-500">
                  {investor.investor_type} • {investor.investor_asset_classes}
                </p>
              </div>
              <Link
                href={investor.website ? investor.website : "/investors"}
                target="_blank"
                className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
              >
                Visit {investor.website} <ExternalLink size={14} />
              </Link>
              <div className="mt-2 flex flex-wrap gap-2 md:items-start items-center justify-center md:justify-start">
                <Badge variant="secondary">{investor.strategy}</Badge>
                <Badge variant="secondary">{investor.industry}</Badge>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <p className="md:text-sm text-xs text-gray-600">
              {investor.investor_linkedin_description}
            </p>
            <p className="md:text-sm text-xs text-gray-600">
              {investor.investment_criteria_description}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto h-[calc(100%-60px)]">
          {/* Deal History */}
          <div className="border rounded-md p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">Deal History</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Website</TableHead>
                  <TableHead className="min-w-72 whitespace-normal break-words">
                    Description
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyInvestor.deals.map((deal, index) => (
                  <TableRow key={index}>
                    <TableCell>{deal.company}</TableCell>
                    <TableCell>{deal.city}</TableCell>
                    <TableCell>{deal.industry}</TableCell>
                    <TableCell>
                      <Link
                        href={deal.website}
                        className="text-blue-500 underline flex items-center"
                      >
                        <ExternalLink size={14} className="mr-1" /> Visit
                      </Link>
                    </TableCell>
                    <TableCell className="whitespace-normal break-words text-gray-600">
                      {deal.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* People Section */}
          <div className="border rounded-md p-4">
            <h3 className="text-lg font-semibold mb-2">People</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="min-w-72 whitespace-normal break-words">
                    Description
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyInvestor.people.map((person, index) => (
                  <TableRow key={index}>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.location}</TableCell>
                    <TableCell>{person.position}</TableCell>
                    <TableCell>
                      <a href={`mailto:${person.email}`} className="text-blue-500 underline">
                        {person.email}
                      </a>
                    </TableCell>
                    <TableCell className="whitespace-normal break-words text-gray-600">
                      {person.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default InvestorSheet
