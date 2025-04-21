// lib/orchestrator/classifier.ts
import { z } from "zod"
import OpenAI from "openai"
import { zodResponseFormat } from "openai/helpers/zod"

export const PromptClassificationSchema = z.object({
  intent: z.enum([
    "company_list",
    "investor_search",
    "semantic_similarity",
    "acquirer_ranking",
    "llm_info",
  ]),
  data_bucket: z.enum(["Companies", "Investors"]),
  response_format: z.enum(["grid", "chat"]),
  filters: z
    .object({})
    .catchall(z.union([z.string(), z.number(), z.boolean()]))
    .optional(),
  columns: z.array(z.string()).optional(),
})

export type PromptClassification = z.infer<typeof PromptClassificationSchema>

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function classifyPromptWithGPT(
  prompt: string,
  context: "companies" | "investors",
  prefer: "grid" | "chat"
): Promise<PromptClassification> {
  const systemPrompt = `
    You are an AI Orchestrator. Your job is to classify a user's business prompt.

    Please:
    1. Classify the intent (e.g. "company_list", "investor_search", "semantic_similarity", "acquirer_ranking").
    2. Identify the data bucket ("Companies", "Investors").
    3. Choose a response format: "grid" or "chat".
    4. Extract relevant filters as key-value pairs.

6. IMPORTANT: Use only the following approved column names (exactly as written, case-sensitive) when defining \`columns\`.

For Companies:
- "Company Name"
- "Description"
- "Sector"
- "Revenue"
- "EBITDA (€M)"
- "Margin"
- "Status"
- "Website"
- "Entry Year"
- "Year Financials"

For Investors:
- "Investor Name"
- "Description"
- "Investment Focus"
- "Country"
- "Ticket Size (€M)"
- "Website"
- "HQ City"

⚠️ Do NOT invent new column names. Use only from the list above.
`.trim()

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    response_format: zodResponseFormat(PromptClassificationSchema, "classify_prompt"),
  })

  const parsed = completion.choices[0].message

  if (parsed.refusal) {
    throw new Error(`OpenAI refused: ${parsed.refusal}`)
  }

  return parsed.parsed!
}
