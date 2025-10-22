import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { PostDetail } from "@/components/post-detail"
import { CommentSection } from "@/components/comment-section"
import { Footer } from "@/components/footer"

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get post with author and category info
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
        color
      )
    `)
    .eq("id", id)
    .single()

  if (error || !post) {
    notFound()
  }

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

  // Check if user has liked this post
  let hasLiked = false
  if (user) {
    const { data: like } = await supabase.from("likes").select("id").eq("user_id", user.id).eq("post_id", id).single()
    hasLiked = !!like
  }

  // Increment view count
  await supabase
    .from("posts")
    .update({ view_count: post.view_count + 1 })
    .eq("id", id)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PostDetail post={{ ...post, tags }} currentUserId={user?.id} hasLiked={hasLiked} />
          </div>
          <div className="lg:col-span-1">
            <CommentSection postId={id} currentUserId={user?.id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
