'use client'
import React, { useState } from 'react';
import { industryFocusOptions, investmentFocusOptions, investorLocationOptions } from '@/constant/filter-options';
import { Checkbox } from './ui/checkbox';
import { MultiSelect } from './MultiSelect';
import { CirclePlus } from 'lucide-react';

const Filters = () => {
  return (
    <section className="flex min-h-[140px] gap-8 border-b border-gray-300 p-4 bg-gradient-to-t from-blue-50/80 to-blue-50/60">
      <InvestorType />
      <InvestorAndIndustry />
      <RangeFilters />
      <DescriptionFilters />
      <ActionButtons />
    </section>
  );
};

const InvestorType = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-900 font-medium text-[13px] mb-1.5">Investor Type</h1>
        {investmentFocusOptions.length > 6 && (
          <button className="ml-auto text-[10px] text-gray-500 hover:text-gray-700 px-1 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-md transition-all">
            clear
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1">
        {investmentFocusOptions.map((option, index) => {
          return (
            <div className="flex items-center space-x-2" key={index}>
              <Checkbox />
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


const InvestorAndIndustry = () => {
  const [investorLocation, setInvestorLocation] = useState<any[]>([]);
  const handleLocationChange = (
    selectedOptions: { value: string; label: string }[],
  ) => {
    setInvestorLocation(selectedOptions.map((option) => option.value));
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="div">
                <div className="flex items-center justify-between mb-1.5">
                  <h1 className="text-gray-900 font-medium text-xs">
                    Investor Location
                  </h1>
                  {investorLocationOptions.length > 7 && (
                    <button
                      className="ml-auto text-[10px] text-gray-500 hover:text-gray-700 px-1 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-md transition-all"
                      
                    >
                      clear
                    </button>
                  )}
                </div>
                <MultiSelect
                  options={investorLocationOptions}
                  selectedOptions={investorLocation}
                  onSelectChange={handleLocationChange}
                  placeholder="Select Location"
                />
              </div>
              <div className="div">
                <div className="flex items-center justify-between mb-1.5">
                  <h1 className="text-gray-900 font-medium text-xs">
                    Industry Focus
                  </h1>
                  {investorLocationOptions.length > 7 && (
                    <button
                      className="ml-auto text-[10px] text-gray-500 hover:text-gray-700 px-1 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-md transition-all"
                      
                    >
                      clear
                    </button>
                  )}
                </div>
                <MultiSelect
                  options={industryFocusOptions}
                  selectedOptions={investorLocation}
                  onSelectChange={handleLocationChange}
                  placeholder="Select Location"
                />
              </div>
    </div>
  )
}


const RangeFilters = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-900 font-medium text-xs">
          Average Deal Size (mEUR)
        </h1>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" className='bg-white w-[70px] px-2 py-1 border border-gray-200 rounded-sm text-xs' />
          <span>-</span>
          <input type="number" placeholder="Max" className='bg-white w-[70px] px-2 py-1 border border-gray-200 rounded-sm text-xs' />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-900 font-medium text-xs">
         Target EBITDA Size (mEUR)
        </h1>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min" className='bg-white w-[70px] px-2 py-1 border border-gray-200 rounded-sm text-xs' />
          <span>-</span>
          <input type="number" placeholder="Max" className='bg-white w-[70px] px-2 py-1 border border-gray-200 rounded-sm text-xs' />
        </div>
      </div>
    </div>
  )
}

const DescriptionFilters = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-gray-900 font-medium text-xs">
        Describe target company
      </h1>
      <textarea  placeholder="Search" className='bg-white w-[280px] h-full px-2 py-1 border border-gray-200 rounded-sm text-xs' />
    </div>
  )
}

const ActionButtons = () => {
  return (
      <div className="ml-auto flex flex-col items-center gap-2 min-w-[180px]">
        <button className="w-full cursor-pointer py-2 rounded-sm border justify-center border-gray-200 hover:bg-gray-100 px-2 py-1text-xs flex items-center gap-1">
        <CirclePlus className='text-white' size={20} fill='black' /> Add Filter
      </button>
      
      <button className="bg-gray-800 cursor-pointer hover:bg-gray-900 text-white font-semibold w-full px-4 py-2 border border-gray-200 rounded-sm text-xs">
        Search
      </button>
      <button className="w-full px-2 py-1text-xs hover:underline cursor-pointer">
        Clear Search
      </button>
    </div>
  )
}   
export default Filters;
