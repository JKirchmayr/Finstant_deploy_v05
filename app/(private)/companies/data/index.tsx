"use client"
import DataTable from "@/components/table/data-table"
import React, { useEffect, useState, useRef } from "react"
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

  // Track last applied filters to detect new search
  const lastFiltersRef = useRef<any>(null)

  useEffect(() => {
    // If filters changed, it's a new search
    if (JSON.stringify(appliedFilters) !== JSON.stringify(lastFiltersRef.current)) {
      setFrom(1)
      setLoading(true)
      lastFiltersRef.current = appliedFilters
    }
  }, [appliedFilters, setLoading])

  useEffect(() => {
    if (data && from === 1) {
      setMoreData(data)
      setLoading(false) // Only stop loading for first page (new search)
    } else if (data && from > 1) {
      setMoreData((prev) => [...prev, ...data])
    }

    if (data && data.length < pageSize) {
      setHasMoreData(false)
    } else if (data && data.length === pageSize) {
      setHasMoreData(true)
    }
  }, [data, from, setLoading, pageSize])

  const loadMoreData = () => {
    if (!isPending && hasMoreData) {
      setFrom((prev) => prev + pageSize)
    }
  }

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
