"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FollowButton } from "@/components/follow-button"
import { Settings, MapPin, LinkIcon, Calendar, Verified } from "lucide-react"
import Link from "next/link"

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

interface ProfileHeaderProps {
  profile: Profile | null
  isOwnProfile: boolean
  currentUserId?: string
}

export function ProfileHeader({ profile, isOwnProfile, currentUserId }: ProfileHeaderProps) {
  if (!profile) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 animate-pulse">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="flex gap-4">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const joinDate = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown"

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Avatar className="w-24 h-24 md:w-32 md:h-32">
              <AvatarImage
                src={
                  profile.avatar_url ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                }
                alt={profile.display_name}
              />
              <AvatarFallback className="bg-gradient-to-br from-rose-500 to-orange-500 text-white text-2xl">
                {profile.display_name?.charAt(0).toUpperCase() || profile.username?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">
                    {profile.display_name || "Unknown User"}
                  </h1>
                  {profile.is_verified && <Verified className="w-5 h-5 text-blue-500 fill-current" />}
                </div>
                <p className="text-gray-600 mb-2">@{profile.username || "unknown"}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {isOwnProfile ? (
                  <Button asChild variant="outline">
                    <Link href="/settings">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                ) : (
                  currentUserId && <FollowButton targetUserId={profile.id} currentUserId={currentUserId} />
                )}
              </div>
            </div>

            {/* Bio */}
            {profile.bio && <p className="text-gray-700 mb-4 text-pretty">{profile.bio}</p>}

            {/* Profile Details */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-600 hover:underline"
                  >
                    {profile.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {joinDate}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 text-sm">
              <div>
                <span className="font-semibold text-gray-900">{profile.post_count || 0}</span>
                <span className="text-gray-600 ml-1">Posts</span>
              </div>
              <Link href={`/profile/${profile.username}/followers`} className="hover:underline">
                <span className="font-semibold text-gray-900">{profile.follower_count || 0}</span>
                <span className="text-gray-600 ml-1">Followers</span>
              </Link>
              <Link href={`/profile/${profile.username}/following`} className="hover:underline">
                <span className="font-semibold text-gray-900">{profile.following_count || 0}</span>
                <span className="text-gray-600 ml-1">Following</span>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
