"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostGrid } from "@/components/post-grid"
import { Grid, Bookmark, Heart, Tag } from "lucide-react"

interface Profile {
  id: string
  username: string
  display_name: string
  bio: string
  avatar_url: string
  website: string
  location: string
  is_verified: boolean
  follower_count: number
  following_count: number
  post_count: number
  created_at: string
}

interface ProfileTabsProps {
  profile: Profile | null
  isOwnProfile: boolean
}

export function ProfileTabs({ profile, isOwnProfile }: ProfileTabsProps) {
  if (!profile) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-muted-foreground">Loading profile...</div>
      </div>
    )
  }

  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="posts" className="flex items-center gap-2">
          <Grid className="w-4 h-4" />
          <span className="hidden sm:inline">Posts</span>
        </TabsTrigger>
        {isOwnProfile && (
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">Saved</span>
          </TabsTrigger>
        )}
        <TabsTrigger value="liked" className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          <span className="hidden sm:inline">Liked</span>
        </TabsTrigger>
        <TabsTrigger value="tagged" className="flex items-center gap-2">
          <Tag className="w-4 h-4" />
          <span className="hidden sm:inline">Tagged</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="posts">
        <PostGrid userId={profile.id} type="posts" />
      </TabsContent>

      {isOwnProfile && (
        <TabsContent value="saved">
          <PostGrid userId={profile.id} type="saved" />
        </TabsContent>
      )}

      <TabsContent value="liked">
        <PostGrid userId={profile.id} type="liked" />
      </TabsContent>

      <TabsContent value="tagged">
        <PostGrid userId={profile.id} type="tagged" />
      </TabsContent>
    </Tabs>
  )
}
