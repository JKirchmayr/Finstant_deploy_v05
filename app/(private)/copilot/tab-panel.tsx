// import { cn } from "@/lib/utils"
// import { useTabPanelStore } from "@/store/tabStore"
// import { X } from "lucide-react"
// import React, { useEffect } from "react"
// import { useChatLayoutStore } from "@/store/chatLayout"
// import ListBuilder from "@/components/ListBuilder"
// import CompaniesData from "./companies-table"

// export const TabPanel = () => {
//   const { addTab, closeTab, tabList, activeTabId, setActiveTabId } =
//     useTabPanelStore()
//   const { layout, setLayout } = useChatLayoutStore()

//   useEffect(() => {
//     if (tabList.length > 0 && !activeTabId) {
//       setActiveTabId(tabList[0].tabId)
//     }
//   }, [tabList])

//   const closeTabPanel = (tabId: string) => {
//     const currentIndex = tabList.findIndex(tab => tab.tabId === tabId)
//     if (currentIndex === -1) return

//     // Close tab
//     closeTab(tabId)

//     const newTabList = tabList.filter(tab => tab.tabId !== tabId)

//     if (newTabList.length > 0) {
//       const newActiveTab =
//         currentIndex > 0
//           ? newTabList[currentIndex - 1] // Move to previous
//           : newTabList[0] // Or first tab
//       setActiveTabId(newActiveTab.tabId)
//     } else {
//       setLayout("chat") // No tabs left
//     }
//   }

//   // console.log(tabList, activeTabId, "act") // Debug log removed/commented for cleaner code

//   return (
//     <div className="flex flex-1 flex-col h-full w-full dark:bg-slate-900">
//       {/* Tab Bar */}
//       <div className="flex border-b border-slate-300 dark:border-slate-700 px-2 pt-2 space-x-1 overflow-x-auto">
//         {tabList.map(tab => (
//           <div
//             key={tab.tabId} // Using tabId for key as it's unique and stable for tabs
//             onClick={() => setActiveTabId(tab.tabId)}
//             className={cn(
//               "flex items-center justify-between px-4 py-2 cursor-pointer select-none rounded-t-md group min-w-[120px] max-w-[200px]",
//               "font-medium text-sm transition-colors duration-150",
//               activeTabId === tab.tabId
//                 ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 border-slate-300 dark:border-slate-700 border-l border-t border-r -mb-px" // -mb-px for active tab to overlap bottom border of the bar
//                 : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200 border-transparent border-l border-t border-r" // Transparent borders for inactive tabs to maintain layout
//             )}
//             role="tab"
//             aria-selected={activeTabId === tab.tabId}>
//             <span className="truncate" title={tab.tabTitle}>
//               {tab.tabTitle}
//             </span>
//             <button
//               onClick={e => {
//                 e.stopPropagation()
//                 closeTabPanel(tab.tabId)
//               }}
//               className={cn(
//                 "ml-2 p-0.5 rounded-full text-slate-500 dark:text-slate-400",
//                 "hover:bg-slate-300 dark:hover:bg-slate-600 hover:text-slate-700 dark:hover:text-slate-200",
//                 "opacity-70 group-hover:opacity-100 transition-opacity"
//               )}
//               aria-label={`Close ${tab.tabTitle}`}>
//               <X size={16} />
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Tab Content Panel */}
//       <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-slate-800 border-l border-r border-b border-slate-300 dark:border-slate-700 rounded-b-md">
//         {/* Content area visually connects to the active tab. Top border is effectively handled by the active tab's style. */}
//         {tabList.find(tab => tab.tabId === activeTabId)?.tabComponent}
//       </div>
//     </div>
//   )
// }

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState, useRef, useEffect } from "react"
import { Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTabPanelStore } from "@/store/tabStore"
import { useChatLayoutStore } from "@/store/chatLayout"
import { cn } from "@/lib/utils"

export function TabPanel() {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null)
  const [hoverStyle, setHoverStyle] = useState({})
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])
  const { closeTab, tabList, activeTabId, setActiveTabId } = useTabPanelStore()

  const { layout, setLayout } = useChatLayoutStore()
  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [hoveredIndex])

  useEffect(() => {
    const activeElement = tabRefs.current[activeTabId] as any
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      })
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      })
    }
  }, [activeTabId])

  useEffect(() => {
    requestAnimationFrame(() => {
      const overviewElement = tabRefs.current[0]
      if (overviewElement) {
        const { offsetLeft, offsetWidth } = overviewElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    })
  }, [])

  // -----main tab logic starts here-----

  useEffect(() => {
    if (tabList.length > 0 && !activeTabId) {
      setActiveTabId(tabList[0].tabId)
    }
  }, [tabList])

  const handleTabSelect = (tabId: string) => {
    setActiveTabId(tabId)
  }

  const closeTabPanel = (tabId: string) => {
    const currentIndex = tabList.findIndex(tab => tab.tabId === tabId)
    if (currentIndex === -1) return

    // Close tab
    closeTab(tabId)

    const newTabList = tabList.filter(tab => tab.tabId !== tabId)

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

  return (
    <div className="flex flex-1 flex-col h-full w-full  ">
      <Card className="w-full p-2 h-[60px] border-none shadow-none relative flex rounded-none overflow-x-scroll noscroll">
        <CardContent className="p-0 ">
          <div className="relative">
            <div
              className="absolute h-[30px] transition-all duration-300 rounded-md ease-out bg-foreground/10 backdrop-blur-md flex items-center"
              style={{
                ...hoverStyle,
                opacity: hoveredIndex !== null ? 1 : 0,
              }}
            />

            {/* Active Indicator */}
            <div
              className="absolute bottom-[-6px] h-[2px] bg-[#0e0f11] transition-all duration-300 ease-out"
              style={activeStyle}
            />

            {/* Tabs */}
            <div className="relative flex space-x-[10px] items-center">
              {tabList.map(tab => (
                <div
                  key={tab.tabId}
                  className="flex"
                  ref={el => {
                    tabRefs.current[tab.tabId] = el
                  }}>
                  <div
                    className={`px-3 pr-1 py-2 cursor-pointer transition-colors duration-300 h-[30px] rounded-md ${
                      tab.tabId === activeTabId
                        ? "text-[#0e0e10]"
                        : "text-[#0e0f1199]"
                    }`}
                    onMouseEnter={() => setHoveredIndex(tab.tabId)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleTabSelect(tab.tabId)}>
                    <div className="text-sm font-[var(--www-mattmannucci-me-geist-regular-font-family)] leading-5 whitespace-nowrap flex items-center justify-center h-full">
                      {tab.tabTitle}
                    </div>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      closeTabPanel(tab.tabId)
                    }}
                    className={cn(
                      "shrink-0 size-5 flex items-center justify-center self-center cursor-pointer rounded-full text-slate-500 dark:text-slate-400",
                      "hover:bg-red-100 hover:text-red-400 dark:hover:text-slate-200"
                    )}
                    aria-label={`Close ${tab.tabTitle}`}>
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Tab Content Panel */}
      <div className="flex-1 overflow-y-auto p-4 bg-white ">
        {/* Content area visually connects to the active tab. Top border is effectively handled by the active tab's style. */}
        {tabList.find(tab => tab.tabId === activeTabId)?.tabComponent}
      </div>
    </div>
  )
}
