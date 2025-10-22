import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Fashion - EDNA",
  description: "Discover the latest fashion trends, style inspiration, and outfit ideas on EDNA.",
}

export default function FashionPage() {
  const trendingTopics = [
    "Sustainable Fashion",
    "Vintage Style",
    "Minimalist Wardrobe",
    "Street Style",
    "Seasonal Trends",
    "Designer Spotlight",
  ]

  const featuredPosts = [
    {
      id: 1,
      title: "10 Must-Have Pieces for Your Fall Wardrobe",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      author: "StyleGuru",
      likes: 234,
      category: "Seasonal",
    },
    {
      id: 2,
      title: "Sustainable Fashion: Building an Eco-Friendly Closet",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      author: "EcoFashionista",
      likes: 189,
      category: "Sustainable",
    },
    {
      id: 3,
      title: "Street Style Inspiration from Fashion Week",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop",
      author: "StreetStylePro",
      likes: 312,
      category: "Street Style",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
      {/* Navigation Component */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Fashion Forward
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the latest trends, timeless styles, and fashion inspiration from our community of style
            enthusiasts.
          </p>
          <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-8 py-3 text-lg">
            Explore Fashion Posts
          </Button>
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Trending Topics</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {trendingTopics.map((topic, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2 text-sm hover:bg-rose-100 cursor-pointer">
                #{topic.replace(" ", "")}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Fashion Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-2">{post.category}</Badge>
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>by {post.author}</span>
                    <span>{post.likes} likes</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Share Your Style</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our fashion community and share your unique style with fashion lovers worldwide.
          </p>
          <Link href="/create">
            <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-8 py-3 text-lg">
              Create Fashion Post
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
