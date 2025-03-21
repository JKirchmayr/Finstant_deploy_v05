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
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  loadMoreData: () => void // New prop to load more data
  hasMoreData: boolean // New prop to indicate if more data is available
}

const DataTable = <T extends any>({
  data,
  columns,
  isLoading,
  loadMoreData, // Infinite scroll load more data
  hasMoreData, // Check if more data is available
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

  // Scroll observer to trigger loading more data
  const observer = React.useRef<IntersectionObserver | null>(null)
  const lastRowRef = React.useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreData) {
          loadMoreData() // Trigger loading more data when near the end of the table
        }
      })

      if (node) observer.current.observe(node)
    },
    [isLoading, hasMoreData, loadMoreData]
  )

 
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between h-7">
        <div className="text-sm py-0.5 order-2 rounded-md flex items-center gap-3">
          <p className="text-gray-500 text-[13px]">
            Showing <strong className="text-gray-700">{data.length}</strong> record
            {data.length !== 1 ? "s" : ""}.
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto h-7 text-gray-600 text-xs">
                <Settings2 size={14} className="mr-1" /> Views
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize tex-xs text-gray-600"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 order-1 relative">
          <Search size={14} className="absolute text-gray-400 left-2" />
          <Input
            placeholder="Search"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="ml-auto pl-7 w-[200px] h-7 text-xs rounded-sm border-gray-300"
          />
        </div>
      </div>
      <div className="flex-1 bg-white border border-gray-300 rounded-md overflow-auto">
        <Table className="relative">
          <TableHeader className="bg-[#F3F5FF] md:bg-white h-8 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="shadow-sm">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-xs font-medium ">
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
              [...Array(10)].map((e, i) => (
                <TableRow key={i} className="border-b border-gray-300">
                  {[...Array(columns.length)].map((e, j) => (
                    <TableCell key={j} className="py-4 min-h-[73px]">
                      <Skeleton className="w-full h-4 bg-gray-100" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <AnimatePresence>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row, index) => {
                    const isLastRow = index === table.getRowModel().rows.length - 1
                    return (
                      <motion.tr
                        ref={isLastRow ? lastRowRef : null} // Attach observer to the last row
                        key={row.id}
                        className="h-6 border-b transition-colors hover:bg-gray-100/50"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </motion.tr>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={27} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable
