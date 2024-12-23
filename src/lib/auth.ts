import { supabase } from './supabase'

export async function signUp(username: string, avatarEmoji: string) {
  // Generate a secure random password
  const password = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
  
  const email = `${username.toLowerCase()}@moodeng.game`
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        avatar_emoji: avatarEmoji
      }
    }
  })
  
  if (error) {
    throw error
  }
  
  return data
}
