import axios from "axios";

export const getAllCompanies = async (prompt?: string): Promise<any[]> => {
  const res = await axios.get("/api/companies", {
    params: prompt ? { prompt } : {},
  });
  return res.data.data; // standardized in your API
};
