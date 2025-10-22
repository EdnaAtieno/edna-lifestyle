"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const [supabaseError, setSupabaseError] = useState(false)

  useEffect(() => {
    let supabase: any = null

    try {
      supabase = createClient()
    } catch (error) {
      console.warn("Supabase client creation failed:", error)
      setSupabaseError(true)
      const mockUser = {
        id: "mock-user-id",
        email: "demo@edna.com",
        user_metadata: {
          avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          full_name: "Demo User",
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        aud: "authenticated",
        role: "authenticated",
      } as User

      setUser(mockUser)
      setLoading(false)
      return
    }

    if (!supabase || supabaseError) {
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.warn("Failed to get session:", error)
        setUser(null)
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabaseError])

  const signOut = async () => {
    if (supabaseError) {
      setUser(null)
      return
    }

    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch (error) {
      console.warn("Sign out failed:", error)
      setUser(null)
    }
  }

  return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
