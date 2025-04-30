import axios from "axios"
import qs from "query-string"

export const getCompanies = async (filters: any = {}) => {
  const { page = 1, pageSize = 10, ...rest } = filters
  const query = qs.stringify(
    { ...rest, page, pageSize },
    { skipEmptyString: true, skipNull: true }
  )
  const url = query ? `/api/companies?${query}` : "/api/companies"
  const { data } = await axios.get(url)
  return data.data
}
