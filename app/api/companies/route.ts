import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { Database } from "@/types/supabase"

export async function GET(req: NextRequest) {
  type CompanyRow = Database["development"]["Tables"]["companies"]["Row"]

  // Dynamically build the select string
  const selectedFields = Object.keys({} as CompanyRow)
    .filter((key) => key !== "company_description_embedding")
    .join(",")

  console.log(selectedFields)
  const from = parseInt(req.nextUrl.searchParams.get("from") || "0")
  const to = parseInt(req.nextUrl.searchParams.get("to") || "30")
  try {
    const supabase = await createClient()
    let { data: companies, error } = await supabase
      .schema("development")
      .from("companies")
      .select(selectedFields)
      .range(from, to)
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
