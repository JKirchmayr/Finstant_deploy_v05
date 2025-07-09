import { cn } from "@/lib/utils"
import { ArrowUp, AtSign, ChevronDown, Loader2, Paperclip } from "lucide-react"
import React from "react"
import { useRef, useState, useEffect } from "react"
import TextareaAutosize from "react-textarea-autosize"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

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

  const [isWeb, setIsWeb] = useState<boolean>(true)
  const [isNorthData, setIsNorthData] = useState<boolean>(true)

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
    handleSend(e)
  }
  return (
    <div
      className={cn("h-[150px] w-full px-2 ", {
        "h-[200px]": messages.length > 0,
      })}
      style={{ transition: "all 0.3s" }}
    >
      <form
        onSubmit={internalHandleSend}
        className="focus-within:border-gray-300 bg-background border-gray-300 relative rounded-xl border transition-shadow"
      >
        <div className="pt-1.5 px-2">
          <button className="bg-accent text-muted-foreground hover:text-foreground cursor-pointer p-[4px]  rounded text-xs leading-3 text-center">
            @ context
          </button>
        </div>
        <div className="@container/textarea bg-background relative z-10 grid min-h-[100px] rounded-xl overflow-hidden">
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
          <div className="flex justify-between gap-2 pb-2 px-2">
            <div className="p-1 flex gap-4">
              <button className="bg-accent inline-flex gap-1 justify-center items-center text-muted-foreground hover:text-foreground cursor-pointer px-1.5 p-0.5 rounded text-xs leading-3 text-center">
                <Paperclip className="size-2.5" /> Attach
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="bg-accent inline-flex gap-1 justify-center items-center text-muted-foreground hover:text-foreground cursor-pointer px-1.5 p-0.5 rounded text-xs leading-3 text-center">
                    Sources <ChevronDown className="size-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuCheckboxItem
                    className="h-7 cursor-pointer"
                    checked={isWeb}
                    // onCheckedChange={setIsWeb}
                  >
                    Web
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    className="h-7 cursor-pointer"
                    checked={isNorthData}
                    // onCheckedChange={setIsNorthData}
                  >
                    North Data
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <button
                className="inline-flex shrink-0 cursor-pointer select-none items-center text-xs font-normal justify-center gap-1.5 whitespace-nowrap text-nowrap border-none outline-none transition-all disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 [&>svg]:pointer-events-none [&>svg]:size-4 [&_svg]:shrink-0  text-background bg-foreground hover:bg-gray-700 px-3 py-1 rounded"
                type="submit"
                disabled={isLoading || !input.trim().length}
                onClick={internalHandleSend}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-5 h-5 text-black [animation-duration:0.3s]" />
                ) : (
                  "Ask Finstant"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
