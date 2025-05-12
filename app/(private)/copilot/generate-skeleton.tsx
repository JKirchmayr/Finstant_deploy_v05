import { cn } from "@/lib/utils"
import Image from "next/image"

export const GenerateSkeleton = ({
  isPlaceholder,
  text,
  children,
  className,
}: {
  isPlaceholder?: boolean
  text?: string
  children?: React.ReactNode
  className?: string
}) => {
  return (
    <div className="w-full">
      {isPlaceholder ? (
        <span className="inline-block truncate w-3/4 h-4 bg-gradient-to-r from-black via-gray-900 to-gray-800 animate-pulse bg-clip-text text-transparent">
          {text}
        </span>
      ) : (
        children ?? (
          <span className={cn("truncate inline-flex", className)}>{text}</span>
        )
      )}
    </div>
  )
}
