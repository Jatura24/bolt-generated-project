<template>
  <div class="bg-white rounded-xl p-6 shadow-md">
    <h2 class="text-lg font-semibold text-[#4A4A4A] mb-4">Statistics</h2>
    
    <div class="grid grid-cols-2 gap-4">
      <div 
        v-for="(value, key) in stats" 
        :key="key"
        class="stat-item"
      >
        <div class="text-sm text-gray-600">{{ formatStatName(key) }}</div>
        <div class="text-xl font-bold text-[#4A4A4A]">{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatStatName } from '@/utils/formatters'

defineProps<{
  stats: Record<string, number>
}>()
</script>
