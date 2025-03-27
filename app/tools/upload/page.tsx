"use client";
import { useState } from "react";
import investors from "@/constant/test.json";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase"; // update the path if needed
import companies from "@/constant/companies.json";

type InvestorInsert = Database["public"]["Tables"]["investors"]["Insert"];
type CompanyInsert = Database["public"]["Tables"]["companies"]["Insert"];
type LinkInsert = Database["public"]["Tables"]["investor_companies"]["Insert"];

export default function UploadInvestorData() {
  const [log, setLog] = useState<string[]>([]);
  const supabase = createClient();

  // const handleSeedData = async () => {
  //   setLog(["⏳ Starting upload..."]);

  //   const companiesInserted = new Set<string>();

  //   // 🔍 Create a lookup map for full company data
  //   const companyMap = new Map(companies.map((c) => [c.id, c]));

  //   for (const investor of investors) {
  //     setLog((log) => [...log, `➡️ Processing investor: ${investor.name}`]);

  //     // ✅ Insert investor
  //     const investorInsert: InvestorInsert = {
  //       id: investor.id,
  //       name: investor.name,
  //       logo: investor.logo,
  //       description: investor.description,
  //       website: investor.website,
  //       investment_focus: investor.investment_focus,
  //       investment_regions: investor.investment_regions,
  //       investment_countries: investor.investment_countries,
  //       pe_investment_strategy: investor.pe_investment_strategy,
  //       pe_industry_focus: investor.pe_industry_focus,
  //       vc_technology_themes: investor.vc_technology_themes,
  //       re_sub_focus: investor.re_sub_focus,
  //       investor_type: investor.investor_type,
  //       min_deal_size_meur: investor.min_deal_size_meur,
  //       max_deal_size_meur: investor.max_deal_size_meur,
  //       min_ebitda_meur: investor.min_ebitda_meur,
  //       max_ebitda_meur: investor.max_ebitda_meur,
  //       min_ticket_meur: investor.min_ticket_meur,
  //       max_ticket_meur: investor.max_ticket_meur,
  //       hq_country: investor.hq_country,
  //       hq_city: investor.hq_city,
  //       hq_zip: investor.hq_zip,
  //       hq_address: investor.hq_address,
  //       address: investor.address,
  //       email: investor.email,
  //       telephone: investor.telephone,
  //       created_at: investor.created_at,
  //     };

  //     const { error: investorError } = await supabase
  //       .from("investors")
  //       .upsert([investorInsert]);

  //     if (investorError) {
  //       setLog((log) => [...log, `❌ Investor failed: ${investor.name}`]);
  //       continue;
  //     }

  //     // // 🔁 Loop through linked companies (from investor.companies)
  //     // for (const partialCompany of investor.companies || []) {
  //     //   const fullCompany = companyMap.get(partialCompany.id);

  //     //   if (!fullCompany) {
  //     //     setLog((log) => [...log, `⚠️ Company not found in full data: ${partialCompany.name}`]);
  //     //     continue;
  //     //   }

  //     //   // ✅ Insert full company only once
  //     //   if (!companiesInserted.has(fullCompany.id)) {
  //     //     const companyInsert: CompanyInsert = {
  //     //       id: fullCompany.id,
  //     //       name: fullCompany.name,
  //     //       description: fullCompany.description,
  //     //       sector: fullCompany.sector,
  //     //       status: fullCompany.status,
  //     //       website: fullCompany.website,
  //     //       sales_in_eurm:
  //     //         fullCompany.sales_in_eurm !== null ? parseInt(fullCompany.sales_in_eurm) : 0,
  //     //       ebitda_in_eurm: fullCompany.ebitda_in_eurm,
  //     //       marge: fullCompany.marge ? parseInt(fullCompany.marge) : 0,
  //     //       year_finacials: fullCompany.year_finacials,
  //     //       entry_year: fullCompany.entry_year,
  //     //       logo: fullCompany.logo,
  //     //       created_at: fullCompany.created_at,
  //     //     };

  //     //     const { error: companyError } = await supabase.from('companies').upsert([companyInsert]);

  //     //     if (companyError) {
  //     //       setLog((log) => [...log, `❌ Company insert failed: ${fullCompany.name}`]);
  //     //       continue;
  //     //     }

  //     //     companiesInserted.add(fullCompany.id);
  //     //   }

  //     //   // 🔗 Insert into investor_companies
  //     //   const linkInsert: LinkInsert = {
  //     //     investor_id: investor.id,
  //     //     company_id: fullCompany.id,
  //     //     status: 'Current',
  //     //   };

  //     //   const { error: linkError } = await supabase.from('investor_companies').upsert([linkInsert]);

  //     //   if (linkError) {
  //     //     setLog((log) => [...log, `❌ Link failed: ${investor.name} → ${fullCompany.name}`]);
  //     //   }
  //     // }
  //     setLog((log) => [...log, `✅ Done: ${investor.name}`]);
  //   }

  //   setLog((log) => [...log, "🎉 Upload complete!"]);
  // };

  const handleSeedData = async () => {
    console.log("Seeding data...");
  };
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Seed Investors & Companies</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded shadow"
        onClick={handleSeedData}
      >
        Run Seeder
      </button>

      <div className="mt-4 bg-gray-100 p-4 rounded text-sm space-y-1 max-h-[400px] overflow-y-auto">
        {log.map((entry, idx) => (
          <div key={idx}>{entry}</div>
        ))}
      </div>
    </div>
  );
}
