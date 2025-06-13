"use client"
import DataTable from "@/components/table/data-table"
import React from "react"
import { getColumnsForData } from "./columns"
import { useCompanies } from "@/hooks/useCompanies"
import { useCompanyFilters } from "@/store/useCompanyFilters"
import PinnableDataTable from "@/components/table/pinnable-data-table"

const Data = () => {
  const { appliedFilters } = useCompanyFilters()
  // console.log(appliedFilters, "appliedFilters")

  const [from, setFrom] = React.useState(1)
  const [to, setTo] = React.useState(30)
  const { data, isPending } = useCompanies({
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
      setMoreData(prev => [...prev, ...data])
    }
    if (data && data.length < to - from + 1) {
      setHasMoreData(false)
    } else if (data && data.length === to - from + 1) {
      setHasMoreData(true)
    }
  }, [data, from, to])

  const loadMoreData = () => {
    if (!isPending && hasMoreData) {
      setFrom(prev => prev + (to - from + 1))
      setTo(prev => prev + (to - from + 1))
    }
  }
  // console.log(moreData, "moreData")

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
