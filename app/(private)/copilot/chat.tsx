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
  const { setSingleTab, clearSingleTab } = useSingleTabStore()
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [connectionError, setConnectionError] = useState(false)
  const [entityProfileStage, setEntityProfileStage] = useState<
    "init" | "processing" | "final" | null
  >(null)
  const [listStage, setListStage] = useState<"init" | "processing" | "final" | null>(null)
  const hasAddedPlaceholders = useRef(false)
  const lastPromptRef = useRef<string | null>(null)
  const hasSentPromptRef = useRef<boolean>(false)
  const bottomRef = useRef<undefined>(undefined)
  const [stage, setStage] = useState<boolean>(false)

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
    lastPromptRef.current = promptToSend
    hasSentPromptRef.current = false
    hasAddedPlaceholders.current = false
    setEntityProfileStage(null)
    setListStage(null)

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
      let comapanyProfile
      let investorProfile
      let parsed

      while (true) {
        console.log("%cStarted reading stream!", "color: green; font-weight: bold")
        const { done, value } = await reader.read()

        if (done) {
          if (processingBuffer) {
            append({ role: "assistant", content: processingBuffer })
          }
          setIsStreaming(false)
          setEntityProfileStage(null)
          setListStage(null)
          console.log("%cFinished reading stream!", "color: red; font-weight: bold")

          break
        }
        const rawChunk = decoder.decode(value, { stream: true })
        const events = rawChunk.split("\n\n")
        // let buffer = ""
        for (const event of events) {
          if (!event.trim()) continue

          if (event.startsWith("data:")) {
            const cleaned = event.replace(/^data:\s*/, "").trim()

            try {
              // Only log cleaned data events for debugging
              try {
                let cleanedData = cleaned

                // First, handle any potential line breaks or special characters
                cleanedData = cleanedData.replace(/[\n\r]/g, "")

                // Handle escaped unicode characters
                if (cleanedData.includes("\\u")) {
                  cleanedData = cleanedData.replace(/\\u([0-9a-fA-F]{4})/g, (match, p1) => {
                    return String.fromCharCode(parseInt(p1, 16))
                  })
                }

                // Handle other escaped characters
                cleanedData = cleanedData.replace(/\\([^u])/g, "$1")

                // Handle square brackets in company names by escaping them
                cleanedData = cleanedData.replace(/"company_name":\s*"([^"]*)\[([^"]*)\[([^"]*)"/g, 
                  '"company_name": "$1\\[$2\\[$3"')

                // Handle special characters in investor descriptions and criteria
                cleanedData = cleanedData.replace(/"investor_description":\s*"([^"]*)"/g, (match, p1) => {
                  return `"investor_description": "${p1.replace(/"/g, '\\"').replace(/\u20ac/g, '€').replace(/\n/g, ' ')}"`
                })
                cleanedData = cleanedData.replace(/"investor_investment_criteria":\s*"([^"]*)"/g, (match, p1) => {
                  return `"investor_investment_criteria": "${p1.replace(/"/g, '\\"').replace(/\u20ac/g, '€').replace(/\n/g, ' ')}"`
                })

                // Handle special characters in company descriptions
                cleanedData = cleanedData.replace(/"company_description":\s*"([^"]*)"/g, (match, p1) => {
                  return `"company_description": "${p1.replace(/"/g, '\\"').replace(/\u20ac/g, '€').replace(/\n/g, ' ')}"`
                })

                // Handle special characters in investor strategy and sector focus
                cleanedData = cleanedData.replace(/"investor_strategy":\s*"([^"]*)"/g, (match, p1) => {
                  return `"investor_strategy": "${p1.replace(/"/g, '\\"').replace(/\u20ac/g, '€').replace(/\n/g, ' ')}"`
                })
                cleanedData = cleanedData.replace(/"investor_sector_focus":\s*"([^"]*)"/g, (match, p1) => {
                  return `"investor_sector_focus": "${p1.replace(/"/g, '\\"').replace(/\u20ac/g, '€').replace(/\n/g, ' ')}"`
                })

                // Handle empty arrays and null values
                cleanedData = cleanedData.replace(/"investor_list":\s*\[\s*\]/g, '"investor_list": []')
                cleanedData = cleanedData.replace(/"company_list":\s*\[\s*\]/g, '"company_list": []')
                cleanedData = cleanedData.replace(/"selected_investments":\s*\[\s*\]/g, '"selected_investments": []')

                // Handle null values in numeric fields
                cleanedData = cleanedData.replace(/"investment_year":\s*null/g, '"investment_year": null')
                cleanedData = cleanedData.replace(/"investor_founded_year":\s*null/g, '"investor_founded_year": null')

                // Remove any trailing commas in arrays and objects
                cleanedData = cleanedData.replace(/,(\s*[}\]])/g, '$1')

                // Ensure the JSON string is properly terminated
                if (!cleanedData.trim().endsWith("}")) {
                  cleanedData = cleanedData.trim() + "}"
                }

                // Additional validation before parsing
                if (!cleanedData.startsWith("{") || !cleanedData.endsWith("}")) {
                  console.error("Invalid JSON structure:", cleanedData)
                  continue
                }

                try {
                  parsed = JSON.parse(cleanedData)
                  accumulatedJSONChunks.push(parsed)
                } catch (parseError) {
                  console.error("JSON Parse Error:", parseError)
                  console.error("Problematic JSON string:", cleanedData)
                  // Try to fix common JSON issues
                  try {
                    // Remove any invalid control characters
                    cleanedData = cleanedData.replace(/[\x00-\x1F\x7F-\x9F]/g, '')
                    parsed = JSON.parse(cleanedData)
                    accumulatedJSONChunks.push(parsed)
                  } catch (retryError) {
                    console.error("Failed to parse even after cleanup:", retryError)
                    continue
                  }
                }
              } catch (error) {
                console.error("Error parsing JSON chunk:", error)
                console.log("Problematic JSON string:", cleaned)
                // Continue processing without this chunk
                continue
              }

              const { data, event } = parsed

              // Handle entity profile stages
              if (event === "entity_profile") {
                setEntityProfileStage(data?.meta?.stage || null)
              }

              // Handle list stages (investor_list and company_list)
              if (event === "investor_list" || event === "company_list") {
                setListStage(data?.meta?.stage || null)
              }

              //-------------------Staging Responses----------------------
              if (data?.meta?.stage !== "final" && event !== "text") {
                if (
                  event === "entity_profile" ||
                  event === "investor_list" ||
                  event === "company_list"
                ) {
                  // Don't append text for these events
                }
              }

              // ---------------Parsing company list------------------------------
              if (event === "company_list") {
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
                  if (data?.text) {
                    append({ role: "assistant", content: data?.text })
                  }
                  setSingleTab("comp_" + new Date().getTime(), "companies", companiesArray, "final")
                }
              }
              //----------------------Parsing investor list------------------------------
              if (event === "investor_list") {
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
                  if (data?.text) {
                    append({ role: "assistant", content: data?.text })
                  }
                  setSingleTab("inv_"+ new Date().getTime(), "investors", investorsArray, "final")
                }
              }

              if (event === "done") {
                setStage(false)
                //------------- setting company profile in chat-----------------------------
                if (comapanyProfile) {
                  // console.log(comapanyProfile, "company")
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
                //------------- setting investor profile in chat-----------------------------
                if (investorProfile) {
                  // console.log(investorProfile, "investor")
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
              if (event === "text" && data?.meta?.stage === "processing") {
                processingBuffer += data?.text
              }
              // Handle entity profile data when complete
              else if (event === "entity_profile" && data?.meta?.stage === "final") {
                // Clear any existing processing buffer
                if (processingBuffer) {
                  processingBuffer = ""
                }

                const profileData = parsed?.data

                // Handle company profile data
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

                // Handle investor profile data
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

                // Append any additional text content
                if (data?.text) {
                  append({ role: "assistant", content: data?.text })
                }
              }
              scrollToBottom()
              // Helper function to format location string
              function formatLocation(city?: string, country?: string) {
                return city && country ? `${city}, ${country}` : "Location unknown"
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
      setSingleTab(null, "companies", [], "final")
      setSingleTab(null, "investors", [], "initial")
      console.error("Error during streaming:", error)
      setIsStreaming(false)
      setEntityProfileStage(null)
      setListStage(null)
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
                    "ml-auto text-gray-700 border px-4 py-1 rounded-2xl rounded-tr-md max-w-xs bg-gray-50 [font_weight:500]":
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
                  <Loader2 className="animate-spin w-5 h-5 text-black [animation-duration:0.3s]" />
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
