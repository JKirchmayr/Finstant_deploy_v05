"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

interface Logo {
  id: string
  src: string
  alt: string
  name: string
}

interface LogoShowcaseProps {
  logos: Logo[]
  maxVisible?: number
  className?: string
  onLogoClick?: (logo: Logo) => void
}

export default function LogoShowcase({
  logos,
  maxVisible = 3,
  className = "",
  onLogoClick,
}: LogoShowcaseProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const displayedLogos = isExpanded ? logos : logos.slice(0, maxVisible)
  const remainingCount = Math.max(0, logos.length - maxVisible)

  const handleLogoClick = (logo: Logo) => {
    if (onLogoClick) {
      onLogoClick(logo)
    }
  }

  return (
    <div className={cn("flex items-center gap-2 shrink-0", className)}>
      {displayedLogos.map(logo => (
        <div
          key={logo.id}
          onClick={() => handleLogoClick(logo)}
          className="flex shrink-0 items-center justify-center w-10 h-8 bg-white hover:border-blue-300 transition-colors rounded-sm border hover:shadow-md transition-shadow cursor-pointer"
        >
          <Image
            src={logo.src || "/placeholder.svg"}
            alt={logo.alt}
            width={40}
            height={22}
            className="object-contain max-w-full max-h-full"
          />
        </div>
      ))}

      {!isExpanded && remainingCount > 0 && (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex shrink-0 items-center justify-center w-10 h-8 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-600 font-medium text-sm hover:bg-gray-200 transition-colors cursor-pointer"
        >
          +{remainingCount}
        </button>
      )}

      {isExpanded && logos.length > maxVisible && (
        <button
          onClick={() => setIsExpanded(false)}
          className="flex shrink-0 items-center justify-center w-10 h-8 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-600 font-medium text-xs hover:bg-gray-200 transition-colors cursor-pointer"
        >
          -
        </button>
      )}
    </div>
  )
}
