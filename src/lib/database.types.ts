export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          avatar_emoji: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          avatar_emoji: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          avatar_emoji?: string
          created_at?: string
          updated_at?: string
        }
      }
      tokens: {
        Row: {
          id: string
          user_id: string
          balance: number
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          balance?: number
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'earn' | 'spend'
          game: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: 'earn' | 'spend'
          game: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: 'earn' | 'spend'
          game?: string
          created_at?: string
        }
      }
      zoo_items: {
        Row: {
          id: string
          user_id: string
          item_type: string
          x: number
          y: number
          rotation: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          item_type: string
          x: number
          y: number
          rotation?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          item_type?: string
          x?: number
          y?: number
          rotation?: number
          created_at?: string
        }
      }
    }
  }
}
