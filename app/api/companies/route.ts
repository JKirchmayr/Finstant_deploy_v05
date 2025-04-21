import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    let { data: companies, error } = await supabase.from("companies").select("*")
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
