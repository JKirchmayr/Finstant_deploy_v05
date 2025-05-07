import React from "react"
import PinnableDataTable from "../table/pinnable-data-table"
import CompaniesData from "@/app/(private)/copilot/companies-table"

const c = [
  {
    company_id: "4173d20b-ad8e-42f2-8754-4ac7c48e8c9f",
    company_name: "Scoro",
    company_description:
      "Software for professional services, agencies, and consultancies. Track projects, manage resources, and control finances in one system.",
    similarity_score: 0.8366,
  },
  {
    company_id: "f7b614d5-e9f0-4120-a776-ab7b7cb1e110",
    company_name: "Aionos",
    company_description:
      "Our AI-led Custom IT Solutions transform tech services. We excel in seamless SaaS implementation, transforming legacy systems, and optimizing IT infrastructure with smart-infra management. By integrating AI, we enhance operational efficiency, strengthen cybersecurity, and boost performance, driving innovation and sustainable growth for your business.",
    similarity_score: 0.8222,
  },
  {
    company_id: "2776c7e8-446b-4b5f-b072-043a82d42650",
    company_name: "Tamnoon",
    company_description:
      "Our AI-augmented managed service combines human expertise with technology to help teams quickly and safely remediate their cloud risks.",
    similarity_score: 0.8206,
  },
  {
    company_id: "aec223b5-dadb-4deb-9d8b-9153a800f69a",
    company_name: "Synthavo",
    company_description:
      "synthavo: SaaS solution to identify and order directly all your spare parts through a single mobile phone photo.",
    similarity_score: 0.8202,
  },
  {
    company_id: "ff982583-6601-4035-bdd7-16f7e9c6f26d",
    company_name: "Fundguard",
    company_description:
      "AI driven investment fund accounting SaaS platform for asset managers & service providers. Discover our ABOR, IBOR software, & NAV contingency system.",
    similarity_score: 0.8191,
  },
]

export const InvestmentData = () => {
  return (
    <div>
      <CompaniesData companies={c} />
    </div>
  )
}
