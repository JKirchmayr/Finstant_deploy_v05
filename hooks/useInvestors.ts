import { useQuery } from "@tanstack/react-query"
import { getInvestor } from "@/services/investor"

export const useInvestors = (filters?: any) => {
  return useQuery({
    queryKey: ["investor", filters ?? {}], // filters can be empty
    queryFn: () => getInvestor(filters ?? {}),
  })
}
