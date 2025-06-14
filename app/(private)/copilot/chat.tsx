"use client"
import TypingDots from "@/components/TypingDots"
import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { ArrowUp, CircleSmall, Loader2, Loader2Icon } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"

import { Markdown } from "@/components/markdown"
import Image from "next/image"
import { useTabPanelStore } from "@/store/tabStore"
import TextareaAutosize from "react-textarea-autosize"
import { useAuth } from "@/hooks/useAuth"
import CompanyProfile from "@/components/CompanyProfile"
import { useSingleTabStore } from "@/store/singleTabStore"
import { ChatProfileCard } from "@/components/ChatProfileCard"

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
  const { setSingleTab } = useSingleTabStore()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [connectionError, setConnectionError] = useState(false)
  const hasAddedPlaceholders = useRef(false)
  const lastPromptRef = useRef<string | null>(null)
  const hasSentPromptRef = useRef<boolean>(false)
  const bottomRef = useRef<undefined>(undefined)

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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const promptToSend = input.trim()
    lastPromptRef.current = promptToSend
    hasSentPromptRef.current = false
    hasAddedPlaceholders.current = false

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
      let investors = []
      let processingBuffer = ""
      let comapanyProfile
      let investorProfile

      while (true) {
        console.log("%cStarted reading stream!", "color: green; font-weight: bold")
        const { done, value } = await reader.read()

        if (done) {
          if (processingBuffer) {
            append({ role: "assistant", content: processingBuffer })
          }
          setIsStreaming(false)
          console.log("%cFinished reading stream!", "color: red; font-weight: bold")

          break
        }
        const rawChunk = decoder.decode(value, { stream: true })
        const events = rawChunk.split("\n\n")
        let buffer = ""
        for (const event of events) {
          if (!event.trim()) continue

          const lines = rawChunk.split("\n")

          console.log(lines, "lines")

          // for (const line of lines) {
          //   if (line.startsWith("data:")) {
          //     buffer += line.replace(/^data:\s*/, "")
          //   }
          //   // An empty line signals the end of the event
          //   if (line.trim() === "") {
          //     if (buffer) {
          //       try {
          //         const parsed = JSON.parse(buffer)
          //         if (parsed?.event === "investor_list" && parsed?.data?.investor_list) {
          //           console.log("Received investor list:", parsed.data.investor_list)
          //         }
          //       } catch (err) {
          //         console.error("Error parsing event data:", err)
          //       }
          //       buffer = ""
          //     }
          //   }
          // }

          if (event.startsWith("data:")) {
            const cleaned = event.replace(/^data:\s*/, "").trim()

            try {
              // Only log cleaned data events for debugging
              const parsed = JSON.parse(cleaned)
              accumulatedJSONChunks.push(parsed)

              // console.log(parsed)

              // Extract companies array safely

              if (parsed?.event === "company_list" && parsed?.data?.meta?.stage !== "final") {
                const dummyCompanies = Array.from({ length: 5 }, (_, index) => ({
                  company_id: Math.floor(Math.random() * 1000) + 1,
                  company_name: "Generating...",
                  company_logo: `https://example.com/logo${index + 1}.png`,
                  company_description: `Generating...`,
                  company_country: "Generating...",
                  similarity_score: "Generating...",
                }))
                append({ role: "assistant", content: parsed?.data?.text })
                setSingleTab("comp", "companies", dummyCompanies, "initial")
              }
              if (parsed?.event === "company_list" && parsed?.data?.meta?.stage === "final") {
                const companiesArray = parsed?.data?.company_list || []
                // Store it in state
                append({ role: "assistant", content: parsed?.data?.text })
                setSingleTab("comp", "companies", companiesArray, "final")
                // console.log("Company List Saved!", companiesArray)
              }

              if (parsed?.event === "investor_list" && parsed?.data?.meta?.stage !== "final") {
                const dummyInvestors = Array.from({ length: 5 }, (_, index) => ({
                  investor_id: Math.floor(Math.random() * 1000) + 1,
                  investor_name: "Generating...",
                  investor_logo: `https://example.com/logo${index + 1}.png`,
                  investor_description: `Generating...`,
                  investor_country: "Generating...",
                  similarity_score: "Generating...",
                }))
                append({ role: "assistant", content: parsed?.data?.text })
                setSingleTab("inv", "investors", dummyInvestors, "initial")
              }
              if (parsed?.event === "investor_list" && parsed?.data?.meta?.stage === "final") {
                const investorsArray = parsed?.data?.investor_list || []
                // Store it in state
                append({ role: "assistant", content: parsed?.data?.text })
                setSingleTab("inv", "investors", investorsArray, "final")
                // console.log("Investor List Saved!", investorsArray)
              }

              if (parsed?.event === "done") {
                if (comapanyProfile) {
                  console.log(CompanyProfile, "company")

                  append({
                    role: "data",
                    content: JSON.stringify({ type: "company_profile", comapanyProfile }),
                  })
                  scrollToBottom()
                }
                if (investorProfile) {
                  // console.log(CompanyProfile, "company")

                  append({
                    role: "data",
                    content: JSON.stringify({ type: "investor_profile", investorProfile }),
                  })
                  scrollToBottom()
                  // console.log(investorProfile, "investor")
                }
              }
              if (parsed?.event === "investor_list" && parsed?.data?.meta?.stage === "final") {
                const investorList = parsed?.data?.investor_list || []
                if (!investorList.length) {
                  append({
                    role: "assistant",
                    content: parsed?.data?.text,
                  })
                }
              }
              if (parsed?.event === "company_list" && parsed?.data?.meta?.stage === "final") {
                const companyList = parsed?.data?.company_list || []
                if (!companyList.length) {
                  append({
                    role: "assistant",
                    content: parsed?.data?.text,
                  })
                }
              }

              if (parsed?.event === "text" && parsed?.data?.meta?.stage === "processing") {
                processingBuffer += parsed?.data?.text
              } else if (
                parsed?.event === "entity_profile" &&
                parsed?.data?.meta?.stage === "final"
              ) {
                // First, if we have processingBuffer filled, we append it first
                if (processingBuffer) {
                  append({ role: "assistant", content: processingBuffer })
                  processingBuffer = ""
                }
                const profileData = parsed?.data
                if (profileData?.type === "company_profile") {
                  comapanyProfile = {
                    company_id: profileData.company_id || 0,
                    company_name: profileData.company_name || "Unknown Company",
                    company_description: profileData.company_description || "-",
                    company_logo: profileData.company_logo || null,
                    company_location:
                      profileData.company_city && profileData.company_country
                        ? `${profileData.company_city}, ${profileData.company_country}`
                        : "Location unknown",
                  }
                  // console.log(comapanyProfile, "company")
                }
                if (profileData?.type === "investor_profile") {
                  investorProfile = {
                    investor_id: profileData.investor_id || 0,
                    investor_name: profileData.investor_name || "Unknown Investor",
                    investor_description: profileData.investor_description || "-",
                    investor_logo: profileData.investor_logo || null,
                    investor_location:
                      profileData.investor_city && profileData.investor_country
                        ? `${profileData.investor_city}, ${profileData.investor_country}`
                        : "Location unknown",
                  }
                }

                // If there is additional text, we can append it afterwards
                if (parsed?.data?.text) {
                  append({ role: "assistant", content: parsed?.data?.text })
                }
              }
            } catch (err) {
              console.error("Error parsing cleaned chunk:", err, cleaned)
            }
          }
        }
      }
      console.log("Full JSON chunks received:", accumulatedJSONChunks)
    } catch (error) {
      append({ role: "assistant", content: "An error occurred while processing your request." })
      setSingleTab("comp", "companies", [], "final")
      setSingleTab("inv", "investors", [], "initial")
      console.error("Error during streaming:", error)
      setIsStreaming(false)
    }
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
        <div className={cn("overflow-y-auto px-4 pt-4 m space-y-4 noscroll")}>
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
                    "ml-auto text-gray-700 border border-gray-200 rounded-full bg-white shadow-sm [font_weight:400]":
                      isUser,
                    "text-gray-800 mr-auto border-none rounded-md": isAssistant,
                  })}
                >
                  {m.role === "data" && <ChatProfileCard data={JSON.parse(m.content)} />}
                  <Markdown>{m.role !== "data" && m.content}</Markdown>
                </div>
              </div>
            )
          })}

          {isStreaming && (
            <div className="flex justify-start">
              <div className="rounded-2xl text-sm text-gray-600 max-w-[75%]">
                <TypingDots />
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

function formatCompanyAsMarkdown(c: Company): string {
  return `**${c.company_name}**
${c.company_description}
*Similarity Score:* ${c.similarity_score.toFixed(2)}`
}
type SuggestionCategories = {
  [key: string]: string[]
}

const suggestions: SuggestionCategories = {
  companies: [
    "Show me AI companies in Germany",
    "List biotech startups in the US",
    "Companies working on climate change",
    "Indian healthtech companies",
    "Fintech companies with recent funding",
    "German deep tech startups",
  ],

  investors: [
    "Investors focused on AI startups",
    "VCs investing in Southeast Asia",
    "List climate tech investors in Europe",
    "Healthtech investors in the US",
    "Show fintech-focused investors",
    "Investors backing diverse founders",
  ],

  deals: [
    "Show recent Series A deals",
    "Find latest healthtech acquisitions",
    "List climate tech funding rounds",
    "Show fintech investments in 2024",
    "Find AI startup deals in Europe",
    "List recent deep tech investments",
  ],
}

const PromptField = ({
  handleSend,
  input,
  handleInputChange,
  isLoading,
  messages,
}: {
  handleSend: any
  input: string
  handleInputChange: any
  isLoading: any
  messages: any
}) => {
  const textareaRef = useRef<any>(null)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [type, setType] = useState<string>("companies")

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [input])

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])
  const internalHandleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setShowSuggestions(false) // Hide suggestions after real submit
    handleSend(e)
  }
  return (
    <div
      className={cn("h-[300px] w-full px-2 ", {
        "h-[200px]": messages.length > 0,
      })}
      style={{ transition: "all 0.3s" }}
    >
      {!messages.length && (
        <div className="flex justify-center items-center mb-3 flex-col gap-y-3">
          <h1 className="font-heading text-pretty text-center text-sm font-medium tracking-tighter text-gray-900 sm:text-xl">
            Ask me about :
          </h1>
          <div className="flex space-x-6">
            {[
              { label: "Companies", img: "/images/office-co.png" },
              { label: "Investors", img: "/images/investor-co.png" },
              { label: "Deals", img: "/images/handshake-co.png" },
            ].map((item, index) => (
              <span
                key={index}
                onClick={() => setType(item.label.toLowerCase())}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium cursor-pointer flex flex-col items-center"
                )}
              >
                <Image
                  src={item.img}
                  alt={`${item.label} Icon`}
                  width={80}
                  height={80}
                  className="inline-block mr-1"
                />
                <span
                  className={cn("text-gray-400 mt-4 transition p-1 px-1.5 rounded-xl", {
                    " text-foreground bg-foreground/5  ": type === item.label.toLowerCase(),
                  })}
                >
                  {item.label}
                </span>{" "}
              </span>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={internalHandleSend}
        className="focus-within:border-gray-300 bg-white border-gray-300 relative rounded-xl border shadow-[0_2px_2px_rgba(0,0,0,0.08),0_8px_8px_-8px_rgba(0,0,0,0.08),0_0_8px_rgba(128,128,128,0.2)] transition-shadow"
      >
        <div className="@container/textarea bg-white relative z-10 grid min-h-[100px] rounded-xl overflow-hidden">
          <TextareaAutosize
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            autoFocus
            minRows={1}
            maxRows={2}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                internalHandleSend(e)
              }
            }}
            placeholder="Enter your prompt here..."
            data-enhancing="false"
            id="chat-main-textarea"
            name="content"
            className={cn(
              "resize-none max-h-[100px] overflow-auto w-full flex-1 p-3 pb-1.5 text-sm outline-none ring-0 placeholder:text-gray-500"
              // { "max-h-[150px]": messages.length > 0 }
            )}
          />
          <div className="flex items-center gap-2 pb-3 px-3">
            <div className="ml-auto flex items-center gap-1">
              <button
                className=" inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap text-nowrap border-none font-medium outline-none transition-all disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400  [&>svg]:pointer-events-none [&>svg]:size-4 [&_svg]:shrink-0  text-background bg-foreground hover:bg-gray-700 px-3 text-sm has-[>kbd]:gap-2 has-[>svg]:px-2 has-[>kbd]:pr-[6px] ml-1 size-7 rounded-md"
                type="submit"
                disabled={isLoading || !input.trim().length}
                onClick={internalHandleSend}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-5 h-5 text-black" />
                ) : (
                  <ArrowUp size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {!messages.length && showSuggestions && (
        <div className="mt-3 flex flex-wrap gap-2 mx-4">
          {suggestions[type as keyof typeof suggestions].map((suggestion: string) => (
            <button
              key={suggestion}
              onClick={() => handleInputChange({ target: { value: suggestion } })}
              className="text-[13px] text-foreground/80 hover:text-foreground bg-white hover:bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200 hover:border-gray-300 transition cursor-pointer"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default React.memo(Chat)
