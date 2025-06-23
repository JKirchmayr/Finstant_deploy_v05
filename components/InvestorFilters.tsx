"use client"
import { ListFilterPlus, Loader2, Sparkles } from "lucide-react"
import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Checkbox } from "./ui/checkbox"
import { useInvestorFilters } from "@/store/useInvestorFilters"
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

const investorOptions = [
  { value: "Private Equity", label: "Private Equity" },
  { value: "Venture Capital", label: "Venture Capital" },
  { value: "Corporate (Strategic)", label: "Corporate (Strategic)" },
]

const InvestorFilters = () => {
  const {
    applyFilters: applyInvestorFilters,
    resetFilters: resetInvestorFilters,
    isLoading: globalLoading,
    setLoading,
  } = useInvestorFilters()

  const [investor, setInvestor] = useState({
    investorType: [] as string[],
    description: "",
    revenueMin: "",
    revenueMax: "",
    ebitdaMin: "",
    ebitdaMax: "",
    industry: [] as string[],
    investorLocation: [] as string[],
  })

  const [localLoading, setLocalLoading] = useState(false)

  const handleMinMaxChange = (key: string, value: string) => {
    setInvestor(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    if (isInvestorFilterApplied) {
      setLocalLoading(true)
      applyInvestorFilters({ ...investor, _searchId: Date.now() })
    }
  }

  const handleClear = () => {
    setInvestor({
      investorType: [],
      revenueMin: "",
      revenueMax: "",
      ebitdaMin: "",
      ebitdaMax: "",
      industry: [],
      investorLocation: [],
      description: "",
    })
    resetInvestorFilters()
    setLoading(false)
  }

  const handleInvestorChange = (selected: string[]) => {
    setInvestor(prev => ({
      ...prev,
      investorType: selected,
    }))
  }

  const handleSelectCountries = (countries: string[]) => {
    setInvestor(prev => ({
      ...prev,
      investorLocation: countries,
    }))
  }

  const handleSelectIndustries = (industries: string[]) => {
    setInvestor(prev => ({
      ...prev,
      industry: industries,
    }))
  }

  const isInvestorFilterApplied =
    investor.investorType.length > 0 ||
    investor.revenueMin ||
    investor.revenueMax ||
    investor.ebitdaMin ||
    investor.ebitdaMax ||
    investor.industry.length > 0 ||
    investor.investorLocation.length > 0 ||
    investor.description

  useEffect(() => {
    setInvestor({
      investorType: [],
      revenueMin: "",
      revenueMax: "",
      ebitdaMin: "",
      ebitdaMax: "",
      industry: [],
      investorLocation: [],
      description: "",
    })
    resetInvestorFilters()
  }, [])

  // Sync local loading with global loading
  useEffect(() => {
    if (!globalLoading) {
      setLocalLoading(false)
    }
  }, [globalLoading])

  const accordionItemsConfig = [
    {
      value: "description-investor",
      title: <label className="flex items-center gap-1 text-sm">Investor Type</label>,
      content: () => (
        <InvestorsFilter
          options={investorOptions}
          selectedInvestors={investor.investorType}
          onChange={handleInvestorChange}
        />
      ),
    },

    {
      value: "ebitda",
      title: "Preferred EBITDA (mEUR)",
      content: () => (
        <div>
          <MinMax
            title=""
            min={investor.ebitdaMin}
            max={investor.ebitdaMax}
            onChange={handleMinMaxChange}
            minKey="ebitdaMin"
            maxKey="ebitdaMax"
          />
          <RangeSlider
            min={0}
            max={200}
            step={1}
            value={[Number(investor.ebitdaMin) || 0, Number(investor.ebitdaMax) || 200]}
            onInput={(val: number[]) => {
              setInvestor(prev => ({
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
      value: "revenue",
      title: "Preferred Revenue (mEUR)",
      content: () => (
        <div>
          <MinMax
            title=""
            min={investor.revenueMin}
            max={investor.revenueMax}
            onChange={handleMinMaxChange}
            minKey="revenueMin"
            maxKey="revenueMax"
          />
          <RangeSlider
            min={0}
            max={200}
            step={1}
            value={[Number(investor.revenueMin) || 0, Number(investor.revenueMax) || 200]}
            onInput={(val: number[]) => {
              setInvestor(prev => ({
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
  ]

  return (
    <div className="flex flex-col bg-[#fbfbfb] h-full overflow-hidden relative border-r border-gray-200 transition-transform ease-in-out duration-300">
      <div className="flex bg-white items-center gap-1 border-b border-gray-300 px-4 py-1 min-h-[40px]">
        <ListFilterPlus size={14} />
        <h1 className="text-sm font-medium text-gray-700">Investor Filters</h1>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto  flex-1">
        <div className="w-full space-y-2 ">
          {/* <div className="my-1">
            <h1 className="font-semibold text-sm py-0.5 px-3 bg-muted-foreground/10">
              Investor Filters
            </h1>
          </div> */}
          <div className="p-3 pt-1">
            {accordionItemsConfig.map(item => (
              <div key={item.value} className="pb-2">
                <div className="hover:no-underline hover:cursor-pointer pb-1 font-medium">
                  {item.title}
                </div>
                <div className="overflow-visible z-10">{item.content()}</div>
              </div>
            ))}
          </div>
          <div className="mb-1">
            <h1 className="font-semibold text-sm py-0.5 px-3 bg-muted-foreground/10">
              Target Filters
            </h1>
          </div>
          <div className="pb-2 p-3 pt-1">
            <div className="hover:no-underline hover:cursor-pointer font-medium mb-2">
              Target Description <Sparkles size={14} className="text-blue-700" />
            </div>
            <div className="overflow-visible z-10">
              <DiscriptionFilter
                value={investor.description}
                onChange={val => setInvestor(prev => ({ ...prev, description: val }))}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleSearch()
                  }
                }}
                isLoading={globalLoading}
              />
            </div>
          </div>
          <div className="pb-2 px-3">
            <div className="hover:no-underline hover:cursor-pointer pb-1 font-medium">
              Target Country
            </div>
            <div className="overflow-visible z-10">
              <CategorizedCountryMultiSelect
                value={investor.investorLocation}
                onSelecCountries={(countries: Option[]) =>
                  handleSelectCountries(countries.map(c => c.label))
                }
              />
            </div>
          </div>
          <div className="pb-2 px-3">
            <div className="hover:no-underline hover:cursor-pointer pb-1 font-medium">
              Target Industry
            </div>
            <div className="overflow-visible z-10">
              <div className="h-fit">
                <MultipleSelector
                  noAbsolute
                  commandProps={{
                    label: "Select Industry",
                  }}
                  value={industryOptions.filter(opt => investor.industry.includes(opt.value))}
                  onChange={v => handleSelectIndustries(v.map(i => i.value))}
                  defaultOptions={industryOptions}
                  placeholder="Select Industry"
                  hidePlaceholderWhenSelected
                  emptyIndicator={<p className="text-center text-sm">No results found</p>}
                  className="border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-50 border-t border-gray-300 px-3 py-2 min-h-[50px] grid grid-cols-2 gap-3">
        <button
          className="px-6 py-2 bg-gray-900 text-white rounded-sm cursor-pointer flex items-center justify-center"
          onClick={handleSearch}
          disabled={globalLoading || localLoading}
          type="button"
        >
          {(globalLoading || localLoading) && !investor.description ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            "Search"
          )}
        </button>
        {isInvestorFilterApplied && (
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
        className="w-full h-full max-h-24 bg-white border border-gray-300 rounded-sm p-2 text-gray-700"
        value={value}
        onChange={e => onChange(e.target.value)}
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
    <div>
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
    </div>
  )
}

interface InvestorOption {
  value: string
  label: string
}

interface InvestorsProps {
  options: InvestorOption[]
  selectedInvestors: string[]
  onChange: (selected: string[]) => void
}

const InvestorsFilter: React.FC<InvestorsProps> = ({ options, selectedInvestors, onChange }) => {
  const handleCheckboxChange = (value: string) => {
    const newInvestor = selectedInvestors.includes(value)
      ? selectedInvestors.filter(item => item !== value)
      : [...selectedInvestors, value]
    onChange(newInvestor)
  }

  return (
    <div className="flex flex-col justify-between gap-2 ">
      <div className="flex flex-col gap-1 ">
        {options.map(option => (
          <div className="flex items-center space-x-2" key={option.value}>
            <Checkbox
              id={option.value}
              checked={selectedInvestors.includes(option.value)}
              onCheckedChange={checked => handleCheckboxChange(option.value)}
            />
            <label
              htmlFor={option.value}
              className="text-xs select-none cursor-pointer text-gray-600 capitalize leading-none"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InvestorFilters
