import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "20")
  const offset = (page - 1) * limit

  try {
    // Get user ID from username
    const { data: userProfile } = await supabase.from("profiles").select("id").eq("username", username).single()

    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { data: following, error } = await supabase
      .from("follows")
      .select(`
        profiles:following_id (
          username,
          display_name,
          avatar_url,
          bio,
          is_verified,
          follower_count
        )
      `)
      .eq("follower_id", userProfile.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({ following: following?.map((f) => f.profiles) || [] })
  } catch (error) {
    console.error("Error fetching following:", error)
    return NextResponse.json({ error: "Failed to fetch following" }, { status: 500 })
  }
}
