"use client"
import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"
import { cn } from "@/lib/utils"

type Option = Record<"value" | "label", string>

interface MultiSelectProps {
  title: string
  options: Option[]
  selectedOptions: Option[]
  onSelectChange: (selected: Option[]) => void
  placeholder: string
}

export function MultiSelect({
  title,
  options,
  selectedOptions,
  onSelectChange,
  placeholder,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = React.useCallback(
    (option: Option) => {
      onSelectChange(selectedOptions.filter((s) => s.value !== option.value))
    },
    [selectedOptions, onSelectChange]
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            onSelectChange(selectedOptions.slice(0, -1))
          }
        }
        if (e.key === "Escape") {
          input.blur()
        }
      }
    },
    [selectedOptions, onSelectChange]
  )
  const selectables = options.filter((option) => !selectedOptions.includes(option))
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-1 text-[13px]">{title}</label>
      <Command onKeyDown={handleKeyDown} className="overflow-visible outline-none">
        <div className="group rounded-sm border border-gray-300 px-2 py-[5px] text-xs">
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
          />
        </div>
        <div className="relative bg-transparent">
          <CommandList>
            {open && selectables.length > 0 ? (
              <div className="absolute top-0 z-50 w-full rounded-sm border bg-transparent text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup className="h-full overflow-auto bg-white z-50">
                  {selectables.map((option) => (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={() => {
                        setInputValue("")
                        onSelectChange([...selectedOptions, option])
                      }}
                      className={"cursor-pointer text-xs text-gray-500"}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            ) : null}
          </CommandList>
        </div>
      </Command>
      <div
        className={cn(`flex flex-wrap gap-1`, {
          "mb-2": selectedOptions.length,
        })}
      >
        {selectedOptions.map((option) => (
          <Badge
            key={option.value}
            variant="secondary"
            className="text-[10px] text-gray-700 border bg-white border-gray-200 rounded-sm font-normal"
          >
            {option.label}
            <button
              className="ml-1 text-[10px] rounded-full outline-none cursor-pointer"
              onClick={() => handleUnselect(option)}
            >
              <X className="size-3 text-muted-foreground hover:text-primary" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
