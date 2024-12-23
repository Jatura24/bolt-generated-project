export interface Profile {
  username: string
  avatar: string
}

export interface UserStats {
  gamesPlayed: number
  tokensEarned: number
  highestScore: number
  zooVisitors: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
}
