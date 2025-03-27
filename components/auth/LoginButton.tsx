"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

interface LoginButtonProps {
  className?: string
}

const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
  const router = useRouter()
  return (
    <Button className={className} onClick={() => router.push("/auth/login")}>
      Get Started
    </Button>
  )
}

export default LoginButton
