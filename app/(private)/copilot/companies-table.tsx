"use client"
import { useWSStore } from "@/store/wsStore"
import { useState, useMemo } from "react"
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"
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
import PinnableDataTable from "@/components/table/pinnable-data-table"
import { Checkbox } from "@/components/ui/checkbox"

export type Company = {
  company_id: string
  company_name: string
  company_description: string
  similarity_score: number
}

export default function CompaniesData({ companies }: { companies: Company[] }) {
  const columns: ColumnDef<Company>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="mr-4"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="mr-4"
        />
      ),
      maxSize: 40,
      enableSorting: false,
      enableHiding: false,
    },
    {
      maxSize: 50,
      header: "#",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "company_name",
      header: "Company",
      cell: ({ row }) => row.original.company_name,
    },
    {
      accessorKey: "company_description",
      header: "Description",
      cell: ({ row }) => row.original.company_description,
    },
    {
      accessorKey: "similarity_score",
      header: "Similarity",
      cell: ({ row }) => row.original.similarity_score,
    },
  ]

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
      <PinnableDataTable
        data={companies ? companies : []}
        columns={columns}
        isLoading={false}
        hasMoreData={false}
        loadMoreData={() => console.log("loadmore")}
      />

      {/* Table */}
      {/* <ScrollArea className="h-full border rounded-lg w-full">
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
      </ScrollArea> */}
    </div>
  )
}
