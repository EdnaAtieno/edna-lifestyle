# EDNA - Lifestyle & Fashion Social Platform

EDNA is a modern, full-stack social media platform designed for lifestyle and fashion enthusiasts. Built with Next.js 15, Supabase, and Tailwind CSS, it provides a comprehensive social experience with content creation, user interactions, and community features.

## ✨ Features

### 🔐 Authentication & User Management
- Secure email/password authentication with Supabase Auth
- User profiles with customizable information and avatars
- Profile editing and settings management
- Generic avatar fallbacks for new users

### 📱 Social Features
- Follow/unfollow users
- Real-time notifications system
- Personal and public profile views
- User discovery and suggestions

### 📝 Content Management
- Create posts with images and rich text
- Category-based content organization (Fashion, Beauty, Lifestyle)
- Tag system for content discovery
- Image upload and media management

### 💬 Social Interactions
- Like and unlike posts with real-time feedback
- Comprehensive commenting system
- Bookmark posts for later viewing
- Share posts functionality

### 🔍 Discovery & Navigation
- Explore page with trending content
- Search functionality across posts, users, and tags
- Category-based content filtering
- Personalized content feed

### 📄 Content Pages
- Dedicated Fashion, Beauty, and Lifestyle sections
- Help Center with FAQs
- Privacy Policy and Terms of Service
- Contact Us page with form

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase project
- Git

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd edna-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install --legacy-peer-deps
   \`\`\`

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
   \`\`\`

   Get these values from your Supabase project dashboard:
   - Go to Settings → API
   - Copy the Project URL and API keys

4. **Set up the database**
   
   Run the SQL scripts in your Supabase SQL editor in order:
   \`\`\`sql
   -- Run these files in sequence:
   scripts/01_create_profiles_table.sql
   scripts/02_create_categories_table.sql
   scripts/03_create_posts_table.sql
   scripts/04_create_media_table.sql
   scripts/05_create_comments_table.sql
   scripts/06_create_likes_table.sql
   scripts/07_create_follows_table.sql
   scripts/08_create_tags_table.sql
   scripts/09_create_notifications_table.sql
   scripts/10_create_functions_and_triggers.sql
   scripts/11_seed_sample_data.sql
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
edna-platform/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API endpoints
│   │   ├── posts/               # Post management APIs
│   │   ├── users/               # User management APIs
│   │   ├── categories/          # Category APIs
│   │   └── ...
│   ├── auth/                    # Authentication pages
│   ├── profile/                 # Profile pages
│   ├── categories/              # Category pages
│   └── ...
├── components/                   # Reusable React components
│   ├── ui/                      # shadcn/ui components
│   ├── navigation.tsx           # Main navigation
│   ├── profile-header.tsx       # Profile components
│   └── ...
├── lib/                         # Utility libraries
│   └── supabase/               # Supabase client configuration
├── scripts/                     # Database setup scripts
└── public/                      # Static assets
\`\`\`

## 🔌 API Endpoints

### Posts
- `GET /api/posts` - Get posts with filtering and pagination
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Get specific post
- `PUT /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post
- `POST /api/posts/[id]/like` - Like/unlike post
- `GET /api/posts/[id]/comments` - Get post comments
- `POST /api/posts/[id]/comments` - Add comment

### Users
- `GET /api/users/[username]` - Get user profile
- `PUT /api/users/[username]` - Update user profile
- `POST /api/users/[username]/follow` - Follow/unfollow user
- `GET /api/users/[username]/posts` - Get user's posts
- `GET /api/users/[username]/followers` - Get followers
- `GET /api/users/[username]/following` - Get following

### Other
- `GET /api/search` - Search posts, users, and tags
- `GET /api/feed` - Get personalized feed
- `GET /api/categories` - Get all categories
- `GET /api/tags` - Get all tags
- `GET /api/notifications` - Get user notifications
- `POST /api/upload` - Upload media files

## 🎨 Design System

The platform uses a sophisticated design system with:
- **Colors**: Rose-to-orange gradient theme with neutral grays
- **Typography**: Clean, readable fonts with proper hierarchy
- **Layout**: Mobile-first responsive design using Flexbox
- **Components**: Consistent shadcn/ui component library
- **Icons**: Lucide React icons throughout

## 🔒 Security Features

- Row Level Security (RLS) policies on all database tables
- Authenticated API endpoints with user verification
- Secure file upload with validation
- Protected routes and middleware
- Input sanitization and validation

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production

Add these to your deployment platform:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Help Center](/help) page
2. Review the database setup scripts
3. Verify environment variables are correctly set
4. Check Supabase project configuration

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database and Auth by [Supabase](https://supabase.com/)
- UI Components by [shadcn/ui](https://ui.shadcn.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)

---

**EDNA** - Where lifestyle meets community 🌟
