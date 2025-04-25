// import React from "react"
// import Page from "@/components/layout/Page"
// import ChatBox from "@/components/chat/ChatBox"

// const page = () => {
//   return (
//     <Page title="Co-Pilot">
//       <ChatBox />
//     </Page>
//   )
// }

// export default page

// app/copilot/page.tsx or app/copilot/page.ts

"use client"
import Page from "@/components/layout/Page"
import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"

type Company = {
  company_name: string
  company_description: string
  similarity_score: number
}

export default function CoPilotChat() {
  const userId = "vinay_001"
  const socketUrl = `wss://ai-agents-backend-zwa0.onrender.com/ws/chat/${userId}`

  const { messages, input, handleInputChange, append } = useChat()
  const wsRef = useRef<WebSocket | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)

  useEffect(() => {
    const ws = new WebSocket(socketUrl)

    ws.onopen = () => console.log("✅ WebSocket connected")

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log("Data: ", data)

      switch (data.type) {
        case "response":
          setIsStreaming(true)
          append({
            role: "assistant",
            content: data.data.response,
          })
          break

        case "company": {
          const c: Company = data.data
          const markdown = formatCompanyAsMarkdown(c)
          append({
            role: "assistant",
            content: markdown,
          })
          break
        }

        case "done":
          setIsStreaming(false)
          console.log("✅ Stream complete")
          break

        case "error":
          append({ role: "assistant", content: `❌ Error: ${data.message}` })
          break
      }
    }

    ws.onerror = (err) => console.error("❌ WebSocket error", err)
    ws.onclose = () => console.log("🔌 WebSocket closed")

    wsRef.current = ws
    return () => ws.close()
  }, [socketUrl, append])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    append({ role: "user", content: input })
    wsRef.current?.send(JSON.stringify({ prompt: input }))
  }

  return (
    <div className="max-w-3xl mx-auto h-screen flex flex-col">
      {/* Chat */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.map((m, i) => (
          // <div
          //   key={i}
          //   className={`max-w-[80%] px-1 py-1 text-sm leading-relaxed ${
          //     m.role === "user"
          //       ? "text-right ml-auto text-blue-800"
          //       : "text-left mr-auto text-gray-800"
          //   }`}
          // >
          //   <ReactMarkdown>{m.content}</ReactMarkdown>
          // </div>
          <div
            key={i}
            className={cn(``, {
              "ml-auto bg-white border border-gray-300/60 px-4 py-3 rounded-2xl":
                m.role === "user",
              "max-w-[80%] mr-auto p-0": m.role === "assistant",
              "max-w-full": m.role === "assistant",
            })}
          >
            <ReactMarkdown>{m.content}</ReactMarkdown>
          </div>
        ))}
        {isStreaming && (
          <div className="animate-pulse text-sm text-gray-400 px-4 py-2">AI is thinking...</div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2 p-4 border-t">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something like: AI companies in Germany"
          className="flex-1 px-4 py-2 border rounded"
        />
        <button className="bg-black text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  )
}

// ✅ Format 1 company record into Markdown
function formatCompanyAsMarkdown(c: Company): string {
  return `**${c.company_name}**
${c.company_description}
*Similarity Score:* ${c.similarity_score.toFixed(2)}`
}
