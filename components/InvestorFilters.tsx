"use client";
import DataTable from "@/components/table/data-table";
import React, { useState } from "react";
import { ChevronUp, Sparkles } from "lucide-react";
import {
  industryFocusOptions,
  investmentFocusOptions,
  investorLocationOptions,
} from "@/constant/filter-options";
import { Checkbox } from "./ui/checkbox";
import { MultiSelect } from "./MultiSelect";
import { CirclePlus, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import useFilterStore from "@/store/filterStore";
import { ListFilterPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const focusIndustryOptions = [
  { value: "Sector Agnostic", label: "Sector agnostic" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Finance Insurance", label: "Finance & Insurance" },
  { value: "Consumer", label: "Consumer" },
  { value: "Software It", label: "Software & IT" },
  { value: "Energy Renewables", label: "Energy & Renewables" },
  { value: "Food Beverage", label: "Food & Beverage" },
  { value: "Industrials", label: "Industrials" },
];

const InvestorFilters = () => {
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const { setCompanyKeywordSearch } = useFilterStore();
  const focusIndustry = useFilterStore((state) => state.focusIndustry);
  const setFocusIndustry = useFilterStore((state) => state.setFocusIndustry);
  const handleIndustryChange = (
    selectedOptions: { value: string; label: string }[],
  ) => {
    setFocusIndustry(selectedOptions.map((option) => option.value));
  };

  const handleSearch = () => {
    setCompanyKeywordSearch(prompt);
  };

  return (
    <div className="filter flex gap-6 bg-[#fbfbfb] divide-x-1 divide-gray-100/80 md:bg-white px-4 pb-4 pt-3 border-b border-gray-200 h-full">
      <div className="pr-4">
        <Investors />
      </div>
      {/* Revenue (mEUR) & EBITDA (mEUR) */}
      <div className="flex flex-col justify-between gap-3 pr-6">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1 text-[13px]">
            Revenue (mEUR)
          </label>
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
          <label className="flex items-center gap-1 text-[13px]">
            EBITDA (mEUR)
          </label>
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
      <InvestorLocation />
      {/* Description */}
      {/* <div className="flex flex-col gap-2">
        <label className="flex items-center gap-1 text-[13px]">
          <Sparkles size={14} className="text-blue-700" /> Description
        </label>
        <textarea
          placeholder="Describe the company you are looking for..."
          value={prompt}
          className="w-full h-full bg-white border border-gray-300 rounded-sm p-2"
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div> */}

      {/* HQ Country & Industry */}
      <div className="flex flex-col justify-between gap-3 pr-4">
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-[13px]">
            Industry
          </label>
          <MultiSelect
            options={focusIndustryOptions}
            selectedOptions={focusIndustryOptions.filter((opt) =>
              focusIndustry.includes(opt.value),
            )}
            onSelectChange={handleIndustryChange}
            placeholder="Select Strategy"
          />
        </div>
      </div>

      {/* Search Button */}
      <div className="col-span-2 flex ml-auto">
        <div className="flex flex-col gap-2 ml-auto">
          <label className="flex items-center gap-2 text-[13px]">Actions</label>
          <button
            className="px-10 py-2 w-auto bg-gray-800 rounded-sm hover:bg-gray-800 cursor-pointer text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

const Investors = () => {
  const investmentFocusOptions = [
    { value: "Private Equity", label: "Private Equity" },
    { value: "Venture Capital", label: "Venture Capital" },
    { value: "Corporate", label: "Corporate" },
    { value: "Other", label: "other" },
  ];
  const { investmentFocus, setInvestmentFocus } = useFilterStore();
  return (
    <div className="flex flex-col justify-between gap-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1 text-[13px]">Investor</label>
        {investmentFocus.length > 0 && (
          <button
            className="ml-auto text-[10px] text-gray-500 hover:text-gray-700 px-1 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-md transition-all"
            onClick={() => setInvestmentFocus([])}
          >
            clear
          </button>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {investmentFocusOptions.map((option, index) => {
          return (
            <div className="flex items-center space-x-2" key={index}>
              <Checkbox
                id={option.value}
                checked={investmentFocus.includes(option.value)}
                onCheckedChange={(value) => {
                  const newFocus = value
                    ? [...investmentFocus, option.value]
                    : investmentFocus.filter((focus) => focus !== option.value);
                  setInvestmentFocus(newFocus);
                }}
              />
              <label
                htmlFor={option.value}
                className="text-xs select-none cursor-pointer text-gray-600 capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const InvestorLocation = () => {
  const { investorLocation, setInvestorLocation } = useFilterStore();
  const handleLocationChange = (
    selectedOptions: { value: string; label: string }[],
  ) => {
    setInvestorLocation(selectedOptions.map((option) => option.value));
  };
  return (
    <div className="flex flex-col justify-between pr-4">
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center gap-1 text-[13px]">
          Investor Location
        </label>
        {investorLocation.length > 0 && (
          <button
            className="ml-auto text-[10px] text-gray-500 hover:text-gray-700 px-1 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-md transition-all"
            onClick={() => setInvestorLocation([])}
          >
            clear
          </button>
        )}
      </div>
      <MultiSelect
        options={investorLocationOptions}
        selectedOptions={investorLocationOptions.filter((opt) =>
          investorLocation.includes(opt.value),
        )}
        onSelectChange={handleLocationChange}
        placeholder="Select Location"
      />
    </div>
  );
};

export default InvestorFilters;
