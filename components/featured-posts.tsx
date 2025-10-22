import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"
import Link from "next/link"

const samplePosts = [
  {
    id: 1,
    author: {
      name: "Sarah Chen",
      username: "@sarahstyle",
      avatar: "/woman-portrait.png",
    },
    content: "Loving this vintage-inspired look for fall! The warm tones are perfect for the season ",
    image: "/fashion-outfit-autumn.png",
    likes: 234,
    comments: 18,
    timeAgo: "2h",
    category: "Fashion",
  },
  {
    id: 2,
    author: {
      name: "Maya Rodriguez",
      username: "@mayabeauty",
      avatar: "/woman-portrait-2.png",
    },
    content: "My morning skincare routine that keeps my skin glowing  Swipe for product details!",
    image: "/skincare-beauty-routine.png",
    likes: 189,
    comments: 24,
    timeAgo: "4h",
    category: "Beauty",
  },
  {
    id: 3,
    author: {
      name: "Alex Thompson",
      username: "@alexlifestyle",
      avatar: "/person-portrait-3.png",
    },
    content: "Cozy Sunday vibes with my favorite coffee and a good book ",
    image: "/cozy-lifestyle-coffee.png",
    likes: 156,
    comments: 12,
    timeAgo: "6h",
    category: "Lifestyle",
  },
]

export function FeaturedPosts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trending Now</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most loved posts from our community of style creators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {samplePosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback className="bg-gradient-to-br from-rose-500 to-orange-500 text-white">
                      {post.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-sm text-gray-900">{post.author.name}</h4>
                      <span className="text-xs text-gray-500">{post.timeAgo}</span>
                    </div>
                    <p className="text-xs text-gray-500">{post.author.username}</p>
                  </div>
                  <div className="px-2 py-1 bg-rose-100 text-rose-700 text-xs font-medium rounded-full">
                    {post.category}
                  </div>
                </div>
              </div>

              <div className="aspect-square relative overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt="Post content"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardContent className="p-4">
                <p className="text-sm text-gray-700 mb-4 text-pretty">{post.content}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-rose-600">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-yellow-600">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="bg-white hover:bg-gray-50 border-gray-300">
            <Link href="/explore">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
