"use client";

import { useState, useEffect } from "react";
import { LogOut, ChevronDown } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

export default function UserMenu({ isCollapsed }: { isCollapsed: boolean }) {
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();
  const {setUser} = useAuthStore()
  const supabase = createClient()

  async function handleLogout() {
    try {
      const {error} = await supabase.auth.signOut()
      
      if(error){
        toast.error('Error while logging out, Please try again')
        return
      }
      toast.success('Logout "successful" 👍')
      router.replace('/login')

    } catch (error) {
      toast.error("Failed to log out. Please try again.")
      console.error("Logout Error:", error)
    }
  }


  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setUserEmail(data.user.email);
      }
    };
    fetchUser();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 hover:bg-gray-100 px-1 rounded-md transition-all duration-300 w-full",
            { "px-2.5": !isCollapsed }
          )}
        >
          <span className="flex items-center gap-2">
            <Avatar>
              {userEmail ? (
                <AvatarFallback>{userEmail.charAt(0).toUpperCase()}</AvatarFallback>
              ) : (
                <AvatarFallback>?</AvatarFallback>
              )}
            </Avatar>
            {userEmail && !isCollapsed && (
              <span
                className="text-xs text-gray-700 font-medium max-w-[120px] truncate block"
                title={userEmail}
              >
                {userEmail}
              </span>
            )}
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          disabled={loading}
          onClick={handleLogout}
          className="text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {loading ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
