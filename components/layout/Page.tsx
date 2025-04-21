import React from "react"
import Header from "../shared/Header"

const Page = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div className="w-full h-full grid grid-rows-[40px_1fr] overflow-hidden">
      <Header title={title} />
      <main className="w-full h-full overflow-hidden">{children}</main>
    </div>
  )
}

export default Page
