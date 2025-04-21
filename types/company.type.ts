interface ICompany {
  id: string
  name: string
  description: string
  current_investor: string | null
  status: string
  sector: string
  created_at: string // ISO 8601 date string
  website: string | null
  sales_in_meur: number
  ebitda_in_meur: number | null
  marge: number
  year_finacials: any | null
  hq_country: string
  entry_year: number | null
  logo: string | null
}
