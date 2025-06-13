"use client"
import React from "react"
import Header from "../shared/Header"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Filters from "../Filters"
import InvestorFilters from "../InvestorFilters"

const Page = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const pathname = usePathname()
  const investors = pathname === "/investors"
  const companies = pathname === "/companies"
  return (
    <div className="w-full h-full flex flex-col">
      <div
        className={cn(`flex-1 grid transition-all ease-in-out duration-300 overflow-y-auto`, {
          "grid-cols-[250px_1fr]": investors || companies,
        })}
      >
        {companies && <Filters />}
        {investors && <InvestorFilters />}
        <main className="flex-1 overflow-auto h-full">{children}</main>
      </div>
    </div>
  )
}

export default Page
