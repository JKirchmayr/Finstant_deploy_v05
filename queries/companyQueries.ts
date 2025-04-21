"use client"
import { useQuery } from "@tanstack/react-query"
import { getCompanies } from "@/services/company"

export const useGetAllCompaniesQuery = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: () => getCompanies(),
  })
}
