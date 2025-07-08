import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import React, { ReactNode } from "react"

export default function layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="h-dvh overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
