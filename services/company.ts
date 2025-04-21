import axios from "axios"
import qs from "query-string"

export const getCompanies = async (filters: any = {}) => {
  const query = qs.stringify(filters, { skipEmptyString: true, skipNull: true })
  const url = query ? `/api/companies?${query}` : "/api/companies"
  const { data } = await axios.get(url)
  return data.data
}
