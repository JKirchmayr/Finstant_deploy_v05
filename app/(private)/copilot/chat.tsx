"use client"
import TypingDots from "@/components/TypingDots"
import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { ArrowUp, CircleSmall, Loader2, Loader2Icon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import { useWSStore, WSCompany } from "@/store/wsStore"
import { WSMessage } from "@/types/wsMessages"
import ListBuilder from "@/components/ListBuilder"
import RenderData from "@/components/chat/RenderData"
import axios from "axios"
import { Markdown } from "@/components/markdown"
import GradientBorderBox from "@/components/ui/gradient-border"
import Image from "next/image"
import { useTabPanelStore } from "@/store/tabStore"
import CompaniesData from "./companies-table"
import TextareaAutosize from "react-textarea-autosize"
import InvestorsResponseData from "./investors-table"

type Company = {
  company_name: string
  company_description: string
  similarity_score: number
}

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL! || ""

const Chat = () => {
  const {
    setResponse,
    addCompany,
    setCompanies,
    companies,
    resetStore,
    clearPlaceholders,
  } = useWSStore()

  const userId = "aa227293-c91c-4b03-91db-0d2048ee73e7"
  const socketUrl = `wss://ai-agents-backend-zwa0.onrender.com/chat`

  const { messages, input, handleInputChange, append, setInput } = useChat()
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectAttempts = useRef(0)
  const MAX_RETRIES = 5

  const [isStreaming, setIsStreaming] = useState(false)
  const [connectionError, setConnectionError] = useState(false)
  const hasAddedPlaceholders = useRef(false)
  const lastPromptRef = useRef<string | null>(null)
  const hasSentPromptRef = useRef<boolean>(false)
  const bottomRef = useRef<undefined>(undefined)
  const { addTab } = useTabPanelStore()

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
    append({
      role: "user",
      content: promptToSend,
    })

    // Clear input and scroll after message is appended
    setInput("")
    scrollToBottom()
    setIsStreaming(true)
    // addTab(
    //   `companies-tab${new Date().getTime()}`,
    //   "Companies",
    //   <CompaniesData companies={c} />
    // )

    try {
      const response = await fetch(`${backendURL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: promptToSend,
          user_id: userId,
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("No reader available")
      }

      const decoder = new TextDecoder()
      let accumulatedJSONChunks: any[] = []

      while (true) {
        console.log(
          "%cStarted reading stream!",
          "color: green; font-weight: bold"
        )
        const { done, value } = await reader.read()

        if (done) {
          setIsStreaming(false)
          console.log(
            "%cFinished reading stream!",
            "color: red; font-weight: bold"
          )
          break
        }

        const rawChunk = decoder.decode(value, { stream: true })
        const events = rawChunk.split("\n\n")
        let companiesData = []
        let investorsData = []

        for (const event of events) {
          if (!event.trim()) continue

          if (event.startsWith("data:")) {
            const cleaned = event.replace(/^data:\s*/, "").trim()

            try {
              const parsed = JSON.parse(cleaned)
              accumulatedJSONChunks.push(parsed)

              if (parsed?.type === "response") {
                const responseText = parsed?.data?.text
                if (responseText) {
                  append({
                    role: "assistant",
                    content: responseText,
                  })
                  // Scroll after appending assistant message
                  scrollToBottom()
                }
                const placeholders: WSCompany[] = Array.from({
                  length: 10,
                }).map((_, i) => ({
                  company_id: `placeholder-${i}`,
                  company_name: "Generating company...",
                  company_description: "Analyzing semantic vectors...",
                  similarity_score: "generating...",
                }))
                setCompanies(placeholders)
              }

              if (parsed?.type === "company") {
                const companyData = parsed?.data
                if (companyData) {
                  const company = {
                    company_id: companyData.company_id,
                    company_name: companyData.company_name,
                    company_description: companyData.company_description,
                    similarity_score: companyData.similarity_score,
                  }
                  companiesData.push(company)
                  // Scroll after adding company
                  scrollToBottom()
                }
              }
              if (parsed?.type === "investor") {
                const investorData = parsed?.data
                if (investorData) {
                  const investor = {
                    investor_id:
                      investorData.investor_id || investorData.investor_name,
                    investor_name: investorData.investor_name || "-",
                    investor_description:
                      investorData.investor_description || "-",
                    similarity_score: investorData.similarity_score || "-",
                  }
                  investorsData.push(investor)

                  scrollToBottom()
                }
              }

              if (parsed?.type === "done") {
                if (companiesData && companiesData.length > 0) {
                  addTab(
                    `companies-tab${new Date().getTime()}`,
                    "Companies",
                    <CompaniesData companies={companiesData} />
                  )
                }
                console.log("companiesData", companiesData)

                if (investorsData && investorsData.length > 0) {
                  addTab(
                    `investors-tab-${new Date().getTime()}`,
                    "Investors",
                    <InvestorsResponseData investors={investorsData} />
                  )
                }

                setIsStreaming(false)
                clearPlaceholders()
                // Final scroll to bottom
                scrollToBottom()
              }
            } catch (err) {
              console.error("Error parsing cleaned chunk:", err, cleaned)
            }
          }
        }
      }

      // console.log("Full JSON chunks received:", accumulatedJSONChunks)
    } catch (error) {
      append({
        role: "assistant",
        content: "An error occurred while processing your request.",
      })
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
        )}>
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
                })}>
                <div
                  className={cn(
                    "max-w-full text-sm leading-relaxed px-3 py-1 rounded-md",
                    {
                      "ml-auto text-gray-700 border border-gray-200 rounded-full bg-white [font_weight:400]":
                        isUser,
                      "text-gray-800 mr-auto border-none rounded-md":
                        isAssistant,
                    }
                  )}>
                  <Markdown>{m.content}</Markdown>
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

          {connectionError && (
            <div className="ml-auto text-red-200 text-sm px-4 mt-2">
              ❌ WebSocket connection failed.{" "}
              <button className="underline text-blue-500 ml-2">Retry</button>
            </div>
          )}
          <div
            className={cn("h-5 opacity-0", { "h-10": messages.length > 1 })}
            ref={endRef}
          />
        </div>
        <div
          className={cn("flex justify-center items-center")}
          style={{
            // height: messages.length > 0 ? 100 : 0,
            transition: "all 0.3s",
          }}>
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
// show me ai base companies in germany

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
      style={{ transition: "all 0.3s" }}>
      {!messages.length && (
        <div className="flex justify-center items-center mb-3">
          <h1 className="font-heading text-pretty text-center text-[20px] font-semibold tracking-tighter text-gray-900 sm:text-[32px] md:text-[46px]">
            How can I help?
          </h1>
        </div>
      )}

      <form
        onSubmit={internalHandleSend}
        className="focus-within:border-gray-300 bg-white border-gray-300 relative rounded-xl border shadow-[0_2px_2px_rgba(0,0,0,0.04),0_8px_8px_-8px_rgba(0,0,0,0.04),0_0_8px_rgba(59,130,246,0.2)] transition-shadow">
        <div className="@container/textarea bg-white relative z-10 grid min-h-[100px] rounded-xl overflow-hidden">
          <TextareaAutosize
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
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
                onClick={internalHandleSend}>
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
          {[
            "Show me AI companies in Germany",
            "List biotech startups in the US",
            "Top 10 investors in the tech industry",
            "Indian healthtech companies",
            "Fintech companies with recent funding",
            "German deep tech startups",
          ].map(suggestion => (
            <button
              key={suggestion}
              onClick={() =>
                handleInputChange({ target: { value: suggestion } })
              }
              className="text-[13px] text-foreground/80 hover:text-foreground bg-white hover:bg-gray-100 px-3 py-1.5 rounded-md border border-gray-200 hover:border-gray-300 transition cursor-pointer">
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Chat
