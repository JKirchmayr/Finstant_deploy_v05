"use client"

import { useState, useRef, useEffect } from "react"
import {
  Building2,
  CircleDollarSignIcon,
  Moon,
  Sun,
  X,
  UserCircle2Icon,
  FactoryIcon,
} from "lucide-react"
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
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    if (tabList.length > 0 && !activeTabId) {
      setActiveTabId(tabList[0].tabId)
    }
  }, [tabList])

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

    closeTab(id)

    const newTabList = tabList.filter(tab => tab.id !== id)

    if (newTabList.length > 0) {
      const newActiveTab =
        currentIndex > 0 ? newTabList[currentIndex - 1] : newTabList[0]
      setActiveTabId(newActiveTab.tabId)
    } else {
      setLayout("chat")
    }
  }

  return (
    <Tabs
      value={activeTabId}
      onValueChange={id => {
        handleTabClick(id)
      }}
      className="space-x-4 mt-2 h-full flex flex-col">
      <ScrollArea className="m-0">
        <TabsList className="before:bg-border justify-start  relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
          {tabList.map(tab => {
            return (
              <TabsTrigger
                className="bg-muted group [&:first-child]:ml-1.5 cursor-pointer overflow-hidden max-w-40 border-gray-200 border-b-0 rounded-b-none border-x border-t py-2 text-muted-foreground/80 data-[state=active]:text-foreground hover:text-foreground/75 data-[state=active]:z-10 data-[state=active]:shadow-none"
                value={tab.tabId}
                key={tab.tabId}
                ref={el => {
                  if (tabRefs.current) {
                    tabRefs.current[tab.tabId] = el
                  }
                }}
                onClick={() => setActiveTabId(tab.tabId)}>
                {/* Icons with spacing */}
                {tab.type === "companies" && (
                  <Building2 className="-ms-0.5 me-1.5 opacity-60" size={16} />
                )}
                {tab.type === "investors" && (
                  <CircleDollarSignIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                  />
                )}
                {tab.type === "investor-profile" && (
                  <UserCircle2Icon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                  />
                )}
                {tab.type === "company-profile" && (
                  <FactoryIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                  />
                )}
                <span className="truncate">{tab.tabTitle}</span>

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
