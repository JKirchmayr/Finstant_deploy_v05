import Link from "next/link"
import React from "react"
import { ChevronRight } from "lucide-react"
import { Card } from "../ui/card"

export const ActiveProjects = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center justify-between border-b pb-1">
        <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
        <Link href="#" className="text-sm font-medium text-muted-foreground hover:underline">
          <p className="flex items-center">
            View all <ChevronRight size={15} />
          </p>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 ">
        {[
          {
            name: "Project Barbrosa",
            description:
              "A revolutionary AI-powered project management system that helps teams collaborate more effectively and deliver projects on time",
          },
          {
            name: "Project 2",
            description:
              "An innovative blockchain-based supply chain tracking solution designed to improve transparency and reduce operational costs",
          },
        ].map(project => (
          <Card key={project.name} className="flex flex-col px-2 py-3 gap-2">
            <p className="text-sm font-medium text-muted-foreground">{project.name}</p>
            <p className="text-xs text-muted-foreground">{project.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
