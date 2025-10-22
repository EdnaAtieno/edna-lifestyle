"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { Send, Heart } from "lucide-react"
import Link from "next/link"

interface Comment {
  id: string
  content: string
  like_count: number
  reply_count: number
  created_at: string
  profiles: {
    username: string
    display_name: string
    avatar_url: string
  }
}

interface CommentSectionProps {
  postId: string
  currentUserId?: string
}

export function CommentSection({ postId, currentUserId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    setIsLoading(true)

    try {
      const { data, error } = await supabase
        .from("comments")
        .select(`
          id,
          content,
          like_count,
          reply_count,
          created_at,
          profiles:user_id (
            username,
            display_name,
            avatar_url
          )
        `)
        .eq("post_id", postId)
        .is("parent_id", null)
        .order("created_at", { ascending: false })

      if (error) throw error

      setComments(data || [])
    } catch (error) {
      console.error("Error fetching comments:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUserId || !newComment.trim()) return

    setIsSubmitting(true)

    try {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          content: newComment.trim(),
          post_id: postId,
          user_id: currentUserId,
        })
        .select(`
          id,
          content,
          like_count,
          reply_count,
          created_at,
          profiles:user_id (
            username,
            display_name,
            avatar_url
          )
        `)
        .single()

      if (error) throw error

      setComments((prev) => [data, ...prev])
      setNewComment("")
    } catch (error) {
      console.error("Error posting comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const timeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d`
    return date.toLocaleDateString()
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Comment Form */}
        {currentUserId && (
          <form onSubmit={handleSubmitComment} className="space-y-3">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{newComment.length}/500</span>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting || !newComment.trim()}
                className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </div>
          </form>
        )}

        {/* Comments List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No comments yet.</p>
              <p className="text-sm">Be the first to share your thoughts!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage
                    src={comment.profiles.avatar_url || "/placeholder.svg"}
                    alt={comment.profiles.display_name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-rose-500 to-orange-500 text-white text-xs">
                    {comment.profiles.display_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Link
                      href={`/profile/${comment.profiles.username}`}
                      className="font-semibold text-sm text-gray-900 hover:underline"
                    >
                      {comment.profiles.display_name}
                    </Link>
                    <span className="text-xs text-gray-500">{timeAgo(comment.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-700 text-pretty">{comment.content}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-red-600 p-0 h-auto">
                      <Heart className="w-3 h-3 mr-1" />
                      {comment.like_count > 0 && comment.like_count}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs text-gray-500 p-0 h-auto">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
