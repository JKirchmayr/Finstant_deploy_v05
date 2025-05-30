import React, { createContext, useContext, useState, useCallback, ReactNode } from "react"

interface AddColumnContextType {
  query: string
  setQuery: (query: string) => void
  selectedFields: string[]
  setSelectedFields: (tool: string[]) => void
  format: string
  setFormat: (format: string) => void
  contextColumn: string
  setContextColumn: (column: string) => void
  handleSearch: () => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  disabled: boolean
  setDisabled: (isOpen: boolean) => void
  isWeb: boolean
  setIsWeb: (isOpen: boolean) => void
}

const AddColumnContext = createContext<AddColumnContextType | undefined>(undefined)

export const useAddColumn = () => {
  const context = useContext(AddColumnContext)
  if (!context) {
    throw new Error("useAddColumn must be used within an AddColumnProvider")
  }
  return context
}

export const AddColumnProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("")
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [format, setFormat] = useState("")
  const [contextColumn, setContextColumn] = useState("")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [isWeb, setIsWeb] = React.useState<boolean>(false)

  const handleSearch = () => {
    setIsOpen(false)
    setIsWeb(false)
    setSelectedFields([])
  }

  const value: AddColumnContextType = {
    query,
    setQuery,
    selectedFields,
    setSelectedFields,
    format,
    setFormat,
    contextColumn,
    setContextColumn,
    handleSearch,
    isOpen,
    setIsOpen,
    disabled,
    setDisabled,
    isWeb,
    setIsWeb,
  }

  return <AddColumnContext.Provider value={value}>{children}</AddColumnContext.Provider>
}
