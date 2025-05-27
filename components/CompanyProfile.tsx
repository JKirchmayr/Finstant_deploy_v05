import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, ExternalLink } from "lucide-react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CompanyData {
  "Company Name": string;
  Description: string;
  Sector: string;
  Revenue: number;
}

export default function CompanyProfile({ data }: { data: any }) {
  // Static fallback data for fields not passed as props
  const staticData = {
    city: "City, Region, Country",
    countryFlag: "🇮🇹",
    website: "www.companywebsite.com",
    industry: "Software",
    foundedYear: "2005",
    employees: "250+",
    ebitda: "€10M+",
    ownership: "Private",
    ceo: "John Doe (Joined 2018)",
    estimatedEV: "€200M",
    headquarters: "Milan, Italy",
    revenue: "N/A",
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
  };

  return (
    <div className="w-full h-full border-none p-1.5 pt-1">
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="p-8 bg-gradient-to-r from-slate-50 to-gray-50 border-b rounded-xl">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 relative flex-shrink-0">
              <Image
                src={staticData.imageUrl}
                alt={`${data.company_name || "Company Name"} Logo`}
                fill
                className="rounded-xl object-cover border shadow-sm"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {data.company_name || "Company Name"}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <span>{staticData.countryFlag}</span>
                  {staticData.city}
                </div>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span>🌐</span>
                  {staticData.website}
                </a>
              </div>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                {staticData.industry}
              </Badge>
              {/* Tags Section */}
              <div className="flex flex-wrap gap-2 mt-2">
                {staticData.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Company Description */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">About</h2>
            <p className="text-gray-700 leading-relaxed">
              {data.company_description || data.Description || "No description provided."}
            </p>
          </div>

          {/* Key Information */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Key Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Employees</span>
                </div>
                <p className="font-medium">{staticData.employees}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Founded</span>
                </div>
                <p className="font-medium">{staticData.foundedYear}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Revenue</span>
                </div>
                <p className="font-medium">
                  {typeof data.Revenue !== "undefined" ? `$${data.Revenue}M` : staticData.revenue}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>EBITDA</span>
                </div>
                <p className="font-medium">{staticData.ebitda}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Ownership</span>
                </div>
                <p className="font-medium">{staticData.ownership}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>CEO</span>
                </div>
                <p className="font-medium">{staticData.ceo}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Estimated EV</span>
                </div>
                <p className="font-medium">{staticData.estimatedEV}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>HQ</span>
                </div>
                <p className="font-medium">{staticData.headquarters}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Products & Services</h2>
            <p className="text-gray-700 leading-relaxed">{staticData.productsAndServices}</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Markets & Geography</h2>
            <p className="text-gray-700 leading-relaxed">{staticData.endMarketAndGeography}</p>
          </div>
        </div>

        {/* Projects Section */}
        <div className="space-y-4 p-8">
          <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100/50">
                  <TableHead className="font-medium">Project</TableHead>
                  <TableHead className="font-medium">Industry</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Link</TableHead>
                  <TableHead className="font-medium">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staticData.projects.map((proj, index) => (
                  <TableRow key={index} className="border-gray-200">
                    <TableCell className="font-medium">{proj.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {proj.industry}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={proj.status === "Active" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {proj.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <a
                        href={proj.website}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="text-sm">Visit</span>
                      </a>
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm max-w-xs">
                      {proj.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-4 p-8">
          <h2 className="text-lg font-semibold text-gray-900">Team</h2>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100/50">
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Role</TableHead>
                  <TableHead className="font-medium">Location</TableHead>
                  <TableHead className="font-medium">Contact</TableHead>
                  <TableHead className="font-medium">Bio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staticData.team.map((member, index) => (
                  <TableRow key={index} className="border-gray-200">
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{member.location}</TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
                      >
                        {member.email}
                      </a>
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm max-w-xs">
                      {member.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
