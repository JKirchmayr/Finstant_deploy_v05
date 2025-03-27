import React from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useInvestorStore } from "@/store/useInvestorStore"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

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

const InvestorModal = () => {
  const { isOpen, closeModal } = useInvestorStore()
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[80%] bg-white shadow-lg flex flex-col transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-40`}
    >
      <div className="flex space-x-2 ml-auto px-4 py-3">
        <button className="p-2 border rounded-md">
          <ChevronLeft size={20} />
        </button>
        <button className="p-2 border rounded-md">
          <ChevronRight size={20} />
        </button>
        <button className="p-2 border rounded-md" onClick={closeModal}>
          ✕
        </button>
      </div>
      <div className="p-6 border-b flex flex-col justify-between text-center md:text-left">
        <div className="p-6 border-b flex flex-col items-center md:flex-row md:items-start md:gap-3">
          <div className="w-24 h-24 relative mb-4 md:mb-0">
            <Image
              src={dummyInvestor.imageUrl}
              alt="Investor Logo"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">{dummyInvestor.name}</h2>
            <p className="text-sm text-gray-500">{dummyInvestor.city} </p>
            <a href="#" className="text-blue-500 underline">
              {dummyInvestor.website}
            </a>
            <div className="mt-2 flex flex-wrap space-x-2 md:items-start items-center justify-center md:justify-start space-y-2">
              {dummyInvestor.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <p className="md:text-sm text-xs text-gray-600 mt-4">{dummyInvestor.description}</p>
      </div>

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

        {/* People */}
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
    </div>
  )
}

export default InvestorModal
