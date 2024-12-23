import { defineStore } from 'pinia'
import type { LeaderboardEntry } from '@/types/leaderboard'

interface LeaderboardState {
  entries: Record<string, LeaderboardEntry[]>
  currentUserRanks: Record<string, number>
}

export const useLeaderboardStore = defineStore('leaderboard', {
  state: (): LeaderboardState => ({
    entries: {
      'all-time': generateMockEntries(),
      'weekly': generateMockEntries(),
      'daily': generateMockEntries()
    },
    currentUserRanks: {
      'all-time': 142,
      'weekly': 89,
      'daily': 45
    }
  }),
  
  getters: {
    getLeaderboardEntries: (state) => {
      return (timeframe: string) => state.entries[timeframe] || []
    },
    
    getCurrentUserRank: (state) => {
      return (timeframe: string) => state.currentUserRanks[timeframe] || 0
    }
  }
})

// Helper function to generate mock data
function generateMockEntries(): LeaderboardEntry[] {
  const entries: LeaderboardEntry[] = []
  
  for (let i = 0; i < 100; i++) {
    entries.push({
      id: crypto.randomUUID(),
      username: `Player${i + 1}`,
      avatar: `/assets/avatars/avatar${(i % 10) + 1}.png`,
      score: Math.floor(Math.random() * 10000) + 1000,
      level: Math.floor(Math.random() * 50) + 1,
      isCurrentUser: i === 15 // Make one entry the current user
    })
  }
  
  return entries.sort((a, b) => b.score - a.score)
}
