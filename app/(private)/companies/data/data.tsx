"use client";
import DataTable from "@/components/table/data-table";
import React from "react";
import {
  ChevronUp,
  Funnel,
  ListFilterPlus,
  Sliders,
  Sparkles,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { columns } from "./columns";
import CompanyFilters from "@/components/CompanyFilters";
import { useCompanies } from "@/hooks/useCompanies";
import useFilterStore from "@/store/filterStore";
import { cn } from "@/lib/utils";
const Data = () => {
  const {
    investmentFocus = [],
    companyKeywordSearch,
    focusIndustry,
    isCollapsed,
    setIsCollapsed,
  } = useFilterStore();
  const { data, isPending } = useCompanies(companyKeywordSearch);

  const filteredData = React.useMemo(() => {
    if (!data) return [];

    return data.filter((row: ICompany) => {
      const matchesIndustry = focusIndustry.length
        ? focusIndustry.every((industry) => row.sector.includes(industry))
        : true;

      return matchesIndustry;
    });
  }, [data, focusIndustry]);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        `bg-red-500 h-full grid grid-rows-[180px_1fr] overflow-hidden transition-all duration-300`,
        {
          "grid-rows-[30px_1fr]": isCollapsed,
        },
      )}
    >
      <div className="filer bg-[#fbfbfb] border-b border-gray-200 grid grid-rows-[30px_1fr]">
        <div className="flex items-center justify-between border-b border-gray-300 px-4">
          <div className="flex items-center gap-1">
            <ListFilterPlus size={14} />
            <h1 className="text-[15px] font-medium text-gray-700">Filters</h1>
          </div>

          <button
            className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 px-3 rounded-sm text-gray-600 py-0.5 bg-transparent transition-all"
            onClick={handleCollapse}
          >
            {isCollapsed ? "Open" : "Collapse"}
            <ChevronUp
              size={14}
              className={cn("transition-transform duration-300", {
                "rotate-180": isCollapsed,
              })}
            />
          </button>
        </div>
        <CompanyFilters />
      </div>
      <div className="datatable bg-gray-100 w-full overflow-x-auto p-4">
        <DataTable
          data={filteredData ? filteredData : []}
          columns={columns}
          isLoading={isPending}
          hasMoreData={false}
          loadMoreData={() => console.log("loadmore")}
        />
      </div>
    </div>
  );
};

export default Data;
