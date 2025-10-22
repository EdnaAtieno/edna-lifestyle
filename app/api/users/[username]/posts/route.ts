import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "12")
  const offset = (page - 1) * limit

  try {
    // Get user ID from username
    const { data: userProfile } = await supabase.from("profiles").select("id").eq("username", username).single()

    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { data: posts, error } = await supabase
      .from("posts")
      .select(`
        id,
        content,
        image_url,
        like_count,
        comment_count,
        view_count,
        created_at,
        profiles:author_id (
          username,
          display_name,
          avatar_url,
          is_verified
        ),
        categories (
          name,
          color,
          slug
        )
      `)
      .eq("author_id", userProfile.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({ posts: posts || [] })
  } catch (error) {
    console.error("Error fetching user posts:", error)
    return NextResponse.json({ error: "Failed to fetch user posts" }, { status: 500 })
  }
}
