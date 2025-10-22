import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  try {
    // Get post with full details
    const { data: post, error } = await supabase
      .from("posts")
      .select(`
        *,
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
      .eq("id", id)
      .single()

    if (error) throw error

    // Get post tags
    const { data: postTags } = await supabase
      .from("post_tags")
      .select(`
        tags (
          id,
          name,
          slug
        )
      `)
      .eq("post_id", id)

    const tags = postTags?.map((pt: any) => pt.tags) || []

    // Increment view count
    await supabase
      .from("posts")
      .update({ view_count: post.view_count + 1 })
      .eq("id", id)

    return NextResponse.json({ post: { ...post, tags } })
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user owns the post
    const { data: post } = await supabase.from("posts").select("author_id").eq("id", id).single()

    if (!post || post.author_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { content, category_id } = body

    const { data: updatedPost, error } = await supabase
      .from("posts")
      .update({
        content,
        category_id: category_id || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ post: updatedPost })
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user owns the post
    const { data: post } = await supabase.from("posts").select("author_id").eq("id", id).single()

    if (!post || post.author_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { error } = await supabase.from("posts").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
