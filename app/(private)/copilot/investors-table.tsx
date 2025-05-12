"use client"

import { ColumnDef } from "@tanstack/react-table"
import PinnableDataTable from "@/components/table/pinnable-data-table"
import { Checkbox } from "@/components/ui/checkbox"
import { useTabPanelStore } from "@/store/tabStore"
import { GenerateSkeleton } from "./generate-skeleton"
import Image from "next/image"
import ChatDataTable from "@/components/chat/data-table"
import { ExpandableCell } from "@/components/table/epandable-cell"

export type InvestorsProps = {
  investor_id: string
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
      data?.investor_id || data?.investor_name,
      data?.investor_name || "Investor",
      "investor-profile",
      data,
      data?.investor_id
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
          disabled={table
            .getFilteredRowModel()
            .rows.some(row =>
              row.original.investor_id?.includes("placeholder")
            )}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="mr-4"
          disabled={row.original.investor_id?.includes("placeholder")}
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
          isPlaceholder={row.original.investor_id?.includes("placeholder")}
          text={(row.index + 1).toString()}
        />
      ),
    },
    {
      accessorKey: "investor_name",
      header: "Investor",
      cell: ({ row }) => (
        <button
          onClick={() => handleAddTab(row.original)}
          disabled={row.original.investor_id?.includes("placeholder")}
          className="hover:underline items-center cursor-pointer inline-flex hover:font-medium transition-all duration-200 text-left w-full"
          type="button">
          <Image
            src="https://placehold.co/50x50"
            alt="logo"
            width={18}
            height={18}
            className="mr-1.5 rounded"
            unoptimized={true}
          />
          <GenerateSkeleton
            isPlaceholder={row.original.investor_id?.includes("placeholder")}
            text={row.original.investor_name || ""}
          />
        </button>
      ),
    },
    {
      accessorKey: "investor_description",
      header: "Description",
      cell: ({ row }) =>
        row.original.investor_id?.includes("placeholder") ? (
          <GenerateSkeleton
            isPlaceholder={row.original.investor_id?.includes("placeholder")}
            text={row.original.investor_description || ""}
          />
        ) : (
          <ExpandableCell>
            {row.original.investor_description || ""}
          </ExpandableCell>
        ),
    },
    {
      accessorKey: "similarity_score",
      header: "Similarity",
      cell: ({ row }) => (
        <GenerateSkeleton
          isPlaceholder={row.original.investor_id?.includes("placeholder")}
          text={row.original.similarity_score?.toString() || ""}
        />
      ),
    },
  ]

  return (
    <div className="h-full flex flex-col bg-white w-full pt-1 ">
      <ChatDataTable
        data={investors || []}
        columns={columns}
        isLoading={false}
        hasMoreData={false}
        loadMoreData={() => console.log("loadmore")}
        filterBy="investor_name"
        topbarClass="px-1"
      />
    </div>
  )
}
