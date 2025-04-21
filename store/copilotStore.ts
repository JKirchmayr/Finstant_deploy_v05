import { create } from "zustand"

type GridResult = {
  companies: Record<string, any>[]
  investors: Record<string, any>[]
  response: string
  user_id: string
}

type ChatResult = {
  type: "chat"
  message: string
}

type CoPilotStore = {
  result: GridResult | null
  setResult: (data: GridResult) => void
  clearResult: () => void
}

export const useCoPilotStore = create<CoPilotStore>((set) => ({
  result: null,
  setResult: (data) => set({ result: data }),
  clearResult: () => set({ result: null }),
}))
