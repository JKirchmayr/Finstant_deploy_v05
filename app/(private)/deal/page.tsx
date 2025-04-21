import Page from "@/components/layout/Page"
import { Construction } from "lucide-react"
import React from "react"

const page = () => {
  return (
    <Page title="Deals">
      <div className="w-full h-[90%] flex flex-col gap-4 justify-center items-center">
        <Construction size={50} className="text-yellow-800" />
        <h1 className="text-lg font-semibold">Page work in progress</h1>
      </div>
    </Page>
  )
}

export default page
