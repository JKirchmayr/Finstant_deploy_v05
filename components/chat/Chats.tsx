import { cn } from "@/lib/utils"
import React from "react"
import ReactMarkdown from "react-markdown"

export type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

const Chats = ({ messages, layout }: { messages: ChatMessage[]; layout: string }) => {
  return (
    <>
      {messages.map((item, index) => {
        return (
          <div
            key={index}
            className={cn(`bg-white border border-gray-300/60 px-4 py-3 rounded-2xl`, {
              "ml-auto": item.role === "user",
              "max-w-[80%] mr-auto bg-blue-100 border-blue-200": item.role === "assistant",
              "max-w-full": item.role === "assistant" && layout === "list",
            })}
          >
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </div>
        )
      })}
    </>
  )
}

export default Chats
