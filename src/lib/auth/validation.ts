import type { ValidationResult } from './types'

export function validateUsername(username: string): ValidationResult {
  username = username.trim()
  
  if (!username) {
    return { isValid: false, error: 'Username is required' }
  }
  
  if (username.length < 3 || username.length > 20) {
    return {
      isValid: false,
      error: 'Username must be between 3 and 20 characters'
    }
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return {
      isValid: false,
      error: 'Username can only contain letters, numbers, and underscores'
    }
  }
  
  return { isValid: true }
}

export function validateAvatar(emoji: string): ValidationResult {
  if (!emoji.trim()) {
    return { isValid: false, error: 'Avatar emoji is required' }
  }
  return { isValid: true }
}
