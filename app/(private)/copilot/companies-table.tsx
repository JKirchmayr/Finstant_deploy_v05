"use client"

import { ColumnDef } from "@tanstack/react-table"
import PinnableDataTable from "@/components/table/pinnable-data-table"
import { Checkbox } from "@/components/ui/checkbox"
import { useTabPanelStore } from "@/store/tabStore"
import CompanyProfile from "@/components/CompanyProfile"
import { GenerateSkeleton } from "./generate-skeleton"
import Image from "next/image"

export type Company = {
  company_id: string
  company_name: string
  company_description: string
  similarity_score: number
}

export default function CompaniesData({ companies }: { companies: Company[] }) {
  const { addTab } = useTabPanelStore()

  console.log(companies, "companies")

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
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="mr-4"
          disabled={table
            .getFilteredRowModel()
            .rows.some(row => row.original.company_id.includes("placeholder"))}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="mr-4"
          disabled={row.original.company_id.includes("placeholder")}
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
      cell: ({ row }) => (
        <GenerateSkeleton
          isPlaceholder={row.original.company_id.includes("placeholder")}
          text={(row.index + 1).toString()}
        />
      ),
    },
    {
      accessorKey: "company_name",
      header: "Company",
      cell: ({ row }) => {
        return (
          <button
            onClick={() => handleAddTab(row.original)}
            disabled={row.original.company_id.includes("placeholder")}
            className="hover:underline inline-flex cursor-pointer hover:font-medium transition-all duration-200 text-left w-full"
            type="button">
            <Image
              src="/images/portfolio_company.png"
              width={16}
              height={16}
              alt="Company"
              className="mr-1"
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
      header: "Description",
      cell: ({ row }) => (
        <GenerateSkeleton
          isPlaceholder={row.original.company_id.includes("placeholder")}
          text={row.original.company_description}
        />
      ),
    },
    {
      accessorKey: "similarity_score",
      header: "Similarity",
      cell: ({ row }) => (
        <GenerateSkeleton
          isPlaceholder={row.original.company_id.includes("placeholder")}
          text={row.original.similarity_score.toString()}
        />
      ),
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
