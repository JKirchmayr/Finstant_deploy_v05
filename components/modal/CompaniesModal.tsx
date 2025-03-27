import React from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useCompanyStore } from "@/store/useInvestorStore";

const dummyCompany = {
    name: "Company Name",
    city: "City, Region, Country",
    website: "www.companywebsite.com",
    description: "Short description of the company Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume Lorem Ipsume.",
    imageUrl: "https://placehold.co/600x400/png",
    tags: ["B2B SaaS", "Fintech", "AI"],
    projects: [
        { title: "Project Alpha", industry: "Finance", status: "Active", website: "#", description: "Project description Lorem Ipsume Lorem Ipsume Lorem Ipsume." },
        { title: "Project Beta", industry: "Healthcare", status: "Completed", website: "#", description: "Project description Lorem Ipsume Lorem Ipsume Lorem Ipsume." },
    ],
    team: [
        { name: "John Smith", role: "CEO", location: "Germany", email: "john@example.com", description: "Short bio Lorem Ipsume Lorem Ipsume Lorem Ipsume." },
        { name: "Alice Johnson", role: "CTO", location: "Sweden", email: "alice@example.com", description: "Short bio Lorem Ipsume Lorem Ipsume Lorem Ipsume." },
    ],
};

const CompanyModal = () => {
    const { isOpen, closeModal } = useCompanyStore();

    return (
        <div className={`fixed top-0 right-0 h-full w-[80%] bg-white shadow-lg flex flex-col transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 z-40`}>
            <div className="flex space-x-2 ml-auto px-4 py-3">
                <button className="p-2 border rounded-md"><ChevronLeft size={20} /></button>
                <button className="p-2 border rounded-md"><ChevronRight size={20} /></button>
                <button className="p-2 border rounded-md" onClick={closeModal}>✕</button>
            </div>

            <div className="p-6 border-b flex flex-col justify-between text-center md:text-left">
                <div className="p-6 border-b flex flex-col items-center md:flex-row md:items-start md:gap-3">
                    <div className="w-24 h-24 relative mb-4 md:mb-0">
                        <Image src={dummyCompany.imageUrl} alt="Company Logo" layout="fill" objectFit="cover" className="rounded-md" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold">{dummyCompany.name}</h2>
                        <p className="text-sm text-gray-500">{dummyCompany.city}</p>
                        <a href="#" className="text-blue-500 underline">{dummyCompany.website}</a>
                        <div className="mt-2 flex flex-wrap space-x-2 md:items-start items-center justify-center md:justify-start space-y-2">
                            {dummyCompany.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
                <p className="md:text-sm text-xs text-gray-600 mt-4">{dummyCompany.description}</p>
            </div>

            <div className="p-6 overflow-y-auto h-[calc(100%-60px)]">
                {/* Project Overview */}
                <div className="border rounded-md p-4 mb-4">
                    <h3 className="text-lg font-semibold mb-2">Projects</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Industry</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Website</TableHead>
                                <TableHead className="min-w-72 whitespace-normal break-words">Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dummyCompany.projects.map((proj, index) => (
                                <TableRow key={index}>
                                    <TableCell>{proj.title}</TableCell>
                                    <TableCell>{proj.industry}</TableCell>
                                    <TableCell>{proj.status}</TableCell>
                                    <TableCell>
                                        <Link href={proj.website} className="text-blue-500 underline flex items-center">
                                            <ExternalLink size={14} className="mr-1" /> Visit
                                        </Link>
                                    </TableCell>
                                    <TableCell className="whitespace-normal break-words text-gray-600">{proj.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Team Members */}
                <div className="border rounded-md p-4">
                    <h3 className="text-lg font-semibold mb-2">Team</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="min-w-72 whitespace-normal break-words">Description</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dummyCompany.team.map((member, index) => (
                                <TableRow key={index}>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell>{member.location}</TableCell>
                                    <TableCell>
                                        <a href={`mailto:${member.email}`} className="text-blue-500 underline">{member.email}</a>
                                    </TableCell>
                                    <TableCell className="whitespace-normal break-words text-gray-600">{member.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default CompanyModal;
