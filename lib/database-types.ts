// TypeScript types for the database schema
export interface User {
  id: string
  email: string
  password_hash: string
  first_name?: string
  last_name?: string
  username?: string
  profile_image_url?: string
  bio?: string
  date_of_birth?: string
  phone?: string
  is_verified: boolean
  is_active: boolean
  role: "user" | "admin" | "moderator"
  created_at: string
  updated_at: string
  last_login?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  parent_id?: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content?: string
  excerpt?: string
  featured_image_url?: string
  author_id: string
  category_id?: string
  status: "draft" | "published" | "archived"
  is_featured: boolean
  view_count: number
  like_count: number
  comment_count: number
  published_at?: string
  created_at: string
  updated_at: string
}

export interface Media {
  id: string
  filename: string
  original_filename: string
  file_path: string
  file_url: string
  file_size?: number
  mime_type?: string
  width?: number
  height?: number
  alt_text?: string
  uploaded_by: string
  created_at: string
}

export interface Comment {
  id: string
  content: string
  post_id: string
  user_id: string
  parent_id?: string
  is_approved: boolean
  like_count: number
  created_at: string
  updated_at: string
}

export interface Like {
  id: string
  user_id: string
  post_id?: string
  comment_id?: string
  created_at: string
}

export interface Follow {
  id: string
  follower_id: string
  following_id: string
  created_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  usage_count: number
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message?: string
  data?: Record<string, any>
  is_read: boolean
  created_at: string
}

export interface UserSession {
  id: string
  user_id: string
  session_token: string
  refresh_token?: string
  expires_at: string
  ip_address?: string
  user_agent?: string
  is_active: boolean
  created_at: string
}

export interface UserSetting {
  id: string
  user_id: string
  setting_key: string
  setting_value?: string
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  user_id?: string
  action: string
  table_name?: string
  record_id?: string
  old_values?: Record<string, any>
  new_values?: Record<string, any>
  ip_address?: string
  user_agent?: string
  created_at: string
}
