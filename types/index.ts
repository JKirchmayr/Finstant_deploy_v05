interface IInvestor {
    // id: string
    logo?: null | undefined
    name: string
    type: string
    location: string
    average_dea_size_eur_m: string
    industry_focus: string[]
    description: string
    website: null | string

    // id: string
    // created_at: string
    // checked_by_human: null | undefined
    // name: string
    // logo: string
    // description: string
    // website: null | string
    // investment_focus: string[]
    // investment_regions: string[]
    // investment_countries: string[]
    // pe_investment_strategy: string[]
    // pe_industry_focus: string[]
    // vc_technology_themes: string[]
    // re_sub_focus: string[]
    // investor_type: string
    // min_deal_size_meur: null | undefined
    // max_deal_size_meur: null | undefined
    // min_ebitda_meur: null | undefined
    // max_ebitda_meur: null | undefined
    // min_ticket_meur: null | undefined
    // max_ticket_meur: null | undefined
    // hq_country: string
    // hq_city: null | undefined
    // hq_zip: null | undefined
    // hq_address: null | undefined
    // address: string
    // email: string
    // telephone: null | undefined
    // companies: Company[]
  }
  
  interface Company {
    id: string
    logo: null | undefined
    name: string
    description: string
  }
  
  interface ICompany {
    id: string
    logo: null | undefined
    name: string
    description: string
    website: null | string
    current_investor: string
    status: string
    sector: string
    sales_in_eurm: string
    ebitda_in_eurm: number
    marge: string
    year_finacials: string
    entry_year: string
    created_at: string
  }
  