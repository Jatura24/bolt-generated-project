import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { signUp } from '@/lib/auth/signup'

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()
  const isLoading = ref(false)
  const error = ref('')

  const handleSignUp = async (username: string, avatarEmoji: string) => {
    if (!username.trim()) {
      error.value = 'Please enter a username'
      return false
    }

    error.value = ''
    isLoading.value = true
    
    try {
      const result = await signUp(username, avatarEmoji)
      if (!result.success) {
        error.value = result.error || 'Failed to create account'
        return false
      }

      await authStore.initialize()
      router.push('/')
      return true
    } catch (err) {
      console.error('Login error:', err)
      error.value = 'An unexpected error occurred'
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    handleSignUp
  }
}
