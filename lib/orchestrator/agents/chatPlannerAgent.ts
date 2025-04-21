import { openai } from "@/lib/openai"
import { z } from "zod"
import { zodResponseFormat } from "openai/helpers/zod"
export const ChatPlanSchema = z.object({
  summary_type: z.enum(["single", "multi"]),
  max_matches: z.number(), // ❌ removed .min().max()
  tone: z.enum(["formal", "casual", "neutral"]).default("neutral"),
  format: z.enum(["paragraph", "bullets"]).default("paragraph"),
})

export type ChatPlan = z.infer<typeof ChatPlanSchema>

export async function chatPlannerAgent(prompt: string): Promise<ChatPlan> {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `
You are an AI planner. Your job is to analyze the user's business prompt and decide how a chat summary should be presented.

Return a JSON object in this format:
{
  "summary_type": "single" | "multi",
  "max_matches": number (between 1–10),
  "tone": "formal" | "casual" | "neutral",
  "format": "paragraph" | "bullets"
}

Only respond with valid JSON. Do not explain or wrap in markdown.
        `.trim(),
      },
      { role: "user", content: prompt },
    ],
    response_format: zodResponseFormat(ChatPlanSchema, "chat_plan"),
  })

  const parsed = completion.choices[0].message

  console.log("Chat Parsed: ", parsed)

  if (parsed.refusal) {
    throw new Error(`GPT refused to plan chat: ${parsed.refusal}`)
  }

  return parsed.parsed!
}
