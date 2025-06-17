import { create } from "zustand"

type SingleTab = {
  id: string
  type: "companies" | "investors" | null
  data: any[]
  stage: "initial" | "loading" | "final"
}

type SingleTabStore = {
  singleTab: SingleTab
  setSingleTab: (
    id: string | null,
    type: "companies" | "investors" | null,
    data: any[],
    stage: "initial" | "loading" | "final"
  ) => void
  clearSingleTab: () => void
  isCollapsed: boolean
  setIsCollapsed: (isCollapsed: boolean) => void
}

export const useSingleTabStore = create<SingleTabStore>()(set => ({
  singleTab: { id: "", type: null, data: [], stage: "initial" },
  isCollapsed: false,
  setIsCollapsed: isCollapsed => set({ isCollapsed }),
  setSingleTab: (id, type, data, stage) =>
    set({
      singleTab: {
        id: id || `tab-${Date.now()}`,
        type,
        data,
        stage,
      },
    }),
  clearSingleTab: () => set({ singleTab: { id: "", type: null, data: [], stage: "initial" } }),
}))
