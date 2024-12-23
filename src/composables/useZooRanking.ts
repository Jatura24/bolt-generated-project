import { ref, computed } from 'vue'
import { useZooStore } from '@/stores/zoo'

export function useZooRanking() {
  const zooStore = useZooStore()
  
  const totalPlayers = 1000 // Mock total players
  
  const rankPercentile = computed(() => {
    return Math.round((1 - (zooStore.rank / totalPlayers)) * 100)
  })
  
  const rankTier = computed(() => {
    const rank = zooStore.rank
    if (rank <= 10) return 'Diamond'
    if (rank <= 50) return 'Platinum'
    if (rank <= 100) return 'Gold'
    if (rank <= 250) return 'Silver'
    return 'Bronze'
  })
  
  return {
    rank: computed(() => zooStore.rank),
    votes: computed(() => zooStore.votes),
    rankPercentile,
    rankTier,
    totalPlayers
  }
}
