import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    // Check if already liked
    const { data: existingLike } = await supabase
      .from("likes")
      .select("id")
      .eq("user_id", user.id)
      .eq("post_id", id)
      .single()

    if (existingLike) {
      return NextResponse.json({ error: "Already liked" }, { status: 400 })
    }

    // Add like
    const { error } = await supabase.from("likes").insert({
      user_id: user.id,
      post_id: id,
    })

    if (error) throw error

    return NextResponse.json({ message: "Post liked successfully" })
  } catch (error) {
    console.error("Error liking post:", error)
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 })
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

    // Remove like
    const { error } = await supabase.from("likes").delete().eq("user_id", user.id).eq("post_id", id)

    if (error) throw error

    return NextResponse.json({ message: "Post unliked successfully" })
  } catch (error) {
    console.error("Error unliking post:", error)
    return NextResponse.json({ error: "Failed to unlike post" }, { status: 500 })
  }
}
