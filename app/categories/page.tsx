import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function CategoriesPage() {
  const supabase = await createClient()

  const { data: categories, error } = await supabase.from("categories").select("*").order("name")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover content organized by your favorite topics</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Badge style={{ backgroundColor: category.color }} className="text-white text-lg px-4 py-2 mb-4">
                    {category.name}
                  </Badge>
                  <p className="text-gray-600">Explore {category.name.toLowerCase()} content</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
