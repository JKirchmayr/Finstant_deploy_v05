import React from "react"
import Data from "./data"
import Page from "@/components/layout/Page"
export const metadata = {
  title: "Companies",
  description: "List of companies",
}

const page = () => {
  return (
    <Page title="Companies">
      <Data />
    </Page>
  )
}

export default page
