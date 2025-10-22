import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Beauty - EDNA",
  description: "Explore beauty tips, skincare routines, makeup tutorials, and wellness advice on EDNA.",
}

export default function BeautyPage() {
  const beautyCategories = ["Skincare", "Makeup", "Haircare", "Wellness", "Natural Beauty", "Product Reviews"]

  const featuredContent = [
    {
      id: 1,
      title: "10-Step Korean Skincare Routine for Glowing Skin",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop",
      author: "SkincareExpert",
      likes: 456,
      category: "Skincare",
    },
    {
      id: 2,
      title: "Natural Makeup Look: Enhance Your Features",
      image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
      author: "MakeupArtist",
      likes: 289,
      category: "Makeup",
    },
    {
      id: 3,
      title: "DIY Hair Masks for Every Hair Type",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
      author: "HairCareGuru",
      likes: 178,
      category: "Haircare",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Beauty & Wellness
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover beauty secrets, skincare tips, and wellness advice from our community of beauty enthusiasts.
          </p>
          <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-8 py-3 text-lg">
            Explore Beauty Content
          </Button>
        </div>
      </section>

      {/* Beauty Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Beauty Categories</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {beautyCategories.map((category, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-lg">{category}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Beauty Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredContent.map((post) => (
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

      {/* Beauty Tips */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Beauty Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="font-semibold text-xl mb-4">Daily Skincare</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Always remove makeup before bed</li>
                <li>• Use sunscreen daily, even indoors</li>
                <li>• Stay hydrated for healthy skin</li>
                <li>• Be gentle with your skin</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-xl mb-4">Makeup Basics</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Start with a good primer</li>
                <li>• Blend, blend, blend</li>
                <li>• Choose colors that complement your skin tone</li>
                <li>• Less is often more</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
