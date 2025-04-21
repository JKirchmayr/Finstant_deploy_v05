import { createClient } from "@/lib/supabase/client"

import { openai } from "@/lib/openai"
export type ChatMessage = {
  role: "user" | "assistant"
  content: string
}
export async function generateChatResponse(messages: ChatMessage[]): Promise<string> {
  const supabase = createClient()

  const lastPrompt = messages.at(-1)?.content
  if (!lastPrompt) return "No prompt received."

  // 1. Embed the most recent user message
  const embeddingRes = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: lastPrompt,
  })

  const embedding = embeddingRes.data[0].embedding

  // 2. Vector match for semantic company context
  // 2. Call Supabase RPC for vector match
  const { data: companies, error } = await supabase.rpc("match_companies", {
    // @ts-ignore
    query_embedding: embedding,
    match_threshold: 0.75,
    match_count: 5,
  })

  if (!companies || companies.length === 0) {
    return "I couldn't find any matching companies for your request."
  }

  // 3. Prepare structured context
  const context = companies
    .map((c: any, i: any) => {
      return `Company ${i + 1}:\nName: ${c.name}\nSector: ${c.sector}\nRevenue: €${
        c.sales_in_meur ?? "?"
      }M\nDescription: ${c.description ?? "N/A"}\n`
    })
    .join("\n")

  const systemPrompt = `
You are a helpful AI assistant for investors and companies.

Please:
- Respond in **Markdown format**
- Use headings, bullet points, bold/italic text
- Keep output clean and structured
- Avoid raw JSON, XML, or code blocks unless asked
- Do NOT include extra explanations or notes
`

  // 4. ChatGPT with chat history + company context
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
  })

  return completion.choices[0].message.content?.trim() ?? "Sorry, I couldn’t generate a response."
}
