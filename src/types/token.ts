export type TransactionType = 'earn' | 'spend'

export interface Transaction {
  id: string
  amount: number
  type: TransactionType
  timestamp: Date
  game: string
}

export interface TokenEarning {
  amount: number
  game: string
}

export interface TokenSpending {
  amount: number
  game: string
  success: boolean
}
