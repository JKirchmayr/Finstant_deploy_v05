"use client"
import React from "react"
import Header from "../shared/Header"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Filters from "../Filters"

const Page = ({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) => {
  const pathname = usePathname()
  const investors = pathname === "/investors"
  const companies = pathname === "/companies"
  return (
    <div className="w-full h-full">
      <Header title={title} />

      <div
        className={cn(
          `flex-1 grid transition-all ease-in-out duration-300 overflow-y-auto`,
          {
            "grid-cols-[276px_1fr]": investors || companies,
          }
        )}>
        <div>{investors || companies ? <Filters /> : null}</div>
        <main className="w-full h-full overflow-hidden">{children}</main>
      </div>
    </div>
  )
}

export default Page
