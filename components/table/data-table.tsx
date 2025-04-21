"use client"
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Search, Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface IDataTableProps<T extends any> {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading: boolean
  loadMoreData: () => void
  hasMoreData: boolean
}

const DataTable = <T extends any>({
  data,
  columns,
  isLoading,
  loadMoreData,
  hasMoreData,
}: IDataTableProps<T>) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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
  })

  const observer = React.useRef<IntersectionObserver | null>(null)
  const lastRowRef = React.useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreData) {
          loadMoreData()
        }
      })

      if (node) observer.current.observe(node)
    },
    [isLoading, hasMoreData, loadMoreData]
  )

  const handleRemove = () => {
    const selectedIds = Object.keys(rowSelection)
    console.log("Removing:", selectedIds)
    // Implement remove logic here
  }

  const handleExport = () => {
    const selectedIds = Object.keys(rowSelection)
    console.log("Exporting:", selectedIds)
    // Implement export logic here
  }

  return (
    <div className="w-full flex h-full flex-col gap-3">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between h-auto md:h-7 gap-2">
        <div className="flex items-center gap-2 order-1 relative w-full md:w-auto">
          <Search size={14} className="absolute text-gray-400 left-2" />
          <Input
            placeholder="Search"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="pl-7 w-full bg-white md:w-[200px] h-7 rounded-[0px] text-xs border-gray-300"
          />
        </div>
        <div className="flex items-center gap-3 order-2 justify-between md:justify-start">
          <div className="flex items-center gap-3 order-2 justify-between md:justify-start">
            {Object.keys(rowSelection).length > 0 ? (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="h-7 text-gray-600 text-xs border border-gray-300 px-3"
                  onClick={() => handleRemove()}
                >
                  Remove
                </Button>
                <Button
                  variant="default"
                  className="h-7 text-white bg-black text-xs px-3"
                  onClick={() => handleExport()}
                >
                  Export
                </Button>
              </div>
            ) : (
              <>
                <p className="text-gray-500 text-[13px]">
                  Showing <strong className="text-gray-700">{data.length}</strong> record
                  {data.length !== 1 ? "s" : ""}.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white border border-gray-300 overflow-auto">
        <Table className="relative">
          <TableHeader className="bg-[#F3F5FF] md:bg-white h-8 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="shadow-sm">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-xs font-medium border-r border-gray-300"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-gray-600 max-h-[400px] overflow-auto">
            {isLoading ? (
              [...Array(20)].map((e, i) => (
                <TableRow key={i} className="border-b border-gray-300">
                  {[...Array(columns.length)].map((e, j) => (
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
                    const isLastRow = index === table.getRowModel().rows.length - 1
                    return (
                      <tr
                        ref={isLastRow ? lastRowRef : null}
                        key={row.id}
                        className="h-6 border-b transition-colors odd:bg-[#fbfbfb] hover:bg-gray-100/50"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="border-r border-gray-300">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </tr>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={27} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable
