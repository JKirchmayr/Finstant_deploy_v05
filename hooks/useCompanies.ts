import { useCompanies as useBaseCompanies } from "@/queries/companyQueries";
export const useCompanies = (prompt?: string) => useBaseCompanies(prompt);
