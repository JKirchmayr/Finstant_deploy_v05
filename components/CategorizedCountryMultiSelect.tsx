"use client";

import React from "react";
import MultipleSelector, { Option } from "./ui/multiselect";

const categorizedOptions: Option[] = [
  // North America
  {
    value: "us",
    label: "United States",
    flag: "US",
    category: "North America",
  },
  { value: "ca", label: "Canada", flag: "CA", category: "North America" },
  { value: "mx", label: "Mexico", flag: "MX", category: "North America" },

  // Europe
  { value: "gb", label: "United Kingdom", flag: "GB", category: "Europe" },
  { value: "fr", label: "France", flag: "FR", category: "Europe" },
  { value: "de", label: "Germany", flag: "DE", category: "Europe" },
  { value: "it", label: "Italy", flag: "IT", category: "Europe" },

  // Asia
  { value: "jp", label: "Japan", flag: "JP", category: "Asia" },
  { value: "cn", label: "China", flag: "CN", category: "Asia" },
  { value: "kr", label: "South Korea", flag: "KR", category: "Asia" },
  { value: "in", label: "India", flag: "IN", category: "Asia" },

  // Global
  { value: "GLOBAL", label: "Global", flagEmoji: "🌍", category: "Global" },
];

export function CategorizedCountryMultiSelect() {
  const [selectedCountries, setSelectedCountries] = React.useState<Option[]>(
    []
  );

  const handleChange = (options: Option[]) => {
    setSelectedCountries(options);
  };
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
    />
  );
}

export default CategorizedCountryMultiSelect;
