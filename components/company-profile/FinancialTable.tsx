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
  const transformedData: FinancialRow[] = [
    {
      label: "Revenue",
      ...Object.fromEntries(data.map(d => [d.year, d.revenue?.toLocaleString() ?? "N/A"])),
    },
    {
      label: "Growth (%)",
      ...Object.fromEntries(
        data.map(d => [
          d.year,
          d.revenue_growth_yoy != null
            ? `${d.revenue_growth_yoy > 0 ? "+" : ""}${d.revenue_growth_yoy}%`
            : "N/A",
        ])
      ),
    },
    {
      label: "Net Income",
      ...Object.fromEntries(data.map(d => [d.year, d.net_income?.toLocaleString() ?? "N/A"])),
    },
    {
      label: "Margin (%)",
      ...Object.fromEntries(
        data.map(d => [d.year, d.net_income_margin != null ? `${d.net_income_margin}%` : "N/A"])
      ),
    },
  ]

  const columns: ColumnDef<FinancialRow>[] = [
    {
      header: "(in mEUR)",
      accessorKey: "label",
      cell: info => info.getValue(),
    },
    ...data.map(d => ({
      header: `${d.year}`,
      accessorKey: `${d.year}`,
      cell: (info: { getValue: () => any }) => info.getValue(),
    })),
  ]

  const table = useReactTable({
    data: transformedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    columnResizeMode: "onChange",

    initialState: {
      columnPinning: {
        left: ["label"],
        right: [],
      },
    },
  })

  const exportToCSV = (data: any[], filename = "export.csv") => {
    if (!data.length) return

    const headers = Object.keys(data[0])
    const csvRows = [
      headers.join(","),
      ...data.map(row =>
        headers
          .map(field => {
            const val = row[field]
            const escaped = typeof val === "string" ? `"${val.replace(/"/g, '""')}"` : val
            return escaped ?? ""
          })
          .join(",")
      ),
    ]

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.display = "none"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToExcel = (data: any[], filename = "export.xlsx") => {
    if (!data.length) return

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")

    XLSX.writeFile(workbook, filename)
  }

  const selectedRows = table.getSelectedRowModel().rows.map(row => row.original)
  const handleExport = (format: "csv" | "excel") => {
    const exportData = selectedRows.length ? selectedRows : data
    const filename = `${selectedRows.length ? "selected" : "all"}-data.${
      format === "csv" ? "csv" : "xlsx"
    }`

    format === "csv" ? exportToCSV(exportData, filename) : exportToExcel(exportData, filename)
  }

  const handleCopySelected = () => {
    handleCopyAsTSV(data)
    toast.success("Copied to clipboard")
  }

  return (
    <div className="w-full flex h-full flex-col gap-2 pb-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold underline text-lg">Financial information</h2>
          <SourcesSheet
            trigger={
              <Button className="h-6" variant="secondary" size="xs">
                4
              </Button>
            }
            sourcesBySection={sourcesBySection}
          />
        </div>
        <div className="flex items-center">
          <div className="flex flex-col items-end mr-4">
            <div className="text-sm font-medium">
              Legal Entity: <span className="text-gray-700">Siemens AG</span>
            </div>
            <div className="text-sm font-medium">
              Consolidated: <span className="text-gray-700">Yes/No</span>
            </div>
          </div>

          {hasFinancial && (
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="xs"
                className="hover:bg-gray-300"
                disabled={!selectedRows.length && !data.length}
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
        <div className="flex flex-col w-full bg-white border overflow-auto overflow-x-auto">
          <Table
            className="!w-full bg-background [&_td]:border-border table-fixed border-separate border-spacing-0 [&_tfoot_td]:border-t [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b [&_thead]:border-b-0 [&_th]:px-2 [&_td]:pl-2 [&_th:has([role=checkbox])]:pr-0 [&_td:first-child]:!px-2 [&_th:first-child]:!px-2"
            style={{ width: table.getTotalSize() }}
          >
            <TableHeader className="bg-white text-[13px] sticky top-0 z-10">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="bg-muted/50">
                  {headerGroup.headers.map(header => {
                    const { column } = header
                    const isPinned = column.getIsPinned()
                    const isLastLeftPinned = isPinned === "left" && column.getIsLastColumn("left")
                    const isFirstRightPinned =
                      isPinned === "right" && column.getIsFirstColumn("right")

                    return (
                      <TableHead
                        key={header.id}
                        className="text-foreground/70 group border-border border [&[data-pinned][data-last-col]]:border-border border-b data-pinned:bg-muted/90 relative h-8 truncate data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-l-0"
                        colSpan={header.colSpan}
                        style={{ ...getPinningStyles(column) }}
                        data-pinned={isPinned || undefined}
                        data-last-col={
                          isLastLeftPinned ? "left" : isFirstRightPinned ? "right" : undefined
                        }
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate w-full flex">
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </span>
                          {!!header.column.columnDef.enableSorting &&
                            header.column.getCanSort() && (
                              <Button
                                variant="ghost"
                                size="xs"
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                <ArrowDownUp className="size-4" />
                              </Button>
                            )}
                        </div>
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className=" max-h-[400px] overflow-auto">
              {table.getRowModel().rows.map((row, index) => {
                const isLastRow = index === table.getRowModel().rows.length - 5
                return (
                  <TableRow
                    key={row.id}
                    className="min-h-5 border-b transition-colors hover:bg-gray-100/80"
                  >
                    {row.getVisibleCells().map((cell: any) => {
                      const { column } = cell
                      const isPinned = column.getIsPinned()
                      const isLastLeftPinned = isPinned === "left" && column.getIsLastColumn("left")
                      const isFirstRightPinned =
                        isPinned === "right" && column.getIsFirstColumn("right")

                      return (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            "py-2 [&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 truncate data-pinned:backdrop-blur-xs [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l border-r border-gray-300",
                            cell.column.id !== "label" && "text-right pr-3"
                          )}
                          style={{ ...getPinningStyles(column) }}
                          data-pinned={isPinned || undefined}
                          data-last-col={
                            isLastLeftPinned ? "left" : isFirstRightPinned ? "right" : undefined
                          }
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No financial information available</p>
      )}
    </div>
  )
}
