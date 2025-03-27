'use client'
import React, { useState } from 'react';
import { industryFocusOptions, investmentFocusOptions, investorLocationOptions } from '@/constant/filter-options';
import { Checkbox } from './ui/checkbox';
import { MultiSelect } from './MultiSelect';
import { CirclePlus, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import CollapsibleWrapper from './filter/CollapsibleWrapper';

const Filters = () => {
  return (
    <>
      {/* Desktop View */}
      <section className="hidden md:flex gap-8 border-b border-gray-300 bg-gradient-to-t from-blue-50/80 to-blue-50/60">
        <CollapsibleWrapper>
          <InvestorType />
          <InvestorAndIndustry />
          <RangeFilters />
          <DescriptionFilters />
          <ActionButtons />
        </CollapsibleWrapper>
      </section>

      {/* Mobile View */}
      <div className="md:hidden md:p-4 px-4 pt-4 flex justify-end">
        <Dialog>
          <DialogTrigger className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md">
            <Filter size={18} /> Filters
          </DialogTrigger>
          <DialogContent className="p-4 bg-white rounded-md shadow-lg">
            <InvestorType />
            <InvestorAndIndustry />
            <RangeFilters />
            <DescriptionFilters />
            <ActionButtons />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

const InvestorType = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-gray-900 font-medium text-[13px] mb-1.5">Investor Type</h1>
      </div>
      <div className="flex flex-col gap-1">
        {investmentFocusOptions.map((option, index) => (
          <div className="flex items-center space-x-2" key={index}>
            <Checkbox />
            <label htmlFor={option.value} className="text-xs text-gray-600 capitalize">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

const InvestorAndIndustry = () => {
  const [investorLocation, setInvestorLocation] = useState<any[]>([]);
  const handleLocationChange = (selectedOptions: { value: string; label: string }[]) => {
    setInvestorLocation(selectedOptions.map((option) => option.value));
  };
  return (
    <div className="flex flex-col gap-1">
      <div>
        <h1 className="text-gray-900 font-medium text-xs">Investor Location</h1>
        <MultiSelect
          options={investorLocationOptions}
          selectedOptions={investorLocation}
          onSelectChange={handleLocationChange}
          placeholder="Select Location"
        />
      </div>
      <div>
        <h1 className="text-gray-900 font-medium text-xs">Industry Focus</h1>
        <MultiSelect
          options={industryFocusOptions}
          selectedOptions={investorLocation}
          onSelectChange={handleLocationChange}
          placeholder="Select Industry"
        />
      </div>
    </div>
  );
};

const RangeFilters = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-gray-900 font-medium text-xs">Average Deal Size (mEUR)</h1>
      <div className="flex items-center gap-2">
        <Input type="number" placeholder="Min" className='w-[70px] bg-white' />
        <span>-</span>
        <Input type="number" placeholder="Max" className='w-[70px] bg-white' />
      </div>
    </div>
  );
};

const DescriptionFilters = () => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-full md:max-w-[212px]">
      <h1 className="text-gray-900 font-medium text-xs">Describe target company</h1>
      <Textarea placeholder="Search" className='w-full h-full bg-white' />
    </div>
  );
};

const ActionButtons = () => {
  return (
    <div className="flex flex-wrap-reverse items-center justify-end mt-auto gap-3 ml-auto w-full md:max-w-[212px]">
      <Button
        variant="outline"
        className="py-2 px-3 rounded-md border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
      >
        <CirclePlus size={18} /> Add Filter
      </Button>

      <Button variant="default" className="py-2 px-4 rounded-md">
        Search
      </Button>

      <Button variant="outline" className="py-2 px-4 text-gray-600 hover:text-gray-900">
        Clear Search
      </Button>
    </div>

  );
};

export default Filters;
