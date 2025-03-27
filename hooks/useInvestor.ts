import { useGetAllInvestor } from "@/queries/investorQueries";

export const useInvestors = () => {
  return useGetAllInvestor();
};
