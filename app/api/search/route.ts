import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  const query = searchParams.get("q")
  const type = searchParams.get("type") || "all" // all, posts, users, tags
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const results: any = {
      posts: [],
      users: [],
      tags: [],
    }

    // Search posts
    if (type === "all" || type === "posts") {
      const { data: posts } = await supabase
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
          )
        `)
        .textSearch("content", query)
        .order("created_at", { ascending: false })
        .limit(limit)

      results.posts = posts || []
    }

    // Search users
    if (type === "all" || type === "users") {
      const { data: users } = await supabase
        .from("profiles")
        .select("username, display_name, avatar_url, bio, is_verified, follower_count")
        .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
        .order("follower_count", { ascending: false })
        .limit(limit)

      results.users = users || []
    }

    // Search tags
    if (type === "all" || type === "tags") {
      const { data: tags } = await supabase
        .from("tags")
        .select("id, name, slug, post_count")
        .ilike("name", `%${query}%`)
        .order("post_count", { ascending: false })
        .limit(limit)

      results.tags = tags || []
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error performing search:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
