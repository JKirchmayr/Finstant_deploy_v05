"use client"
import React from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { usePathname, useRouter } from "next/navigation"

const LogoutButton = () => {
  const router = useRouter()
  async function handleLogout() {
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()
      if (error) throw new Error(error.message)
      router.push("/login")
      toast.success("Logged out successfully!")
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
