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
    <div className={cn("w-full", className)}>
      {isPlaceholder ? (
        <span className="inline-block truncate w-3/4 h-4 ">{text}</span>
      ) : (
        children ?? (
          <span className={cn("truncate inline-flex", className)}>{text}</span>
        )
      )}
    </div>
  )
}
