import { create } from "zustand"

interface InvestorFilterPayload {
  investorType?: string[]
  revenueMin?: string
  revenueMax?: string
  ebitdaMin?: string
  ebitdaMax?: string
  industry?: string[]
  investorLocation?: string[]
  description?: string
}

interface InvestorFilterState {
  appliedFilters: InvestorFilterPayload | null
  applyFilters: (filters: InvestorFilterPayload) => void
  resetFilters: () => void
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useInvestorFilters = create<InvestorFilterState>(set => ({
  appliedFilters: null,
  isLoading: false,
  applyFilters: async filters => {
    set({ isLoading: true })
    try {
      set({ appliedFilters: { ...filters } }) // ✅ store filter values
    } finally {
      set({ isLoading: false })
    }
  },

  resetFilters: () => {
    set({ appliedFilters: null }) // ❌ reset to empty
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },
}))
