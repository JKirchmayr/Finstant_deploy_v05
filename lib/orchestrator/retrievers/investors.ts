import { createClient } from "@/lib/supabase/server"

export async function getInvestorList(
  filters: Record<string, any>,
  columns: string[]
): Promise<any[]> {
  const supabase = await createClient()

  let query = supabase.from("investors").select("*")

  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value === "number") {
      if (key.endsWith("_gt")) {
        query = query.gte(key.replace("_gt", ""), value)
      } else if (key.endsWith("_lt")) {
        query = query.lte(key.replace("_lt", ""), value)
      } else {
        query = query.eq(key, value)
      }
    } else if (Array.isArray(value)) {
      query = query.contains(key, value)
    } else {
      query = query.ilike(key, `%${value}%`)
    }
  })

  const { data, error } = await query.limit(20)

  if (error) {
    console.error("Error fetching investors:", error)
    return []
  }

  return data.map((row) =>
    columns.reduce((acc, col) => {
      // @ts-ignore
      acc[col] =
        // @ts-ignore
        row[
          col
            .toLowerCase()
            .replace(/ \(.*?\)/, "")
            .replace(/[^a-zA-Z0-9_]/g, "_")
        ]
      return acc
    }, {} as Record<string, any>)
  )
}
