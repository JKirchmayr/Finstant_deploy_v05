import { create } from "zustand"

interface FilterPayload {
  description?: string
  revenueMin?: string
  revenueMax?: string
  ebitdaMin?: string
  ebitdaMax?: string
  industry?: string[]
  hqCountry?: string[]
  from?: number
  to?: number
  _searchId?: number
}

interface CompanyFilterState {
  appliedFilters: FilterPayload | null
  applyFilters: (filters: FilterPayload) => void
  resetFilters: () => void
  isLoading: boolean
  setLoading: (loading: boolean) => void
}

export const useCompanyFilters = create<CompanyFilterState>(set => ({
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
