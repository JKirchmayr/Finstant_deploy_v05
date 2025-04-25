"use client"
import { useWSStore } from "@/store/wsStore"
import { useState, useMemo } from "react"
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { Pencil } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ListBuilder() {
  const { companies } = useWSStore()
  const [listName, setListName] = useState("Untitled List")
  const [editingName, setEditingName] = useState(false)

  const SearchPlaceholder = () => (
    <div className="flex items-center gap-1 text-gray-400 text-xs">
      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
      <span>Searching...</span>
    </div>
  )

  // 🧠 Table Columns
  const columns = useMemo<ColumnDef<(typeof companies)[0]>[]>(
    () => [
      {
        header: "#",
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "company_name",
        header: "Company",
        cell: ({ row }) =>
          row.original.company_id.startsWith("placeholder-") ? (
            <SearchPlaceholder />
          ) : (
            row.original.company_name
          ),
      },
      {
        accessorKey: "company_description",
        header: "Description",
        cell: ({ row }) =>
          row.original.company_id.startsWith("placeholder-") ? (
            <SearchPlaceholder />
          ) : (
            row.original.company_description
          ),
      },
      {
        accessorKey: "similarity_score",
        header: "Similarity",
        cell: ({ row }) =>
          row.original.company_id.startsWith("placeholder-") ? (
            <SearchPlaceholder />
          ) : typeof row.original.similarity_score === "number" ? (
            row.original.similarity_score
          ) : (
            row.original.similarity_score
          ),
      },
    ],
    [companies]
  )

  const table = useReactTable({
    data: companies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="h-full flex flex-col p-4 border-l bg-white w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold cursor-pointer">Result</h2>
      </div>

      {/* Table */}
      <ScrollArea className="h-full border rounded-lg w-full">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="odd:bg-gray-50 border-b border-gray-300">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3 text-gray-800 border-l border-gray-300">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
