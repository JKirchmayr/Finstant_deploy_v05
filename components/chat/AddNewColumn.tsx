"use client"

import * as React from "react"
import { ArrowUp, Database, Globe, Plus, PlusIcon, Search } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useAddColumn } from "@/context/newColumn"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { cn } from "@/lib/utils"

export const AddNewColumn = ({
  children,
  isDisabled,
}: {
  children?: React.ReactNode
  isDisabled?: boolean
}) => {
  const {
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
    isWeb,
    setIsWeb,
  } = useAddColumn()

  const fieldButtons = ["Revenue", "EBITDA", "Employees", "HQ Country"]

  const handleFieldSelection = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field))
    } else {
      setSelectedFields([...selectedFields, field])
    }
  }
  const isSelected = (field: string) => selectedFields.includes(field)
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger disabled={disabled || isDisabled} asChild>
        {children ?? (
          <Button variant="outline" size="icon" className="h-full w-full">
            <PlusIcon className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="h-full border shadow border-blue-200"
        side="left"
        align="start"
      >
        <div className="p-4 w-64 space-y-2 text-sm">
          <h3 className="font-semibold text-base">Adding column</h3>

          <div className="space-y-1">
            <p className="text-sm font-medium">Select Source</p>
            <div className="flex items-center justify-between border border-gray-300 rounded-xl px-2.5 py-2 my-2 w-full ">
              <label htmlFor="switch-data" className="flex items-center gap-1 cursor-pointer">
                <Database className="w-4 h-4" />
                <span className="text-sm">Data</span>
              </label>
              <Switch
                id="switch-data"
                className="cursor-pointer"
                checked={isWeb}
                onCheckedChange={checked => setIsWeb(checked)}
              />
              <label htmlFor="switch-data" className="flex items-center gap-1 cursor-pointer">
                <Globe className="w-4 h-4" />
                <span className="text-sm">Web/AI</span>
              </label>
            </div>
          </div>

          <div className="border-t border-gray-300" />

          {isWeb && (
            <div>
              <Textarea
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="What do you want to search?"
                className="w-full rounded-xl border h-40 border-gray-300 px-2.5 py-2"
              />
            </div>
          )}

          <Button
            onClick={handleSearch}
            variant="outline"
            className="w-full rounded-xl text-sm py-1.5"
          >
            Search
          </Button>

          {!isWeb && (
            <div className="space-y-2">
              {fieldButtons.map(label => (
                <Button
                  key={label}
                  variant="outline"
                  className={cn(
                    "w-full justify-start px-3 py-2 text-sm font-normal hover:scale-[102%] transition transform duration-200",
                    {
                      "border-blue-300 bg-blue-50 hover:bg-blue-100 ": isSelected(label),
                    }
                  )}
                  onClick={() => handleFieldSelection(label)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
