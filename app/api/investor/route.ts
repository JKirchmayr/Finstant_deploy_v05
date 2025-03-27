import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("investors").select(
      `*,
      companies:investor_companies(
             companies (
               id,
               logo,
               name,
               description
             )
           )
         `,
    );

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch companies" },
        { status: 500 },
      );
    }
    const investorsWithCompanies = data.map((investor) => ({
      ...investor,
      companies:
        investor.companies.map((link) => ({
          // @ts-ignore
          id: link.companies.id,
          // @ts-ignore
          logo: link.companies.logo,
          // @ts-ignore
          name: link.companies.name,
          // @ts-ignore
          description: link.companies.description,
        })) || [],
    }));

    return NextResponse.json({
      success: true,
      data: investorsWithCompanies,
      message: "Successfully fetched all companies",
    });
  } catch (err) {
    console.error("Search API Error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
