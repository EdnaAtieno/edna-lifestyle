import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { ProfileHeader } from "@/components/profile-header"
import { ProfileTabs } from "@/components/profile-tabs"
import { Footer } from "@/components/footer"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    // Create a basic profile for the user
    const { data: newProfile } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        username: user.email?.split("@")[0] || `user_${user.id.slice(0, 8)}`,
        display_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
        bio: "",
        avatar_url: user.user_metadata?.avatar_url || "",
        website: "",
        location: "",
        is_verified: false,
        follower_count: 0,
        following_count: 0,
        post_count: 0,
      })
      .select()
      .single()

    if (newProfile) {
      return (
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProfileHeader profile={newProfile} isOwnProfile={true} />
            <ProfileTabs profile={newProfile} isOwnProfile={true} />
          </main>
          <Footer />
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader profile={profile} isOwnProfile={true} />
        <ProfileTabs profile={profile} isOwnProfile={true} />
      </main>
      <Footer />
    </div>
  )
}
