import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(req.url);
    const prompt = searchParams.get("prompt");

    // 🔍 If prompt is provided, run semantic search
    if (prompt) {
      const embeddingRes = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: prompt,
      });

      const embedding = embeddingRes.data[0].embedding;

      const { data, error } = await supabase.rpc("match_companies", {
        // @ts-ignore
        query_embedding: embedding,
        match_threshold: 0.75,
        match_count: 20,
      });

      if (error) {
        console.error("❌ Supabase match_companies error:", error.message);
        return NextResponse.json(
          { error: "Semantic search failed" },
          { status: 500 },
        );
      }

      return NextResponse.json({
        success: true,
        data,
        message: "Semantic search results",
      });
    }

    // 📦 Default: return all companies (no prompt)
    const { data, error } = await supabase
      .from("companies")
      .select(
        "id, name, description, current_investor, status, sector, created_at, website, sales_in_eurm, ebitda_in_eurm, marge, year_finacials, entry_year, logo",
      );

    if (error) {
      console.error("❌ Supabase error:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch companies" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Successfully fetched all companies",
    });
  } catch (err) {
    console.error("❌ Search API Error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
