"use client"
import { cn } from "@/lib/utils"
import { Grid, PanelBottom, SquarePen } from "lucide-react"
import React from "react"
import LogoutButton from "@/components/LogoutButton"
import Image from "next/image"
import { usePathname } from "next/navigation"

const Header = ({ title }: { title: string }) => {
  const pathname = usePathname()

  return (
    <header className="w-full h-full flex items-center justify-between px-4 border-b border-gray-300">
      <h1 className="text-gray-800 text-sm font-medium">{title}</h1>
      {pathname === "/copilot" && (
        <div className="div ml-auto flex items-center gap-1 mr-2">
          <button
            className={cn(
              `p-1 rounded-sm border border-gray-100 hover:border-gray-300 text-gray-600 hover:text-gray-800 cursor-pointer transition-all ease-in-out duration-300`
            )}
          >
            <SquarePen size={20} />
          </button>
          <button
            className={cn(
              `p-1 rounded-sm border border-gray-100 hover:border-gray-300 text-gray-600 hover:text-gray-800 cursor-pointer transition-all ease-in-out duration-300`,
              {
                // "text-blue-600 hover:text-blue-600": layout === "chat",
              }
            )}
          >
            <PanelBottom size={20} />
          </button>
          <button
            className={cn(
              `p-1 rounded-sm border border-gray-100 hover:border-gray-300 text-gray-600 hover:text-gray-800 cursor-pointer transition-all ease-in-out duration-300`,
              {
                // "text-blue-600 hover:text-blue-600": layout === "list",
              }
            )}
            // onClick={() => setLayout("list")}
          >
            <Grid size={20} />
          </button>
        </div>
      )}
      <div className="flex items-center gap-3">
        <span className="w-7 h-7 border border-gray-400 rounded-full bg-gray-300 text-gray-500 overflow-hidden cursor-pointer">
          <img
            src="https://placehold.co/600x400/png"
            alt="User Avatar"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </span>
        <LogoutButton />
      </div>
    </header>
  )
}

export default Header
