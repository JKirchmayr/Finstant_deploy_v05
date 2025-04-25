"use client"
import React, { useEffect } from "react"
import { cn } from "@/lib/utils"
import ChatPanel from "./ChatPanel"
import { useChatLayoutStore } from "@/store/chatLayout"
import RenderData from "./RenderData"
import { useChatStore } from "@/store/chatStore"
import { useCoPilotStore } from "@/store/copilotStore"
import ChatCopilot from "../ChatCopilot"
const ChatBox = () => {
  const { layout, setLayout } = useChatLayoutStore()
  const { clearMessages } = useChatStore()
  const { clearResult } = useCoPilotStore()
  useEffect(() => {
    setLayout("chat")
    clearMessages()
    clearResult()
  }, [])

  return (
    <div
      className={cn(
        "h-full grid transition-all duration-500 ease-in-out w-full overflow-hidden",
        layout == "list" ? "grid-cols-[30%_70%]" : "grid-cols-[100%_0%]"
      )}
    >
      {/* <ChatPanel /> */}
      {/* <ChatPanel /> */}
      <ChatCopilot />

      {/* Data Panel */}
      <RenderData />
    </div>
  )
}

export default ChatBox
