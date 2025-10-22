import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Hash, Heart, MessageCircle } from "lucide-react"

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore</h1>
          <p className="text-gray-600">Discover trending content and connect with the community</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: "Summer Fashion Essentials 2024",
                author: "StyleGuru",
                image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
                likes: 1247,
                comments: 89,
                category: "Fashion",
              },
              {
                id: 2,
                title: "10-Step Korean Skincare Routine",
                author: "BeautyExpert",
                image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
                likes: 2156,
                comments: 234,
                category: "Beauty",
              },
              {
                id: 3,
                title: "Minimalist Home Decor Ideas",
                author: "HomeDesigner",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
                likes: 892,
                comments: 67,
                category: "Lifestyle",
              },
              {
                id: 4,
                title: "Sustainable Fashion Brands to Know",
                author: "EcoFashionista",
                image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
                likes: 1534,
                comments: 156,
                category: "Fashion",
              },
              {
                id: 5,
                title: "Natural Makeup Look Tutorial",
                author: "MakeupArtist",
                image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop",
                likes: 987,
                comments: 78,
                category: "Beauty",
              },
              {
                id: 6,
                title: "Wellness Morning Routine",
                author: "WellnessCoach",
                image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
                likes: 1876,
                comments: 203,
                category: "Lifestyle",
              },
            ].map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-square relative">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">by {post.author}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {post.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Hashtags</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { tag: "fashion", count: "12.5K" },
              { tag: "beauty", count: "8.9K" },
              { tag: "lifestyle", count: "15.2K" },
              { tag: "skincare", count: "6.7K" },
              { tag: "ootd", count: "9.8K" },
              { tag: "makeup", count: "7.3K" },
              { tag: "wellness", count: "5.4K" },
              { tag: "sustainable", count: "4.1K" },
              { tag: "minimalist", count: "3.8K" },
              { tag: "selfcare", count: "11.2K" },
              { tag: "style", count: "13.6K" },
              { tag: "inspiration", count: "16.9K" },
            ].map((hashtag) => (
              <Card key={hashtag.tag} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Hash className="w-6 h-6 text-rose-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">#{hashtag.tag}</h3>
                  <p className="text-sm text-gray-600">{hashtag.count} posts</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Suggested Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                username: "fashionista_maya",
                name: "Maya Chen",
                followers: "45.2K",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
                bio: "Fashion blogger & stylist",
              },
              {
                username: "beauty_by_sarah",
                name: "Sarah Johnson",
                followers: "32.8K",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
                bio: "Makeup artist & beauty guru",
              },
              {
                username: "lifestyle_alex",
                name: "Alex Rivera",
                followers: "28.5K",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
                bio: "Lifestyle content creator",
              },
              {
                username: "wellness_emma",
                name: "Emma Thompson",
                followers: "51.3K",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
                bio: "Wellness coach & nutritionist",
              },
            ].map((user) => (
              <Card key={user.username} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">@{user.username}</p>
                  <p className="text-xs text-gray-500 mb-4">{user.bio}</p>
                  <p className="text-sm font-medium text-gray-700 mb-4">{user.followers} followers</p>
                  <button className="w-full bg-gradient-to-r from-rose-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:from-rose-600 hover:to-orange-600 transition-colors">
                    Follow
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Fashion",
                description: "Latest trends, outfit ideas, and style inspiration",
                icon: "👗",
                posts: "2.3K",
                color: "from-pink-500 to-rose-500",
              },
              {
                name: "Beauty",
                description: "Skincare routines, makeup tutorials, and beauty tips",
                icon: "💄",
                posts: "1.8K",
                color: "from-purple-500 to-pink-500",
              },
              {
                name: "Lifestyle",
                description: "Wellness, home decor, and daily inspiration",
                icon: "🌿",
                posts: "3.1K",
                color: "from-green-500 to-teal-500",
              },
            ].map((category) => (
              <Card key={category.name} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <span className="text-4xl">{category.icon}</span>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <p className="text-sm font-medium text-gray-700">{category.posts} posts</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Summer Essentials 2024",
                description: "Must-have pieces for the perfect summer wardrobe",
                posts: 24,
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
              },
              {
                title: "Skincare Routine Guide",
                description: "Step-by-step guides for healthy, glowing skin",
                posts: 18,
                image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&h=300&fit=crop",
              },
            ].map((collection, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex">
                  <div className="flex-1 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{collection.title}</h3>
                    <p className="text-gray-600 mb-4">{collection.description}</p>
                    <p className="text-sm font-medium text-rose-600">{collection.posts} posts</p>
                  </div>
                  <div className="w-32 h-32">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
