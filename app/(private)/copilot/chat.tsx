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

type Company = {
  company_name: string
  company_description: string
  similarity_score: number
}

const Chat = () => {
  const { setResponse, addCompany, setCompanies, companies, resetStore, clearPlaceholders } =
    useWSStore()

  const userId = "vinay_001"
  const socketUrl = `wss://ai-agents-backend-zwa0.onrender.com/ws/chat/${userId}`

  const { messages, input, handleInputChange, append, setInput } = useChat()
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectAttempts = useRef(0)
  const MAX_RETRIES = 5

  const [isStreaming, setIsStreaming] = useState(false)
  const [connectionError, setConnectionError] = useState(false)
  const hasAddedPlaceholders = useRef(false)
  const lastPromptRef = useRef<string | null>(null)
  const hasSentPromptRef = useRef<boolean>(false)

  const connectWebSocket = () => {
    if (reconnectAttempts.current >= MAX_RETRIES) {
      console.warn("🛑 Max reconnect attempts reached")
      setConnectionError(true)
      return
    }

    const ws = new WebSocket(socketUrl)

    ws.onopen = () => {
      console.log("✅ WebSocket connected")
      reconnectAttempts.current = 0
      setConnectionError(false)

      //  Only resend if it hasn't already been sent
      if (lastPromptRef.current && !hasSentPromptRef.current) {
        const prompt = lastPromptRef.current
        console.log("🔁 Resending unsent prompt:", prompt)
        resetStore()
        if (!hasSentPromptRef.current) {
          append({ role: "user", content: prompt })
        }
        setIsStreaming(true)
        ws.send(JSON.stringify({ prompt }))
        hasSentPromptRef.current = true
      }
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as WSMessage
      // console.log("Data: ", data)
      switch (data.type) {
        case "response":
          console.log("response: ", data)
          setIsStreaming(true)
          setResponse(data.data.response)
          append({ role: "assistant", content: data.data.response })

          if (!hasAddedPlaceholders.current) {
            hasAddedPlaceholders.current = true

            const placeholders: WSCompany[] = Array.from({ length: 10 }).map((_, i) => ({
              company_id: `placeholder-${i}`,
              company_name: "Generating company...",
              company_description: "Analyzing semantic vectors...",
              similarity_score: "generating...",
            }))
            setCompanies(placeholders)
          }
          break

        case "company":
          console.log("company: ", data)
          addCompany(data.data)
          // append({ role: "assistant", content: formatCompanyAsMarkdown(data.data) })
          setIsStreaming(false)
          break

        case "investor":
          console.log("investor: ", data)
          // addCompany(data.data)
          // setIsStreaming(false)
          break

        case "done":
          console.log("done: ", data)
          setIsStreaming(false)
          clearPlaceholders()
          console.log("✅ Stream complete")

          // 🧠 Clear previous prompt tracking
          lastPromptRef.current = null
          hasSentPromptRef.current = false
          hasAddedPlaceholders.current = false

          wsRef.current?.close()
          setTimeout(connectWebSocket, 300)
          break

        case "error":
          const errorMessage = data.data?.response || "⚠️ An unknown error occurred."
          append({
            role: "assistant",
            content: `❌ ${errorMessage}`,
          })

          // Optionally clear prompt tracking to avoid retrying invalid query
          lastPromptRef.current = null
          hasSentPromptRef.current = false
          hasAddedPlaceholders.current = false

          setIsStreaming(false)
          break
      }
    }

    ws.onerror = (err) => {
      console.error("❌ WebSocket error", err)
    }

    ws.onclose = () => {
      console.log("🔌 WebSocket closed.")
      reconnectAttempts.current += 1

      if (reconnectAttempts.current >= MAX_RETRIES) {
        console.warn("🛑 Max reconnect attempts reached")
        setConnectionError(true)
        return
      }

      const retryIn = Math.min(10000, 1000 * Math.pow(2, reconnectAttempts.current))
      console.log(`⏳ Reconnecting in ${retryIn}ms (attempt ${reconnectAttempts.current})`)
      setTimeout(connectWebSocket, retryIn)
    }

    wsRef.current = ws
  }

  useEffect(() => {
    connectWebSocket()
    return () => wsRef.current?.close()
  }, [socketUrl])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    lastPromptRef.current = input.trim()
    hasSentPromptRef.current = false
    hasAddedPlaceholders.current = false
    resetStore()

    if (!hasSentPromptRef.current) {
      append({ role: "user", content: input })
    }

    setInput("")
    setIsStreaming(true) // ✅ Show "AI is thinking..." immediately
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ prompt: input }))
    } else {
      console.error("❌ WebSocket not open. Message not sent.")
      setIsStreaming(false) // ✅ Reset loading if failed to send
      append({ role: "assistant", content: "⚠️ Connection is not ready. Please try again." })
    }
  }

  const handleManualReconnect = () => {
    reconnectAttempts.current = 0
    setConnectionError(false)
    connectWebSocket()
  }

  return (
    <div
      className={cn(
        "h-full grid transition-all duration-500 ease-in-out w-full overflow-hidden",
        companies.length ? "grid-cols-[30%_70%]" : "grid-cols-[100%_0%]"
      )}
    >
      {/* Chat Left Panel */}

      <div className="flex-1 bg-gray-100">
        <div className="max-w-3xl mx-auto h-full flex flex-col relative overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 pt-4 md:px-6 pb-24 space-y-4">
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
                    className={cn("max-w-[75%] text-sm leading-relaxed", {
                      "px-3 py-2 bg-white text-gray-800 border border-gray-200 ml-auto rounded-full":
                        isUser,
                      "text-gray-800 mr-auto": isAssistant,
                    })}
                  >
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
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
              <div className="ml-auto text-red-500 text-sm px-4 mt-2">
                ❌ WebSocket connection failed.{" "}
                <button onClick={handleManualReconnect} className="underline text-blue-500 ml-2">
                  Retry
                </button>
              </div>
            )}
          </div>

          <PromptField
            handleSend={handleSend}
            input={input}
            handleInputChange={handleInputChange}
            isLoading={isStreaming}
            messages={messages}
          />
        </div>
      </div>
      {/* ListBuilder Right Panel (visible only when company data exists) */}
      {companies.length > 0 && (
        <div className="border-l">
          <ListBuilder />
        </div>
        // <RenderData />
      )}
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
    <div className="absolute bottom-8 w-full px-6">
      {!messages.length && (
        <h1 className="text-gray-800 font-bold mb-4 text-center text-2xl">How can I help?</h1>
      )}
      <div
        className={cn(
          `bg-white border py-3 px-2 flex flex-col border-gray-300 rounded-4xl  shadow-lg`
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
              `text-sm ml-auto opacity-100 disabled:cursor-not-allowed transition-all p-2 mt-auto cursor-pointer bg-gray-900 disabled:bg-white disabled:text-gray-900 text-white rounded-full flex items-center`,
              {
                "bg-gray-100 border border-gray-300 text-black": isLoading,
              }
            )}
            // disabled={isLoading}
          >
            {isLoading ? (
              <CircleSmall size={18} fill="black" className="animate-pulse " />
            ) : (
              <ArrowUp size={20} />
            )}
          </button>
        </form>
      </div>
      {showSuggestions && (
        <div className="mt-3 px-2 flex flex-wrap gap-2">
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
              className="text-xs bg-white hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-full border border-gray-300 transition cursor-pointer"
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
