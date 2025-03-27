import React from "react"
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

const dummyInvestor = {
  name: "Investor Name",
  city: "City, Region, Country",
  website: "www.investorwebsite.com",
  description:
    "Short description of the investor (max 3 lines) Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ip Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume",
  imageUrl: "https://placehold.co/600x400/png",
  tags: ["Private Equity", "Venture Capital", "Corporate"],
  deals: [
    {
      company: "Company A",
      city: "New York",
      industry: "IT Services",
      website: "#",
      description:
        "Short descriptio Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume.",
    },
    {
      company: "Company B",
      city: "London",
      industry: "Industrial",
      website: "#",
      description:
        "Short descriptio Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume",
    },
  ],
  people: [
    {
      name: "Max Mustermann",
      location: "Italy",
      position: "Partner",
      email: "max@example.com",
      description:
        "Short descriptio Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume.",
    },
    {
      name: "Jane Doe",
      location: "France",
      position: "Analyst",
      email: "jane@example.com",
      description:
        "Short descriptio Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume.",
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
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer text-left whitespace-nowrap">
        {children}
      </SheetTrigger>
      <SheetContent className="min-w-[900px] rounded-tl-2xl rounded-bl-2xl">
        {/* Modal Header */}
        <div className="flex space-x-2 ml-auto px-4 py-3 md:fixed right-0">
          <Button variant="outline" className="cursor-pointer">
            <ChevronLeft size={20} />
          </Button>
          <Button variant="outline" className="cursor-pointer">
            <ChevronRight size={20} />
          </Button>
          <Button variant="outline" className="cursor-pointer">
            ✕
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6 border-b flex flex-col justify-between text-center md:text-left">
          <div className="border-b flex flex-col items-center md:flex-row md:items-start md:gap-3">
            <div className="w-24 h-24 relative mb-4 md:mb-0 flex items-center justify-center">
              <img
                src={investor.logo ? investor.logo : "https://placehold.co/600x400/png"}
                alt="Investor Logo"
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">{investor.name}</h2>
              <p className="text-sm text-gray-500">{investor.hq_city} </p>
              <Link
                href={investor.website ? investor.website : "/investors"}
                target="_blank"
                className="text-blue-500 underline"
              >
                {investor.website}
              </Link>
              <div className="mt-2 flex flex-wrap space-x-2 md:items-start items-center justify-center md:justify-start space-y-2">
                {investor.investment_focus.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
                {/* {investor.investment_focus} */}
              </div>
            </div>
          </div>
          <p className="md:text-sm text-xs text-gray-600 mt-4">{investor.description}</p>
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
