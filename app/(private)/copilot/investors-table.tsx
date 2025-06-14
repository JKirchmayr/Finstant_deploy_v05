"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { GenerateSkeleton } from "./generate-skeleton"
import Image from "next/image"
import ChatDataTable from "@/components/chat/ChatDataTable"
import InvestorSheet from "@/components/InvestorSheet"

export type InvestorsProps = {
  investor_id: string
  investor_name?: string
  investor_description?: string
  investor_website?: string
  investor_type?: string
  investor_country?: string
  investor_city?: string
  investor_founded_year?: number
  investor_strategy?: string
  investor_sector_focus?: string
  investor_investment_criteria?: string
  similarity_score?: number
  investor_logo?: string
  investor_selected_investments?: {
    company_id: number
    company_name: string
    company_logo: string
    investment_year: number | null
  }[]
}

export default function InvestorsResponseData({
  investors,
  loading,
  togglePanel,
}: {
  investors: InvestorsProps[]
  loading: boolean
  togglePanel: () => void
}) {
  const columns: ColumnDef<InvestorsProps>[] = [
    {
      id: "select",
      size: 60,
      minSize: 60,
      maxSize: 50,
      header: ({ table }) => (
        <div className="flex justify-center items-center w-full gap-2">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
          <div className="text-center">#</div>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center w-full gap-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
          <div className="text-center">{row.index + 1}</div>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "investor_name",
      header: loading ? "Generating" : "Investor Name",
      cell: ({ row }) => {
        return (
          <InvestorSheet
            investor={{
              ...row.original,
              id: Number(row.original.investor_id),
              name: row.original.investor_name,
              investor_linkedin_logo: row.original.investor_logo,
              description: row.original.investor_description,
            }}
          >
            <button
              disabled={loading}
              className="hover:underline items-center inline-flex cursor-pointer hover:font-medium transition-all duration-200 text-left w-full"
              type="button"
            >
              <Image
                src={row.original.investor_logo || "https://placehold.co/50x50.png"}
                alt={`${row.original.investor_name} logo`}
                width={18}
                height={18}
                className="mr-1.5 rounded"
                unoptimized={true}
              />
              <GenerateSkeleton isPlaceholder={loading} text={row.original.investor_name} />
            </button>
          </InvestorSheet>
        )
      },
    },
    {
      accessorKey: "investor_description",
      header: loading ? "Generating" : "Description",
      cell: ({ row }) => (
        <GenerateSkeleton isPlaceholder={loading} text={row.original.investor_description} />
      ),
    },
    {
      accessorKey: "investor_website",
      header: loading ? "Generating" : "Website",
      cell: ({ row }) => (
        <GenerateSkeleton isPlaceholder={loading} text={row.original.investor_website} />
      ),
    },
    {
      accessorKey: "investor_country",
      header: loading ? "Generating" : "Location",
      cell: ({ row }) => (
        <GenerateSkeleton
          isPlaceholder={loading}
          text={`${row.original.investor_city}, ${row.original.investor_country}`}
        />
      ),
    },
    {
      accessorKey: "investor_founded_year",
      header: loading ? "Generating" : "Founded",
      cell: ({ row }) => (
        <GenerateSkeleton isPlaceholder={loading} text={row.original.investor_founded_year} />
      ),
    },
    {
      accessorKey: "investor_type",
      header: loading ? "Generating" : "Type",
      cell: ({ row }) => (
        <GenerateSkeleton isPlaceholder={loading} text={row.original.investor_type} />
      ),
    },
    {
      accessorKey: "investor_strategy",
      header: loading ? "Generating" : "Strategy",
      cell: ({ row }) => (
        <GenerateSkeleton isPlaceholder={loading} text={row.original.investor_strategy} />
      ),
    },
    {
      accessorKey: "investor_sector_focus",
      header: loading ? "Generating" : "Sector Focus",
      cell: ({ row }) => (
        <GenerateSkeleton isPlaceholder={loading} text={row.original.investor_sector_focus} />
      ),
    },
    {
      accessorKey: "investor_investment_criteria",
      header: loading ? "Generating" : "Investment Criteria",
      cell: ({ row }) => (
        <GenerateSkeleton
          isPlaceholder={loading}
          text={row.original.investor_investment_criteria}
        />
      ),
    },
    {
      accessorKey: "similarity_score",
      header: loading ? "Generating" : "Similarity",
      cell: ({ row }) => (
        <GenerateSkeleton isPlaceholder={loading} text={row.original.similarity_score} />
      ),
    },
  ]

  return (
    <div className="h-full flex flex-col bg-white w-full pt-1.5 ">
      <ChatDataTable
        data={investors}
        columns={columns}
        isLoading={loading}
        hasMoreData={false}
        loadMoreData={() => {}}
        filterBy="investor_name"
        topbarClass="px-1.5 mb-1.5"
        defaultPinnedColumns={["select", "investor_name"]}
        titleName="Investors List"
        togglePanel={togglePanel}
      />
    </div>
  )
}
