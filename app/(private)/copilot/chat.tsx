"use client"
import TypingDots from "@/components/TypingDots"
import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { ArrowUp, CircleSmall, Loader2, Loader2Icon } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { Markdown } from "@/components/markdown"
import { useAuth } from "@/hooks/useAuth"
import { useSingleTabStore } from "@/store/singleTabStore"
import { ChatProfileCard } from "@/components/ChatProfileCard"
import { usePathname } from "next/navigation"
import { PromptField } from "@/components/chat/PromptField"

type Company = {
  company_name: string
  company_description: string
  similarity_score: number
}

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL! || ""

const Chat = () => {
  const { user, loading } = useAuth()

  const userId = "aa227293-c91c-4b03-91db-0d2048ee73e7"

  const { messages, input, handleInputChange, append, setInput } = useChat()
  const { setSingleTab, clearSingleTab, singleTab } = useSingleTabStore()
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

  useEffect(() => {
    if (!!singleTab.id) {
      clearSingleTab()
    }
  }, [pathname])

  let processingBuffer = ""
  const [streamingMessage, setStreamingMessage] = useState<string>("")
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

    // Append user message first
    append({ role: "user", content: promptToSend })

    // Clear input and scroll after message is appended
    setInput("")
    scrollToBottom()
    setIsStreaming(true)

    try {
      const response = await fetch(`${backendURL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_prompt: promptToSend, user_id: userId, session_id: sessionId }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok.")
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("No reader available.")
      }

      const decoder = new TextDecoder()
      let accumulatedJSONChunks = []
      let investors = [] as any[]
      let companies = [] as any[]
      let comapanyProfile
      let investorProfile
      let parsed

      while (true) {
        console.log("%cStarted reading stream!", "color: green; font-weight: bold")
        const { done, value } = await reader.read()

        if (done) {
          if (streamingMessage) {
            append({ role: "assistant", content: streamingMessage })
          }
          if (companies.length > 0) {
            append({
              role: "data",
              content: JSON.stringify({
                type: "company_list",
                companies,
              }),
            })
          }
          if (investors.length > 0) {
            append({
              role: "data",
              content: JSON.stringify({
                type: "investor_list",
                investors,
              }),
            })
          }
          setIsStreaming(false)
          setEntityProfileStage(null)
          setListStage(null)
          setSessionId(parsed.data.session_id)
          console.log("%cFinished reading stream!", "color: red; font-weight: bold")
          break
        }

        const rawChunk = decoder.decode(value, { stream: true })
        const events = rawChunk.split("\n\n")

        for (const event of events) {
          if (!event.trim()) continue

          if (event.startsWith("data:")) {
            const cleaned = event.replace(/^data:/, "").trim()
            try {
              parsed = JSON.parse(cleaned)
            } catch (error) {
              append({
                role: "assistant",
                content: "An error occurred while processing your request.",
              })
              clearSingleTab()
              console.error("Error during streaming:", error)
              setIsStreaming(false)
              setEntityProfileStage(null)
              setListStage(null)
              setStreamingMessage("")
              return
            }

            try {
              const { data, event: eventType } = parsed
              console.log(parsed, "parsed")
              // Handle entity profile stages
              if (eventType === "entity_profile") {
                setEntityProfileStage(data?.meta?.stage || null)
              }

              // Handle list stages (investor_list and company_list)
              if (eventType === "investor_list" || eventType === "company_list") {
                setListStage(data?.meta?.stage || null)
              }

              // ---------------Parsing company list------------------------------
              if (eventType === "company_list") {
                if (data?.meta?.stage !== "final") {
                  const dummyCompanies = Array.from({ length: 5 }, (_, index) => ({
                    company_id: Math.floor(Math.random() * 1000) + 1,
                    company_name: "Generating...",
                    company_logo: "https://placehold.co/50x50.png",
                    company_description: `Generating...`,
                    company_country: "Generating...",
                    similarity_score: "Generating...",
                  }))
                  setSingleTab("comp", "companies", dummyCompanies, "initial")
                }
                if (data?.meta?.stage === "final") {
                  const companiesArray = data?.company_list || []
                  companies = companiesArray
                  if (data?.text) {
                    append({ role: "assistant", content: data?.text })
                  }
                  setSingleTab("comp_" + new Date().getTime(), "companies", companiesArray, "final")
                }
              }

              //----------------------Parsing investor list------------------------------
              if (eventType === "investor_list") {
                if (data?.meta?.stage !== "final") {
                  const dummyInvestors = Array.from({ length: 5 }, (_, index) => ({
                    investor_id: Math.floor(Math.random() * 1000) + 1,
                    investor_name: "Generating...",
                    investor_logo: "https://placehold.co/50x50.png",
                    investor_description: "Generating...",
                    investor_website: "Generating...",
                    investor_type: "Generating...",
                    investor_country: "Generating...",
                    investor_city: "Generating...",
                    investor_founded_year: null,
                    investor_strategy: "Generating...",
                    investor_selected_investments: [],
                  }))
                  setSingleTab("inv", "investors", dummyInvestors, "initial")
                }

                if (data?.meta?.stage === "final") {
                  const investorsArray = data?.investor_list || []
                  investors = investorsArray
                  if (data?.text) {
                    append({ role: "assistant", content: data?.text })
                  }
                  setSingleTab("inv_" + new Date().getTime(), "investors", investorsArray, "final")
                }
              }

              if (eventType === "done") {
                if (comapanyProfile) {
                  append({
                    role: "data",
                    content: JSON.stringify({
                      type: "company_profile",
                      comapanyProfile,
                      isLoading: false,
                    }),
                  })
                  scrollToBottom()
                }
                if (investorProfile) {
                  append({
                    role: "data",
                    content: JSON.stringify({
                      type: "investor_profile",
                      investorProfile,
                      isLoading: false,
                    }),
                  })
                  scrollToBottom()
                }
              }

              // Handle text streaming during processing
              if (eventType === "text" && data?.meta?.stage === "processing") {
                setStreamingMessage(prev => prev + (data?.text || ""))
                processingBuffer += data?.text
              }

              //append streaming message
              if (eventType === "text" && data?.meta?.stage === "final") {
                if (!isStreaming) {
                  append({ role: "assistant", content: processingBuffer })
                }
                setIsStreaming(false)
                setEntityProfileStage(null)
                setListStage(null)
                setStreamingMessage("")
              }

              // Handle entity profile data when complete
              else if (eventType === "entity_profile" && data?.meta?.stage === "final") {
                if (processingBuffer) {
                  processingBuffer = ""
                }

                const profileData = parsed?.data

                if (profileData?.type === "company_profile") {
                  comapanyProfile = {
                    company_id: profileData.company_id || 0,
                    company_name: profileData.company_name || "Unknown Company",
                    company_description: profileData.company_description || "-",
                    company_logo: profileData.company_logo || "https://placehold.co/50x50.png",
                    company_location: formatLocation(
                      profileData.company_city,
                      profileData.company_country
                    ),
                  }
                }

                if (profileData?.type === "investor_profile") {
                  investorProfile = {
                    investor_id: profileData.investor_id || 0,
                    investor_name: profileData.investor_name || "Unknown Investor",
                    investor_description: profileData.investor_description || "-",
                    investor_logo: profileData.investor_logo || "https://placehold.co/50x50.png",
                    investor_location: formatLocation(
                      profileData.investor_city,
                      profileData.investor_country
                    ),
                  }
                }

                if (data?.text) {
                  append({ role: "assistant", content: data?.text })
                }
              }
              scrollToBottom()
            } catch (parseError) {
              console.error("Error parsing JSON:", parseError)
            }
          }
        }
      }
    } catch (error) {
      append({ role: "assistant", content: "An error occurred while processing your request." })
      setSingleTab(null, "companies", [], "final")
      setSingleTab(null, "investors", [], "initial")
      console.error("Error during streaming:", error)
      setIsStreaming(false)
      setEntityProfileStage(null)
      setListStage(null)
      setStreamingMessage("")
    }
  }

  // Helper function to format location string
  function formatLocation(city?: string, country?: string) {
    return city && country ? `${city}, ${country}` : "Location unknown"
  }

  return (
    <div className={cn(`bg-white h-full transition-all ease-in-out`)}>
      <div
        className={cn(
          `max-w-3xl mx-auto h-full grid grid-rows-[20px_1fr] relative overflow-hidden transition-transform ease-in-out duration-300`,
          {
            "grid-rows-[1fr_100px]": messages.length,
          }
        )}
      >
        <div className={cn("overflow-y-auto px-4 pt-4 m space-y-2 noscroll")}>
          {messages.map((m, i) => {
            const isUser = m.role === "user"
            const isAssistant = m.role === "assistant"

            return (
              <div
                key={i}
                className={cn("flex", {
                  "justify-end": isUser,
                  "justify-start": isAssistant,
                })}
              >
                <div
                  className={cn("max-w-full text-sm leading-relaxed px-3 py-1 rounded-md", {
                    "ml-auto bg-blue-50 border border-blue-700/20 font-medium text-blue-600 px-4 py-1 rounded-2xl rounded-tr-md max-w-xs  ":
                      isUser,
                    "text-gray-800 mr-auto border-none rounded-md font-medium": isAssistant,
                  })}
                >
                  {m.role === "data" && <ChatProfileCard data={JSON.parse(m.content)} />}
                  <Markdown>{m.role !== "data" && m.content}</Markdown>
                </div>
              </div>
            )
          })}

          {isStreaming && streamingMessage && (
            <div className="flex justify-start">
              <div className="max-w-full text-sm leading-relaxed px-3 py-1 text-gray-800 mr-auto border-none rounded-md font-medium">
                <Markdown>{streamingMessage}</Markdown>
              </div>
            </div>
          )}

          {isStreaming && (
            <div className="flex justify-start">
              <div className="rounded-2xl text-sm text-gray-600 max-w-[75%]">
                {entityProfileStage ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4 [animation-duration:0.2s]" />
                    <span>
                      {entityProfileStage === "init" && "Processing your request..."}
                      {entityProfileStage === "processing" && "Retrieving profile..."}
                      {entityProfileStage === "final" && "Found profile!"}
                    </span>
                  </div>
                ) : listStage ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4 [animation-duration:0.2s]" />
                    <span>
                      {listStage === "init" && "Processing your request..."}
                      {listStage === "processing" && "Generating list..."}
                      {listStage === "final" && "List generated!"}
                    </span>
                  </div>
                ) : (
                  <TypingDots />
                )}
              </div>
            </div>
          )}

          <div className={cn("h-5 opacity-0", { "h-20": messages.length > 1 })} ref={endRef} />
        </div>
        <div
          className={cn("flex justify-center items-center")}
          style={{
            // height: messages.length > 0 ? 100 : 0,
            transition: "all 0.3s",
          }}
        >
          <PromptField
            handleSend={handleSend}
            input={input}
            handleInputChange={handleInputChange}
            isLoading={isStreaming}
            messages={messages}
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Chat)
