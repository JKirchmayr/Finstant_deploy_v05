import OpenAI from "openai"
import { createClient } from "@/lib/supabase/server"
import { openai } from "@/lib/openai"
import { columnFieldMap } from "@/lib/orchestrator/utils/columnFieldMap"

export async function getCompanyList(prompt: string, columns: string[]): Promise<any[]> {
  const supabase = await createClient()

  // 1. Generate embedding from full prompt
  const embeddingRes = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: prompt,
  })

  const embedding = embeddingRes.data[0].embedding

  // 2. Call Supabase RPC for vector match
  const { data, error } = await supabase.rpc("match_companies", {
    // @ts-ignore
    query_embedding: embedding,
    match_threshold: 0.75,
    match_count: 50,
  })

  if (error) {
    console.error("❌ match_companies RPC error:", error.message)
    return []
  }

  // console.log("Data: ", data)

  // 3. Map result to requested columns
  return data.map((row: any) =>
    columns.reduce((acc, col) => {
      const dbField =
        columnFieldMap[col] ||
        col
          .toLowerCase()
          .replace(/ \(.*?\)/, "")
          .replace(/[^a-zA-Z0-9_]/g, "_")
      // @ts-ignore
      acc[col] = row[dbField] ?? null
      return acc
    }, {} as Record<string, any>)
  )
}
