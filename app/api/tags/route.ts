import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  const trending = searchParams.get("trending") === "true"
  const limit = Number.parseInt(searchParams.get("limit") || "20")

  try {
    let query = supabase.from("tags").select("*")

    if (trending) {
      query = query.order("post_count", { ascending: false })
    } else {
      query = query.order("name")
    }

    const { data: tags, error } = await query.limit(limit)

    if (error) throw error

    return NextResponse.json({ tags: tags || [] })
  } catch (error) {
    console.error("Error fetching tags:", error)
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 })
  }
}
