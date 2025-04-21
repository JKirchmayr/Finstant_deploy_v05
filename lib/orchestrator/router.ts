import type { PromptClassification } from "./classifier"
import { getCompanyList } from "./retrievers/companies"
import { getInvestorList } from "./retrievers/investors"
import { generateChatResponse } from "./agents/chatAgent"
import { ChatMessage } from "@/store/chatStore"

type OrchestratorResult =
  | {
      type: "grid"
      columns: string[]
      rows: any[]
    }
  | {
      type: "chat"
      message: string
    }

const defaultCompanyColumns = [
  "Company Name",
  "Sector",
  "Revenue",
  "EBITDA (€M)",
  "Margin",
  "Status",
  "Website",
]

const defaultInvestorColumns = [
  "Investor Name",
  "Description",
  "Investment Focus",
  "Country",
  "Ticket Size (€M)",
]

export async function routeToRetriever(
  classification: PromptClassification,
  prompt: string,
  context: "companies" | "investors",
  prefer: "grid" | "chat",
  messages?: ChatMessage[]
): Promise<OrchestratorResult> {
  const { intent, filters = {}, columns = [] } = classification

  // Respect the UI's layout preference
  if (prefer === "chat") {
    // @ts-ignore
    const message = await generateChatResponse(messages ?? [{ role: "user", content: prompt }])
    return {
      type: "chat",
      message,
    }
  }

  // GRID MODE — pick retriever based on context
  if (prefer === "grid" && context === "companies" && intent === "company_list") {
    const rows = await getCompanyList(prompt, columns)
    return {
      type: "grid",
      columns: columns.length ? columns : defaultCompanyColumns,
      rows,
    }
  }

  if (prefer === "grid" && context === "investors" && intent === "investor_search") {
    const rows = await getInvestorList(filters, columns)
    return {
      type: "grid",
      columns: columns.length ? columns : defaultInvestorColumns,
      rows,
    }
  }

  throw new Error(
    `❌ No retriever matched for: intent="${intent}" context="${context}" prefer="${prefer}"`
  )
}
