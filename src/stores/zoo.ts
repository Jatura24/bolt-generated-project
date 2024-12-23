import { defineStore } from 'pinia'
import type { PlacedItem } from '@/types/zoo'

interface ZooState {
  placedItems: PlacedItem[]
  votes: number
  rank: number
}

export const useZooStore = defineStore('zoo', {
  state: (): ZooState => ({
    placedItems: [],
    votes: 0,
    rank: 999
  }),
  
  getters: {
    totalVotes: (state) => state.votes,
    currentRank: (state) => state.rank
  },
  
  actions: {
    saveZoo(items: PlacedItem[]) {
      this.placedItems = items
      // In a real app, this would sync with a backend
    },
    
    addVote() {
      this.votes++
      this.updateRank()
    },
    
    updateRank() {
      // In a real app, this would be calculated based on other users' votes
      this.rank = Math.max(1, Math.floor(1000 / (this.votes + 1)))
    }
  }
})
