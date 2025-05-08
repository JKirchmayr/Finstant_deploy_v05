"use client"

import { useState, useRef, useEffect } from "react"
import { Moon, Sun, X } from "lucide-react"
import { useTabPanelStore } from "@/store/tabStore"
import { useChatLayoutStore } from "@/store/chatLayout"
import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export function TabPanel() {
  const { closeTab, tabList, activeTabId, setActiveTabId } = useTabPanelStore()

  const { layout, setLayout } = useChatLayoutStore()
  const tabRef = useRef<HTMLButtonElement>(null)

  // -----main tab logic starts here-----

  useEffect(() => {
    if (tabList.length > 0 && !activeTabId) {
      setActiveTabId(tabList[0].tabId)
    }
  }, [tabList])

  const handleTabClick = (id: string) => {
    setActiveTabId(id)
    if (tabRef.current) {
      tabRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      })
    }
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
      <ScrollArea>
        <TabsList className="before:bg-border justify-start relative mb-1 h-[40px] w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-.5">
          {tabList.map(tab => {
            console.log(tab)
            return (
              <TabsTrigger
                className="group bg-muted-foreground/10 hover:bg-muted-foreground/25 transition-all duration-300 ease-in-out cursor-pointer backdrop-blur-md overflow-hidden rounded-b-none border-x border-t py-1.5 data-[state=active]:z-10 data-[state=active]:shadow-none"
                value={tab.tabId}
                key={tab.tabId}
                ref={tabRef}
                onClick={() => setActiveTabId(tab.tabId)}>
                <Image
                  src="/images/icon.png"
                  className="-ms-0.5 "
                  width={16}
                  height={16}
                  alt="logo"
                />
                <span className="truncate"> {tab.tabTitle}</span>
                <Badge
                  onClick={e => {
                    e.stopPropagation()
                    closeTabPanel(tab.id)
                  }}
                  variant="secondary"
                  className="ms-1.5 hover:bg-muted-foreground/40 size-4 p-0 opacity-0 transition-opacity group-hover:opacity-100 group-data-[state=active]:opacity-100">
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
        {tabList.find(tab => tab.tabId === activeTabId)?.tabComponent}
      </TabsContent>
    </Tabs>
  )
}
