"use client"

import { useState, useRef, useEffect } from "react"
import { Building2, CircleDollarSignIcon, Moon, Sun, X } from "lucide-react"
import { useTabPanelStore } from "@/store/tabStore"
import { useChatLayoutStore } from "@/store/chatLayout"
import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CompanyProfile from "@/components/CompanyProfile"
import InvestorProfile from "@/components/InvestorProfile"
import CompaniesData from "./companies-table"
import InvestorsResponseData from "./investors-table"
import Image from "next/image"

interface TabData {
  tabId: string
  type: string
  data: any
}

const renderTabContent = (activeTab: TabData | undefined) => {
  if (!activeTab) return null

  switch (activeTab.type) {
    case "companies":
      return <CompaniesData companies={activeTab.data} />
    case "investors":
      return <InvestorsResponseData investors={activeTab.data} />
    case "investor-profile":
      return <InvestorProfile data={activeTab.data} />
    case "company-profile":
      return <CompanyProfile data={activeTab.data} />
    default:
      return null
  }
}

export function TabPanel() {
  const { closeTab, tabList, activeTabId, setActiveTabId } = useTabPanelStore()

  const { layout, setLayout } = useChatLayoutStore()
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({}) // MODIFIED LINE
  console.log(tabList, "tabList")
  // -----main tab logic starts here-----

  useEffect(() => {
    if (tabList.length > 0 && !activeTabId) {
      setActiveTabId(tabList[0].tabId)
    }
  }, [tabList])

  // Scroll to active tab - ADDED EFFECT
  useEffect(() => {
    if (activeTabId && tabRefs.current) {
      const activeTabElement = tabRefs.current[activeTabId]
      if (activeTabElement) {
        activeTabElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        })
      }
    }
  }, [activeTabId, tabList])

  const handleTabClick = (id: string) => {
    setActiveTabId(id)
  }

  const closeTabPanel = (id: number) => {
    const currentIndex = tabList.findIndex(tab => tab.id === id)
    if (currentIndex === -1) return

    // Close tab
    closeTab(id)

    const newTabList = tabList.filter(tab => tab.id !== id)

    if (newTabList.length > 0) {
      const newActiveTab =
        currentIndex > 0
          ? newTabList[currentIndex - 1] // Move to previous
          : newTabList[0] // Or first tab
      setActiveTabId(newActiveTab.tabId)
    } else {
      setLayout("chat") // No tabs left
    }
  }

  return (
    <Tabs
      value={activeTabId}
      onValueChange={id => {
        handleTabClick(id)
      }}
      className="space-x-4 mt-[2px] h-full flex flex-col">
      <ScrollArea className="m-0 border-b">
        <TabsList className="justify-start relative h-[35px] w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 ">
          {tabList.map(tab => {
            return (
              <TabsTrigger
                className="group font-medium bg-gray-200 hover:bg-gray-300/80 transition-all duration-300 ease-in-out cursor-pointer backdrop-blur-md overflow-hidden rounded-b-none border-x border-t py-1.5 data-[state=active]:z-10 data-[state=active]:shadow-none"
                value={tab.tabId}
                key={tab.tabId}
                ref={el => {
                  if (tabRefs.current) {
                    tabRefs.current[tab.tabId] = el
                  }
                }}
                onClick={() => setActiveTabId(tab.tabId)}>
                {(tab.type === "company-profile" ||
                  tab.type === "investor-profile") && (
                  <Image
                    src="https://placehold.co/50x50"
                    className="-ms-0.5 rounded  "
                    width={16}
                    height={16}
                    alt="logo"
                    unoptimized={true}
                  />
                )}

                {tab.type === "companies" && <Building2 />}
                {tab.type === "investors" && <CircleDollarSignIcon />}
                <span className="truncate"> {tab.tabTitle}</span>
                <Badge
                  onClick={e => {
                    e.stopPropagation()
                    closeTabPanel(tab.id)
                  }}
                  variant="secondary"
                  className="ms-1.5 bg-transparent size-4 p-0 opacity-0 transition-opacity group-hover:opacity-100 group-data-[state=active]:opacity-100">
                  <X className="w-4 h-4" />
                </Badge>
              </TabsTrigger>
            )
          })}
        </TabsList>
        <ScrollBar orientation="horizontal" hidden />
      </ScrollArea>
      <TabsContent
        value={activeTabId}
        className="flex-1 h-full overflow-auto bg-white noscroll">
        {renderTabContent(tabList.find(tab => tab.tabId === activeTabId))}
      </TabsContent>
    </Tabs>
  )
}
