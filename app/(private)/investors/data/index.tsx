"use client"
import DataTable from "@/components/table/data-table"
import React, { useEffect } from "react"
import { getColumnsForData } from "./columns"
import { useInvestors } from "@/hooks/useInvestors"
import { useInvestorFilters } from "@/store/useInvestorFilters"
import PinnableDataTable from "@/components/table/pinnable-data-table"
const InvestorData = () => {
  const { appliedFilters, setLoading } = useInvestorFilters()
  console.log(appliedFilters, "appliedFilters")

  const [from, setFrom] = React.useState(1)
  const [to, setTo] = React.useState(30)

  const { data, isPending, isSuccess, isError } = useInvestors({
    ...(appliedFilters || {}),
    from,
    to,
  })

  const [moreData, setMoreData] = React.useState<any[]>([])
  const [hasMoreData, setHasMoreData] = React.useState(false)

  React.useEffect(() => {
    if (data && from === 1) {
      setMoreData(data)
    } else if (data && from > 1) {
      setMoreData((prev) => [...prev, ...data])
    }
    if (data && data.length < to - from + 1) {
      setHasMoreData(false)
    } else if (data && data.length === to - from + 1) {
      setHasMoreData(true)
    }
  }, [data, from, to])

  const loadMoreData = () => {
    if (!isPending && hasMoreData) {
      setFrom((prev) => prev + (to - from + 1))
      setTo((prev) => prev + (to - from + 1))
    }
  }

  useEffect(() => {
    if (isSuccess || !isPending || isError) {
      setLoading(false)
    }
  }, [isSuccess, isPending, isError])

  // console.log(moreData)

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
