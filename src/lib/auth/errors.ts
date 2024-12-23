export const AUTH_ERRORS = {
  USERNAME_TAKEN: 'username_taken',
  VALIDATION_ERROR: 'validation_error',
  UNEXPECTED_ERROR: 'unexpected_error',
  DATABASE_ERROR: 'database_error',
  RATE_LIMIT_ERROR: 'rate_limit_error',
  NETWORK_ERROR: 'network_error'
} as const

export const ERROR_MESSAGES = {
  [AUTH_ERRORS.USERNAME_TAKEN]: 'This username is already taken. Please choose another one.',
  [AUTH_ERRORS.DATABASE_ERROR]: 'Unable to create account. Please try again in a few moments.',
  [AUTH_ERRORS.UNEXPECTED_ERROR]: 'An unexpected error occurred. Please try again.',
  [AUTH_ERRORS.VALIDATION_ERROR]: 'Invalid input. Please check your details.',
  [AUTH_ERRORS.RATE_LIMIT_ERROR]: 'Too many attempts. Please wait a moment and try again.',
  [AUTH_ERRORS.NETWORK_ERROR]: 'Network error. Please check your connection and try again.'
} as const

export function getErrorMessage(code: keyof typeof AUTH_ERRORS): string {
  return ERROR_MESSAGES[code] || ERROR_MESSAGES[AUTH_ERRORS.UNEXPECTED_ERROR]
}

export function parseAuthError(error: any): keyof typeof AUTH_ERRORS {
  if (!error) return AUTH_ERRORS.UNEXPECTED_ERROR
  
  const message = error.message?.toLowerCase() || ''
  
  if (message.includes('network') || message.includes('fetch')) {
    return AUTH_ERRORS.NETWORK_ERROR
  }
  
  if (message.includes('rate limit') || message.includes('too many requests')) {
    return AUTH_ERRORS.RATE_LIMIT_ERROR
  }
  
  if (message.includes('username') && message.includes('taken')) {
    return AUTH_ERRORS.USERNAME_TAKEN
  }
  
  if (message.includes('database')) {
    return AUTH_ERRORS.DATABASE_ERROR
  }
  
  return AUTH_ERRORS.UNEXPECTED_ERROR
}
