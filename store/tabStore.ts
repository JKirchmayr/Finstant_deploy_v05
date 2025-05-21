import { create } from "zustand"

type Tabs = {
  id: number
  tabId: string
  tabTitle: string
  type: "companies" | "investors" | "investor-profile" | "company-profile"
  data: any[]
  profileId?: string
}

type ChatControlStore = {
  tabList: Tabs[]
  nextId: number
  addTab: (
    tabId: string,
    tabTitle: string,
    type: "companies" | "investors" | "investor-profile" | "company-profile",
    data?: any[],
    profileId?: string
  ) => void

  appendData: (tabId: string, data: any) => void
  closeTab: (tabId: number) => void
  closeTabByID: (tabId: string) => void
  activeTabId: string
  setActiveTabId: (tabId: string) => void
  emptyTabList: () => void
}

export const useTabPanelStore = create<ChatControlStore>()(set => ({
  tabList: [],
  nextId: 0,
  activeTabId: "",
  setActiveTabId: tabId => set({ activeTabId: tabId }),

  addTab: (tabId, tabTitle, type, data = []) =>
    set(state => {
      const existingTab = state.tabList.find(tab => tab.tabId === tabId)
      if (existingTab) {
        return { activeTabId: tabId }
      }

      const newTab = {
        id: state.nextId,
        tabId,
        tabTitle,
        type,
        data,
      }

      return {
        tabList: [...state.tabList, newTab],
        nextId: state.nextId + 1,
        activeTabId: tabId,
      }
    }),

  appendData: (tabId, newData) =>
    set(state => {
      const tab = state.tabList.find(tab => tab.tabId === tabId)
      if (!tab) return state

      const filteredData = tab.data.filter(
        item =>
          !(
            item.company_id?.startsWith("placeholder") ||
            item.investor_id?.startsWith("placeholder")
          )
      )

      // Update tab type based on newData type
      if ("company_id" in newData) {
        tab.type = "companies"
        tab.tabTitle = "Companies"
      } else if ("investor_id" in newData) {
        tab.type = "investors"
        tab.tabTitle = "Investors"
      }

      tab.data = [...filteredData, newData]

      return { tabList: [...state.tabList] }
    }),

  closeTab: tabId =>
    set(state => ({
      tabList: state.tabList.filter(tab => tab.id !== tabId),
    })),
  closeTabByID: tabId =>
    set(state => ({
      tabList: state.tabList.filter(tab => tab.tabId !== tabId),
    })),

  emptyTabList: () => set({ tabList: [], nextId: 0 }),
}))
