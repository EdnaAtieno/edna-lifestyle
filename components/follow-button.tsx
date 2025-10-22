"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { UserPlus, UserMinus } from "lucide-react"

interface FollowButtonProps {
  targetUserId: string
  currentUserId: string
}

export function FollowButton({ targetUserId, currentUserId }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    checkFollowStatus()
  }, [targetUserId, currentUserId])

  const checkFollowStatus = async () => {
    const { data } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", currentUserId)
      .eq("following_id", targetUserId)
      .single()

    setIsFollowing(!!data)
  }

  const handleFollow = async () => {
    setIsLoading(true)

    try {
      if (isFollowing) {
        // Unfollow
        await supabase.from("follows").delete().eq("follower_id", currentUserId).eq("following_id", targetUserId)
        setIsFollowing(false)
      } else {
        // Follow
        await supabase.from("follows").insert({
          follower_id: currentUserId,
          following_id: targetUserId,
        })
        setIsFollowing(true)
      }
    } catch (error) {
      console.error("Error updating follow status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleFollow}
      disabled={isLoading}
      variant={isFollowing ? "outline" : "default"}
      className={
        isFollowing
          ? "border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
          : "bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white"
      }
    >
      {isLoading ? (
        "Loading..."
      ) : isFollowing ? (
        <>
          <UserMinus className="w-4 h-4 mr-2" />
          Unfollow
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4 mr-2" />
          Follow
        </>
      )}
    </Button>
  )
}
