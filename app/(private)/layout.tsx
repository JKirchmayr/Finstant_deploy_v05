import Dashboard from "@/components/layout/Dashboard"
import React from "react"

const layout = ({ children }: { children: React.ReactNode }) => {
  return <Dashboard>{children}</Dashboard>
}

export default layout
