```typescript
import { ref, computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import { useIntervalFn } from '@vueuse/core'

export function usePopGame() {
  const tokenStore = useTokenStore()
  const score = ref(0)
  const timeLeft = ref(60)
  const tokensEarned = ref(0)
  const isGameOver = ref(false)
  
  const { pause: pauseTimer } = useIntervalFn(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      endGame()
    }
  }, 1000)
  
  const handleScore = () => {
    score.value++
    // Every 5 points = 1 token
    if (score.value % 5 === 0) {
      const tokens = 1
      tokensEarned.value += tokens
      tokenStore.earnTokens(tokens, 'Hippo Click')
    }
  }
  
  const endGame = () => {
    isGameOver.value = true
    pauseTimer()
  }
  
  const initGame = () => {
    timeLeft.value = 60
    score.value = 0
    tokensEarned.value = 0
    isGameOver.value = false
  }
  
  const resetGame = () => {
    initGame()
  }
  
  const destroyGame = () => {
    pauseTimer()
  }
  
  return {
    timeLeft,
    score,
    tokensEarned,
    isGameOver,
    handleScore,
    initGame,
    resetGame,
    destroyGame
  }
}
```
