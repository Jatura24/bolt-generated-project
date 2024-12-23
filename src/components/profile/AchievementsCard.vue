<template>
  <div class="bg-white rounded-xl p-6 shadow-md">
    <h2 class="text-lg font-semibold text-[#4A4A4A] mb-4">Achievements</h2>
    
    <div class="grid gap-4">
      <div 
        v-for="achievement in achievements" 
        :key="achievement.id"
        class="achievement-item flex items-center gap-4"
      >
        <div 
          class="achievement-icon w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
          :class="achievement.unlocked ? 'bg-primary/10' : 'bg-gray-100'"
        >
          {{ achievement.icon }}
        </div>
        
        <div class="flex-1">
          <h3 class="font-medium text-[#4A4A4A]">{{ achievement.name }}</h3>
          <p class="text-sm text-gray-600">{{ achievement.description }}</p>
        </div>
        
        <div 
          class="achievement-status"
          :class="achievement.unlocked ? 'text-primary' : 'text-gray-400'"
        >
          {{ achievement.unlocked ? '✓' : '🔒' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Achievement } from '@/types/profile'

defineProps<{
  achievements: Achievement[]
}>()
</script>
