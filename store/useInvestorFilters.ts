import { create } from "zustand"

interface InvestorFilterPayload {
  investorType?: string[]
  revenueMin?: string
  revenueMax?: string
  ebitdaMin?: string
  ebitdaMax?: string
  industry?: string[]
  investorLocation?: string[]
}

interface InvestorFilterState {
  appliedFilters: InvestorFilterPayload | null
  applyFilters: (filters: InvestorFilterPayload) => void
  resetFilters: () => void
}

export const useInvestorFilters = create<InvestorFilterState>((set) => ({
  appliedFilters: null,

  applyFilters: (filters) => {
    set({ appliedFilters: { ...filters } }) // ✅ store filter values
  },

  resetFilters: () => {
    set({ appliedFilters: null }) // ❌ reset to empty
  },
}))
