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
import { useCompanyStore } from "@/store/useInvestorStore"

const dummyCompany = {
  name: "Company Name",
  city: "City, Region, Country",
  countryFlag: "🇮🇹",
  website: "www.companywebsite.com",
  description: "Brief description of the company lorem ipsum lorem ipsum lorem ipsum.",
  industry: "Software",
  foundedYear: "2005",
  employees: "250+",
  revenue: "€50M+",
  ebitda: "€10M+",
  ownership: "Private",
  ceo: "John Doe (Joined 2018)",
  estimatedEV: "€200M",
  headquarters: "Milan, Italy",
  imageUrl: "https://placehold.co/600x400/png",
  ceoYearJoined: "2018",
  tags: ["B2B SaaS", "Fintech", "AI"],
  endMarketAndGeography:
    "Our primary markets include the financial, healthcare, and e-commerce industries, serving enterprise clients across North America, Europe, and Asia. We have a strong presence in key technology hubs such as Silicon Valley, London, and Singapore, with expansion plans targeting emerging markets in Latin America and the Middle East.",
  productsAndServices:
    "We provide a suite of software solutions for financial institutions, healthcare providers, and e-commerce platforms. Our products are designed to streamline operations, improve customer engagement, and drive revenue growth for our clients.",
  projects: [
    {
      title: "Project Alpha",
      industry: "Finance",
      status: "Active",
      website: "#",
      description: "Project description Lorem Ipsum.",
    },
    {
      title: "Project Beta",
      industry: "Healthcare",
      status: "Completed",
      website: "#",
      description: "Project description Lorem Ipsum.",
    },
  ],
  team: [
    {
      name: "John Smith",
      role: "CEO",
      location: "Germany",
      email: "john@example.com",
      description: "Short bio Lorem Ipsum.",
    },
    {
      name: "Alice Johnson",
      role: "CTO",
      location: "Sweden",
      email: "alice@example.com",
      description: "Short bio Lorem Ipsum.",
    },
  ],
}

const CompanySheet = ({ children, company }: { children: React.ReactNode; company: ICompany }) => {
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

        <div className="p-6 flex flex-col justify-between text-center md:text-left">
          <div className="flex flex-col items-center md:flex-row md:items-start md:gap-4">
            <div className="w-24 h-24 relative mb-4 md:mb-0">
              <Image
                src={dummyCompany.imageUrl}
                alt="Company Logo"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1 text-center md:text-left">
              <h2 className="text-xl font-bold">{company.name}</h2>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                {dummyCompany.city} <span>{dummyCompany.countryFlag}</span>
              </p>
              <a href="#" className="text-blue-500 underline">
                {company.website}
              </a>
              <Badge className="mt-2">{dummyCompany.industry}</Badge>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto">
          <div className="m-6 border rounded-md">
            {/* First Section: Company Description & Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              {/* Company Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Company Description</h3>
                <p className="text-gray-700 text-sm">{company.description}</p>
              </div>

              {/* Key Information */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Information</h3>
                <ul className="text-gray-700 text-sm grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li>
                    <strong>Employees:</strong> {dummyCompany.employees}
                  </li>
                  <li>
                    <strong>Year Founded:</strong> {company.entry_year}
                  </li>
                  <li>
                    <strong>Revenue:</strong> {dummyCompany.revenue}
                  </li>
                  <li>
                    <strong>EBITDA:</strong> {company.ebitda_in_eurm}
                  </li>
                  <li>
                    <strong>Ownership:</strong> {dummyCompany.ownership}
                  </li>
                  <li>
                    <strong>CEO:</strong> {dummyCompany.ceo} ({dummyCompany.ceoYearJoined})
                  </li>
                  <li>
                    <strong>Estimated EV:</strong> {dummyCompany.estimatedEV}
                  </li>
                  <li>
                    <strong>HQ:</strong> {dummyCompany.headquarters}
                  </li>
                </ul>
              </div>
            </div>

            {/* Second Section: Product & Services & End Market & Geography */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              {/* Product & Services */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Product and Services</h3>
                <p className="text-gray-700 text-sm">{dummyCompany.productsAndServices}</p>
              </div>

              {/* End Market & Geography */}
              <div>
                <h3 className="text-lg font-semibold mb-2">End Market & Geography</h3>
                <p className="text-gray-700 text-sm">{dummyCompany.endMarketAndGeography}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="border rounded-md p-4 mb-4">
              <h3 className="text-lg font-semibold mb-2">Projects</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead className="min-w-72 whitespace-normal break-words">
                      Description
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyCompany.projects.map((proj, index) => (
                    <TableRow key={index}>
                      <TableCell>{proj.title}</TableCell>
                      <TableCell>{proj.industry}</TableCell>
                      <TableCell>{proj.status}</TableCell>
                      <TableCell>
                        <Link
                          href={proj.website}
                          className="text-blue-500 underline flex items-center"
                        >
                          <ExternalLink size={14} className="mr-1" /> Visit
                        </Link>
                      </TableCell>
                      <TableCell className="whitespace-normal break-words text-gray-600">
                        {proj.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">Team</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="min-w-72 whitespace-normal break-words">
                      Description
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyCompany.team.map((member, index) => (
                    <TableRow key={index}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.location}</TableCell>
                      <TableCell>
                        <a href={`mailto:${member.email}`} className="text-blue-500 underline">
                          {member.email}
                        </a>
                      </TableCell>
                      <TableCell className="whitespace-normal break-words text-gray-600">
                        {member.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CompanySheet
