"use client"
import React from "react"
import Sidebar from "../shared/Sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const investors = pathname === "/investors"
  const companies = pathname === "/companies"
  return (
    <div
      className={cn(
        `w-full h-dvh grid grid-cols-[56px_1fr] transition-all ease-in-out duration-300`,
        {
          "grid-cols-[276px_1fr]": investors || companies,
        }
      )}
    >
      <Sidebar />
      {children}
    </div>
  )
}

export default Dashboard
