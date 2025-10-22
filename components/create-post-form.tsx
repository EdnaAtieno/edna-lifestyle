"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { X, ImageIcon } from "lucide-react"

interface Category {
  id: string
  name: string
  slug: string
  color: string
}

interface CreatePostFormProps {
  categories: Category[]
  userId: string
}

export function CreatePostForm({ categories, userId }: CreatePostFormProps) {
  const [formData, setFormData] = useState({
    content: "",
    category_id: "",
    tags: "",
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage.from("posts").upload(fileName, file)

    if (error) {
      console.error("Error uploading image:", error)
      return null
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("posts").getPublicUrl(data.path)

    return publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      let imageUrl = null

      // Upload image if selected
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage)
        if (!imageUrl) {
          throw new Error("Failed to upload image")
        }
      }

      // Create post
      const { data: post, error: postError } = await supabase
        .from("posts")
        .insert({
          content: formData.content,
          image_url: imageUrl,
          category_id: formData.category_id || null,
          author_id: userId,
        })
        .select()
        .single()

      if (postError) throw postError

      // Process tags
      if (formData.tags.trim()) {
        const tagNames = formData.tags
          .split(",")
          .map((tag) => tag.trim().toLowerCase())
          .filter((tag) => tag.length > 0)

        for (const tagName of tagNames) {
          // Create or get tag
          const { data: existingTag } = await supabase.from("tags").select("id").eq("name", tagName).single()

          let tagId = existingTag?.id

          if (!tagId) {
            const { data: newTag, error: tagError } = await supabase
              .from("tags")
              .insert({
                name: tagName,
                slug: tagName.replace(/\s+/g, "-"),
              })
              .select("id")
              .single()

            if (tagError) throw tagError
            tagId = newTag.id
          }

          // Link tag to post
          await supabase.from("post_tags").insert({
            post_id: post.id,
            tag_id: tagId,
          })
        }
      }

      setMessage({ type: "success", text: "Post created successfully!" })
      router.push(`/post/${post.id}`)
    } catch (error) {
      console.error("Error creating post:", error)
      setMessage({ type: "error", text: "Failed to create post. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="space-y-2">
        <Label>Photo</Label>
        {imagePreview ? (
          <Card className="relative">
            <CardContent className="p-0">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-rose-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Click to upload a photo</p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
          required
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">Caption</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
          placeholder="Share your story..."
          rows={4}
          maxLength={2200}
          required
        />
        <p className="text-xs text-gray-500">{formData.content.length}/2200 characters</p>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={formData.category_id} onValueChange={(value) => handleChange("category_id", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category (optional)" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span>{category.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          type="text"
          value={formData.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
          placeholder="fashion, style, ootd (separate with commas)"
        />
        <p className="text-xs text-gray-500">Add relevant tags to help people discover your post</p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-3 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !selectedImage}
          className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white"
        >
          {isLoading ? "Publishing..." : "Publish Post"}
        </Button>
      </div>
    </form>
  )
}
