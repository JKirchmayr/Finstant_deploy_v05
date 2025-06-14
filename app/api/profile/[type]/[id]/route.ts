import dynamic from "next/dynamic"
import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  const { type, id } = await params
  const profileType = type === "investor_profile" ? "investors" : "companies"
  const IdType = type === "investor_profile" ? "investor_id" : "company_id"

  if (!type || !id) return NextResponse.json({ error: "Missing parameters" }, { status: 400 })

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .schema("development")
      .from(profileType)
      .select("*")
      .eq(IdType, Number(id))

    if (error) {
      console.error("❌ Supabase error:", error.message)
      return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: data[0],
      message: "Fetched profile successfully",
    })
  } catch (error) {
    console.error("❌ Error fetching companies and investors:", error)
    return NextResponse.json({ error: "Failed to fetch companies and investors" }, { status: 500 })
  }
}
