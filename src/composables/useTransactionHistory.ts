import { computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import type { Transaction, TransactionType } from '@/types/token'

export function useTransactionHistory() {
  const tokenStore = useTokenStore()

  const transactions = computed<Transaction[]>(() => 
    tokenStore.transactions.slice().reverse()
  )

  const getTransactionsByGame = (game: string) =>
    transactions.value.filter(t => t.game === game)

  const getTransactionsByType = (type: TransactionType) =>
    transactions.value.filter(t => t.type === type)

  const getTotalByType = (type: TransactionType) =>
    getTransactionsByType(type).reduce((sum, t) => sum + t.amount, 0)

  return {
    transactions,
    getTransactionsByGame,
    getTransactionsByType,
    getTotalByType
  }
}
