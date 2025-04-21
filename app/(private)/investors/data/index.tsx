"use client"
import DataTable from "@/components/table/data-table"
import React from "react"
import { columns } from "./columns"
import { useInvestors } from "@/hooks/useInvestors"
import { useInvestorFilters } from "@/store/useInvestorFilters"
const Data = () => {
  const { appliedFilters } = useInvestorFilters()
  const { data, isPending } = useInvestors(appliedFilters)

  return (
    <div className="h-full bg-gray-100 w-full overflow-x-auto p-4">
      <DataTable
        data={data ? data : []}
        columns={columns}
        isLoading={isPending}
        hasMoreData={false}
        loadMoreData={() => console.log("loadmore")}
      />
    </div>
  )
}

export default Data
