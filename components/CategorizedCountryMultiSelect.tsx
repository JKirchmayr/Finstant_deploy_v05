"use client"

import React, { useEffect } from "react"
import MultipleSelector, { Option } from "./ui/multiselect"

const categorizedOptions: Option[] = [
  // North America
  {
    value: "United States",
    label: "United States",
    flag: "US",
    category: "North America",
  },
  { value: "Canada", label: "Canada", flag: "CA", category: "North America" },
  { value: "Mexico", label: "Mexico", flag: "MX", category: "North America" },

  // Europe
  { value: "United Kingdom", label: "United Kingdom", flag: "GB", category: "Europe" },
  { value: "France", label: "France", flag: "FR", category: "Europe" },
  { value: "Germany", label: "Germany", flag: "DE", category: "Europe" },
  { value: "Italy", label: "Italy", flag: "IT", category: "Europe" },

  // Asia
  { value: "Japan", label: "Japan", flag: "JP", category: "Asia" },
  { value: "China", label: "China", flag: "CN", category: "Asia" },
  { value: "South Korea", label: "South Korea", flag: "KR", category: "Asia" },
  { value: "India", label: "India", flag: "IN", category: "Asia" },

  // Global
  { value: "Global", label: "Global", flagEmoji: "🌍", category: "Global" },
]

export function CategorizedCountryMultiSelect({
  onSelecCountries,
}: {
  onSelecCountries: (countries: Option[]) => void
}) {
  const [selectedCountries, setSelectedCountries] = React.useState<Option[]>([])

  const handleChange = (options: Option[]) => {
    setSelectedCountries(options)
  }

  useEffect(() => {
    if (selectedCountries.length > 0) {
      onSelecCountries(selectedCountries)
    }
  }, [selectedCountries])
  return (
    <MultipleSelector
      noAbsolute
      value={selectedCountries}
      onChange={handleChange}
      options={categorizedOptions}
      defaultOptions={categorizedOptions}
      placeholder="Select countries..."
      groupBy="category"
      hidePlaceholderWhenSelected
      emptyIndicator={<p className="text-center text-sm">No countries found</p>}
      commandProps={{
        label: "Select countries",
      }}
      className="border-gray-300"
    />
  )
}

export default CategorizedCountryMultiSelect
