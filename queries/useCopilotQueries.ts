import { useMutation } from "@tanstack/react-query"
import { getCoPilotData } from "@/services/copilot"

type payload = { prompt: string; user_id: string }
export const useCopilotQuery = (prompt: string) => {
  return useMutation({
    mutationFn: (payload: payload) => getCoPilotData(payload),
  })
}
