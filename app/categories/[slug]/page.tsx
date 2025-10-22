import { createClient } from "@/lib/supabase/server"
import { PostGrid } from "@/components/post-grid"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const supabase = await createClient()

  // Get category details
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", params.slug)
    .single()

  if (categoryError || !category) {
    notFound()
  }

  // Get posts for this category
  const { data: posts, error: postsError } = await supabase
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
    .eq("category_id", category.id)
    .order("created_at", { ascending: false })
    .limit(24)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Badge style={{ backgroundColor: category.color }} className="text-white text-lg px-6 py-2">
              {category.name}
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name} Posts</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the latest {category.name.toLowerCase()} content from our community
          </p>
        </div>

        {/* Posts Grid */}
        {posts && posts.length > 0 ? (
          <PostGrid posts={posts} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
