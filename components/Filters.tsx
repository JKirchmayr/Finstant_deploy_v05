"use client"
import { ListFilterPlus, Loader2, Sparkles } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useCompanyFilters } from "@/store/useCompanyFilters"
import { usePathname } from "next/navigation"
import { Checkbox } from "./ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import MultipleSelector, { Option } from "./ui/multiselect"
import CategorizedCountryMultiSelect from "./CategorizedCountryMultiSelect"
import RangeSlider from "react-range-slider-input"
import "react-range-slider-input/dist/style.css"
import { cn } from "@/lib/utils"
const industryOptions = [
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Software Development", label: "Software Development" },
  { value: "IT Services and IT Consulting", label: "IT Services and IT Consulting" },
  { value: "Cloud Software", label: "Cloud Software" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Data Analytics", label: "Data Analytics" },
  { value: "Database Software", label: "Database Software" },
  { value: "DevOps", label: "DevOps" },
  { value: "Enterprise Software", label: "Enterprise Software" },
  { value: "Fintech", label: "Fintech" },
  { value: "Hardware", label: "Hardware" },
  { value: "SaaS", label: "SaaS" },
  { value: "Biotechnology", label: "Biotechnology" },
  { value: "Digital Health", label: "Digital Health" },
  { value: "Health Tech", label: "Health Tech" },
  { value: "Health Insurance", label: "Health Insurance" },
  { value: "Medical Devices", label: "Medical Devices" },
  { value: "Pharmaceuticals", label: "Pharmaceuticals" },
  { value: "Investment Management", label: "Investment Management" },
  {
    value: "Venture Capital and Private Equity Principals",
    label: "Venture Capital and Private Equity Principals",
  },
]

const Filters = () => {
  const { applyFilters, resetFilters, isLoading: globalLoading, setLoading } = useCompanyFilters()
  const [company, setCompany] = useState({
    description: "",
    revenueMin: "",
    revenueMax: "",
    ebitdaMin: "",
    ebitdaMax: "",
    industry: [] as string[],
    hqCountry: [] as string[],
  })

  const [localLoading, setLocalLoading] = useState(false)

  const [clearCountry, setClearCountry] = useState(false)

  const isCompanyFilterApplied =
    company.description ||
    company.revenueMax ||
    company.revenueMin ||
    company.ebitdaMin ||
    company.ebitdaMax ||
    company.industry.length > 0 ||
    company.hqCountry.length > 0

  const handleMinMaxChange = (key: string, value: string) => {
    setCompany((prev) => ({ ...prev, [key]: value }))
  }

  const handleMultiChange = (key: string, values: string[]) => {
    setCompany((prev) => ({ ...prev, [key]: values }))
  }

  const handleSearch = () => {
    if (isCompanyFilterApplied) {
      setLocalLoading(true)
      applyFilters({ ...company, _searchId: Date.now() })
    }
  }

  const handleClear = () => {
    setCompany({
      description: "",
      revenueMin: "",
      revenueMax: "",
      ebitdaMin: "",
      ebitdaMax: "",
      industry: [],
      hqCountry: [],
    })
    resetFilters()
    setLoading(false)
    setClearCountry(true)
  }

  const handleSelectCountries = (countries: string[]) => {
    setCompany((prev) => ({ ...prev, hqCountry: countries }))
  }

  const handleSelectIndustries = (industries: string[]) => {
    setCompany((prev) => ({ ...prev, industry: industries }))
  }

  const revenueMin = company.revenueMin
  const revenueMax = company.revenueMax

  useEffect(() => {
    setCompany({
      description: "",
      revenueMin: "",
      revenueMax: "",
      ebitdaMin: "",
      ebitdaMax: "",
      industry: [],
      hqCountry: [],
    })
    resetFilters()
  }, [])

  // Sync local loading with global loading
  useEffect(() => {
    if (!globalLoading) {
      setLocalLoading(false)
    }
  }, [globalLoading])

  const accordionItemsConfig = [
    {
      value: "description-company",
      title: (
        <label className="flex items-center gap-1 text-[14px]">
          Description <Sparkles size={14} className="text-blue-700" />
        </label>
      ),
      content: () => (
        <DiscriptionFilter
          value={company.description}
          onChange={(val) => {
            setCompany((prev) => ({ ...prev, description: val }))
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              handleSearch()
            }
          }}
          isLoading={localLoading}
        />
      ),
    },
    {
      value: "revenue",
      title: "Revenue (mEUR)",
      content: () => (
        <div>
          <MinMax
            title=""
            min={revenueMin}
            max={revenueMax}
            onChange={handleMinMaxChange}
            minKey="revenueMin"
            maxKey="revenueMax"
          />
          <RangeSlider
            min={0}
            max={200}
            step={1}
            value={[Number(company.revenueMin) || 0, Number(company.revenueMax) || 200]}
            onInput={(val: number[]) => {
              setCompany((prev) => ({
                ...prev,
                revenueMin: val[0].toString(),
                revenueMax: val[1].toString(),
              }))
            }}
            className="mt-3 mb-3"
          />
        </div>
      ),
    },
    {
      value: "ebitda",
      title: "EBITDA (mEUR)",
      content: () => (
        <div>
          <MinMax
            title=""
            min={company.ebitdaMin}
            max={company.ebitdaMax}
            onChange={handleMinMaxChange}
            minKey="ebitdaMin"
            maxKey="ebitdaMax"
          />
          <RangeSlider
            min={0}
            max={200}
            step={1}
            value={[Number(company.ebitdaMin) || 0, Number(company.ebitdaMax) || 200]}
            onInput={(val: number[]) => {
              setCompany((prev) => ({
                ...prev,
                ebitdaMin: val[0].toString(),
                ebitdaMax: val[1].toString(),
              }))
            }}
            className="mt-3 mb-3"
          />
        </div>
      ),
    },
    {
      value: "industry",
      title: "Industry",
      content: () => (
        <div className="h-fit">
          <MultipleSelector
            noAbsolute
            commandProps={{
              label: "Select Industry",
            }}
            value={industryOptions.filter(opt => company.industry.includes(opt.value))}
            onChange={(opts) => handleSelectIndustries(opts.map((i) => i.value))}
            defaultOptions={industryOptions}
            placeholder="Select Industry"
            hidePlaceholderWhenSelected
            emptyIndicator={<p className="text-center text-sm">No results found</p>}
            className="border-gray-300"
          />
        </div>
      ),
    },
    {
      value: "hq-country",
      title: "HQ Country",
      content: () => (
        <CategorizedCountryMultiSelect
          value={company.hqCountry}
          onSelecCountries={(countries: Option[]) =>
            handleSelectCountries(countries.map((c) => c.label))
          }
        />
      ),
    },
  ]

  return (
    <div className="flex flex-col bg-[#fbfbfb] h-full overflow-hidden relative border-r border-gray-200 transition-transform ease-in-out duration-300">
      <div className="flex bg-white items-center gap-1 border-b border-gray-300 px-4 py-1 min-h-[40px]">
        <ListFilterPlus size={14} />
        <h1 className="text-sm font-medium text-gray-700">Company Filters</h1>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto p-3 flex-1">
        <div className="w-full space-y-3 ">
          {accordionItemsConfig.map((item) => (
            <div key={item.value} className="pb-3">
              <div className="hover:no-underline hover:cursor-pointer pb-1 font-medium">
                {item.title}
              </div>
              <div className="overflow-visible z-10">{item.content()}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-50 border-t border-gray-300 px-3 py-2 min-h-[50px] grid grid-cols-2 gap-3">
        <button
          className="px-6 py-2 bg-gray-900 text-white rounded-sm cursor-pointer flex items-center justify-center"
          onClick={handleSearch}
          disabled={globalLoading || localLoading}
        >
          {(globalLoading || localLoading) && !company.description ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            "Search"
          )}
        </button>
        {isCompanyFilterApplied && (
          <button
            className="px-6 py-2 text-gray-800 border border-gray-300 rounded-sm cursor-pointer"
            onClick={handleClear}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}

const DiscriptionFilter = ({
  value,
  onChange,
  onKeyDown,
  isLoading = false,
}: {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  isLoading: boolean
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isEnterPressed, setIsEnterPressed] = useState(false)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setIsEnterPressed(true)
      onKeyDown(e)
    }
  }
  useEffect(() => {
    if (!isLoading && value.length > 0) {
      setIsEnterPressed(false)
    }
  }, [isLoading, value.length])

  return (
    <div className="flex flex-col gap-2 relative">
      <textarea
        placeholder="Describe the company you are looking for..."
        className="w-full h-full bg-white border border-gray-300 rounded-sm p-2 text-gray-700"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
      />
      <span
        className={cn("absolute bottom-1 right-1 text-xs p-0.5 rounded-sm animate-pulse hidden", {
          "opacity-100 block": isFocused,
        })}
      >
        {isEnterPressed ? <Loader2 className="animate-spin w-4 h-4 text-gray-800" /> : "Enter"}
      </span>
    </div>
  )
}

const MinMax = ({
  title,
  min,
  max,
  onChange,
  minKey,
  maxKey,
}: {
  title: string
  min: string
  max: string
  minKey: string
  maxKey: string
  onChange: (key: string, val: string) => void
}) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      onChange(minKey, value)
    }
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      onChange(maxKey, value)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        placeholder="Min"
        className="w-full h-full inputStyle"
        value={min}
        onChange={handleMinChange}
      />
      <span>to</span>
      <input
        placeholder="Max"
        className="w-full h-full inputStyle"
        value={max}
        onChange={handleMaxChange}
      />
    </div>
  )
}

export default Filters
