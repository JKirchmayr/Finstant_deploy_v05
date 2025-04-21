import { create } from "zustand"

type ContextType = "companies" | "investors"

type ChatControlStore = {
  context: ContextType
  preferList: boolean
  setContext: (c: ContextType) => void
  setPreferList: (v: boolean) => void
}

export const useChatControlStore = create<ChatControlStore>((set) => ({
  context: "companies",
  preferList: false,
  setContext: (c) => set({ context: c }),
  setPreferList: (v) => set({ preferList: v }),
}))
