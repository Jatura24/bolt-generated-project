import { supabase } from '../supabase'
import { validateUsername, validateAvatar } from './validation'
import type { SignUpResult } from './types'

export async function signUp(username: string, avatarEmoji: string): Promise<SignUpResult> {
  try {
    // Validate input
    const usernameValidation = validateUsername(username)
    if (!usernameValidation.isValid) {
      return {
        success: false,
        error: usernameValidation.error
      }
    }

    const avatarValidation = validateAvatar(avatarEmoji)
    if (!avatarValidation.isValid) {
      return {
        success: false,
        error: avatarValidation.error
      }
    }

    // Generate secure credentials
    const password = crypto.randomUUID()
    const email = `${username.toLowerCase()}@moodeng.game`

    // Attempt signup
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username.trim(),
          avatar_emoji: avatarEmoji.trim()
        }
      }
    })

    if (error) {
      if (error.message.includes('unique constraint')) {
        return {
          success: false,
          error: 'This username is already taken'
        }
      }
      return {
        success: false,
        error: 'Failed to create account. Please try again.'
      }
    }

    return {
      success: true,
      data
    }
  } catch (err) {
    console.error('Signup error:', err)
    return {
      success: false,
      error: 'An unexpected error occurred during signup'
    }
  }
}
