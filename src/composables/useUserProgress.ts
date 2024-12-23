import { computed } from 'vue'
import { useTokenStore } from '@/stores/token'

export function useUserProgress() {
  const tokenStore = useTokenStore()
  
  const userLevel = computed(() => {
    const balance = tokenStore.balance
    return Math.floor(Math.log2(balance + 1)) + 1
  })
  
  const levelProgress = computed(() => {
    const balance = tokenStore.balance
    const currentLevelMin = Math.pow(2, userLevel.value - 1) - 1
    const nextLevelMin = Math.pow(2, userLevel.value) - 1
    const progress = ((balance - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100
    return Math.min(Math.max(progress, 0), 100)
  })

  return {
    userLevel,
    levelProgress
  }
}
