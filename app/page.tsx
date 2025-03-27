import LoginButton from "@/components/auth/LoginButton"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-100">
      <Image src="/images/logo.png" alt="Funds Radar Logo" width={300} height={150} />
      <h1 className="text-3xl font-bold mt-5">Welcome to Funds Radar</h1>
      <p className="text-lg mt-2 text-center max-w-md text-gray-600">
        Track and manage your funds efficiently with our comprehensive tools and insights.
      </p>
      <LoginButton className="mt-4" />
    </div>
  )
}
