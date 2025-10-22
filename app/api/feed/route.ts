import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "12")
  const offset = (page - 1) * limit

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get posts from followed users
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
      .in("author_id", supabase.from("follows").select("following_id").eq("follower_id", user.id))
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({ posts: posts || [] })
  } catch (error) {
    console.error("Error fetching feed:", error)
    return NextResponse.json({ error: "Failed to fetch feed" }, { status: 500 })
  }
}
