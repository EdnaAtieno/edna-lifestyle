import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)

  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "12")
  const category = searchParams.get("category")
  const tag = searchParams.get("tag")
  const author = searchParams.get("author")
  const search = searchParams.get("search")

  const offset = (page - 1) * limit

  try {
    let query = supabase.from("posts").select(`
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

    // Apply filters
    if (category) {
      query = query.eq("category_id", category)
    }

    if (author) {
      query = query.eq("profiles.username", author)
    }

    if (search) {
      query = query.textSearch("content", search)
    }

    if (tag) {
      query = query
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
          ),
          post_tags!inner (
            tags!inner (
              slug
            )
          )
        `)
        .eq("post_tags.tags.slug", tag)
    }

    const { data: posts, error } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    // Get total count for pagination
    let countQuery = supabase.from("posts").select("*", { count: "exact", head: true })

    if (category) {
      countQuery = countQuery.eq("category_id", category)
    }

    const { count } = await countQuery

    return NextResponse.json({
      posts: posts || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { content, image_url, category_id, tags } = body

    // Create post
    const { data: post, error: postError } = await supabase
      .from("posts")
      .insert({
        content,
        image_url,
        category_id: category_id || null,
        author_id: user.id,
      })
      .select()
      .single()

    if (postError) throw postError

    // Process tags if provided
    if (tags && Array.isArray(tags)) {
      for (const tagName of tags) {
        // Create or get tag
        const { data: existingTag } = await supabase
          .from("tags")
          .select("id")
          .eq("name", tagName.toLowerCase())
          .single()

        let tagId = existingTag?.id

        if (!tagId) {
          const { data: newTag, error: tagError } = await supabase
            .from("tags")
            .insert({
              name: tagName.toLowerCase(),
              slug: tagName.toLowerCase().replace(/\s+/g, "-"),
            })
            .select("id")
            .single()

          if (tagError) throw tagError
          tagId = newTag.id
        }

        // Link tag to post
        await supabase.from("post_tags").insert({
          post_id: post.id,
          tag_id: tagId,
        })
      }
    }

    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
