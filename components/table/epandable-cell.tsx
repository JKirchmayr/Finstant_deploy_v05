import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { Eye } from "lucide-react"
type Props = {
  children: React.ReactNode
  className?: string
  TriggerCell?: React.ReactNode
}
export const ExpandableCell = ({ children, className, TriggerCell }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild className={cn("truncate")}>
        {TriggerCell ?? children}
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-80 -top-30 rounded-none text-xs text-foreground/90 py-2.5 border border-gray-300 shadow-none px-4 min-h-[44px] max-h-40 bg-gray-100",
          className
        )}
        side="bottom"
        align="center"
        sideOffset={-30}>
        {children}
      </PopoverContent>
    </Popover>
  )
}
