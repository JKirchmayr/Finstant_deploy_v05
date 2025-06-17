import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React, { useEffect } from "react"
import CompaniesData from "./companies-table"
import { useSingleTabStore } from "@/store/singleTabStore"
import InvestorData from "../investors/data"
import InvestorsResponseData from "./investors-table"

type Props = {
  togglePanel: () => void
  closeTabPanel: () => void
}

export default function TabPanelNew({ togglePanel, closeTabPanel }: Props) {
  const { singleTab } = useSingleTabStore()

  return (
    <div>
      {/* <PanelHeader togglePanel={togglePanel} isCollapsed={isCollapsed} /> */}
      <div className="flex-1 h-full overflow-y-auto overflow-x-hidden">
        {singleTab.type === "companies" && (
          <CompaniesData
            companies={singleTab.data}
            loading={singleTab.stage === "initial"}
            togglePanel={togglePanel}
            closeTabPanel={closeTabPanel}
          />
        )}
        {singleTab.type === "investors" && (
          <InvestorsResponseData
            investors={singleTab.data}
            loading={singleTab.stage === "initial"}
            togglePanel={togglePanel}
            closeTabPanel={closeTabPanel}
          />
        )}
      </div>
    </div>
  )
}
