"use client"
import React, { useRef } from "react"
import { cn } from "@/lib/utils"
import { useTabPanelStore } from "@/store/tabStore"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import Chat from "./chat"
import { Button } from "@/components/ui/button"
import { ChevronsLeft, ChevronsRight } from "lucide-react"
import { TabPanel } from "./tab-panel"

const MainPanel = () => {
  const { tabList } = useTabPanelStore()
  const tabPanelRef = useRef<any>(null)
  const chatPanelRef = useRef<any>(null)
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const handleToggle = () => {
    if (isCollapsed) {
      tabPanelRef.current?.resize(40) // Expand to 40%
    } else {
      tabPanelRef.current?.collapse() // Collapse
    }
    setIsCollapsed(prev => !prev)
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="flex-1 ">
      <ResizablePanel
        ref={chatPanelRef}
        defaultSize={tabList.length > 0 ? 60 : 100}
        minSize={30}
        className="relative"
      >
        {tabList.length > 0 && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 -right-1.5 z-10"
            onClick={handleToggle}
          >
            {isCollapsed ? <ChevronsLeft /> : <ChevronsRight />}
          </Button>
        )}
        <Chat />
      </ResizablePanel>

      {tabList.length > 0 && (
        <>
          <ResizableHandle />
          <ResizablePanel
            ref={tabPanelRef}
            defaultSize={40}
            minSize={0}
            collapsible
            className={cn("transition-all", {
              "overflow-hidden": isCollapsed,
            })}
          >
            {!isCollapsed && <TabPanel />}
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  )
}

export default MainPanel
