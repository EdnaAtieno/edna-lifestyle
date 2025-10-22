"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { Heart } from "lucide-react"

interface LikeButtonProps {
  postId: string
  userId: string
  initialLiked: boolean
}

export function LikeButton({ postId, userId, initialLiked }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleLike = async () => {
    setIsLoading(true)

    try {
      if (isLiked) {
        // Unlike
        await supabase.from("likes").delete().eq("user_id", userId).eq("post_id", postId)
        setIsLiked(false)
      } else {
        // Like
        await supabase.from("likes").insert({
          user_id: userId,
          post_id: postId,
        })
        setIsLiked(true)
      }
    } catch (error) {
      console.error("Error updating like:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      disabled={isLoading}
      className={`${isLiked ? "text-red-600 hover:text-red-700" : "text-gray-600 hover:text-red-600"}`}
    >
      <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
    </Button>
  )
}
