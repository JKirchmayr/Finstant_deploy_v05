import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { Database } from "@/types/supabase"
import { OpenAI } from "openai"

export async function GET(req: NextRequest) {
  type CompanyRow = Database["development"]["Tables"]["companies"]["Row"]
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  })
  const url = req.nextUrl
  const from = parseInt(url.searchParams.get("from") || "0")
  const to = parseInt(url.searchParams.get("to") || "30")

  const hqCountries = url.searchParams.getAll("hqCountry")
  const industries = url.searchParams.getAll("industry")
  const ebitdaMax = url.searchParams.get("ebitdaMax")
  const ebitdaMin = url.searchParams.get("ebitdaMin")
  const revenueMax = url.searchParams.get("revenueMax")
  const revenueMin = url.searchParams.get("revenueMin")
  const description = url.searchParams.get("description") || ""
  // Select only allowed fields (exclude vector fields)
  const allowedFields = Object.keys({} as CompanyRow)
    .filter(
      (key) =>
        !["company_name_vector_embedding", "company_description_vector_embedding"].includes(key)
    )
    .join(",")

  console.log(hqCountries, industries, ebitdaMax, ebitdaMin, revenueMax, revenueMin)

  try {
    const supabase = await createClient()
    let query = supabase.schema("development").from("companies").select(allowedFields)

    // Apply filters
    if (hqCountries.length > 0) {
      query = query.in("companies_LLM_country", hqCountries)
    }

    if (industries.length > 0) {
      query = query.in("companies_linkedin_industries", industries)
    }
    if (ebitdaMax) {
      query = query.lt("companies_EBITDA_estimate_mEUR", ebitdaMax)
    }

    if (ebitdaMin) {
      query = query.gt("companies_EBITDA_estimate_mEUR", ebitdaMin)
    }
    if (revenueMax) {
      query = query.lt("companies_revenue_estimate_mEUR", revenueMax)
    }

    if (revenueMin) {
      query = query.gt("companies_revenue_estimate_mEUR", revenueMin)
    }

    if (description.trim()) {
      const embeddingRes = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: description,
      })

      const embedding = embeddingRes.data[0].embedding
      const { data, error } = await supabase
        .schema("development")
        .rpc("semantic_match_companies", {
          // @ts-ignore
          query_embedding: embedding,
          match_threshold: 0.1,
          match_count: 10,
        })

      if (error) {
        console.error("❌ Supabase match_companies error:", error.message)
        return NextResponse.json(
          { error: "Semantic search failed", message: error.message },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        data,
        message: "Semantic search results",
      })
    }

    // Pagination
    query = query.range(from, to)

    const { data: companies, error } = await query

    // console.log(companies)

    if (error) {
      console.error("❌ Supabase error:", error.message)
      return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: companies,
      message: "Fetched companies successfully",
    })
  } catch (err) {
    console.error("❌ Companies API Error:", err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"
