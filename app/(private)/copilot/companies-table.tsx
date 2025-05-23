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
import PinnableDataTable from "@/components/table/pinnable-data-table"
import { Checkbox } from "@/components/ui/checkbox"
import { useTabPanelStore } from "@/store/tabStore"
import CompanyProfile from "@/components/CompanyProfile"
import { GenerateSkeleton } from "./generate-skeleton"
import Image from "next/image"
import ChatDataTable from "@/components/chat/data-table"

export type Company = {
  company_id: string
  company_name: string
  company_description: string
  similarity_score: number
}

export default function CompaniesData({ companies }: { companies: Company[] }) {
  const { addTab } = useTabPanelStore()

  // console.log(companies, "companies")

  const isPlaceholder = companies.some(company => company.company_id.includes("placeholder"))

  console.log(isPlaceholder, "isPlaceholder")

  const handleAddTab = (data: any) => {
    addTab(
      data?.compay_id || data?.company_name,
      data?.company_name || "Company",
      "company-profile",
      data,
      data?.company_id
    )
  }
  const columns: ColumnDef<Company>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="mx-auto"
            disabled={table
              .getFilteredRowModel()
              .rows.some(row => row.original.company_id.includes("placeholder"))}
          />
        </div>
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="mx-auto"
          disabled={row.original.company_id.includes("placeholder")}
        />
      ),
      maxSize: 50,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "index",
      maxSize: 45,
      header: ({}) => (
        <div className="flex items-center justify-center">{isPlaceholder ? "Generating" : "#"}</div>
      ),
      enablePinning: false,
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-center">
          <GenerateSkeleton
            isPlaceholder={row.original.company_id.includes("placeholder")}
            text={(row.index + 1).toString()}
          />
        </div>
      ),
    },
    {
      accessorKey: "company_name",
      header: isPlaceholder ? "Generating" : "Company",
      cell: ({ row }) => {
        return (
          <button
            onClick={() => handleAddTab(row.original)}
            disabled={row.original.company_id.includes("placeholder")}
            className="hover:underline items-center inline-flex cursor-pointer hover:font-medium transition-all duration-200 text-left w-full"
            type="button"
          >
            <Image
              src="https://placehold.co/50x50"
              alt="logo"
              width={18}
              height={18}
              className="mr-1.5 rounded"
              unoptimized={true}
            />
            <GenerateSkeleton
              isPlaceholder={row.original.company_id.includes("placeholder")}
              text={row.original.company_name}
            />
          </button>
        )
      },
    },
    {
      accessorKey: "company_description",
      header: isPlaceholder ? "Generating" : "Description",
      cell: ({ row }) => (
        <GenerateSkeleton
          isPlaceholder={row.original.company_id.includes("placeholder")}
          text={row.original.company_description}
        />
      ),
    },
    {
      accessorKey: "similarity_score",
      header: isPlaceholder ? "Generating" : "Similarity",
      cell: ({ row }) => (
        <GenerateSkeleton
          isPlaceholder={row.original.company_id.includes("placeholder")}
          text={row.original.similarity_score.toString()}
        />
      ),
    },
  ]

  const table = useReactTable({
    data: companies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="h-full flex flex-col bg-white w-full pt-1.5 ">
      <ChatDataTable
        data={companies ? companies : []}
        columns={columns}
        isLoading={false}
        hasMoreData={false}
        loadMoreData={() => console.log("loadmore")}
        filterBy="company_name"
        topbarClass="px-1.5 mb-1.5"
        // defaultPinnedColumns={["index", "select", "company_name"]}
      />
    </div>
  )
}
