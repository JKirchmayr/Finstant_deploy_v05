"use client"
import React from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Command as CommandPrimitive } from "cmdk"
import { cn } from "@/lib/utils"

type Option = Record<"value" | "label", string>;

interface MultiSelectProps {
  title?: string;
  options: Option[];
  selectedOptions: Option[];
  onSelectChange: (selected: Option[]) => void;
  placeholder: string;
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
  const [loading, setLoading] = React.useState(false)
  const [hasLoaded, setHasLoaded] = React.useState(false)
  const loadingTimeout = React.useRef<NodeJS.Timeout | null>(null)
  const [animatedBadge, setAnimatedBadge] = React.useState<string | null>(null)

  const handleUnselect = React.useCallback(
    (option: Option) => {
      onSelectChange(selectedOptions.filter((s) => s.value !== option.value));
    },
    [selectedOptions, onSelectChange]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            onSelectChange(selectedOptions.slice(0, -1));
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selectedOptions, onSelectChange]
  )

  const selectables = React.useMemo(() => {
    const unselected = options.filter(
      (option) => !selectedOptions.some((s) => s.value === option.value)
    )
    if (!inputValue) return unselected

    const lowerInput = inputValue.toLowerCase()
    const computeMatchScore = (label: string, input: string) => {
      if (label.startsWith(input)) return 100
      if (label.includes(input)) return 50
      return 0
    }

    return unselected
      .map((option) => ({
        option,
        score: computeMatchScore(option.label.toLowerCase(), lowerInput),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ option }) => option)
  }, [options, selectedOptions, inputValue])

  const handleOptionSelect = (option: Option) => {
    setInputValue("")
    setOpen(false)
    inputRef.current?.blur()

    const updatedOptions = [...selectedOptions, option].sort((a, b) =>
      a.label.toLowerCase().localeCompare(b.label.toLowerCase())
    )
    onSelectChange(updatedOptions)

    setAnimatedBadge(option.value)
    setTimeout(() => setAnimatedBadge(null), 500)
  }

  const handleInputFocus = () => {
    setOpen(true)
    if (!hasLoaded) {
      setLoading(true)
      if (loadingTimeout.current) clearTimeout(loadingTimeout.current)
      loadingTimeout.current = setTimeout(() => {
        setLoading(false)
        setHasLoaded(true)
      }, 400)
    }
  }

  const handleInputBlur = () => {
    setOpen(false)
    if (loadingTimeout.current) clearTimeout(loadingTimeout.current)
  }

  // Sort selectedOptions just before rendering badges to ensure correct order
  const sortedSelectedOptions = [...selectedOptions].sort((a, b) =>
    a.label.toLowerCase().localeCompare(b.label.toLowerCase())
  )
      
  return (
    <div className="flex flex-col gap-2">
      {title && <label className="flex items-center gap-1 text-[13px]">{title}</label>}
      <Command onKeyDown={handleKeyDown} className="overflow-visible outline-none">
        <div className="group rounded-sm border border-gray-300 px-2 py-[5px] text-xs">
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className="flex-1 outline-none bg-white placeholder:text-gray-400"
          />
        </div>
        <div className="relative bg-transparent">
          <CommandList>
            <AnimatePresence>
              {open && (loading || selectables.length > 0) ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-0 z-50 w-full rounded-sm border bg-transparent text-popover-foreground shadow-md outline-none"
                >
                  {loading ? (
                    <div className="bg-white z-50 p-2">
                      <div className="flex flex-col gap-2">
                        {Array.from({ length: 4 }).map((_, idx) => (
                          <div
                            key={idx}
                            className="h-4 w-full bg-gray-200 rounded animate-pulse"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <CommandGroup className="h-full overflow-auto bg-white z-50">
                      {selectables.map((option) => (
                        <CommandItem
                          key={option.value}
                          onMouseDown={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }}
                          onSelect={() => handleOptionSelect(option)}
                          className="cursor-pointer text-xs text-gray-500"
                        >
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </CommandList>
        </div>
      </Command>
      <div
        className={cn(`flex flex-wrap gap-1`, {
          "mb-2": selectedOptions.length,
        })}
      >
        {sortedSelectedOptions.map((option) => (
          <Badge
            key={option.value}
            variant="secondary"
            className={cn(
              "text-[10px] text-gray-700 border bg-white border-gray-200 rounded-sm font-normal",
              {
                "animate-pulse": animatedBadge === option.value,
              }
            )}
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
  );
}
