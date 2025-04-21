import Image from "next/image"
import IMAGES from "@/constant/images"
import Link from "next/link"
import { MoveRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-100">
      <Image src={IMAGES.logo} alt="Funds Radar Logo" width={300} height={150} />
      <h1 className="text-3xl font-bold mt-5">Welcome to Funds Radar</h1>
      <p className="text-lg mt-2 text-center max-w-md text-gray-600 mb-3">
        Track and manage your funds efficiently with our comprehensive tools and insights.
      </p>
      <Link
        className="px-4 py-2 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-700 transition flex items-center gap-2"
        href={"/login"}
      >
        Get Started <MoveRight size={16} />
      </Link>
    </div>
  )
}
