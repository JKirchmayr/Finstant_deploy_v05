import { cn } from "@/lib/utils"
import { useTabPanelStore } from "@/store/tabStore"
import { X } from "lucide-react"
import React, { useEffect } from "react"
import { useChatLayoutStore } from "@/store/chatLayout"
import ListBuilder from "@/components/ListBuilder"
import CompaniesData from "./companies-table"

export const TabPanel = () => {
  const { addTab, closeTab, tabList, activeTabId, setActiveTabId } = useTabPanelStore()
  const { layout, setLayout } = useChatLayoutStore()

  // Adding tabs when layout becomes "list"
  // useEffect(() => {
  //   if (tabList.length > 0) {
  //     addTab("company-list", "Company List", <CompaniesData />)
  //   }
  // }, [tabList])

  // Set first tab as active when tabs change
  useEffect(() => {
    if (tabList.length > 0 && !activeTabId) {
      setActiveTabId(tabList[0].tabId)
    }
  }, [tabList])

  const closeTabPanel = (tabId: string) => {
    const currentIndex = tabList.findIndex((tab) => tab.tabId === tabId)
    if (currentIndex === -1) return

    // Close tab
    closeTab(tabId)

    const newTabList = tabList.filter((tab) => tab.tabId !== tabId)

    if (newTabList.length > 0) {
      const newActiveTab =
        currentIndex > 0
          ? newTabList[currentIndex - 1] // Move to previous
          : newTabList[0] // Or first tab
      setActiveTabId(newActiveTab.tabId)
    } else {
      setLayout("chat") // No tabs left
    }
  }

  console.log(tabList, activeTabId, "act")

  return (
    <div className="flex-1 flex flex-col h-full w-full">
      <div className="bg-gray-300 p-1 pb-0 h-10 flex gap-2">
        {tabList.map((tab) => (
          <div
            key={tab.id} // 👈 using numeric id now
            onClick={() => setActiveTabId(tab.tabId)}
            className={cn(
              "flex font-medium justify-between items-center cursor-pointer select-none min-w-[100px] max-w-[150px] px-2 py-1 mb-1 rounded-md bg-gray-100 hover:bg-gray-200",
              "transition-all duration-150 group",
              {
                "bg-white pb-2 mb-0 rounded-t-md rounded-b-none hover:bg-gray-100":
                  activeTabId === tab.tabId,
              }
            )}
          >
            <span className="truncate max-w-[120px]">{tab.tabTitle}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeTabPanel(tab.tabId)
              }}
              className="ml-2 p-1 cursor-pointer rounded-full opacity-60 hover:opacity-100 hover:bg-gray-300"
              aria-label={`Close ${tab.tabTitle}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        {tabList.find((tab) => tab.tabId === activeTabId)?.tabComponent}
      </div>
    </div>
  )
}
