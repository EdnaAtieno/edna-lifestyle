"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface ShareButtonProps {
  postId: string
}

export function ShareButton({ postId }: ShareButtonProps) {
  const handleShare = async () => {
    const url = `${window.location.origin}/post/${postId}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this post on EDNA",
          url: url,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url)
        // You could show a toast notification here
      } catch (error) {
        console.log("Error copying to clipboard:", error)
      }
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleShare} className="text-gray-600 hover:text-green-600">
      <Share2 className="w-5 h-5" />
    </Button>
  )
}
