import { cn } from "@/lib/utils"
import { ArrowUp, Loader2 } from "lucide-react"
import Image from "next/image"
import React from "react"
import { useRef, useState, useEffect } from "react"
import TextareaAutosize from "react-textarea-autosize"

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

export const PromptField = ({
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
