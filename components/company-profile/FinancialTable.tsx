"use client"

import React from "react"
import * as XLSX from "xlsx"
import { CopyIcon, ShareIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableCell } from "@/components/ui/table"
import { handleCopyAsTSV } from "@/lib/utils"
import { toast } from "sonner"

interface FinancialDataItem {
  year: number
  revenue: number | null
  revenue_growth_yoy: number | null
  net_income: number | null
  net_income_margin: number | null
}

export const FinancialTable = ({
  data,
  hasFinancial,
  financial,
}: {
  data: FinancialDataItem[]
  hasFinancial?: boolean
  financial?: {
    consolidated: boolean
    currency: string
    legal_entity: string
  }
  sourcesBySection: any
}) => {
  const rows = [
    { label: "Revenue", key: "revenue" },
    { label: "Growth (%)", key: "revenue_growth_yoy" },
    { label: "Net Income", key: "net_income" },
    { label: "Margin (%)", key: "net_income_margin" },
  ]

  console.log(financial)

  const exportToExcel = (data: any[], filename = "export.xlsx") => {
    if (!data.length) return
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
    XLSX.writeFile(workbook, filename)
  }

  const handleExport = () => {
    exportToExcel(data, "data.xlsx")
  }

  const handleCopySelected = () => {
    handleCopyAsTSV(data)
    toast.success("Copied to clipboard")
  }

  return (
    <div className="w-full flex h-full flex-col gap-2 pb-4">
      <div className="w-full">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-semibold underline text-base">Financial Information</h2>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm font-semibold">
            <div className="text-gray-800">
              Legal Entity: <span className="font-normal">{financial?.legal_entity || "N/A"}</span>
            </div>
            <div className="text-gray-800">
              Consolidated:{" "}
              <span className="font-normal">
                {typeof financial?.consolidated === "boolean"
                  ? financial.consolidated
                    ? "Yes"
                    : "No"
                  : "N/A"}
              </span>
            </div>
          </div>
          {hasFinancial && (
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="xs"
                className="hover:bg-gray-300"
                onClick={handleCopySelected}
              >
                Copy <CopyIcon className="size-3.5" />
              </Button>

              <Button
                variant="secondary"
                size="xs"
                onClick={handleExport}
                className="h-7 py-1 text-xs hover:bg-gray-300"
              >
                Export <ShareIcon className="size-3.5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {data?.length > 0 ? (
        <div className="overflow-x-auto w-full">
          <table className="border-collapse text-xs table-fixed w-max min-w-full">
            <thead>
              <tr>
                <th
                  className="sticky left-0 top-0 z-10 border px-3 py-2 text-left font-medium bg-secondary w-24"
                  style={{ willChange: "transform" }}
                >
                  (in mEUR)
                </th>
                {data.map(d => (
                  <th
                    key={d.year}
                    className="border px-3 py-2 text-right italic font-semibold bg-secondary/80 w-24"
                  >
                    {d.year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.key}>
                  <td
                    className="sticky left-0 z-10 border px-3 py-2 text-left font-medium text-xs bg-secondary w-24"
                    style={{ willChange: "transform" }}
                  >
                    {row.label}
                  </td>
                  {data.map(d => (
                    <td
                      key={d.year}
                      className="border px-3 py-2 text-right italic whitespace-nowrap w-24"
                    >
                      {d[row.key as keyof typeof d] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No financial information available</p>
      )}
    </div>
  )
}
