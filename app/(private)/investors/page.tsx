import React from "react"
import Data from "./data"
import Page from "@/components/layout/Page"
import InvestorData from "./data"
export const metadata = {
  title: "Investor",
  description: "List of investors",
}

const page = () => {
  return (
    <Page title="Investor">
      <InvestorData />
    </Page>
  )
}

export default page
