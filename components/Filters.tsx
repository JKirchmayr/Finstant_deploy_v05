"use client"
import { ListFilterPlus, Sparkles } from "lucide-react"
import React, { useEffect, useState } from "react"
import { MultiSelect } from "@/components/MultiSelect"
import { useCompanyFilters } from "@/store/useCompanyFilters"
import { usePathname } from "next/navigation"
import { Checkbox } from "./ui/checkbox"
import { useInvestorFilters } from "@/store/useInvestorFilters"

const locationOptions = [
  { value: "United States", label: "United States" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Germany", label: "Germany" },
  { value: "Global", label: "Global" },
  { value: "Europe", label: "Europe" },
]
const industryOptions = [
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
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
]

const investorOptions = [
  { value: "Private Equity", label: "Private Equity" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Corporate", label: "Corporate" },
  { value: "Credit", label: "Credit" },
]

const Filters = () => {
  const pathname = usePathname()
  const isCompanies = pathname.includes("companies")
  const isInvestors = pathname.includes("investors")
  const { applyFilters, resetFilters } = useCompanyFilters()
  const { applyFilters: applyInvestorFilters, resetFilters: resetInvestorFilters } =
    useInvestorFilters()

  const [company, setCompany] = useState({
    description: "",
    revenueMin: "",
    revenueMax: "",
    ebitdaMin: "",
    ebitdaMax: "",
    industry: [] as string[],
    hqCountry: [] as string[],
  })
  const [investor, setInvestor] = useState({
    investorType: [] as string[],
    revenueMin: "",
    revenueMax: "",
    ebitdaMin: "",
    ebitdaMax: "",
    industry: [] as string[],
    investorLocation: [] as string[],
  })

  const isCompanyFilterApplied =
    company.description ||
    company.revenueMax ||
    company.revenueMin ||
    company.ebitdaMin ||
    company.ebitdaMax ||
    company.industry.length > 0 ||
    company.hqCountry.length > 0

  const handleMinMaxChange = (key: string, value: string) => {
    if (isCompanies) {
      setCompany((prev) => ({ ...prev, [key]: value }))
    } else {
      setInvestor((prev) => ({ ...prev, [key]: value }))
    }
  }

  const handleMultiChange = (key: string, values: string[]) => {
    if (isCompanies) {
      setCompany((prev) => ({ ...prev, [key]: values }))
    } else {
      setInvestor((prev) => ({ ...prev, [key]: values }))
    }
  }

  const handleSearch = () => {
    if (isCompanies) {
      applyFilters(company)
    } else {
      applyInvestorFilters(investor)
    }
  }

  const handleClear = () => {
    if (isCompanies) {
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
    } else {
      setInvestor({
        investorType: [],
        revenueMin: "",
        revenueMax: "",
        ebitdaMin: "",
        ebitdaMax: "",
        industry: [],
        investorLocation: [],
      })
      resetInvestorFilters()
    }
  }

  const handleInvestorChange = (selected: string[]) => {
    setInvestor((prev) => ({
      ...prev,
      investorType: selected,
    }))
  }

  const isInvestorFilterApplied =
    investor.investorType.length > 0 ||
    investor.revenueMin ||
    investor.revenueMax ||
    investor.ebitdaMin ||
    investor.ebitdaMax ||
    investor.industry.length > 0 ||
    investor.investorLocation.length > 0

  const shouldShowClear = isCompanies
    ? isCompanyFilterApplied
    : isInvestors
    ? isInvestorFilterApplied
    : false

  const revenueMin = isCompanies ? company.revenueMin : investor.revenueMin
  const revenueMax = isCompanies ? company.revenueMax : investor.revenueMax

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
    setInvestor({
      investorType: [],
      revenueMin: "",
      revenueMax: "",
      ebitdaMin: "",
      ebitdaMax: "",
      industry: [],
      investorLocation: [],
    })
    resetInvestorFilters()
    resetFilters()
  }, [])

  return (
    <div className="flex flex-col bg-[#fbfbfb] h-full overflow-hidden relative border-b transition-transform ease-in-out duration-300">
      <div className="flex bg-white items-center gap-1 border-b border-gray-300 px-4 py-1 min-h-[40px]">
        <ListFilterPlus size={14} />
        <h1 className="text-sm font-medium text-gray-700">Filters</h1>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto p-3 flex-1">
        {isCompanies ? (
          <DiscriptionFilter
            value={company.description}
            onChange={(val) => setCompany((prev) => ({ ...prev, description: val }))}
          />
        ) : (
          <InvestorsFilter
            options={investorOptions}
            selectedInvestors={investor.investorType}
            onChange={handleInvestorChange}
          />
        )}

        <div className="w-full border-b border-gray-200/50 h-[1px]"></div>

        <MinMax
          title="Revenue (mEUR)"
          min={revenueMin}
          max={revenueMax}
          onChange={handleMinMaxChange}
          minKey="revenueMin"
          maxKey="revenueMax"
        />
        <div className="w-full border-b border-gray-200/50 h-[1px]"></div>

        <MinMax
          title="EBITDA (mEUR)"
          min={company.ebitdaMin}
          max={company.ebitdaMax}
          onChange={handleMinMaxChange}
          minKey="ebitdaMin"
          maxKey="ebitdaMax"
        />
        <div className="w-full border-b border-gray-200/50 h-[1px]"></div>

        <MultiSelect
          title="Industry"
          options={industryOptions}
          selectedOptions={industryOptions.filter((i) => company.industry?.includes(i.value))}
          onSelectChange={(vals) =>
            handleMultiChange(
              "industry",
              vals.map((v) => v.value)
            )
          }
          placeholder="Select Industry"
        />
        <div className="w-full border-b border-gray-200/50 h-[1px]"></div>

        <MultiSelect
          title="HQ Country"
          options={locationOptions}
          selectedOptions={locationOptions.filter((l) => company.hqCountry.includes(l.value))}
          onSelectChange={(vals) =>
            handleMultiChange(
              "hqCountry",
              vals.map((v) => v.value)
            )
          }
          placeholder="Select Country"
        />
        <div className="w-full border-b border-gray-200/50 h-[1px]"></div>

        {/* {isCompanies && (
          <>
            {isCompanies ? <DiscriptionFilter
              value={company.description}
              onChange={(val) => setCompany((prev) => ({ ...prev, description: val }))}
            />:
            <InvestorsFilter
              options={investorOptions}
              selectedInvestors={investor.investorType}
              onChange={handleInvestorChange}
            />
            }
            

            <div className="w-full border-b border-gray-200/50 h-[1px]"></div>

            <MinMax
              title="Revenue (mEUR)"
              min={company.revenueMin}
              max={company.revenueMax}
              onChange={handleMinMaxChange}
              minKey="revenueMin"
              maxKey="revenueMax"
            />
            <div className="w-full border-b border-gray-200/50 h-[1px]"></div>

            <MinMax
              title="EBITDA (mEUR)"
              min={company.ebitdaMin}
              max={company.ebitdaMax}
              onChange={handleMinMaxChange}
              minKey="ebitdaMin"
              maxKey="ebitdaMax"
            />
            <div className="w-full border-b border-gray-200/50 h-[1px]"></div>

            <MultiSelect
              title="Industry"
              options={industryOptions}
              selectedOptions={industryOptions.filter((i) => company.industry?.includes(i.value))}
              onSelectChange={(vals) =>
                handleMultiChange(
                  "industry",
                  vals.map((v) => v.value)
                )
              }
              placeholder="Select Industry"
            />
            <div className="w-full border-b border-gray-200/50 h-[1px]"></div>

            <MultiSelect
              title="HQ Country"
              options={locationOptions}
              selectedOptions={locationOptions.filter((l) => company.hqCountry.includes(l.value))}
              onSelectChange={(vals) =>
                handleMultiChange(
                  "hqCountry",
                  vals.map((v) => v.value)
                )
              }
              placeholder="Select Country"
            />
            <div className="w-full border-b border-gray-200/50 h-[1px]"></div>
          </>
        )} */}

        {/* Filters for Investors */}
        {/* {isInvestors && (
          <>
            <InvestorsFilter
              options={investorOptions}
              selectedInvestors={investor.investorType}
              onChange={handleInvestorChange}
            />
            <div className="w-full border-b border-gray-200/50 h-[1px]"></div>

            <MinMax
              title="Revenue (mEUR)"
              min={company.revenueMin}
              max={company.revenueMax}
              onChange={handleMinMaxChange}
              minKey="revenueMin"
              maxKey="revenueMax"
            />
            <div className="w-full border-b border-gray-200/50 h-[1px]"></div>

            <MinMax
              title="EBITDA (mEUR)"
              min={company.ebitdaMin}
              max={company.ebitdaMax}
              onChange={handleMinMaxChange}
              minKey="ebitdaMin"
              maxKey="ebitdaMax"
            />
            <div className="w-full border-b border-gray-200/50 h-[1px]"></div>

            <MultiSelect
              title="Industry"
              options={industryOptions}
              selectedOptions={industryOptions.filter((i) => company.industry?.includes(i.value))}
              onSelectChange={(vals) =>
                handleMultiChange(
                  "industry",
                  vals.map((v) => v.value)
                )
              }
              placeholder="Select Industry"
            />
            <div className="w-full border-b border-gray-200/50 h-[1px]"></div>

            <MultiSelect
              title="HQ Country"
              options={locationOptions}
              selectedOptions={locationOptions.filter((l) => company.hqCountry.includes(l.value))}
              onSelectChange={(vals) =>
                handleMultiChange(
                  "hqCountry",
                  vals.map((v) => v.value)
                )
              }
              placeholder="Select Country"
            />
            <div className="w-full border-b border-gray-200/50 h-[1px]"></div>
          </>
        )} */}
      </div>

      <div className="relative z-50 border-t border-gray-300 px-3 py-2 min-h-[50px] grid grid-cols-2 gap-3">
        <button
          className="px-6 py-2 bg-gray-900 text-white rounded-sm cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
        {shouldShowClear && (
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
}: {
  value: string
  onChange: (value: string) => void
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-1 text-[13px]">
        <Sparkles size={14} className="text-blue-700" /> Description
      </label>
      <textarea
        placeholder="Describe the company you are looking for..."
        className="w-full h-full bg-white border border-gray-300 rounded-sm p-2 text-gray-700"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
      />
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
    <LabelAndField title={title}>
      <div className="flex items-center gap-2">
        <input
          placeholder="Min"
          className="w-full h-full bg-white border border-gray-300 rounded-sm px-2 py-1"
          value={min}
          onChange={handleMinChange}
        />
        <span>-</span>
        <input
          placeholder="Max"
          className="w-full h-full bg-white border border-gray-300 rounded-sm px-2 py-1"
          value={max}
          onChange={handleMaxChange}
        />
      </div>
    </LabelAndField>
  )
}

const LabelAndField = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-1 text-[13px]">{title}</label>
      {children}
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
      ? selectedInvestors.filter((item) => item !== value)
      : [...selectedInvestors, value]
    onChange(newInvestor)
  }

  return (
    <div className="flex flex-col justify-between gap-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1 text-[13px]">Investor</label>
      </div>

      <div className="flex flex-col gap-1">
        {options.map((option) => (
          <div className="flex items-center space-x-2" key={option.value}>
            <Checkbox
              id={option.value}
              checked={selectedInvestors.includes(option.value)}
              onCheckedChange={(checked) => handleCheckboxChange(option.value)}
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
export default Filters
