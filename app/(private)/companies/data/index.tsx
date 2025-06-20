"use client"
import DataTable from "@/components/table/data-table"
import React, { useEffect, useState } from "react"
import { getColumnsForData } from "./columns"
import { useCompanies } from "@/hooks/useCompanies"
import { useCompanyFilters } from "@/store/useCompanyFilters"
import PinnableDataTable from "@/components/table/pinnable-data-table"

const Data = () => {
  const { appliedFilters, setLoading } = useCompanyFilters()

  const [from, setFrom] = useState(1)
  const pageSize = 30

  const { data, isPending, isSuccess, isStale } = useCompanies({
    ...(appliedFilters || {}),
    page: Math.ceil(from / pageSize),
    pageSize,
  })

  const [moreData, setMoreData] = useState<any[]>([])
  const [hasMoreData, setHasMoreData] = useState(false)

  useEffect(() => {
    setFrom(1)
  }, [appliedFilters])

  useEffect(() => {
    if (data && from === 1) {
      setMoreData(data)
    } else if (data && from > 1) {
      setMoreData((prev) => [...prev, ...data])
    }

    if (data && data.length < pageSize) {
      setHasMoreData(false)
    } else if (data && data.length === pageSize) {
      setHasMoreData(true)
    }
  }, [data, from])

  const loadMoreData = () => {
    if (!isPending && hasMoreData) {
      setFrom((prev) => prev + pageSize)
    }
  }

  useEffect(() => {
    if (isSuccess || !isPending || isStale) {
      setLoading(false)
    }
  }, [isSuccess, isPending, isStale])

  return (
    <div className="bg-gray-100 w-full h-full overflow-x-auto p-4">
      <PinnableDataTable
        data={moreData ?? []}
        columns={getColumnsForData(data)}
        isLoading={isPending}
        hasMoreData={hasMoreData}
        loadMoreData={loadMoreData}
        filterBy="company_name"
        defaultPinnedColumns={["select", "index", "company_name"]}
      />
    </div>
  )
}

export default Data
