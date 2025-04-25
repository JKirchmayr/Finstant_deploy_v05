"use client"

import * as React from "react"
import { ArrowUp, PlusIcon, Search } from "lucide-react"

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
import { useAddColumn } from "./RenderData"

export const AddNewColumn = () => {
  const {
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
  } = useAddColumn()
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        asChild
        className="h-full rounded-none bg-blue-400/20 hover:bg-blue-400/30  rounded"
      >
        <Button variant="outline" size="icon" className="h-full">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="h-full border-2 border-blue-400" side="left" align="start">
        <div className="w-full p-2 space-y-4 h-full">
          <div className="relative">
            <button
              onClick={handleSearch}
              disabled={!query}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-400 p-1 rounded hover:bg-blue-500 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            >
              <ArrowUp className=" h-5 w-5 text-white " />
            </button>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter query here..."
              className="pr-9 h-10 ring-0 focus:ring-0 hover:ring-0 active:ring-0 focus-visible:ring-0"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Custom search</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-gray-800">Select tool</label>
                  <Select value={selectedTool} onValueChange={setSelectedTool}>
                    <SelectTrigger>
                      <SelectValue placeholder="Web search" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web search</SelectItem>
                      <SelectItem value="local">Local search</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-gray-800">Format</label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Auto-pick" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-pick</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="table">Table</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium">Add Context</h4>
              <div className="flex flex-col space-y-2">
                <Select value={contextColumn} onValueChange={setContextColumn}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Column for context" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="companyName">Company Name</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="sector">Sector</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="border-b border-gray-400" />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Employees
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Properties
                <span className="ml-1 text-xs text-gray-500">14</span>
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Manual Input</h4>
              <Input placeholder="Text column" />
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
