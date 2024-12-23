import { ref, computed, onUnmounted } from 'vue'
import { useTokenStore } from '@/stores/token'
import { useIntervalFn } from '@vueuse/core'
import type { Position } from '@/types/games'

export function useHippoGame() {
  const tokenStore = useTokenStore()
  const score = ref(0)
  const timeLeft = ref(30)
  const tokensEarned = ref(0)
  const isGameOver = ref(false)
  const hippoState = ref<'open' | 'closed'>('closed')
  const position = ref({ x: 50, y: 50 })
  const highScore = ref(parseInt(localStorage.getItem('hippoHighScore') || '0'))
  const rank = ref(0)
  const totalPlayers = 1000 // Mock total players

  const rankPercentile = computed(() => {
    return Math.round((1 - (rank.value / totalPlayers)) * 100)
  })

  const rankTier = computed(() => {
    if (score.value >= 50) return 'Diamond'
    if (score.value >= 40) return 'Platinum'
    if (score.value >= 30) return 'Gold'
    if (score.value >= 20) return 'Silver'
    return 'Bronze'
  })

  const { pause: stopMovement, resume: startMovement } = useIntervalFn(() => {
    if (hippoState.value === 'closed') {
      moveToRandomPosition()
    }
  }, computed(() => {
    const baseInterval = 2000
    const reduction = Math.floor(score.value / 10) * 200
    const minInterval = 500
    return Math.max(baseInterval - reduction, minInterval)
  }))

  const { pause: stopTimer } = useIntervalFn(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      endGame()
    }
  }, 1000)

  const moveToRandomPosition = () => {
    position.value = {
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10
    }
  }

  const handleClick = async (clickPos: Position) => {
    if (isGameOver.value) return

    score.value++
    hippoState.value = 'open'
    
    setTimeout(() => {
      hippoState.value = 'closed'
      moveToRandomPosition()
    }, 300)

    if (score.value % 5 === 0) {
      const tokens = 1
      tokensEarned.value += tokens
      await tokenStore.earnTokens(tokens, 'Hippo Click')
    }

    stopMovement()
    startMovement()
  }

  const updateRank = () => {
    // Calculate rank based on score and mock total players
    rank.value = Math.max(1, Math.floor(totalPlayers / (score.value + 1)))
  }

  const endGame = () => {
    isGameOver.value = true
    stopMovement()
    stopTimer()
    
    if (score.value > highScore.value) {
      highScore.value = score.value
      localStorage.setItem('hippoHighScore', score.value.toString())
    }
    
    updateRank()
  }

  const initGame = () => {
    score.value = 0
    timeLeft.value = 30
    tokensEarned.value = 0
    isGameOver.value = false
    hippoState.value = 'closed'
    moveToRandomPosition()
    startMovement()
  }

  onUnmounted(() => {
    stopMovement()
    stopTimer()
  })

  return {
    score,
    timeLeft,
    tokensEarned,
    isGameOver,
    hippoState,
    position,
    highScore,
    rank,
    rankPercentile,
    rankTier,
    handleClick,
    initGame
  }
}
