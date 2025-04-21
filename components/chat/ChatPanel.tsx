"use client"
import { useEffect, useRef, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import {
  ArrowUp,
  Building2,
  CircleSmall,
  CornerDownLeft,
  FileText,
  Handshake,
  List,
  Loader,
  Plus,
  UserRound,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useChatLayoutStore } from "@/store/chatLayout"
import { useCoPilotStore } from "@/store/copilotStore"
import { useCopilotRunner } from "@/hooks/useCopilot"
import { useChatControlStore } from "@/store/chatControlsStore"
import { ChatMessage, useChatStore } from "@/store/chatStore"
import { useCopilotQuery } from "@/queries/useCopilotQueries"
import ReactMarkdown from "react-markdown"
import { useAuth } from "@/hooks/useAuth"

const ChatPanel = () => {
  const [prompt, setPrompt] = useState<string>("")
  const { layout, setLayout } = useChatLayoutStore()
  const { result, setResult } = useCoPilotStore()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { context, preferList, setContext, setPreferList } = useChatControlStore()
  const { messages, addMessage, isTyping } = useChatStore()
  const { mutateAsync, isPending: isLoading } = useCopilotQuery(prompt)
  const bottomRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [prompt])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const handleGenerate = async () => {
    try {
      const userMessage: ChatMessage = { role: "user", content: prompt }

      const payload = {
        prompt,
        user_id: user?.id,
      }

      addMessage(userMessage)
      setPrompt("")
      const result = await mutateAsync(payload)

      console.log("Response: ", result.data)

      if (result.data.companies.length || result.data.investors.length) {
        // @ts-ignore
        setResult(result.data)
        setLayout("list")
      }

      // If assistant responded, save it to chat store too

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: result.data.response,
      }
      console.log("add to message")
      addMessage(assistantMessage)
    } catch (err) {
      console.log("Copilot error", err)
    }
  }

  const selectOptions = [
    { label: "Companies", value: "companies", icon: <Building2 className="w-4 h-4" /> },
    { label: "Investors", value: "investors", icon: <UserRound className="w-4 h-4" /> },
    { label: "Transactions", value: "transactions", icon: <Handshake className="w-4 h-4" /> },
    { label: "Documents", value: "documents", icon: <FileText className="w-4 h-4" /> },
  ]

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, prompt])

  return (
    <div
      className={cn(
        `w-full bg-gray-100 h-full flex flex-col border-r border-transparent transition-transform overflow-hidden`,
        {
          "border-r border-gray-300": layout === "list",
        }
      )}
    >
      {/* Chat */}
      <div
        className={cn(
          `chats w-full px-[25%] py-4 mx-auto flex flex-col gap-4 transition-transform overflow-scroll`,
          {
            // "flex-1 py-4": layout === "chat",
            "w-full p-4": layout === "list",
            "h-[40%]": !messages.length,
            "flex-1": messages.length,
          }
        )}
      >
        {messages.map((item, index) => {
          return (
            <div
              key={index}
              className={cn(``, {
                "ml-auto bg-white border border-gray-300/60 px-4 py-3 rounded-2xl":
                  item.role === "user",
                "max-w-[80%] mr-auto p-0": item.role === "assistant",
                "max-w-full": item.role === "assistant" && layout === "list",
              })}
            >
              <ReactMarkdown>{item.content}</ReactMarkdown>
            </div>
          )
        })}

        {isLoading && (
          <div className="max-w-[30%] pl-2 mr-auto relative">
            <div className="dots"></div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Prompt */}
      <div
        className={cn(`bg-transparent p-4 pt-0 transition-transform ease-in-out duration-300`, {
          "flex flex-col justify-center items-center": layout === "chat",
        })}
      >
        {!messages.length && (
          <h1 className="text-gray-800 font-bold mb-4 text-center text-2xl">How can I help?</h1>
        )}
        <div
          className={cn(
            `bg-white border min-h-[110px] py-2 px-2 flex flex-col border-gray-300 rounded-3xl shadow-lg`,
            {
              "w-[40%] mx-auto": layout === "chat",
              "w-[50%]": Boolean(messages.length) || layout === "list",
              "w-full": layout === "list",
            }
          )}
        >
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={handleChange}
              placeholder="Enter your prompt here..."
              className="flex-1 w-full text-sm resize-none overflow-hidden min-h-[40px] max-h-[300px] px-3 py-2.5 outline-0 text-gray-700"
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  e.preventDefault()
                  handleGenerate()
                }
              }}
              rows={1}
            />
          </div>
          {/* Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 px-2 pb-2 w-full">
              <Select value={context} onValueChange={(val) => setContext("companies")}>
                <SelectTrigger className="w-[150px] cursor-pointer p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-full">
                  <SelectValue
                    placeholder={
                      <span className="flex items-center gap-2 text-gray-400">
                        <Plus className="w-4 h-4" />
                        Add context
                      </span>
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {selectOptions.map((option) => (
                    <SelectItem
                      key={option.label}
                      value={option.value}
                      className="text-sm text-gray-600"
                    >
                      <div className="flex items-center gap-2">
                        {option.icon}
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className={cn(
                  `px-5 text-sm text-gray-400 bg-white border border-gray-300 rounded-full`,
                  {
                    "bg-gray-100 border-gray-400 text-gray-800": preferList,
                  }
                )}
                onClick={() => setPreferList(!preferList)}
              >
                <List className="w-4 h-4" />
                List
              </Button>
              <button
                className={cn(
                  `text-sm ml-auto opacity-100 disabled:cursor-not-allowed transition-all p-2 cursor-pointer bg-gray-900 disabled:bg-white disabled:text-gray-900 text-white rounded-full flex items-center`,
                  {
                    "bg-gray-100 border border-gray-300 text-black": isLoading,
                  }
                )}
                disabled={isLoading}
                onClick={handleGenerate}
              >
                {isLoading ? (
                  // <Loader size={18} className="animate-spin" />
                  <CircleSmall size={18} fill="black" className="animate-pulse " />
                ) : (
                  // <CornerDownLeft size={20} />
                  <ArrowUp size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPanel
