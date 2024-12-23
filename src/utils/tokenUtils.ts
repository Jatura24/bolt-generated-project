// Token formatting and calculation utilities
import type { Transaction, TransactionType } from '@/types/token'

export function createTransaction(
  type: TransactionType,
  amount: number,
  game: string
): Transaction {
  return {
    id: crypto.randomUUID(),
    amount,
    type,
    timestamp: new Date(),
    game
  }
}

export function calculateTokenReward(score: number, multiplier = 1): number {
  return Math.floor(score * multiplier)
}
