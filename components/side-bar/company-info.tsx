"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function CompanyInfo({}) {
  const { isMobile, toggleSidebar, open } = useSidebar()

  return (
    <SidebarMenu className="bg-background hover:bg-transparent">
      <SidebarMenuItem className="hover:bg-transparent">
        <SidebarMenuButton size="lg" className=" cursor-auto">
          {!open && (
            <div className="flex aspect-square size-8 items-center justify-center ">
              <img src="/images/logo_small.jpg" className="size-8" />
            </div>
          )}

          {/* -------logo using text----------- */}
          {/* {open && (
            <div className="grid flex-1 text-left text-3xl leading-tight uppercase">
              <span className="truncate font-medium" style={{ fontFamily: "Times New Roman" }}>
                Finstant
              </span>
            </div>
          )} */}
          {open && (
            <div className="w-full flex items-center ">
              <img src="/images/full-logo.png" className="w-full -ml-2.5" />
            </div>
          )}

          {open && (
            <SidebarMenuButton
              size="lg"
              onClick={toggleSidebar}
              asChild
              className="data-[state=open]:hidden size-8 cursor-pointer shrink-0 flex justify-center items-center"
            >
              <img src="/images/sidebar-switch.png" className="size-4 shrink-0" />
            </SidebarMenuButton>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
