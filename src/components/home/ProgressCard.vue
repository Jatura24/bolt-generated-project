<template>
  <div class="bg-[#8B7355] rounded-2xl p-4 mb-8 text-white">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-[#E6B17E] rounded-full flex items-center justify-center">
          <span class="text-2xl">{{ rankTier.charAt(0) }}</span>
        </div>
        <div>
          <h2 class="text-lg font-bold">{{ zooName }}</h2>
          <p class="text-sm opacity-80">{{ rankTier }} Tier Zoo</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-sm opacity-80">Zoo Rank</p>
        <p class="text-xl font-bold">#{{ rank }}</p>
      </div>
    </div>
    
    <div class="relative pt-1">
      <div class="flex items-center justify-between mb-2">
        <div>
          <span class="text-xs font-semibold inline-block uppercase">
            Ranking Progress
          </span>
        </div>
        <div>
          <span class="text-xs font-semibold inline-block">
            Top {{ rankPercentile }}%
          </span>
        </div>
      </div>
      <div class="overflow-hidden h-2 text-xs flex rounded-full bg-white/20">
        <div
          class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#E6B17E] transition-all duration-500"
          :style="{ width: `${rankPercentile}%` }"
        ></div>
      </div>
      <div class="text-xs mt-1 opacity-80">
        {{ votes }} total votes
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useZooRanking } from '@/composables/useZooRanking'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { rank, votes, rankPercentile, rankTier } = useZooRanking()

const zooName = computed(() => {
  return `${authStore.profile?.username || 'My'}'s Zoo`
})
</script>
