"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { LikeButton } from "@/components/like-button"
import { ShareButton } from "@/components/share-button"
import { BookmarkButton } from "@/components/bookmark-button"
import { Heart, MessageCircle, Eye, Verified } from "lucide-react"
import Link from "next/link"

interface Post {
  id: string
  content: string
  image_url: string
  like_count: number
  comment_count: number
  view_count: number
  created_at: string
  profiles: {
    username: string
    display_name: string
    avatar_url: string
    is_verified: boolean
  }
  categories?: {
    name: string
    color: string
  }
  tags: Array<{
    id: string
    name: string
    slug: string
  }>
}

interface PostDetailProps {
  post: Post
  currentUserId?: string
  hasLiked: boolean
}

export function PostDetail({ post, currentUserId, hasLiked }: PostDetailProps) {
  const timeAgo = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="overflow-hidden">
      {/* Post Image */}
      <div className="aspect-square relative">
        <img src={post.image_url || "/placeholder.svg"} alt="Post content" className="w-full h-full object-cover" />
      </div>

      <CardContent className="p-6">
        {/* Author Info */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post.profiles.avatar_url || "/placeholder.svg"} alt={post.profiles.display_name} />
            <AvatarFallback className="bg-gradient-to-br from-rose-500 to-orange-500 text-white">
              {post.profiles.display_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Link href={`/profile/${post.profiles.username}`} className="font-semibold text-gray-900 hover:underline">
                {post.profiles.display_name}
              </Link>
              {post.profiles.is_verified && <Verified className="w-4 h-4 text-blue-500 fill-current" />}
            </div>
            <p className="text-sm text-gray-500">@{post.profiles.username}</p>
          </div>
          {post.categories && (
            <Badge style={{ backgroundColor: post.categories.color }} className="text-white">
              {post.categories.name}
            </Badge>
          )}
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-700 text-pretty whitespace-pre-wrap">{post.content}</p>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <Badge variant="secondary" className="hover:bg-rose-100 hover:text-rose-700 cursor-pointer">
                  #{tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Engagement Stats */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{post.like_count} likes</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comment_count} comments</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.view_count} views</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">{timeAgo}</p>
        </div>

        {/* Action Buttons */}
        {currentUserId && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <LikeButton postId={post.id} userId={currentUserId} initialLiked={hasLiked} />
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600" asChild>
                <Link href={`/post/${post.id}`}>
                  <MessageCircle className="w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <ShareButton postId={post.id} />
              <BookmarkButton postId={post.id} userId={currentUserId} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
