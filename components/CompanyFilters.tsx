"use client"
import DataTable from "@/components/table/data-table"
import React, { useState } from "react"
import { ChevronUp, Sparkles } from "lucide-react"
import {
  industryFocusOptions,
  investmentFocusOptions,
  investorLocationOptions,
} from "@/constant/filter-options"
import { Checkbox } from "./ui/checkbox"
import { MultiSelect } from "./MultiSelect"
import { CirclePlus, Filter } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import useFilterStore from "@/store/filterStore"

const focusIndustryOptions = [
  { value: "Sector Agnostic", label: "Sector agnostic" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Finance Insurance", label: "Finance & Insurance" },
  { value: "Consumer", label: "Consumer" },
  { value: "Software It", label: "Software & IT" },
  { value: "Energy Renewables", label: "Energy & Renewables" },
  { value: "Food Beverage", label: "Food & Beverage" },
  { value: "Industrials", label: "Industrials" },
]

const CompanyFilters = () => {
  const [prompt, setPrompt] = useState<string>("")
  const { setCompanyKeywordSearch } = useFilterStore()
  const focusIndustry = useFilterStore((state) => state.focusIndustry)
  const setFocusIndustry = useFilterStore((state) => state.setFocusIndustry)
  const handleIndustryChange = (selectedOptions: { value: string; label: string }[]) => {
    setFocusIndustry(selectedOptions.map((option) => option.value))
  }

  const handleSearch = () => {
    setCompanyKeywordSearch(prompt)
  }

  return (
    <div className="filter grid grid-cols-6 gap-4 bg-[#fbfbfb] md:bg-white px-4 pb-5 pt-2 border-b border-gray-200 h-full">
      {/* Description */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-1 text-[13px]">
          <Sparkles size={14} className="text-blue-700" /> Description
        </label>
        <textarea
          placeholder="Describe the company you are looking for..."
          value={prompt}
          className="w-full h-full bg-white border border-gray-300 rounded-sm p-2 text-gray-700"
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      {/* Revenue (mEUR) & EBITDA (mEUR) */}
      <div className="flex flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1 text-[13px]">Revenue (mEUR)</label>
          <div className="flex items-center gap-2">
            <input
              placeholder="Min"
              className="w-full h-full bg-white border border-gray-300  rounded-sm px-2 py-1"
            />
            <span>-</span>
            <input
              placeholder="Max"
              className="w-full h-full bg-white border border-gray-300  rounded-sm px-2 py-1"
            />
          </div>
        </div>
        {/* EBITDA */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1 text-[13px]">EBITDA (mEUR)</label>
          <div className="flex items-center gap-2">
            <input
              placeholder="Min"
              className="w-full h-full bg-white border border-gray-300  rounded-sm px-2 py-1"
            />
            <span>-</span>
            <input
              placeholder="Max"
              className="w-full h-full bg-white border border-gray-300  rounded-sm px-2 py-1"
            />
          </div>
        </div>
      </div>

      {/* Ownership */}
      <div className="flex flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-[13px]">HQ Country</label>
          <input
            placeholder="HQ Country"
            className="w-full h-full bg-white border border-gray-300  rounded-sm px-2 py-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1 text-[13px]">Ownership</label>
          <input
            placeholder=""
            className="w-full h-full bg-white border border-gray-300 rounded-sm disabled:bg-gray-200 px-2 py-1"
            disabled={true}
          />
        </div>
      </div>

      {/* HQ Country & Industry */}
      <div className="flex flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-[13px]">Industry</label>
          <MultiSelect
            options={focusIndustryOptions}
            selectedOptions={focusIndustryOptions.filter((opt) =>
              focusIndustry.includes(opt.value)
            )}
            onSelectChange={handleIndustryChange}
            placeholder="Select Strategy"
          />
        </div>
      </div>

      {/* Search Button */}
      <div className="col-span-2 flex">
        <div className="flex flex-col gap-2 ml-auto">
          <label className="flex items-center gap-2 text-[14px]">Actions</label>
          <button
            className="px-10 py-2 w-auto bg-gray-800 rounded-sm hover:bg-gray-800 cursor-pointer text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompanyFilters
