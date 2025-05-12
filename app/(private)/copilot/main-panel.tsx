"use client"
import React, { useEffect } from "react"
import { cn } from "@/lib/utils"
import { useChatLayoutStore } from "@/store/chatLayout"
import { TabPanel } from "./tab-panel"
import { useTabPanelStore } from "@/store/tabStore"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Chat from "./chat"
import ListBuilder from "@/components/ListBuilder"
import { useWSStore } from "@/store/wsStore"

const MainPanel = () => {
  const { layout, setLayout } = useChatLayoutStore()
  const { tabList } = useTabPanelStore()

  return (
    <ResizablePanelGroup direction="horizontal" className="flex-1">
      <ResizablePanel
        defaultSize={tabList.length > 0 ? 60 : 100}
        style={{ transition: "width 0.3s ease" }}>
        <Chat />
      </ResizablePanel>
      {tabList.length > 0 && (
        <>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={40}
            maxSize={40}
            style={{ transition: "width 0.3s ease" }}>
            <TabPanel />
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  )
}

export default MainPanel
