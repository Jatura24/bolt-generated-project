<template>
  <router-link 
    :to="route" 
    class="game-card rounded-2xl p-4 relative overflow-hidden"
    :style="{ backgroundColor }"
  >
    <div class="mb-8">
      <h3 class="text-lg font-bold text-[#2D2424] mb-1">{{ title }}</h3>
      <p class="text-sm text-[#2D2424]/80">{{ description }}</p>
      <p class="text-sm text-[#2D2424] mt-2">🪙 {{ reward }}</p>
    </div>
    <div class="flex justify-between items-end">
      <button class="bg-[#2D2424] text-white px-4 py-2 rounded-lg text-sm font-medium">
        Let's Go
      </button>
      <img :src="image" :alt="title" class="h-24 object-contain">
    </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  reward: string
  image: string
  route: string
  backgroundColor: string
}>()
</script>
