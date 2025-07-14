"use client"
import { cn, tryParseJSON } from "@/lib/utils"
import React, { useEffect, useRef, useState, useCallback } from "react"
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
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const scrollToBottom = useCallback(() => {
    // Throttle scroll calls to prevent excessive DOM updates
    if (scrollTimeoutRef.current) {
      return
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const end = endRef.current
      if (end) {
        end.scrollIntoView({ behavior: "smooth", block: "end" })
      }
      scrollTimeoutRef.current = null
    }, 100)
  }, [])

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
      // Add timeout to the fetch request
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        console.log("⏰ Request timeout after 30 seconds")
        controller.abort()
      }, 30000) // 30 second timeout

      const response = await fetch(`${backendURL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          user_prompt: promptToSend,
          user_id: userId,
          session_id: sessionId,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      console.log("📥 Response received:", response.status, response.statusText)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No reader available.")

      console.log("📖 Starting to read stream...")
      const decoder = new TextDecoder()
      let parsed: any
      let chunkCount = 0

      while (true) {
        const { done, value } = await reader.read()
        chunkCount++

        if (done) {
          // console.log("✅ Stream completed after", chunkCount, "chunks")
          if (processingBuffer.trim()) {
            append({ role: "assistant", content: processingBuffer })
          }
          setIsStreaming(false)
          setActiveStageIndex(null)
          if (parsed?.data?.session_id) {
            setSessionId(parsed.data.session_id)
          }
          //-------- appending profile here because sometimes im not getting meta stage final in response-------------
          if (companyProfileSections && Object.keys(companyProfileSections).length > 0) {
            append({
              role: "company-profile",
              content: "",
              data: companyProfileSections,
            })
          }

          companyProfileSections = {}
          setStreamingMessage("")
          scrollToBottom()
          break
        }

        const rawChunk = decoder.decode(value, { stream: true })
        const events = rawChunk.split("\n\n")

        for (const event of events) {
          if (!event.trim() || !event.startsWith("data:")) continue

          const cleaned = event.replace(/^data:/, "").trim()
          parsed = tryParseJSON(cleaned)
          if (!parsed) {
            console.warn("⚠️ Skipping invalid JSON chunk:", cleaned)
            continue
          }

          const { data, event: eventType } = parsed

          // Handle entity profile stages
          if (eventType === "company_profile" && data?.meta?.stage === "processing") {
            const message = data.text || ""

            const matchedIndex = PROFILESTAGES.findIndex(stage => stage.match.test(message))
            if (matchedIndex !== -1 && matchedIndex > (activeStageIndex ?? -1)) {
              setActiveStageIndex(matchedIndex)
            }
          }

          // Handle text streaming during processing
          if (eventType === "text") {
            if (data?.meta?.stage === "processing") {
              const newText = data?.text || ""
              setStreamingMessage(prev => prev + newText)
              processingBuffer += newText
              // Throttle scroll during text streaming
              if (processingBuffer.length % 50 === 0) {
                scrollToBottom()
              }
            }
          }

          // Handle company profile messages
          if (eventType === "company_profile") {
            const stage = data?.meta?.stage
            const section = data?.section
            const sectionData = data?.data
            const text = data?.text || ""

            // Handle structured section data directly from the new format
            if (section && sectionData) {
              if (section === "company_news_item") {
                if (!companyProfileSections["company_news"]) {
                  companyProfileSections["company_news"] = []
                }
                companyProfileSections["company_news"].push(sectionData)
              } else if (section === "financial_information_year") {
                if (!companyProfileSections["financial_information"]) {
                  companyProfileSections["financial_information"] = []
                }
                companyProfileSections["financial_information"].push(sectionData)
              } else {
                companyProfileSections[section] = sectionData
              }
            }

            // Handle the final complete profile
            if (stage === "final" && section === "complete_profile") {
              console.log("🎯 Final company profile received")
              // append({
              //   role: "company-profile",
              //   content: "",
              //   data: companyProfileSections,
              // })

              // reset buffer and stop streaming
              // companyProfileSections = {}
              // setActiveStageIndex(null)
              // setIsStreaming(false)
              // setStreamingMessage("")
              // scrollToBottom()
            }

            // Fallback: if we have accumulated profile data and get a final stage, consider it complete
            // if (stage === "final") {
            // console.log("🎯 Final company profile received (fallback)")
            // append({
            //   role: "company-profile",
            //   content: "",
            //   data: companyProfileSections,
            // })
            // reset buffer and stop streaming
            // companyProfileSections = {}
            // setActiveStageIndex(null)
            // setIsStreaming(false)
            // setStreamingMessage("")
            // scrollToBottom()
            // }
          }
        }
      }
    } catch (error) {
      console.error("❌ Error during streaming:", error)

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          append({
            role: "assistant",
            content: "Request timed out. Please try again.",
          })
        } else {
          append({
            role: "assistant",
            content: `Error: ${error.message}`,
          })
        }
      } else {
        append({
          role: "assistant",
          content: "An error occurred while processing your request.",
        })
      }

      setIsStreaming(false)
      setActiveStageIndex(null)
      setStreamingMessage("")

      // Cleanup scroll timeout on error
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = null
      }
    }
  }

  // Cleanup scroll timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // console.log(activeStageIndex);

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

export default Chat
