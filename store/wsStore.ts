import { create } from "zustand"

export type WSCompany = {
  company_id: string
  company_name: string
  company_description: string
  similarity_score: number | string // string if "generating..."
}

type WSStore = {
  companies: WSCompany[]
  aiResponse: string | null
  investors: any[]
  setResponse: (text: string) => void
  addCompany: (company: WSCompany) => void
  setCompanies: (companies: WSCompany[]) => void
  removeFirstPlaceholder: () => void
  clearPlaceholders: () => void
  resetStore: () => void
}

export const useWSStore = create<WSStore>((set) => ({
  companies: [],
  aiResponse: null,
  investors: [],

  setResponse: (text) => set({ aiResponse: text }),
  setCompanies: (companies) => set({ companies }),

  addCompany: (company) =>
    set((state) => {
      const updated = [...state.companies]
      const index = updated.findIndex((c) => c.company_id.startsWith("placeholder-"))
      if (index !== -1) {
        updated[index] = company // ✅ replace the next placeholder
      } else {
        updated.push(company) // fallback, just add
      }
      return { companies: updated }
    }),

  removeFirstPlaceholder: () =>
    set((state) => ({
      companies: state.companies.filter((c, i) => i !== 0 || c.company_id !== "generating..."),
    })),
  clearPlaceholders: () =>
    set((state) => ({
      companies: state.companies.filter((c) => !c.company_id.startsWith("placeholder-")),
    })),

  resetStore: () =>
    set({
      companies: [],
      aiResponse: null,
      investors: [],
    }),
}))
