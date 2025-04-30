"use client"
import React from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Filters from "@/components/Filters"
import Page from "@/components/layout/Page"

export default function layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const investors = pathname === "/investors"
  const companies = pathname === "/companies"
  return <div>{children}</div>
}
