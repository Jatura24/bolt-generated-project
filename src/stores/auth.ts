import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const profile = ref<{
    username: string
    avatar_emoji: string
  } | null>(null)
  const isInitialized = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  const initialize = async () => {
    try {
      // Get initial session
      const { data: { session } } = await supabase.auth.getSession()
      user.value = session?.user ?? null

      if (user.value) {
        await loadProfile()
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        user.value = session?.user ?? null
        
        if (session) {
          await loadProfile()
        } else {
          profile.value = null
        }
      })
    } catch (error) {
      console.error('Auth initialization error:', error)
    } finally {
      isInitialized.value = true
    }
  }

  const loadProfile = async () => {
    if (!user.value) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_emoji')
        .eq('id', user.value.id)
        .single()

      if (error) throw error
      profile.value = data
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    user.value = null
    profile.value = null
  }

  return {
    user,
    profile,
    isAuthenticated,
    isInitialized,
    initialize,
    signOut
  }
})
