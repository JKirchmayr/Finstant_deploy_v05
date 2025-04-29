"use client"
import React, { useEffect } from "react"
import { cn } from "@/lib/utils"
import { useChatLayoutStore } from "@/store/chatLayout"
import { TabPanel } from "./tab-panel"
import { useTabPanelStore } from "@/store/tabStore"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import Chat from "./chat"
import ListBuilder from "@/components/ListBuilder"
import { useWSStore } from "@/store/wsStore"

const MainPanel = () => {
  const { layout, setLayout } = useChatLayoutStore()
  const { tabList } = useTabPanelStore()

  console.log(tabList)

  return (
    <ResizablePanelGroup direction="horizontal" className="flex-1">
      <ResizablePanel defaultSize={35} minSize={22}>
        <Chat />
      </ResizablePanel>
      {tabList.length > 0 && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={75}
            onResize={(size) => {
              if (size < 20) {
                setLayout("chat")
              }
            }}
          >
            <TabPanel />

            {/* <div className="border-l">
              <ListBuilder />
            </div> */}
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  )
}

export default MainPanel
