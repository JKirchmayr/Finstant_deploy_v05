"use client"
import { useState } from "react"
import { ArrowUp, Copy, Download, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

interface SourcePanelProps {
  open: boolean
  sources: string[] | null | undefined
  onClose: () => void
}

function SourcePanel({ open, sources, onClose }: SourcePanelProps) {
  if (!open) return null
  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg z-50 p-6 flex flex-col animate-in slide-in-from-right duration-300">
      <h2 className="font-bold text-lg mb-2">Sources</h2>
      <ul className="list-disc pl-5 flex-1 overflow-y-auto mb-4">
        {sources && sources.length > 0 ? (
          sources.map((src: string, i: number) => (
            <li key={i}>
              <Link
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-words"
              >
                {src}
              </Link>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No sources available</li>
        )}
      </ul>
      <Button onClick={onClose} className="mt-auto" variant="destructive" size="xs">
        Close
      </Button>
    </div>
  )
}

interface CompanyProfileCardProps {
  data: any
}

export default function CompanyProfileCard({ data }: CompanyProfileCardProps) {
  const [sourcePanel, setSourcePanel] = useState<{
    open: boolean
    sources: string[] | null | undefined
  }>({ open: false, sources: [] })

  const openSources = (sources: string[] | null | undefined) =>
    setSourcePanel({ open: true, sources: sources || [] })
  const closeSources = () => setSourcePanel({ open: false, sources: [] })

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
  const newsArr = (data.company_news && data.company_news.company_news) || []

  // Helper to get source count, fallback to 0 if not array
  const getSourceCount = (sources: string[] | null | undefined) =>
    Array.isArray(sources) ? sources.length : 0

  return (
    <div className="relative max-w-3xl mx-auto my-8 bg-white border rounded-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Company Profile – {safe(header.company_name)}</h1>
        <div className="flex gap-4">
          <Button size="xs" variant="secondary">
            <Copy className="w-4 h-4" /> Copy
          </Button>
          <Button size="xs" variant="secondary">
            <ArrowUp className="w-4 h-4" /> Export PPT
          </Button>
        </div>
      </div>
      <div className="flex gap-4 items-center mb-4">
        <Image
          src={header.company_logo || "/logo.png"}
          alt="Logo"
          width={50}
          height={50}
          className="rounded bg-gray-100"
        />
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
            <Button
              onClick={() => openSources(keyFacts.sources)}
              className="h-6"
              variant="secondary"
              size="xs"
            >
              {getSourceCount(keyFacts.sources)}
            </Button>
          )}
        </div>
        <div className="text-sm">
          <div>
            <b>Entity Legal name:</b> {safe(keyFacts.company_legal_name)}
          </div>
          <div>
            <b>Founded:</b> {safe(keyFacts.company_founded)}
          </div>
          <div>
            <b>Headquarters:</b> {safe(keyFacts.company_headquarter_city)},{" "}
            {safe(keyFacts.company_headquarter_country)}
          </div>
          <div>
            <b>Employees:</b> {safe(keyFacts.company_employees)}
          </div>
          <div>
            <b>Revenue:</b> {safe(keyFacts.company_revenue)}{" "}
            {safe(keyFacts.company_revenue_currency, "")}{" "}
            {keyFacts.company_revenue_year && `(${keyFacts.company_revenue_year})`}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold underline text-lg">Business Overview</h2>
          {getSourceCount(businessOverview.sources) > 0 && (
            <Button
              onClick={() => openSources(businessOverview.sources)}
              className="h-6"
              variant="secondary"
              size="xs"
            >
              {getSourceCount(businessOverview.sources)}
            </Button>
          )}
        </div>
        <div className="text-sm">{safe(businessOverview.business_description)}</div>
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold underline text-lg">Product & Services</h2>
          {getSourceCount(productServices.sources) > 0 && (
            <Button
              onClick={() => openSources(productServices.sources)}
              className="h-6"
              variant="secondary"
              size="xs"
            >
              {getSourceCount(productServices.sources)}
            </Button>
          )}
        </div>
        <div className="text-sm prose">{safe(productServices.product_services)}</div>
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold underline text-lg">Financial information</h2>
        </div>
        {financialRows.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs border mt-2">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 border">Year</th>
                  <th className="px-2 py-1 border">Revenue ({currency})</th>
                  <th className="px-2 py-1 border">Growth (%)</th>
                  <th className="px-2 py-1 border">Net Income ({currency})</th>
                  <th className="px-2 py-1 border">Margin (%)</th>
                </tr>
              </thead>
              <tbody>
                {financialRows.map((row: any) => (
                  <tr key={row.year} className="text-center">
                    <td className="px-2 py-1 border">{row.year}</td>
                    <td className="px-2 py-1 border">{row.revenue?.toLocaleString() ?? "N/A"}</td>
                    <td className="px-2 py-1 border">
                      {row.revenue_growth_yoy !== null && row.revenue_growth_yoy !== undefined
                        ? `${row.revenue_growth_yoy > 0 ? "+" : ""}${row.revenue_growth_yoy}%`
                        : "N/A"}
                    </td>
                    <td className="px-2 py-1 border">
                      {row.net_income?.toLocaleString() ?? "N/A"}
                    </td>
                    <td className="px-2 py-1 border">
                      {row.net_income_margin !== null && row.net_income_margin !== undefined
                        ? `${row.net_income_margin}%`
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-sm text-gray-500">No financial data</div>
        )}
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold underline text-lg">Relevant News & Developments</h2>
        </div>
        <div className="text-sm space-y-4">
          {newsArr.length === 0 && <div className="text-gray-500">No news available</div>}
          {newsArr.map((item: any, idx: number) => (
            <div key={idx} className="mb-2">
              <div className="flex items-center gap-2">
                <b>{item.news_title}</b>
                {getSourceCount(item.news_sources) > 0 && (
                  <Button
                    onClick={() => openSources(item.news_sources)}
                    className="h-6"
                    variant="secondary"
                    size="xs"
                  >
                    {getSourceCount(item.news_sources)}
                  </Button>
                )}
              </div>
              <div>{item.news_summary}</div>
            </div>
          ))}
        </div>
      </div>
      <SourcePanel open={sourcePanel.open} sources={sourcePanel.sources} onClose={closeSources} />
    </div>
  )
}
