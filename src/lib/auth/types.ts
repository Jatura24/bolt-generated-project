export interface ValidationResult {
  isValid: boolean
  error?: string
}

export interface SignUpResult {
  success: boolean
  data?: any
  error?: string
}

export interface AuthUser {
  id: string
  email: string
  username: string
  avatarEmoji: string
}
