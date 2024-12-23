import { computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import { calculateTokenReward } from '@/utils/tokenUtils'

export function useQuizRewards() {
  const tokenStore = useTokenStore()

  const calculateReward = (score: number, multiplier = 1) => {
    const baseReward = 10 // Base tokens per correct answer
    return calculateTokenReward(baseReward * score, multiplier)
  }

  const awardTokens = (amount: number) => {
    tokenStore.earnTokens(amount, 'Token Quest')
    return amount
  }

  return {
    calculateReward,
    awardTokens
  }
}
