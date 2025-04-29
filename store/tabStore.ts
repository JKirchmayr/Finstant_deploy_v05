import { create } from "zustand"

type Tabs = {
  id: number
  tabId: string
  tabTitle: string
  tabComponent: React.ReactNode
}

type ChatControlStore = {
  tabList: Tabs[]
  nextId: number
  addTab: (tabId: string, tabTitle: string, tabComponent: React.ReactNode) => void
  closeTab: (tabId: string) => void
  activeTabId: string
  setActiveTabId: (tabId: string) => void
  emptyTabList: () => void
}

export const useTabPanelStore = create<ChatControlStore>()((set) => ({
  tabList: [],
  nextId: 0,
  activeTabId: "",
  setActiveTabId: (tabId) => set({ activeTabId: tabId }),
  addTab: (tabId, tabTitle, tabComponent) =>
    set((state) => {
      const existingTab = state.tabList.find((tab) => tab.tabId === tabId)

      if (existingTab) {
        return { activeTabId: tabId }
      }

      const newTab = {
        id: state.nextId,
        tabId,
        tabTitle,
        tabComponent,
      }

      return {
        tabList: [...state.tabList, newTab],
        nextId: state.nextId + 1,
        activeTabId: tabId,
      }
    }),
  closeTab: (tabId) =>
    set((state) => ({
      tabList: state.tabList.filter((tab) => tab.tabId !== tabId),
    })),
  emptyTabList: () => set({ tabList: [], nextId: 0 }),
}))
