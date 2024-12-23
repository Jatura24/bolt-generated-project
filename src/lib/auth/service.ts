import { supabase } from '../supabase'
import { generateSecurePassword, generateEmail } from './utils'
import { validateSignUpData } from './validation'
import { AUTH_ERRORS, getErrorMessage, parseAuthError } from './errors'
import type { SignUpData, AuthResponse } from './types'

export async function signUp(data: SignUpData): Promise<AuthResponse> {
  try {
    // Validate input
    const validation = validateSignUpData(data)
    if (!validation.isValid) {
      return {
        success: false,
        error: {
          message: validation.error || getErrorMessage(AUTH_ERRORS.VALIDATION_ERROR),
          code: AUTH_ERRORS.VALIDATION_ERROR
        }
      }
    }

    // Generate credentials
    const password = generateSecurePassword()
    const email = generateEmail(data.username)

    // Attempt signup with retries
    let retries = 2
    let lastError = null

    while (retries >= 0) {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: data.username,
              avatar_emoji: data.avatarEmoji
            }
          }
        })

        if (!error) {
          return { success: true }
        }

        lastError = error
        
        // Don't retry certain errors
        const errorCode = parseAuthError(error)
        if ([AUTH_ERRORS.USERNAME_TAKEN, AUTH_ERRORS.VALIDATION_ERROR].includes(errorCode)) {
          break
        }

        retries--
        if (retries >= 0) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      } catch (err) {
        lastError = err
        retries--
        if (retries >= 0) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }
    }

    // Handle final error
    const errorCode = parseAuthError(lastError)
    return {
      success: false,
      error: {
        message: getErrorMessage(errorCode),
        code: errorCode
      }
    }
  } catch (err) {
    console.error('Signup error:', err)
    const errorCode = parseAuthError(err)
    return {
      success: false,
      error: {
        message: getErrorMessage(errorCode),
        code: errorCode
      }
    }
  }
}
