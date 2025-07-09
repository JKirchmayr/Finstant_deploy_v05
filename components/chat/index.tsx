"use client"
import TypingDots from "@/components/TypingDots"
import { cn, tryParseJSON } from "@/lib/utils"
import { ArrowUp, CircleSmall, Loader2, Loader2Icon } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { Markdown } from "@/components/markdown"
import { useAuth } from "@/hooks/useAuth"
import { useSingleTabStore } from "@/store/singleTabStore"
import { usePathname } from "next/navigation"
import { PromptField } from "@/components/chat/PromptField"
import { BottomSuggestions, Suggestions } from "./Suggestions"
import { ActiveProjects } from "./ActiveProjects"
import { Messages } from "./Messages"
import { useChatStore } from "@/store/chatStore"

type Company = {
  company_name: string
  company_description: string
  similarity_score: number
}

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"

const Chat = () => {
  const { user, loading } = useAuth()

  const userId = "aa227293-c91c-4b03-91db-0d2048ee73e7"

  const { messages, input, append, setInput } = useChatStore()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [entityProfileStage, setEntityProfileStage] = useState<
    "init" | "processing" | "final" | null
  >(null)
  const [listStage, setListStage] = useState<"init" | "processing" | "final" | null>(null)
  const hasAddedPlaceholders = useRef(false)
  const lastPromptRef = useRef<string | null>(null)
  const hasSentPromptRef = useRef<boolean>(false)

  const endRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname()

  const scrollToBottom = () => {
    // Add a small delay to ensure DOM updates are complete
    setTimeout(() => {
      const end = endRef.current
      if (end) {
        end.scrollIntoView({ behavior: "smooth", block: "end" })
      }
    }, 100)
  }

  const [streamingMessage, setStreamingMessage] = useState<string>("")

  let processingBuffer = ""

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const promptToSend = input.trim()
    lastPromptRef.current = promptToSend
    hasSentPromptRef.current = false
    hasAddedPlaceholders.current = false
    setEntityProfileStage(null)
    setListStage(null)
    setStreamingMessage("")

    append({ role: "user", content: promptToSend })
    setInput("")
    scrollToBottom()
    setIsStreaming(true)

    try {
      const response = await fetch(`${backendURL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_prompt: promptToSend,
          user_id: userId,
          session_id: sessionId,
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok.")
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No reader available.")

      const decoder = new TextDecoder()
      let parsed: any

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          if (processingBuffer.trim()) {
            append({ role: "assistant", content: processingBuffer })
          }
          setIsStreaming(false)
          setEntityProfileStage(null)
          setListStage(null)
          if (parsed?.data?.session_id) {
            setSessionId(parsed.data.session_id)
          }
          break
        }

        const rawChunk = decoder.decode(value, { stream: true })
        const events = rawChunk.split("\n\n")

        for (const event of events) {
          if (!event.trim() || !event.startsWith("data:")) continue

          console.log(event.trim())

          const cleaned = event.replace(/^data:/, "").trim()
          parsed = tryParseJSON(cleaned)
          if (!parsed) {
            console.warn("Skipping invalid JSON chunk:", cleaned)
            continue
          }

          const { data, event: eventType } = parsed

          // Handle entity profile stages
          if (eventType === "entity_profile") {
            setEntityProfileStage(data?.meta?.stage || null)
          }

          // Handle text streaming during processing
          if (eventType === "text") {
            if (data?.meta?.stage === "processing") {
              setStreamingMessage(prev => prev + (data?.text || ""))
              processingBuffer += data?.text
            }

            // if (data?.meta?.stage === "final") {
            // if (processingBuffer.trim()) {
            //   append({ role: "assistant", content: processingBuffer });
            // }
            // }
          }

          // Handle company profile messages
          if (eventType === "company_profile") {
            if (data?.meta?.stage !== "final") {
              processingBuffer = ""
              if (data?.text) {
                append({ role: "assistant", content: data.text })
              }
            } else {
              try {
                const jsonString = data.text.trim()
                const profileData = JSON.parse(jsonString)
                append({
                  role: "company-profile",
                  content: "",
                  data: profileData,
                })
              } catch (e) {
                append({ role: "assistant", content: data.text })
                return
              }
            }
          }

          scrollToBottom()
        }
      }
    } catch (error) {
      append({
        role: "assistant",
        content: "An error occurred while processing your request.",
      })

      console.error("Error during streaming:", error)
      setIsStreaming(false)
      setEntityProfileStage(null)
      setListStage(null)
      setStreamingMessage("")
    }
  }

  return (
    <div className={cn("h-screen flex flex-col bg-white")}>
      {messages.length <= 0 && (
        <div className="max-w-3xl mx-auto w-full px-2">
          <Suggestions />
        </div>
      )}
      <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto overflow-hidden">
        {messages.length > 0 && (
          <div className="flex-1 min-h-0 flex flex-col">
            <Messages
              messages={messages}
              isStreaming={isStreaming}
              streamingMessage={streamingMessage}
              entityProfileStage={entityProfileStage}
              listStage={listStage}
              endRef={endRef}
            />
          </div>
        )}
      </div>
      <div className="w-full max-w-3xl mx-auto bg-white z-10">
        <PromptField
          handleSend={handleSend}
          input={input}
          handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          isLoading={isStreaming}
          messages={messages}
        />
      </div>
      {messages.length <= 0 && (
        <div className="max-w-3xl mx-auto py-4 px-2">
          <BottomSuggestions setInput={setInput} />
        </div>
      )}
      {messages.length <= 0 && (
        <div className="max-w-3xl mx-auto pt-4 px-2 pb-4">
          <ActiveProjects />
        </div>
      )}
    </div>
  )
}

export default React.memo(Chat)
