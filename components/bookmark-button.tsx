"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { Bookmark } from "lucide-react"

interface BookmarkButtonProps {
  postId: string
  userId: string
}

export function BookmarkButton({ postId, userId }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    checkBookmarkStatus()
  }, [postId, userId])

  const checkBookmarkStatus = async () => {
    const { data } = await supabase
      .from("saved_posts")
      .select("id")
      .eq("user_id", userId)
      .eq("post_id", postId)
      .single()

    setIsBookmarked(!!data)
  }

  const handleBookmark = async () => {
    setIsLoading(true)

    try {
      if (isBookmarked) {
        // Remove bookmark
        await supabase.from("saved_posts").delete().eq("user_id", userId).eq("post_id", postId)
        setIsBookmarked(false)
      } else {
        // Add bookmark
        await supabase.from("saved_posts").insert({
          user_id: userId,
          post_id: postId,
        })
        setIsBookmarked(true)
      }
    } catch (error) {
      console.error("Error updating bookmark:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBookmark}
      disabled={isLoading}
      className={`${isBookmarked ? "text-yellow-600 hover:text-yellow-700" : "text-gray-600 hover:text-yellow-600"}`}
    >
      <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
    </Button>
  )
}
