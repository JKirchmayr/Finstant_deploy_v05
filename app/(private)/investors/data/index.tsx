"use client"
import DataTable from "@/components/table/data-table"
import React, { useEffect, useState, useRef } from "react"
import { getColumnsForData } from "./columns"
import { useInvestors } from "@/hooks/useInvestors"
import { useInvestorFilters } from "@/store/useInvestorFilters"
import PinnableDataTable from "@/components/table/pinnable-data-table"
import { toast } from "sonner"
const InvestorData = () => {
  const { appliedFilters, setLoading  } = useInvestorFilters()

  const [from, setFrom] = useState(1)
  const pageSize = 30

  const { data, isPending, isSuccess, isStale , isError} = useInvestors({
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
  useEffect(()=>{
    if(isError){
      setLoading(false)
      toast.warning('Data not available with these filters')
    }
  },[isError])

  return (
    <div className="h-full bg-gray-100 w-full overflow-x-auto p-4">
      <PinnableDataTable
        data={moreData ?? []}
        columns={getColumnsForData(data)}
        isLoading={isPending}
        hasMoreData={hasMoreData}
        loadMoreData={loadMoreData}
        filterBy="investor_name"
        defaultPinnedColumns={["select", "index", "investor_name"]}
      />
    </div>
  )
}

export default InvestorData

