"use client"

import React, { CSSProperties, useCallback, useRef, useState } from "react"
import * as XLSX from "xlsx"
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowDownUp,
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
  ChevronLeft,
  ChevronRight,
  CopyIcon,
  EllipsisIcon,
  Loader,
  PinIcon,
  PinOffIcon,
  PlusIcon,
  Search,
  ShareIcon,
  Trash,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { cn, handleCopyAsTSV } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { ExportOptions } from "../table/export-options"
import { toast } from "sonner"
import { useSingleTabStore } from "@/store/singleTabStore"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { SourcesSheet } from "../SourcesSheet"

const getPinningStyles = <T,>(column: Column<T>): CSSProperties => {
  const isPinned = column.getIsPinned()
  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  }
}

interface FinancialRow {
  label: string
  [year: string]: string | number | null
}

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
  sourcesBySection,
  financial,
}: {
  data: FinancialDataItem[]
  hasFinancial?: boolean
  financial?: {
    consolidated: boolean
    currency: string
    legal_entity: string
  }
  sourcesBySection: {
    keyFacts: {
      name: string
      sources: any
      count: number
    }
    businessOverview: {
      name: string
      sources: any
      count: number
    }
    productServices: {
      name: string
      sources: any
      count: number
    }
    news: {
      name: string
      sources: any
      count: number
    }
  }
}) => {
  const rows = [
    { label: "Revenue", key: "revenue" },
    { label: "Growth (%)", key: "revenue_growth_yoy" },
    { label: "Net Income", key: "net_income" },
    { label: "Margin (%)", key: "net_income_margin" },
  ]

  const exportToExcel = (data: any[], filename = "export.xlsx") => {
    if (!data.length) return

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")

    XLSX.writeFile(workbook, filename)
  }

  const handleExport = (format: "csv" | "excel") => {
    const exportData = data
    const filename = `data.${format === "csv" ? "csv" : "xlsx"}`
    exportToExcel(exportData, filename)
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
            {/* <SourcesSheet
              trigger={
                <Button className="h-5 px-2 text-xs" variant="secondary" size="xs">
                  4
                </Button>
              }
              sourcesBySection={sourcesBySection}
            /> */}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm font-semibold">
            <div className="text-gray-800">
              Legal Entity:{" "}
              <span className="font-normal">{financial?.legal_entity || "N/A"}</span>
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
                onClick={() => handleExport("excel")}
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
          <Table className="border-collapse text-xs">
            <thead>
              <tr>
                <th
                  className="sticky left-0 top-0 z-10 border px-3 py-2 text-left font-medium bg-secondary"
                  style={{ willChange: "transform" }}
                >
                  (in mEUR)
                </th>
                {data.map((d) => (
                  <th
                    key={d.year}
                    className="border px-3 py-2 text-right italic font-semibold bg-secondary/80"
                    style={{ width: "100px" }}
                  >
                    {d.year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <td
                    className="sticky left-0 z-10 border px-3 py-2 text-left font-medium bg-secondary"
                    style={{ willChange: "transform" }}
                  >
                    {row.label}
                  </td>
                  {data.map((d) => (
                    <td
                      key={d.year}
                      className="border px-3 py-2 text-right italic"
                      style={{ width: "100px" }}
                    >
                      {d[row.key as keyof typeof d] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <p>No financial information available</p>
      )}
    </div>
  )
}
