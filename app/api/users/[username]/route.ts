import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params
  const supabase = await createClient()

  try {
    const { data: profile, error } = await supabase.from("profiles").select("*").eq("username", username).single()

    if (error) throw error

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user owns this profile
    const { data: profile } = await supabase.from("profiles").select("id").eq("username", username).single()

    if (!profile || profile.id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { display_name, bio, website, location, avatar_url } = body

    const { data: updatedProfile, error } = await supabase
      .from("profiles")
      .update({
        display_name,
        bio,
        website,
        location,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      .eq("username", username)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ profile: updatedProfile })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
