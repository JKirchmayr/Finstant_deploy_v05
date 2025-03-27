interface IInvestor {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  investment_focus: any[];
  investment_regions: any[];
  investment_countries: any[];
  pe_investment_strategy: any[];
  pe_industry_focus: any[];
  vc_technology_themes: any[];
  re_sub_focus: any[];
  investor_type: string | null;
  min_deal_size_meur: number | null;
  max_deal_size_meur: number | null;
  min_ebitda_meur: number | null;
  max_ebitda_meur: number | null;
  min_ticket_meur: number | null;
  max_ticket_meur: number | null;
  hq_country: string | null;
  hq_city: string | null;
  hq_zip: string | null;
  hq_address: string | null;
  address: string | null;
  email: string | null;
  telephone: string | null;
  created_at: string;
  companies: Company[];
}

interface Company {
  id: string;
  logo: null | undefined;
  name: string;
  description: string;
}

interface ICompany {
  id: string;
  name: string;
  description: string;
  current_investor: string | null;
  status: string;
  sector: string;
  created_at: string; // ISO 8601 date string
  website: string | null;
  sales_in_eurm: number;
  ebitda_in_eurm: number | null;
  marge: number;
  year_finacials: any | null;
  entry_year: number | null;
  logo: string | null;
}
