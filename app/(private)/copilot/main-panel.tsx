"use client"
import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useTabPanelStore } from "@/store/tabStore"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import Chat from "./chat"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

import TabPanelNew from "./tab-panel-new"
import { useSingleTabStore } from "@/store/singleTabStore"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const MainPanel = () => {
  const { singleTab, isCollapsed, setIsCollapsed } = useSingleTabStore()
  const [tabCollapse, setTabCollapse] = useState(false)
  const tabPanelRef = useRef<any>(null)
  const chatPanelRef = useRef<any>(null)

  const handleToggle = () => {
    if (isCollapsed) {
      chatPanelRef.current?.resize(30)
    } else {
      chatPanelRef.current?.collapse() // Collapse
    }
    setIsCollapsed(!isCollapsed)
  }

  const closeTabPanel = () => {
    if (tabCollapse) return
    tabPanelRef.current?.resize(0) // Set width to 0
    chatPanelRef.current?.resize(100) // Set width to 0
    setTabCollapse(true)
  }

  const openTabPanel = () => {
    tabPanelRef.current?.resize(60)
    chatPanelRef.current?.resize(30)
    setTabCollapse(false)
  }

  // Open tab panel when singleTab.id changes
  useEffect(() => {
    if (!!singleTab.id) {
      openTabPanel()
    }
  }, [singleTab.id])

  console.log(singleTab.id)
  return (
    <ResizablePanelGroup direction="horizontal" className="flex-1">
      <ResizablePanel
        ref={chatPanelRef}
        defaultSize={30}
        minSize={30}
        maxSize={100}
        collapsible
        className="relative transition-all duration-300 ease-in-out"
      >
        <Chat />
      </ResizablePanel>
      {!!singleTab.id && (
        <>
          <ResizableHandle />
          <ResizablePanel
            ref={tabPanelRef}
            defaultSize={!!singleTab.id ? 60 : 100}
            minSize={0}
            className="relative transition-all duration-300 ease-in-out"
          >
            <TabPanelNew togglePanel={handleToggle} closeTabPanel={closeTabPanel} />
          </ResizablePanel>
        </>
      )}
      {tabCollapse && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={openTabPanel}
              variant="outline"
              size="xs"
              className="absolute right-2 top-2 z-50 !px-[6px] border border-gray-300 text-blue-700 hover:bg-gray-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" align="center">
            <p>Open Table Panel</p>
          </TooltipContent>
        </Tooltip>
      )}
    </ResizablePanelGroup>
  )
}

export default MainPanel
