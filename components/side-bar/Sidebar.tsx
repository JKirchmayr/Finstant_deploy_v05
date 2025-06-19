"use client"

import React from "react"
import {
  Building2,
  HandCoins,
  LifeBuoy,
  MessagesSquare,
  Newspaper,
  Podcast,
  Receipt,
  Rss,
  Settings,
  Sparkles,
  Store,
  WandSparkles,
  Workflow,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import UserMenu from "./UserMenu"
import { Separator } from "../ui/separator"
import Image from "next/image"
import IMAGES from "@/constant/images"

const data = {
  projects: [
    {
      name: "Chat",
      url: "/copilot",
      icon: MessagesSquare,
    },
    {
      name: "Investors",
      url: "/investors",
      icon: HandCoins,
    },
    {
      name: "Companies",
      url: "/companies",
      icon: Building2,
    },
  ],
  footer: [
    // {
    //   name: "Settings",
    //   url: "/settings",
    //   icon: Settings,
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { state } = useSidebar()

  const isCollapsed = state === "collapsed"
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-3 border-b border-gray-200">
        <SidebarMenu>
          <SidebarMenuItem className="ml-1">
            <SidebarMenuButton
              tooltip="PM Radar"
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent gap-2"
            >
              <div className="flex aspect-square size-8 text-2xl items-center justify-center">
                <Image src={IMAGES.icon} alt="logo" width={32} height={32} />
              </div>
              <div className="grid flex-1 text-left text-xl leading-tight">
                <span className="font-semibold">PM Radar</span>
              </div>
              {!isCollapsed && <SidebarTrigger className="" />}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.projects.map(item => (
                <SidebarMenuItem
                  key={item.name}
                  className={cn(
                    `flex items-center justify-center px-1.5 py-0.5 rounded-md border border-transparent cursor-pointer hover:bg-gray-100 hover:border-gray-200 transition-all ease-in-out duration-300`,
                    {
                      "border border-blue-700/30 bg-blue-50 hover:border-blue-700/40":
                        pathname === item.url,
                    }
                  )}
                >
                  <SidebarMenuButton
                    tooltip={item.name}
                    asChild
                    className={cn(`p-0 flex items-center w-full hover:bg-transparent`, {
                      "justify-center": isCollapsed,
                      "px-2": !isCollapsed,
                    })}
                  >
                    <Link
                      href={item.url}
                      className={cn(`inline-flex`, {
                        "text-blue-700 [&>svg]:scale-110": pathname === item.url,
                      })}
                    >
                      <item.icon
                        className={cn(`!size-5 transition-transform ease-in-out`, {
                          "!size-5.5": pathname === item.url,
                        })}
                      />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {isCollapsed && (
                <SidebarMenuItem
                  className={`flex items-center justify-center px-1.5 py-0.5 rounded-md border border-transparent cursor-pointer hover:bg-gray-100 hover:border-gray-200 transition-all ease-in-out duration-300`}
                >
                  <SidebarMenuButton
                    tooltip="Expand"
                    asChild
                    className={cn(`p-0 flex items-center w-full hover:bg-transparent `, {
                      "justify-center p-0": isCollapsed,
                    })}
                  >
                    <SidebarTrigger className="" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {/* {data.footer.map(item => (
                <SidebarMenuItem
                  key={item.name}
                  className={cn(
                    `flex items-center justify-center px-1.5 py-0.5 rounded-md border border-transparent cursor-pointer hover:bg-gray-100 hover:border-gray-200 transition-all ease-in-out duration-300`,
                    {
                      "border border-blue-700/30 bg-blue-50 hover:border-blue-700/40":
                        pathname === item.url,
                    }
                  )}
                >
                  <SidebarMenuButton
                    tooltip={item.name}
                    asChild
                    className={cn(`p-0 flex items-center w-full hover:bg-transparent`, {
                      "justify-center": isCollapsed,
                      "px-2": !isCollapsed,
                    })}
                  >
                    <Link
                      href={item.url}
                      className={cn(`inline-flex`, {
                        "text-blue-700 [&>svg]:scale-105": pathname === item.url,
                      })}
                    >
                      <item.icon
                        className={cn(`!size-5 transition-transform ease-in-out`, {
                          "!size-5.5": pathname === item.url,
                        })}
                      />
                      {!isCollapsed && <span>{item.name}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}

              <SidebarMenuItem className="">
                <UserMenu isCollapsed={isCollapsed} />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
