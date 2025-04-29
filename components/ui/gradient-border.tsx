import { cn } from "@/lib/utils"
import React from "react"

interface GradientBorderBoxProps {
  children: React.ReactNode
  className?: string
  borderRadius?: string
  padding?: string
}

const GradientBorderBox: React.FC<GradientBorderBoxProps> = ({
  children,
  className = "",
  borderRadius = "rounded-2xl",
  padding = "p-4",
}) => {
  return (
    <div
      className={cn(
        "relative",
        borderRadius,
        "bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 p-px"
      )}
    >
      <div className={cn("bg-white dark:bg-black w-full h-full", borderRadius, padding, className)}>
        {children}
      </div>
    </div>
  )
}

export default GradientBorderBox
