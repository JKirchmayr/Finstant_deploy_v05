import axios from "axios"

type CoPilotRequest = { prompt: string; user_id: string }

export const getCoPilotData = async (payload: CoPilotRequest): Promise<any> => {
  const { data } = await axios.post("/api/chat", payload)
  console.log("Data:", data)
  return data
}
