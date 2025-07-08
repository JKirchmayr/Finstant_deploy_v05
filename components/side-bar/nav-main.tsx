"use client"

import { ChevronRight, Home, LogOut, Settings, type LucideIcon } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  { name: "Assistant", url: "/copilot", icon: "/images/chat.png" },
  { name: "Search", url: "#", icon: "/images/search.png" },
  { name: "Projects", url: "#", icon: "/images/projects.png" },
]

// group-data-[collapsible=icon]:hidden

export function NavMain({}) {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <SidebarGroup className="">
      <SidebarMenu>
        {items.map(item => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.name} isActive={pathname === item.url}>
              <Link href={item.url}>
                <img src={item.icon} alt={item.name} className="size-4" />
                <span className="mb-0.5">{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
