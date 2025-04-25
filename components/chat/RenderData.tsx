"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import DataTable from "@/components/chat/data-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { useCoPilotStore } from "@/store/copilotStore"
import { responseToColumns } from "@/utils/transformers/responseToColumns"
import { useWSStore } from "@/store/wsStore"

interface AddColumnContextType {
  query: string
  setQuery: (query: string) => void
  selectedTool: string
  setSelectedTool: (tool: string) => void
  format: string
  setFormat: (format: string) => void
  contextColumn: string
  setContextColumn: (column: string) => void
  handleSearch: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const AddColumnContext = createContext<AddColumnContextType | undefined>(undefined)

export const useAddColumn = () => {
  const context = useContext(AddColumnContext)
  if (!context) {
    throw new Error("useAddColumn must be used within an AddColumnProvider")
  }
  return context
}

const RenderData = () => {
  const { result } = useCoPilotStore()
  const [query, setQuery] = useState("")
  const [selectedTool, setSelectedTool] = useState("web")
  const [format, setFormat] = useState("auto")
  const [contextColumn, setContextColumn] = useState("")
  const [dynamicColumns, setDynamicColumns] = useState<ColumnDef<ICompany>[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { companies } = useWSStore()

  const handleSearch = () => {
    if (!query) return

    const columnKey = query.toLowerCase().replace(/\s+/g, "_")

    setQuery("")

    const columnExists = allColumns.some((col) => (col as any).accessorKey === columnKey)
    if (columnExists) {
      return alert("Column already exists")
    }

    setIsOpen(false)
    setSearching(true)

    setSelectedTool("web")
    setFormat("auto")
    setContextColumn("")

    const newColumn: ColumnDef<ICompany> = {
      accessorKey: columnKey,
      header: query,
      enableColumnFilter: true,
      cell: ({ row }) => {
        if (isLoading) {
          return (
            <div className="w-[100px] h-[20px] bg-gray-300 rounded-md animate-pulse">
              Loading...
            </div>
          )
        }
        const value = row.original[query as keyof ICompany] as string
        return <div>{value ?? "-"}</div>
      },
    }

    setDynamicColumns((prev) => [...prev, newColumn])
  }

  useEffect(() => {
    if (searching) {
      setIsLoading(true)

      const timeout = setTimeout(() => {
        setIsLoading(false)
        setSearching(false) // ✅ Moved here
      }, 10000)

      return () => clearTimeout(timeout)
    }
  }, [searching])

  console.log(isLoading)

  const contextValue = {
    query,
    setQuery,
    selectedTool,
    setSelectedTool,
    format,
    setFormat,
    contextColumn,
    setContextColumn,
    handleSearch,
    isOpen,
    setIsOpen,
  }

  // if (!result || result.type !== "grid") {
  //   return <div className="text-gray-400 p-4">No data yet.</div>
  // }

  const baseColumns = responseToColumns()
  const allColumns = [...baseColumns, ...dynamicColumns]
  const rows = companies

  return (
    <AddColumnContext.Provider value={contextValue}>
      <div className="bg-white overflow-hidden border-l border-gray-300">
        <DataTable
          columns={allColumns as ColumnDef<Record<string, any>>[]}
          data={rows ? rows : []}
          isLoading={false}
          loadMoreData={() => console.log("")}
          hasMoreData
        />
      </div>
    </AddColumnContext.Provider>
  )
}

export default RenderData
