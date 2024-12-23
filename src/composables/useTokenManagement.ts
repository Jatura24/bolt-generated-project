import { computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import { formatNumber } from '@/utils/formatters'
import type { TokenEarning, TokenSpending } from '@/types/token'

export function useTokenManagement() {
  const tokenStore = useTokenStore()

  const balance = computed(() => tokenStore.currentBalance)
  const formattedBalance = computed(() => formatNumber(balance.value))
  
  const earnTokens = ({ amount, game }: TokenEarning) => {
    tokenStore.earnTokens(amount, game)
    return {
      newBalance: tokenStore.currentBalance,
      earned: amount
    }
  }
  
  const spendTokens = ({ amount, game }: Omit<TokenSpending, 'success'>): TokenSpending => {
    const success = tokenStore.spendTokens(amount, game)
    return {
      amount,
      game,
      success
    }
  }
  
  const recentTransactions = computed(() => tokenStore.recentTransactions)
  
  const getTransactionsByGame = (game: string) => 
    tokenStore.transactionsByGame(game)

  return {
    balance,
    formattedBalance,
    earnTokens,
    spendTokens,
    recentTransactions,
    getTransactionsByGame
  }
}
