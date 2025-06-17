import dynamic from "next/dynamic"
import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    let { data: companies, error } = await supabase
      .schema("development")
      .from("investments")
      .select("*")

    return NextResponse.json({
      companies,
      error: error,
      message: "Fetched companies and investors successfully",
    })
  } catch (error) {
    console.error("❌ Error fetching companies and investors:", error)
    return NextResponse.json({ error: "Failed to fetch companies and investors" }, { status: 500 })
  }
}
