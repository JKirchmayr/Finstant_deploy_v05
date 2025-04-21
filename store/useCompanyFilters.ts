import { create } from "zustand"

interface FilterPayload {
  description?: string
  revenueMin?: string
  revenueMax?: string
  ebitdaMin?: string
  ebitdaMax?: string
  industry?: string[]
  hqCountry?: string[]
}

interface CompanyFilterState {
  appliedFilters: FilterPayload | null
  applyFilters: (filters: FilterPayload) => void
  resetFilters: () => void
}

export const useCompanyFilters = create<CompanyFilterState>((set) => ({
  appliedFilters: null,

  applyFilters: (filters) => {
    set({ appliedFilters: { ...filters } })
  },

  resetFilters: () => {
    set({ appliedFilters: null })
  },
}))
