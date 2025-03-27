import axios from "axios";

export const getAllInvestor = async (): Promise<any> => {
  const res = await axios.get("/api/investor");
  return res.data.data;
};
