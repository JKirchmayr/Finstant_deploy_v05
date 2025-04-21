import { NextResponse, NextRequest } from "next/server"
import axios from "axios"
const apiURL = process.env.BACKEND_URL!
export async function POST(req: Request) {
  try {
    const { prompt, user_id } = await req.json()

    const { data } = await axios.post(`${apiURL}/chat`, { prompt, user_id })

    return NextResponse.json({ success: true, message: "", data: data })
  } catch (error) {
    return NextResponse.json({ success: false, message: "something went wrong", error: error })
  }
}
