import { useQuery } from "@tanstack/react-query"
import { getCompanies } from "@/services/company"

export const useCompanies = (filters?: any) => {
  return useQuery({
    queryKey: ["companies", filters ?? {}], // filters can be empty
    queryFn: () => getCompanies(filters ?? {}),
  })
}
