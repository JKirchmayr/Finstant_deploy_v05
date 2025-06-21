"use client"
import React from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { usePathname, useRouter } from "next/navigation"


const LogoutButton = () => {
  const router = useRouter()
  const supabase = createClient()


  async function handleLogout() {
    try {
      const data = await supabase.auth.signOut()
      console.log(data)
    } catch (error) {
      toast.error("Failed to log out. Please try again.")
      console.error("Logout Error:", error)
    }
  }
  return (
    <button className="cursor-pointer" onClick={handleLogout}>
      Logout
    </button>
  )
}

export default LogoutButton
