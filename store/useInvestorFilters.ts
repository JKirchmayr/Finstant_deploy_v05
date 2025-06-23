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
  from?: number
  to?: number
  _searchId?: number
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
  applyFilters: filters => {
    set({ appliedFilters: { ...filters } })
    set({ isLoading: true })
  },

  resetFilters: () => {
    set({ appliedFilters: null })
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },
}))
