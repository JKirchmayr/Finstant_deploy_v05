"use client"
import { useState, useMemo } from "react"
import { FileUp, Copy, Download, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { SourcesSheet } from "../SourcesSheet"
import { FinancialTable } from "./FinancialTable"

interface CompanyProfileCardProps {
  data: any
}

export default function CompanyProfileCard({ data }: CompanyProfileCardProps) {
  const safe = (v: any, fallback = "N/A") => v ?? fallback

  const header = data.header || {}
  const keyFacts = data.key_facts || {}
  const businessOverview = data.business_description || {}
  const productServices = data.product_services || {}
  const financial = data.financial_information || {}
  const financialRows = Array.isArray(financial.financial_information)
    ? financial.financial_information
    : []
  const currency = financial.currency || (financialRows[0]?.currency ?? "")
  const newsArr = Array.isArray(data.company_news) ? data.company_news : []
  console.log(data)

  // Helper to get source count, fallback to 0 if not array
  const getSourceCount = (sources: string[] | null | undefined) =>
    Array.isArray(sources) ? sources.length : 0

  // Create array of source objects by section
  const sourcesBySection = useMemo(() => {
    const sections = {
      keyFacts: {
        name: "Key Facts",
        sources: keyFacts.sources || [],
        count: getSourceCount(keyFacts.sources),
      },
      businessOverview: {
        name: "Business Overview",
        sources: businessOverview.sources || [],
        count: getSourceCount(businessOverview.sources),
      },
      productServices: {
        name: "Product & Services",
        sources: productServices.sources || [],
        count: getSourceCount(productServices.sources),
      },
      news: {
        name: "News & Developments",
        sources: newsArr.flatMap((item: any) => item.news_sources || []),
        count: newsArr.reduce(
          (total: number, item: any) => total + getSourceCount(item.news_sources),
          0
        ),
      },
    }

    return sections
  }, [keyFacts.sources, businessOverview.sources, productServices.sources, newsArr])

  const hasFinancial = financial && Array.isArray(financialRows) && financialRows.length > 0

  const hasNews = Array.isArray(newsArr) && newsArr.length > 0

  return (
    <div className="relative max-w-3xl mx-auto my-2 bg-white border rounded-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">Company Profile – {safe(header.company_name)}</h1>
        <div className="flex gap-4">
          <Button size="xs" variant="secondary">
            <Copy className="w-4 h-4" /> Copy
          </Button>
          <Button size="xs" variant="secondary">
            <FileUp className="w-4 h-4" /> Export PPT
          </Button>
        </div>
      </div>
      <div className="flex gap-4 items-center mb-4">
        {header.company_logo && (
          <Image
            src={header.company_logo || "/logo.png"}
            alt={`logo`}
            width={60}
            height={60}
            className="rounded object-contain max-h-full max-w-full border"
            style={{ objectFit: "contain" }}
          />
        )}
        <div>
          <div className="font-bold">{safe(header.company_name)}</div>
          <div className="text-sm text-gray-600">
            {safe(header.company_city)}, {safe(header.company_country)}
          </div>
          {header.company_website && (
            <Link
              href={header.company_website}
              className="text-blue-600 flex items-center gap-1"
              target="_blank"
            >
              {header.company_website.replace(/^https?:\/\//, "")}
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold underline text-lg">Key Facts</h2>
          {getSourceCount(keyFacts.sources) > 0 && (
            <SourcesSheet
              trigger={
                <Button className="h-6" variant="secondary" size="xs">
                  {getSourceCount(keyFacts.sources)}
                </Button>
              }
              title="All Reference Sources"
              description={`Complete list of reference sources used for this company profile`}
              sourcesBySection={sourcesBySection}
            />
          )}
        </div>
        <div className="text-sm space-y-1">
          {keyFacts.company_legal_name && (
            <p>
              <span className="font-medium">Entity Legal Name:</span>{" "}
              {safe(keyFacts.company_legal_name)}
            </p>
          )}
          {keyFacts.company_founded && (
            <p>
              <span className="font-medium">Founded:</span> {safe(keyFacts.company_founded)}
            </p>
          )}
          {(keyFacts.company_headquarter_city || keyFacts.company_headquarter_country) && (
            <p>
              <span className="font-medium">Headquarters:</span>{" "}
              {safe(keyFacts.company_headquarter_city)}
              {keyFacts.company_headquarter_city && keyFacts.company_headquarter_country
                ? ", "
                : ""}
              {safe(keyFacts.company_headquarter_country)}
            </p>
          )}
          {keyFacts.company_employees && (
            <p>
              <span className="font-medium">Employees:</span> {safe(keyFacts.company_employees)}
            </p>
          )}
          {(keyFacts.company_revenue ||
            keyFacts.company_revenue_currency ||
            keyFacts.company_revenue_year) && (
            <p>
              <span className="font-medium">Revenue:</span> {safe(keyFacts.company_revenue)}
              {keyFacts.company_revenue && keyFacts.company_revenue_currency ? " " : ""}
              {safe(keyFacts.company_revenue_currency, "")}
              {keyFacts.company_revenue_year &&
                (keyFacts.company_revenue || keyFacts.company_revenue_currency) &&
                " "}
              {keyFacts.company_revenue_year && `(${keyFacts.company_revenue_year})`}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold underline text-lg">Business Overview</h2>
          {getSourceCount(businessOverview.sources) > 0 && (
            <SourcesSheet
              trigger={
                <Button className="h-6" variant="secondary" size="xs">
                  {getSourceCount(businessOverview.sources)}
                </Button>
              }
              title="All Reference Sources"
              description={`Complete list of reference sources used for this company profile`}
              sourcesBySection={sourcesBySection}
            />
          )}
        </div>
        <div className="text-sm">{safe(businessOverview.business_description)}</div>
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold underline text-lg">Product & Services</h2>
          {getSourceCount(productServices.sources) > 0 && (
            <SourcesSheet
              trigger={
                <Button className="h-6" variant="secondary" size="xs">
                  {getSourceCount(productServices.sources)}
                </Button>
              }
              title="All Reference Sources"
              description={`Complete list of reference sources used for this company profile`}
              sourcesBySection={sourcesBySection}
            />
          )}
        </div>
        <div className="text-sm prose">{safe(productServices.product_services)}</div>
      </div>
      {hasFinancial && (
        <div className="mb-4">
          <FinancialTable data={financialRows} />
        </div>
      )}
      {hasNews && (
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold underline text-lg">Relevant News & Developments</h2>
          </div>

          <div className="text-sm space-y-4">
            {newsArr.map((item: any, idx: number) => (
              <div key={idx} className="mb-2">
                <div className="flex items-center gap-2">
                  <b>{item.news_title}</b>
                  {getSourceCount(item.news_sources) > 0 && (
                    <SourcesSheet
                      trigger={
                        <Button className="h-6" variant="secondary" size="xs">
                          {getSourceCount(item.news_sources)}
                        </Button>
                      }
                      title="All Reference Sources"
                      description={`Complete list of reference sources used for this company profile`}
                      sourcesBySection={sourcesBySection}
                    />
                  )}
                </div>
                <div>{item.news_summary}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
