<template>
  <div class="mb-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-[#4A4A4A]">Token Quest</h1>
      <token-display :amount="tokens" variant="compact" />
    </div>
    
    <div class="progress-bar bg-gray-200 rounded-full h-2 mb-2">
      <div 
        class="bg-primary h-full rounded-full transition-all duration-300"
        :style="{ width: `${(currentRound / totalRounds) * 100}%` }"
      ></div>
    </div>
    <div class="text-sm text-gray-600">
      Question {{ currentRound }} of {{ totalRounds }}
    </div>
  </div>
</template>

<script setup lang="ts">
import TokenDisplay from '@/components/token/TokenDisplay.vue'

defineProps<{
  currentRound: number
  totalRounds: number
  tokens: number
}>()
</script>
