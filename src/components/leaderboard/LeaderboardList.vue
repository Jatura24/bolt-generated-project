<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden">
    <div class="grid gap-2 p-4">
      <div 
        v-for="(entry, index) in entries" 
        :key="entry.id"
        class="leaderboard-entry flex items-center p-4 rounded-lg transition-colors"
        :class="[
          entry.isCurrentUser ? 'bg-primary/5 border-2 border-primary' : 'hover:bg-gray-50',
          index < 3 ? 'bg-amber-50' : ''
        ]"
      >
        <!-- Rank -->
        <div 
          class="rank-badge w-10 h-10 rounded-lg flex items-center justify-center font-bold"
          :class="getRankClass(index)"
        >
          {{ index + 1 }}
        </div>
        
        <!-- User Info -->
        <div class="flex items-center flex-1 ml-4">
          <div class="avatar w-10 h-10 rounded-full overflow-hidden mr-3">
            <img 
              :src="entry.avatar" 
              :alt="entry.username"
              class="w-full h-full object-cover"
            >
          </div>
          <div>
            <div class="font-medium text-[#4A4A4A]">
              {{ entry.username }}
              <span v-if="entry.isCurrentUser" class="text-sm text-primary ml-2">(You)</span>
            </div>
            <div class="text-sm text-gray-600">
              Level {{ entry.level }}
            </div>
          </div>
        </div>
        
        <!-- Score -->
        <div class="score flex items-center">
          <div class="token-amount font-bold text-[#4A4A4A]">
            {{ formatNumber(entry.score) }}
          </div>
          <div class="token-icon ml-2">🪙</div>
        </div>
      </div>
    </div>
    
    <!-- Current User Rank (if not in top 100) -->
    <div 
      v-if="shouldShowCurrentUserRank"
      class="border-t border-gray-100 p-4"
    >
      <div class="text-sm text-gray-600 mb-2">Your Ranking</div>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="rank-number font-bold text-[#4A4A4A] mr-2">
            #{{ currentUserRank }}
          </div>
          <div class="text-gray-600">
            of {{ totalPlayers }} players
          </div>
        </div>
        <button 
          class="text-primary font-medium hover:text-primary/80 transition-colors"
          @click="scrollToTop"
        >
          View Top Players
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatNumber } from '@/utils/formatters'
import type { LeaderboardEntry } from '@/types/leaderboard'

const props = defineProps<{
  entries: LeaderboardEntry[]
  currentUserRank: number
}>()

const totalPlayers = computed(() => 10000) // This would come from the API in a real app

const shouldShowCurrentUserRank = computed(() => {
  const currentUserEntry = props.entries.find(entry => entry.isCurrentUser)
  return !currentUserEntry && props.currentUserRank > props.entries.length
})

const getRankClass = (index: number) => {
  switch (index) {
    case 0: return 'bg-amber-100 text-amber-800'
    case 1: return 'bg-gray-100 text-gray-800'
    case 2: return 'bg-orange-100 text-orange-800'
    default: return 'bg-gray-50 text-gray-600'
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
