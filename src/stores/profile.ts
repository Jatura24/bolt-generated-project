import { defineStore } from 'pinia'
import type { Profile, UserStats, Achievement } from '@/types/profile'

interface ProfileState {
  profile: Profile
  stats: UserStats
  achievements: Achievement[]
}

export const useProfileStore = defineStore('profile', {
  state: (): ProfileState => ({
    profile: {
      username: 'Player123',
      avatar: '/assets/default-avatar.png'
    },
    stats: {
      gamesPlayed: 42,
      tokensEarned: 1500,
      highestScore: 850,
      zooVisitors: 123
    },
    achievements: [
      {
        id: 'first-win',
        name: 'First Victory',
        description: 'Win your first game',
        icon: '🏆',
        unlocked: true
      },
      {
        id: 'token-master',
        name: 'Token Master',
        description: 'Earn 1000 tokens in total',
        icon: '💰',
        unlocked: true
      },
      {
        id: 'zoo-keeper',
        name: 'Zoo Keeper',
        description: 'Place 50 items in your zoo',
        icon: '🦁',
        unlocked: false
      }
    ]
  })
})
