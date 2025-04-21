import { useQuery } from "@tanstack/react-query"
import { getInvestor } from "@/services/investor"

export const useGetAllInvestorQuery = () => {
  return useQuery({
    queryKey: ["investor"],
    queryFn: getInvestor,
  })
}
