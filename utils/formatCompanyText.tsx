import type { Database } from "@/types/supabase"

type Company = Database["public"]["Tables"]["companies"]["Row"]

export function formatCompanyForEmbedding(company: Company): string {
  const lines: string[] = []

  lines.push(`${company.name} is an ${company.status?.toLowerCase() || "active"} company`)

  if (company.sector) {
    lines[0] += ` operating in the ${company.sector} sector.`
  } else {
    lines[0] += ` operating in a specialized sector.`
  }

  if (company.description) {
    lines.push(company.description)
  }

  if (company.current_investor) {
    lines.push(`It is backed by ${company.current_investor}.`)
  } else {
    lines.push(`It is privately held.`)
  }

  if (company.entry_year) {
    lines.push(`It entered the portfolio in ${company.entry_year}.`)
  }

  if (company.year_finacials && (company.sales_in_meur || company.ebitda_in_meur)) {
    let financialLine = `In the financial year ${company.year_finacials}, the company reported`

    if (company.sales_in_meur) {
      financialLine += ` sales of €${company.sales_in_meur} million`
    }

    if (company.ebitda_in_meur) {
      if (company.sales_in_meur) financialLine += ` and`
      financialLine += ` EBITDA of €${company.ebitda_in_meur} million`
    }

    financialLine += "."
    lines.push(financialLine)
  }

  if (company.hq_country) {
    lines.push(`The company is headquartered in ${company.hq_country}.`)
  }

  return lines.join(" ")
}
