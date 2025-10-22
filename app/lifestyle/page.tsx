import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Lifestyle - EDNA",
  description: "Discover lifestyle inspiration, wellness tips, and life advice on EDNA.",
}

export default function LifestylePage() {
  const lifestyleTopics = [
    "Wellness",
    "Travel",
    "Home Decor",
    "Productivity",
    "Self Care",
    "Relationships",
    "Career",
    "Hobbies",
  ]

  const featuredPosts = [
    {
      id: 1,
      title: "Creating a Morning Routine That Actually Works",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      author: "WellnessCoach",
      likes: 567,
      category: "Wellness",
    },
    {
      id: 2,
      title: "Minimalist Home: Less Stuff, More Life",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      author: "MinimalistLiving",
      likes: 423,
      category: "Home",
    },
    {
      id: 3,
      title: "Solo Travel: Embracing Adventure Alone",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
      author: "SoloTraveler",
      likes: 389,
      category: "Travel",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Lifestyle Inspiration
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover ways to live your best life with tips on wellness, productivity, relationships, and personal
            growth.
          </p>
          <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white px-8 py-3 text-lg">
            Explore Lifestyle Content
          </Button>
        </div>
      </section>

      {/* Lifestyle Topics */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Lifestyle Topics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {lifestyleTopics.map((topic, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-lg">{topic}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Lifestyle Posts</h2>
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

      {/* Lifestyle Tips */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Daily Life Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="font-semibold text-xl mb-4">Morning Rituals</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Start with gratitude</li>
                <li>• Hydrate first thing</li>
                <li>• Move your body</li>
                <li>• Set daily intentions</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-xl mb-4">Evening Wind-Down</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Reflect on the day</li>
                <li>• Prepare for tomorrow</li>
                <li>• Limit screen time</li>
                <li>• Practice relaxation</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
