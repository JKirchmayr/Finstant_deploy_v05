"use client"
import React from "react"
import {
  Wifi,
  MessagesSquare,
  User,
  Building2,
  Handshake,
  Calculator,
  Receipt,
  Images,
  HandCoins,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import IMAGES from "@/constant/images"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Filters from "../Filters"

const Sidebar = () => {
  const pathname = usePathname()
  const investors = pathname === "/investors"
  const companies = pathname === "/companies"
  const naveList = [
    {
      name: "Chat",
      url: "/copilot",
      icon: MessagesSquare,
    },
    {
      name: "Account",
      url: "/investors",
      icon: HandCoins,
    },
    {
      name: "Organization",
      url: "/companies",
      icon: Building2,
    },
  ]

  return (
    <aside
      className={cn(
        `w-full h-full grid grid-cols-[56px_0px] transition-transform ease-in-out duration-300 overflow-hidden`,
        {
          "grid-cols-[56px_220px] border-r border-gray-300": investors || companies,
        }
      )}
    >
      <div className="border-r border-gray-300">
        <div className="p-2">
          <img src={IMAGES.icon} />
        </div>
        <nav className="flex flex-col gap-3 px-2 py-4">
          {naveList.map((nav, index) => {
            return (
              <Link
                href={nav.url}
                key={index}
                className={cn(
                  `bg-transparent rounded-sm flex items-center justify-center h-10 w-10 border border-transparent hover:bg-gray-50  hover:border-gray-300 transition-all text-gray-700`,
                  {
                    "bg-gray-50  border-gray-300": pathname === nav.url,
                  }
                )}
              >
                <nav.icon
                  size={20}
                  className={cn(`transition-transform ease-in-out duration-300`, {
                    "scale-110": pathname === nav.url,
                  })}
                />
              </Link>
            )
          })}
        </nav>
      </div>
      <Filters />
    </aside>
  )
}

export default Sidebar
