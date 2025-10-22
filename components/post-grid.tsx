"use client"

import { Card } from "@/components/ui/card"
import { Heart, MessageCircle, Eye } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface Post {
  id: string
  content: string
  image_url: string
  like_count: number
  comment_count: number
  view_count: number
  created_at: string
  author: {
    username: string
    display_name: string
    avatar_url: string
  }
}

interface PostGridProps {
  userId: string
  type: "posts" | "saved" | "liked" | "tagged"
}

export function PostGrid({ userId, type }: PostGridProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchPosts()
  }, [userId, type])

  const fetchPosts = async () => {
    setLoading(true)

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
            avatar_url
          )
        `)

      switch (type) {
        case "posts":
          query = query.eq("author_id", userId)
          break
        case "saved":
          // Join with saved_posts table
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
                avatar_url
              ),
              saved_posts!inner (user_id)
            `)
            .eq("saved_posts.user_id", userId)
          break
        case "liked":
          // Join with likes table
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
                avatar_url
              ),
              likes!inner (user_id)
            `)
            .eq("likes.user_id", userId)
            .not("likes.post_id", "is", null)
          break
        case "tagged":
          // Join with post_tags and user mentions
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
                avatar_url
              )
            `)
            .textSearch("content", `@${userId}`) // Simple text search for mentions
          break
      }

      const { data, error } = await query.order("created_at", { ascending: false }).limit(12)

      if (error) throw error

      // Transform the data to match our Post interface
      const transformedPosts =
        data?.map((post: any) => ({
          ...post,
          author: Array.isArray(post.profiles) ? post.profiles[0] : post.profiles,
        })) || []

      setPosts(transformedPosts)
    } catch (error) {
      console.error("Error fetching posts:", error)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
        <p className="text-gray-600">
          {type === "posts" && "Start sharing your style moments!"}
          {type === "saved" && "Save posts you love to see them here."}
          {type === "liked" && "Posts you like will appear here."}
          {type === "tagged" && "Posts where you're tagged will show up here."}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`}>
          <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={post.image_url || "/placeholder.svg"}
                alt="Post content"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-4 text-white">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-5 h-5 fill-current" />
                    <span className="font-semibold">{post.like_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span className="font-semibold">{post.comment_count}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
