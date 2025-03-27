import { useQuery } from "@tanstack/react-query";
import { getAllInvestor } from "@/services/investor";

export const useGetAllInvestor = () => {
  return useQuery({
    queryKey: ["investor"],
    queryFn: getAllInvestor,
  });
};
