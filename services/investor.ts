import axios from "axios"
import qs from "query-string"

export const getAllInvestor = async (filters: any) => {
  const query = qs.stringify(filters, { skipEmptyString: true, skipNull: true })
  const { data } = await axios.get(`/api/investors?${query}`)
  return data.data
}

export const getInvestor = async (filters: any = {}) => {
  const query = qs.stringify(filters, { skipEmptyString: true, skipNull: true })
  const url = query ? `/api/investors?${query}` : "/api/investors"
  const { data } = await axios.get(url)
  return data.data
}
