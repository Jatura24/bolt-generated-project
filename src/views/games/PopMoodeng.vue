<template>
  <div class="p-6 max-w-4xl mx-auto">
    <!-- Game Header -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-[#4A4A4A]">Hippo Click</h1>
        <token-display :amount="tokenStore.balance" variant="compact" />
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="stat-card bg-white rounded-lg p-4 shadow-md">
          <div class="text-sm text-gray-600">Time Left</div>
          <div class="text-2xl font-bold text-[#4A4A4A]">{{ timeLeft }}s</div>
        </div>
        
        <div class="stat-card bg-white rounded-lg p-4 shadow-md">
          <div class="text-sm text-gray-600">Score</div>
          <div class="text-2xl font-bold text-[#4A4A4A]">{{ score }}</div>
        </div>
      </div>
    </div>
    
    <!-- Game Canvas -->
    <hippo-canvas
      v-if="!isGameOver"
      :position="position"
      :hippo-state="hippoState"
      @click="handleClick"
      class="mb-6"
    />
    
    <!-- Game Results -->
    <game-results
      v-if="isGameOver"
      :score="score"
      :tokens-earned="tokensEarned"
      :rank="rank"
      :rank-percentile="rankPercentile"
      :rank-tier="rankTier"
      @play-again="initGame"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useTokenStore } from '@/stores/token'
import { useHippoGame } from '@/composables/games/useHippoGame'
import TokenDisplay from '@/components/token/TokenDisplay.vue'
import HippoCanvas from '@/components/games/hippo/HippoCanvas.vue'
import GameResults from '@/components/games/hippo/GameResults.vue'

const tokenStore = useTokenStore()
const {
  score,
  timeLeft,
  tokensEarned,
  isGameOver,
  hippoState,
  position,
  rank,
  rankPercentile,
  rankTier,
  handleClick,
  initGame
} = useHippoGame()

onMounted(() => {
  initGame()
})
</script>
