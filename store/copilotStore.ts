import { create } from "zustand"

type GridResult = {
  companies: Record<string, any>[]
  investors: Record<string, any>[]
  response: string
  user_id: string
}

type CoPilotStore = {
  result: GridResult
  setResult: (data: GridResult) => void
  addCompany: (company: Record<string, any>) => void
  addInvestor: (investor: Record<string, any>) => void
  clearResult: () => void
}

export const useCoPilotStore = create<CoPilotStore>((set) => ({
  result: {
    companies: [],
    investors: [],
    response: "",
    user_id: "",
  },
  setResult: (data) => set({ result: data }),

  addCompany: (company) =>
    set((state) => ({
      result: {
        ...state.result,
        companies: [...state.result.companies, company],
      },
    })),

  addInvestor: (investor) =>
    set((state) => ({
      result: {
        ...state.result,
        investors: [...state.result.investors, investor],
      },
    })),

  clearResult: () =>
    set({
      result: {
        companies: [],
        investors: [],
        response: "",
        user_id: "",
      },
    }),
}))
