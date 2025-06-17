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
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
  EllipsisIcon,
  Loader,
  PinIcon,
  PinOffIcon,
  Search,
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
import { DataTablePagination } from "./Pagination"
import { ExportOptions } from "./export-options"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Image from "next/image"

interface IPinnableDataTableProps<T extends any> {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading: boolean
  loadMoreData: () => void
  hasMoreData: boolean
  paginationOption?: boolean
  filterBy?: string
  defaultPinnedColumns?: string[]
  topbarClass?: string
  noSearch?: boolean
}

// Helper function to compute pinning styles for columns
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

const PinnableDataTable = <T extends any>({
  data,
  columns,
  isLoading,
  loadMoreData,
  hasMoreData,
  paginationOption = true,
  topbarClass,
  filterBy = "name",
  defaultPinnedColumns = [],
  noSearch = false,
}: IPinnableDataTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const pathname = usePathname()
  const investors = pathname === "/investors"
  const companies = pathname === "/companies"

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    columnResizeMode: "onChange",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      columnPinning: {
        left: defaultPinnedColumns,
        right: [],
      },
    },
  })

  const observer = useRef<IntersectionObserver | null>(null)
  const lastRowRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMoreData) {
          loadMoreData()
        }
      })

      if (node) observer.current.observe(node)
    },
    [isLoading, hasMoreData, loadMoreData]
  )

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

  const handleExport = (format: "csv" | "excel") => {
    const selectedRows = table.getSelectedRowModel().rows.map(row => row.original)
    const exportData = selectedRows.length ? selectedRows : data
    const filename = `${selectedRows.length ? "selected" : "all"}-data.${
      format === "csv" ? "csv" : "xlsx"
    }`

    format === "csv" ? exportToCSV(exportData, filename) : exportToExcel(exportData, filename)
  }

  return (
    <div className="w-full flex h-full flex-col gap-3">
      {!noSearch && (
        <div
          className={cn(
            "flex flex-col md:flex-row md:items-center md:justify-between h-auto md:h-7 gap-2 w-full",
            topbarClass
          )}
        >
          <div className="flex items-center gap-2 order-1 relative w-full md:w-auto ">
            <Search size={14} className="absolute text-gray-400 left-2" />
            <Input
              placeholder="Search"
              value={(table.getColumn(filterBy)?.getFilterValue() as string) ?? ""}
              onChange={event => table.getColumn(filterBy)?.setFilterValue(event.target.value)}
              className="pl-7 focus-visible:ring-0 bg-white border-gray-300"
            />
          </div>
          {data.length > 0 && (
            <div className="flex items-center gap-3 order-2 justify-between md:justify-start">
              <p className="text-gray-500 text-[13px]">
                Showing <strong className="text-gray-700">{data.length}</strong> record
                {data.length !== 1 && "s"}.
              </p>
              <ExportOptions
                data={
                  Object.keys(rowSelection).length > 0
                    ? Object.keys(rowSelection).map(index => data[Number(index)])
                    : data
                }
                onExport={(format: "csv" | "excel") => handleExport(format)}
              />
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col w-full bg-white border overflow-x-scroll">
        <Table
          className="!w-full bg-background [&_td]:border-border table-fixed border-separate border-spacing-0 [&_tfoot_td]:border-t [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b [&_thead]:border-b-0 [&_th]:px-4 [&_td]:pl-4 [&_th:has([role=checkbox])]:pr-0 [&_td:first-child]:!px-4 [&_th:first-child]:!px-4"
          style={{ width: table.getTotalSize() }}
        >
          <TableHeader className="bg-white text-[13px] h-8 sticky top-0 z-10">
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
                      className="text-foreground/70 group [&[data-pinned][data-last-col]]:border-border border-b data-pinned:bg-muted/90 relative h-10 truncate data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-l-0"
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

                        {header.column.getCanResize() && (
                          <div
                            {...{
                              onDoubleClick: () => header.column.resetSize(),
                              onMouseDown: header.getResizeHandler(),
                              onTouchStart: header.getResizeHandler(),
                              className:
                                "absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:-translate-x-px",
                            }}
                          />
                        )}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className=" max-h-[400px] overflow-auto">
            {isLoading && !data.length ? (
              [...Array(20)].map((_, i) => (
                <TableRow key={i} className="border-b border-gray-300">
                  {[...Array(columns.length)].map((_, j) => (
                    <TableCell key={j} className="py-4 min-h-[73px] border-r border-gray-300">
                      <Skeleton className="w-full h-4 bg-gray-100" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row, index) => {
                    const isLastRow = index === table.getRowModel().rows.length - 5
                    return (
                      <TableRow
                        ref={isLastRow ? lastRowRef : null}
                        key={row.id}
                        className="min-h-6 border-b transition-colors hover:bg-gray-100/80"
                      >
                        {row.getVisibleCells().map((cell: any) => {
                          const { column } = cell
                          const isPinned = column.getIsPinned()
                          const isLastLeftPinned =
                            isPinned === "left" && column.getIsLastColumn("left")
                          const isFirstRightPinned =
                            isPinned === "right" && column.getIsFirstColumn("right")

                          return (
                            <TableCell
                              key={cell.id}
                              className="py-2.5 [&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 truncate data-pinned:backdrop-blur-xs [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l border-r border-gray-300"
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
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={investors ? 8 : 5}>
                      <div className="h-40 text-center text-lg font-medium flex justify-center items-center flex-col shrink-0">
                        <Image
                          src="/images/no-data.png"
                          alt="No data"
                          width={150}
                          height={150}
                          className="shrink-0"
                          style={{ mixBlendMode: "multiply" }}
                        />
                        <p className="text-sm text-muted-foreground"> No results.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {isLoading && data.length > 0 && (
        <div className="h-20 py-2 -mt-2.5 border border-t-0 flex justify-center items-center bg-white text-center">
          <Loader className="animate-spin mx-auto" />
        </div>
      )}
      {/* {paginationOption && data.length > 9 && (
        <DataTablePagination table={table} />
      )} */}
    </div>
  )
}

export default PinnableDataTable
