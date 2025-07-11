"use client"
import { cn, tryParseJSON } from "@/lib/utils"
import React, { useEffect, useRef, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { PromptField } from "@/components/chat/PromptField"
import { BottomSuggestions, Suggestions } from "./Suggestions"
import { ActiveProjects } from "./ActiveProjects"
import { Messages } from "./Messages"
import { useChatStore } from "@/store/chatStore"
import { PROFILESTAGES } from "@/lib/chat-helpers"

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
  const [streamingMessage, setStreamingMessage] = useState<string>("")
  const [activeStageIndex, setActiveStageIndex] = useState<number | null>(null)

  const endRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    // Add a small delay to ensure DOM updates are complete
    setTimeout(() => {
      const end = endRef.current
      if (end) {
        end.scrollIntoView({ behavior: "smooth", block: "end" })
      }
    }, 100)
  }

  let processingBuffer = ""

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const promptToSend = input.trim()
    setStreamingMessage("")

    append({ role: "user", content: promptToSend })
    setInput("")
    scrollToBottom()
    setIsStreaming(true)
    let companyProfileSections: Record<string, any> = {}

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
          setActiveStageIndex(null)
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
          if (eventType === "company_profile" && data?.meta?.stage === "processing") {
            const message = data.text || ""

            const matchedIndex = PROFILESTAGES.findIndex((stage) =>
              stage.match.test(message)
            )
            if (matchedIndex !== -1 && matchedIndex > (activeStageIndex ?? -1)) {
              setActiveStageIndex(matchedIndex) // <-- Set the active stage index
            }
          }

          // Handle text streaming during processing
          if (eventType === "text") {
            if (data?.meta?.stage === "processing") {
              setStreamingMessage((prev) => prev + (data?.text || ""))
              processingBuffer += data?.text
            }
          }

          // Handle company profile messages
          if (eventType === "company_profile") {
            const stage = data?.meta?.stage
            const rawText = data?.text?.trim()

            let parsedSection
            try {
              parsedSection = tryParseJSON(rawText)
            } catch {
              parsedSection = null
            }

            // If valid structured section, handle company_news_item specially
            if (parsedSection && parsedSection.section && parsedSection.data) {
              if (parsedSection.section === "company_news_item") {
                if (!companyProfileSections["company_news"]) {
                  companyProfileSections["company_news"] = []
                }
                companyProfileSections["company_news"].push(parsedSection.data)
              } else if (parsedSection.section.startsWith("financial_information_")) {
                // Handle financial information sections
                if (parsedSection.section === "financial_information_metadata") {
                  companyProfileSections["financial_metadata"] = parsedSection.data
                } else if (parsedSection.section === "financial_information_year") {
                  if (!companyProfileSections["financial_years"]) {
                    companyProfileSections["financial_years"] = []
                  }
                  companyProfileSections["financial_years"].push(parsedSection.data)
                }
              } else {
                companyProfileSections[parsedSection.section] = parsedSection.data
              }
            }

            // If this is the final message, append the full profile
            if (stage === "final") {
              append({
                role: "company-profile",
                content: "",
                data: companyProfileSections,
              })

              // reset buffer
              companyProfileSections = {}
              setActiveStageIndex(null)
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
      setActiveStageIndex(null)
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
              activeStageIndex={activeStageIndex}
              endRef={endRef}
            />
          </div>
        )}
      </div>
      <div className="w-full max-w-3xl mx-auto bg-white z-10">
        <PromptField
          handleSend={handleSend}
          input={input}
          handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
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

export default Chat
