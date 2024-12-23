export type HippoState = 'open' | 'closed'

export interface Position {
  x: number
  y: number
}

export interface ScorePopup {
  id: string
  x: number
  y: number
  points: number
}

export interface GameStats {
  timeLeft: number
  score: number
  tokens: number
}
