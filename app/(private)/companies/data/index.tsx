"use client"
import DataTable from "@/components/table/data-table"
import React from "react"
import { columns } from "./columns"
import { useCompanies } from "@/hooks/useCompanies"
import { useCompanyFilters } from "@/store/useCompanyFilters"

const Data = () => {
  const { appliedFilters } = useCompanyFilters()
  const { data, isPending } = useCompanies(appliedFilters)

  return (
    <div className="bg-gray-100 w-full h-full overflow-x-auto p-4">
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
