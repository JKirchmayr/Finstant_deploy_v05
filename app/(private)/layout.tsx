import React, { ReactNode } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/side-bar/Sidebar"

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
