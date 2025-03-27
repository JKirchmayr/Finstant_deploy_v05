import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeInvestor(investor: any) {
  return {
    id: investor.id,
    name: investor.name,
    logo: investor.logo,
    description: investor.description,
    website: investor.website,
    investment_focus: investor.investment_focus,
    investment_regions: investor.investment_regions,
    investment_countries: investor.investment_countries,
    pe_investment_strategy: investor.pe_investment_strategy,
    pe_industry_focus: investor.pe_industry_focus,
    vc_technology_themes: investor.vc_technology_themes,
    re_sub_focus: investor.re_sub_focus,
    investor_type: investor.investor_type,
    min_deal_size_meur: investor.min_deal_size_meur,
    max_deal_size_meur: investor.max_deal_size_meur,
    min_ebitda_meur: investor.min_ebitda_meur,
    max_ebitda_meur: investor.max_ebitda_meur,
    min_ticket_meur: investor.min_ticket_meur,
    max_ticket_meur: investor.max_ticket_meur,
    hq_country: investor.hq_country,
    hq_city: investor.hq_city,
    hq_zip: investor.hq_zip,
    hq_address: investor.hq_address,
    address: investor.address,
    email: investor.email,
    telephone: investor.telephone,
    created_at: investor.created_at,
  };
}
