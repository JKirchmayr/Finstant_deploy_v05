"use client"

import { useState } from "react"
import { LogOut, ChevronDown } from "lucide-react"
import { SidebarMenuButton } from "../ui/sidebar"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { cn } from "@/lib/utils"

export default function UserMenu({ isCollapsed }: { isCollapsed: boolean }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  // const handleLogout = async () => {
  //     setLoading(true);
  //     await supabase.auth.signOut();
  //     router.replace('/login');
  //     setLoading(false);
  // };

  // if (isUserLoading) {
  //     return (
  //         <div className="flex items-center gap-2 animate-pulse">
  //             <div className="w-10 h-10 bg-gray-300 rounded-full" />
  //             <div className="w-24 h-4 bg-gray-300 rounded" />
  //         </div>
  //     );
  // }

  // const fname = userData?.fname;

  // if (!fname) {
  //     return (
  //         <SidebarMenuButton
  //             disabled={loading}
  //             tooltip="Logout"
  //             onClick={handleLogout}
  //             className="hover:bg-red-500 hover:text-white"
  //         >
  //             <LogOut className="!size-5" />
  //             <span>{loading ? 'Logging out...' : 'Logout'}</span>
  //         </SidebarMenuButton>
  //     );
  // }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 hover:bg-gray-100 px-1 rounded-md transition-all duration-300 justify-between w-full",
            { "px-2.5": !isCollapsed }
          )}>
          <span className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          disabled={loading}
          //   onClick={handleLogout}
          className="text-red-500 hover:bg-red-500 hover:text-white cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          {loading ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
