<template>
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1 class="text-4xl font-bold text-[#2D2424] mb-2">{{ username }}</h1>
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">🪙 {{ tokens }} tokens</span>
      </div>
    </div>
    <div class="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
      <img :src="avatar" :alt="username" class="w-full h-full object-cover">
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  username: string
  level: number
  tokens: number
  avatar: string
}>()
</script>
