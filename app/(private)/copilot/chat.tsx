"use client"
import TypingDots from "@/components/TypingDots"
import { cn } from "@/lib/utils"
import { useChat } from "ai/react"
import { ArrowUp, CircleSmall } from "lucide-react"
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

type Company = {
  company_name: string
  company_description: string
  similarity_score: number
}

const Chat = () => {
  const { setResponse, addCompany, setCompanies, companies, resetStore, clearPlaceholders } =
    useWSStore()

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

    try {
      const response = await fetch("https://ai-agents-backend-zwa0.onrender.com/chat", {
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
        console.log("%cStarted reading stream!", "color: green; font-weight: bold")
        const { done, value } = await reader.read()

        if (done) {
          setIsStreaming(false)
          console.log("%cFinished reading stream!", "color: red; font-weight: bold")
          break
        }

        const rawChunk = decoder.decode(value, { stream: true })
        const events = rawChunk.split("\n\n")

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
                const placeholders: WSCompany[] = Array.from({ length: 10 }).map((_, i) => ({
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
                  addCompany(company)
                  // Scroll after adding company
                  scrollToBottom()
                }
              }

              if (parsed?.type === "done") {
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

      console.log("Full JSON chunks received:", accumulatedJSONChunks)
    } catch (error) {
      console.error("Error during streaming:", error)
      setIsStreaming(false)
    }
  }

  return (
    <div className="flex-1 bg-gray-100">
      <div className="max-w-3xl mx-auto h-[100dvh] flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 pt-4 m space-y-4 noscroll">
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
                {m.role === "assistant" && (
                  <Image
                    src="/images/bot.png"
                    width={20}
                    height={20}
                    alt="ai"
                    className="h-6 w-6 mr-2"
                  />
                )}

                <div
                  className={cn("max-w-full text-sm leading-relaxed px-3 py-1 rounded-xl", {
                    "ml-auto border-blue-200 bg-blue-50 border [font_weight:400]": isUser,
                    "text-gray-800 mr-auto border-purple-200 bg-purple-50 border rounded-md":
                      isAssistant,
                  })}
                >
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
          <div className={cn("h-5 opacity-0", { "h-10": messages.length > 1 })} ref={endRef} />
        </div>
        <div className={cn("h-[300px]", { "h-[150px]": messages.length > 0 })}>
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
    <div className="h-full w-full px-2">
      {!messages.length && (
        <div className="flex justify-center items-center">
          <h1 className="text-2xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-500 to-purple-500 font-bold mb-4 text-center">
            How can I help?
          </h1>
        </div>
      )}
      <GradientBorderBox
        className={cn(
          `bg-white border py-3 px-2 flex flex-col border-gray-300 rounded-2xl  shadow-lg`
        )}
      >
        <form onSubmit={internalHandleSend} className="flex items-center gap-2 px-2">
          <input
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Enter your prompt here..."
            className="flex-1 w-full text-sm resize-none overflow-hidden px-3 outline-0 text-gray-700"
          />
          <button
            type="submit"
            className={cn(
              `text-sm ml-auto opacity-100 disabled:cursor-not-allowed transition-all p-2 mt-auto cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 disabled:from-gray-200 hover:opacity-80 disabled:to-gray-300 disabled:text-gray-500 text-white rounded-full flex items-center`,
              {
                "from-gray-100 to-gray-200 border border-gray-300 text-black": isLoading,
              }
            )}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircleSmall size={18} fill="black" className="animate-pulse " />
            ) : (
              <ArrowUp size={20} />
            )}
          </button>
        </form>
      </GradientBorderBox>
      {showSuggestions && (
        <div className="mt-3 px-2 flex flex-wrap gap-2 justify-between">
          {[
            "Show me AI companies in Germany",
            "List biotech startups in the US",
            "Companies working on climate change",
            "Indian healthtech companies",
            "Fintech companies with recent funding",
            "German deep tech startups",
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleInputChange({ target: { value: suggestion } })}
              className="text-xs bg-gradient-to-r from-blue-200 to-purple-200 hover:from-blue-600 hover:to-purple-600 text-black hover:text-white px-3 py-2 rounded-full border border-blue-300 transition cursor-pointer"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Chat
