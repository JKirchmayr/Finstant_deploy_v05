import { create } from "zustand"

type FilterState = {
  investmentFocus: string[]
  investorLocation: string[]
  dealSize: [number, number]
  focusIndustry: string[]
  investmentStrategy: string[]
  companyNameSearch: string
  investerKeywordSearch: string
  investerIndustrySearch: string
  investerTargetLocationSearch: string
  companyKeywordSearch: string
  companyIndustrySearch: string
  companyIndustry: string[]
  activeTab: string
  setInvestmentFocus: (focus: string[]) => void
  setInvestorLocation: (location: string[]) => void
  setDealSize: (size: [number, number]) => void
  setFocusIndustry: (industry: string[]) => void
  setInvestmentStrategy: (strategy: string[]) => void
  setInvesterKeywordSearch: (keyword: string) => void
  setInvesterIndustrySearch: (industry: string) => void
  setInvesterTargetLocationSearch: (location: string) => void
  setCompanyNameSearch: (name: string) => void
  setCompanyKeywordSearch: (keyword: string) => void
  setCompanyIndustrySearch: (industry: string) => void
  setCompanyIndustry: (industry: string[]) => void
  setActiveTab: (name: string) => void
  resetInvestorFilters: () => void
  resetCompanyFilter: () => void
  isCollapsed: boolean
  setIsCollapsed: (isCollapsed: boolean) => void
}

const useFilterStore = create<FilterState>((set) => ({
  investmentFocus: [],
  investorLocation: [],
  dealSize: [0, 100],
  focusIndustry: [],
  investmentStrategy: [],
  investerIndustrySearch: "",
  investerKeywordSearch: "",
  investerTargetLocationSearch: "",
  companyNameSearch: "",
  companyKeywordSearch: "",
  companyIndustrySearch: "",
  companyIndustry: [],
  isCollapsed: false,
  setIsCollapsed: (isCollapsed) => set({ isCollapsed }),
  activeTab: "investors",
  setInvestmentFocus: (focus) => set({ investmentFocus: focus }),
  setInvestorLocation: (location) => set({ investorLocation: location }),
  setDealSize: (size) => set({ dealSize: size }),
  setFocusIndustry: (industry) => set({ focusIndustry: industry }),
  setInvestmentStrategy: (strategy) => set({ investmentStrategy: strategy }),
  setInvesterKeywordSearch: (keyword) => set({ investerKeywordSearch: keyword }),
  setInvesterIndustrySearch: (industry) => set({ investerIndustrySearch: industry }),
  setInvesterTargetLocationSearch: (location) => set({ investerTargetLocationSearch: location }),
  setCompanyNameSearch: (name) => set({ companyNameSearch: name }),
  setCompanyKeywordSearch: (keyword) => set({ companyKeywordSearch: keyword }),
  setCompanyIndustrySearch: (industry) => set({ companyIndustrySearch: industry }),
  setCompanyIndustry: (industry) => set({ companyIndustry: industry }),
  setActiveTab: (name) => set({ activeTab: name }),

  resetInvestorFilters: () =>
    set({
      investmentFocus: [],
      investorLocation: [],
      dealSize: [0, 100],
      focusIndustry: [],
      investmentStrategy: [],
    }),
  resetCompanyFilter: () => {
    set({
      companyKeywordSearch: "",
      companyIndustrySearch: "",
      companyIndustry: [],
    })
  },
}))

export default useFilterStore
