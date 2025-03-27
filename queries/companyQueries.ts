"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllCompanies } from "@/services/company";

export const useCompanies = (prompt?: string) => {
  return useQuery({
    queryKey: ["companies", prompt],
    queryFn: () => getAllCompanies(prompt),
    enabled: prompt !== undefined,
  });
};
