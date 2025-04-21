import { create } from "zustand"

type Store = {
  layout: "list" | "chat"
  setLayout: (newLayout: "list" | "chat") => void
}

export const useChatLayoutStore = create<Store>()((set) => ({
  layout: "chat",
  setLayout: (newLayout) => set({ layout: newLayout }),
}))
