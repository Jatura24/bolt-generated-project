<template>
  <div class="mb-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-[#4A4A4A]">Moodeng Zoo</h1>
      <div class="token-display flex items-center bg-[#8B7355] rounded-lg px-4 py-2 text-white">
        <span class="mr-2">🪙</span>
        <span>{{ tokens }}</span>
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div class="stat-card bg-white rounded-lg p-4 shadow-md">
        <div class="text-sm text-gray-600">Votes</div>
        <div class="text-2xl font-bold text-[#4A4A4A]">{{ votes }}</div>
      </div>
      
      <div class="stat-card bg-white rounded-lg p-4 shadow-md">
        <div class="text-sm text-gray-600">Rank</div>
        <div class="text-2xl font-bold text-[#4A4A4A]">#{{ rank }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tokens: number
  votes: number
  rank: number
}>()
</script>
