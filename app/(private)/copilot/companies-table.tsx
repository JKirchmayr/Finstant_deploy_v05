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
import CompanyProfile from "@/components/CompanyProfile"

export type Company = {
  company_id: string
  company_name: string
  company_description: string
  similarity_score: number
}

export default function CompaniesData({ companies }: { companies: Company[] }) {
  const { addTab } = useTabPanelStore()
  const handleAddTab = (data: any) => {
    addTab(
      data?.compay_id || data?.company_name,
      data?.company_name || "Company",
      <CompanyProfile data={data} />
    )
  }
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
      enablePinning: false,
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "company_name",
      header: "Company",
      cell: ({ row }) => {
        return (
          <span
            onClick={() => handleAddTab(row.original)}
            className="hover:underline hover:font-medium transition-all duration-200 cursor-pointer">
            {row.original.company_name}
          </span>
        )
      },
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

  return (
    <div className="h-full flex flex-col bg-white w-full pt-1">
      <PinnableDataTable
        data={companies ? companies : []}
        columns={columns}
        isLoading={false}
        hasMoreData={false}
        loadMoreData={() => console.log("loadmore")}
        filterBy="company_name"
        topbarClass="px-1"
      />
    </div>
  )
}
