"use client"
import React, { useRef } from "react"
import { cn } from "@/lib/utils"
import { useTabPanelStore } from "@/store/tabStore"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import Chat from "./chat"

import TabPanelNew from "./tab-panel-new"
import { useSingleTabStore } from "@/store/singleTabStore"

const MainPanel = () => {
  const { singleTab, isCollapsed, setIsCollapsed } = useSingleTabStore()
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
            minSize={55}
            className="relative transition-all duration-300 ease-in-out"
          >
            <TabPanelNew togglePanel={handleToggle} />
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  )
}

export default MainPanel
