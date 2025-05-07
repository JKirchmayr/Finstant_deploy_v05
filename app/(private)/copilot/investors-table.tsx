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
import { useTabPanelStore } from "@/store/tabStore"
import InvestorProfile from "@/components/InvestorProfile"

export type InvestorsProps = {
  investor_id?: string
  investor_name?: string
  investor_description?: string
  similarity_score?: number
}

export default function InvestorsResponseData({
  investors,
}: {
  investors: InvestorsProps[]
}) {
  const { addTab } = useTabPanelStore()
  const handleAddTab = (data: any) => {
    addTab(
      new Date().getTime().toString(),
      data?.investor_name || "Company",
      <InvestorProfile data={data} />
    )
  }
  const columns: ColumnDef<InvestorsProps>[] = [
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
      enablePinning: false,
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "investor_name",
      header: "investor",
      cell: ({ row }) => {
        return (
          <span
            onClick={() => handleAddTab(row.original)}
            className="underline hover:font-medium transition-all duration-200 cursor-pointer">
            {row.original.investor_name}
          </span>
        )
      },
    },
    {
      accessorKey: "investor_description",
      header: "Description",
      cell: ({ row }) => row.original.investor_description,
    },
    {
      accessorKey: "similarity_score",
      header: "Similarity",
      cell: ({ row }) => row.original.similarity_score,
    },
  ]

  console.log(investors)

  return (
    <div className="h-full flex flex-col bg-white w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold cursor-pointer">Result</h2>
      </div>
      <PinnableDataTable
        data={investors ? investors : []}
        columns={columns}
        isLoading={false}
        hasMoreData={false}
        loadMoreData={() => console.log("loadmore")}
        filterBy="investor_name"
      />
    </div>
  )
}
