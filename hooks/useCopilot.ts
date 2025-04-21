import { useCopilotQuery } from "@/queries/useCopilotQueries"

export const useCopilotRunner = (prompt: string) => {
  const { mutate, isPending, isError, error } = useCopilotQuery(prompt)

  return {
    mutate,
    isLoading: isPending,
    isError,
    error,
  }
}
