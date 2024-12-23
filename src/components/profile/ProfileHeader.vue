<template>
  <div class="flex items-center gap-6 mb-8">
    <div class="avatar w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
      <img 
        :src="avatar" 
        :alt="username"
        class="w-full h-full object-cover"
      >
    </div>
    
    <div class="flex-1">
      <h1 class="text-2xl font-bold text-[#4A4A4A] mb-2">{{ username }}</h1>
      <div class="token-display inline-flex items-center bg-[#8B7355] rounded-lg px-4 py-2 text-white">
        <span class="mr-2">🪙</span>
        <span>{{ totalTokens }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  username: string
  avatar: string
  totalTokens: number
}>()
</script>
